import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import type Stripe from "stripe";

import { db } from "@/lib/auth";
import { getStripe } from "@/lib/stripe";
import { isBillingRole } from "@/lib/payments";

function idOf(value: unknown): string | null {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "id" in value) {
    const id = (value as { id?: unknown }).id;
    return typeof id === "string" ? id : null;
  }
  return null;
}

async function findUserByIdOrEmail(
  userId: string | null | undefined,
  email: string | null | undefined
) {
  if (userId) {
    try {
      const byId = await db
        .collection("user")
        .findOne({ _id: new ObjectId(userId) });
      if (byId) return byId;
    } catch {
      // Legacy string ids fall through to the email lookup.
    }
  }

  if (email) {
    return db.collection("user").findOne({ email });
  }

  return null;
}

async function findUserBySubscription(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId;
  const byMetadata = await findUserByIdOrEmail(userId, null);
  if (byMetadata) return byMetadata;

  return db
    .collection("user")
    .findOne({ stripeSubscriptionId: subscription.id });
}

async function setUserSubscription(
  userId: unknown,
  plan: "free" | "pro",
  status: string,
  stripeCustomerId?: string | null,
  stripeSubscriptionId?: string | null
) {
  const filter = (() => {
    try {
      return { _id: new ObjectId(String(userId)) };
    } catch {
      return { email: String(userId) };
    }
  })();

  await db.collection("user").updateOne(filter, {
    $set: {
      plan,
      subscriptionStatus: status,
      ...(stripeCustomerId !== undefined
        ? { stripeCustomerId }
        : {}),
      ...(stripeSubscriptionId !== undefined
        ? { stripeSubscriptionId }
        : {}),
      updatedAt: new Date(),
    },
  });
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { message: "Missing Stripe webhook configuration." },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    const rawBody = await request.text();
    event = getStripe().webhooks.constructEvent(
      rawBody,
      signature,
      webhookSecret
    );
  } catch (error) {
    console.error(
      "Stripe signature verification failed:",
      error instanceof Error ? error.message : "unknown error"
    );
    return NextResponse.json(
      { message: "Invalid webhook signature." },
      { status: 400 }
    );
  }

  // Claim the event id so Stripe retries never replay stale state (for
  // example an old completed checkout after a cancellation).
  const claimed = await db.collection("webhook_events").updateOne(
    { _id: event.id as never },
    {
      $setOnInsert: {
        type: event.type,
        receivedAt: new Date(),
      },
    },
    { upsert: true }
  );

  if (claimed.upsertedCount === 0) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  try {
    const users = db.collection("user");
    const payments = db.collection("payments");

    if (event.type === "checkout.session.completed") {
      const checkout = event.data.object as Stripe.Checkout.Session;

      if (checkout.payment_status !== "paid") {
        return NextResponse.json({ received: true });
      }

      const metadata = checkout.metadata ?? {};
      const userId = metadata.userId || checkout.client_reference_id;
      const userEmail = metadata.userEmail;
      const userRole = metadata.userRole;
      const userName = metadata.userName;

      if (
        !userId ||
        !userEmail ||
        !userName ||
        !isBillingRole(userRole)
      ) {
        return NextResponse.json(
          { message: "Invalid payment metadata." },
          { status: 400 }
        );
      }

      if (
        checkout.client_reference_id &&
        checkout.client_reference_id !== userId
      ) {
        return NextResponse.json(
          { message: "Payment identity mismatch." },
          { status: 400 }
        );
      }

      const user = await findUserByIdOrEmail(userId, userEmail);

      if (
        !user ||
        user.email !== userEmail ||
        user.role !== userRole
      ) {
        return NextResponse.json(
          { message: "User account was not found." },
          { status: 404 }
        );
      }

      const customerId = idOf(checkout.customer);
      const subscriptionId = idOf(checkout.subscription);

      await users.updateOne(
        { _id: user._id },
        {
          $set: {
            plan: "pro",
            subscriptionStatus: "active",
            stripeCustomerId: customerId,
            stripeSubscriptionId: subscriptionId,
            updatedAt: new Date(),
          },
        }
      );

      await payments.updateOne(
        { stripeSessionId: checkout.id },
        {
          $setOnInsert: {
            userId,
            userEmail,
            userName,
            userRole,
            planName: "pro",
            amount: checkout.amount_total ?? 0,
            currency: checkout.currency ?? "usd",
            transactionId:
              idOf(checkout.payment_intent) ?? checkout.id,
            stripeSessionId: checkout.id,
            stripeCustomerId: customerId,
            stripeSubscriptionId: subscriptionId,
            paymentStatus: "paid",
            paidAt: new Date(),
            createdAt: new Date(),
          },
        },
        { upsert: true }
      );

      return NextResponse.json({ received: true });
    }

    if (
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.deleted"
    ) {
      const subscription = event.data.object as Stripe.Subscription;
      const user = await findUserBySubscription(subscription);

      if (user) {
        const isActive =
          event.type === "customer.subscription.updated" &&
          (subscription.status === "active" ||
            subscription.status === "trialing");

        await setUserSubscription(
          user._id,
          isActive ? "pro" : "free",
          subscription.status,
          idOf(subscription.customer),
          subscription.id
        );
      }

      return NextResponse.json({ received: true });
    }

    if (event.type === "invoice.payment_failed") {
      const invoice = event.data.object as Stripe.Invoice & {
        parent?: {
          subscription_details?: { subscription?: unknown };
        };
      };
      const subscriptionId = idOf(invoice.parent?.subscription_details?.subscription);

      if (subscriptionId) {
        await users.updateOne(
          { stripeSubscriptionId: subscriptionId },
          {
            $set: {
              plan: "free",
              subscriptionStatus: "past_due",
              updatedAt: new Date(),
            },
          }
        );
      }

      return NextResponse.json({ received: true });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    // Release the claim so Stripe can retry this event.
    await db
      .collection("webhook_events")
      .deleteOne({ _id: event.id as never })
      .catch(() => undefined);

    console.error(
      "Stripe webhook processing failed:",
      error instanceof Error ? error.message : "unknown error"
    );

    return NextResponse.json(
      { message: "Webhook processing failed." },
      { status: 500 }
    );
  }
}
