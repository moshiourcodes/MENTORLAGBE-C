import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { getStripe } from "@/lib/stripe";
import {
  buildCheckoutMetadata,
  checkoutIdempotencyKey,
  isBillingRole,
  isProPlan,
  planDisplayName,
  planPriceCents,
} from "@/lib/payments";

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Please sign in before upgrading." },
        { status: 401 }
      );
    }

    const user = session.user as typeof session.user & {
      role?: unknown;
      plan?: unknown;
    };

    if (!isBillingRole(user.role)) {
      return NextResponse.json(
        { success: false, message: "Only students and tutors can upgrade." },
        { status: 403 }
      );
    }

    if (isProPlan(user.plan)) {
      return NextResponse.json(
        { success: false, message: "You already have a Pro subscription." },
        { status: 409 }
      );
    }

    const amount = planPriceCents(user.role);
    const planName = planDisplayName(user.role);
    const metadata = buildCheckoutMetadata({
      id: session.user.id,
      name: session.user.name || "MentorLagbe User",
      email: session.user.email,
      role: user.role,
    });

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;

    const checkoutSession = await getStripe().checkout.sessions.create(
      {
        mode: "subscription",
        // Card enables Apple Pay / Google Pay automatically on supported
        // devices; Link is enabled explicitly when active in the Stripe account.
        allowed_payment_method_types: ["card", "link"],
        customer_email: session.user.email,
        client_reference_id: session.user.id,
        billing_address_collection: "auto",
        allow_promotion_codes: true,
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: "usd",
              unit_amount: amount,
              recurring: { interval: "month" },
              product_data: {
                name: planName,
                description: `Monthly MentorLagbe ${user.role === "student" ? "Student" : "Tutor"} Pro subscription`,
              },
            },
          },
        ],
        metadata,
        subscription_data: { metadata },
        success_url: `${appUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${appUrl}/payment/cancel`,
      },
      { idempotencyKey: checkoutIdempotencyKey(session.user.id) }
    );

    if (!checkoutSession.url) {
      throw new Error("Stripe did not return a Checkout URL.");
    }

    return NextResponse.json({ success: true, url: checkoutSession.url });
  } catch (error) {
    console.error(
      "Stripe checkout error:",
      error instanceof Error ? error.message : "unknown error"
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to start Stripe Checkout. Please try again.",
      },
      { status: 500 }
    );
  }
}
