
import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";

export async function POST() {
  try {
    // Verify authenticated user
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        { message: "Please sign in first." },
        { status: 401 }
      );
    }

    const user = session.user as typeof session.user & {
      role?: string;
      plan?: string;
    };

    const role = user.role;

    if (role !== "student" && role !== "tutor") {
      return NextResponse.json(
        { message: "Only students and tutors can purchase Pro." },
        { status: 403 }
      );
    }

    if (user.plan === "pro") {
      return NextResponse.json(
        { message: "You already have a Pro plan." },
        { status: 409 }
      );
    }

    // Server-controlled pricing in USD cents
    const amount = role === "tutor" ? 1500 : 1000;

    const planName =
      role === "tutor"
        ? "MentorLagbe Pro - Tutor"
        : "MentorLagbe Pro - Student";

    const appUrl = process.env.NEXT_PUBLIC_APP_URL;

    if (!appUrl) {
      throw new Error("NEXT_PUBLIC_APP_URL is missing.");
    }

    // Create Stripe Checkout Session
    const checkoutSession =
      await stripe.checkout.sessions.create({
        mode: "subscription",

        customer_email: session.user.email,

        client_reference_id: session.user.id,

        line_items: [
          {
            price_data: {
              currency: "usd",
              unit_amount: amount,

              recurring: {
                interval: "month",
              },

              product_data: {
                name: planName,
                description: "Monthly MentorLagbe Pro subscription",
              },
            },
            quantity: 1,
          },
        ],

        metadata: {
          userId: session.user.id,
          userEmail: session.user.email,
          userName: session.user.name,
          userRole: role,
          planName: "pro",
        },

        subscription_data: {
          metadata: {
            userId: session.user.id,
            userEmail: session.user.email,
            userRole: role,
            planName: "pro",
          },
        },

        success_url: `${appUrl}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,

        cancel_url: `${appUrl}/pricing?payment=cancelled`,
      });

    return NextResponse.json({
      success: true,
      url: checkoutSession.url,
    });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);

    return NextResponse.json(
      { message: "Unable to create Stripe Checkout session." },
      { status: 500 }
    );
  }
}
