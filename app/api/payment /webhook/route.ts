
import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/auth";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { message: "Missing Stripe webhook configuration." },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    // IMPORTANT: Stripe requires the original raw request body.
    const rawBody = await request.text();

    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("Stripe signature verification failed:", error);

    return NextResponse.json(
      { message: "Invalid webhook signature." },
      { status: 400 }
    );
  }

  try {
    const users = db.collection("user");
    const payments = db.collection("payments");

    // Successful initial Checkout payment
    if (event.type === "checkout.session.completed") {
      const checkoutSession = event.data.object as Stripe.Checkout.Session;

      if (checkoutSession.payment_status !== "paid") {
        return NextResponse.json({ received: true });
      }

      const metadata = checkoutSession.metadata;

      const userId = metadata?.userId;
      const userEmail = metadata?.userEmail;
      const userName = metadata?.userName;
      const userRole = metadata?.userRole;

      if (
        !userId ||
        !userEmail ||
        !userName ||
        (userRole !== "student" && userRole !== "tutor")
      ) {
        console.error("Invalid Checkout metadata:", metadata);

        return NextResponse.json(
          { message: "Invalid payment metadata." },
          { status: 400 }
        );
      }

      // Activate Pro for the authenticated account identified
      // by the metadata created on the server.
      const userUpdate = await users.updateOne(
        {
          email: userEmail,
          role: userRole,
        },
        {
          $set: {
            plan: "pro",
            updatedAt: new Date(),
          },
        }
      );

      if (userUpdate.matchedCount !== 1) {
        console.error("Could not find matching user:", userEmail);

        return NextResponse.json(
          { message: "User account was not found." },
          { status: 500 }
        );
      }

      // Save payment once, even if Stripe retries the webhook.
      await payments.updateOne(
        {
          stripeSessionId: checkoutSession.id,
        },
        {
          $setOnInsert: {
            userId,
            userEmail,
            userName,
            userRole,
            planName: "pro",

            amount: checkoutSession.amount_total ?? 0,
            currency: checkoutSession.currency ?? "usd",

            transactionId:
              typeof checkoutSession.payment_intent === "string"
                ? checkoutSession.payment_intent
                : checkoutSession.id,

            stripeSessionId: checkoutSession.id,
            stripeSubscriptionId:
              typeof checkoutSession.subscription === "string"
                ? checkoutSession.subscription
                : null,

            paymentStatus: "paid",
            paidAt: new Date(),
            createdAt: new Date(),
          },
        },
        { upsert: true }
      );
    }

    // Handle subscription cancellation
    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as Stripe.Subscription;

      const userEmail = subscription.metadata?.userEmail;

      if (userEmail) {
        await users.updateOne(
          { email: userEmail },
          {
            $set: {
              plan: "free",
              updatedAt: new Date(),
            },
          }
        );
      }
    }

    return NextResponse.json({
      received: true,
    });
  } catch (error) {
    console.error("Stripe webhook processing error:", error);

    return NextResponse.json(
      { message: "Webhook processing failed." },
      { status: 500 }
    );
  }
}
