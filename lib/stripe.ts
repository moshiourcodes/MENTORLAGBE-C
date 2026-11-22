import Stripe from "stripe";

let cachedClient: Stripe | null = null;

/**
 * Lazily creates the Stripe client. Importing this module must never throw —
 * a missing key should produce a controlled error at the point of use.
 */
export function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is missing.");
  }

  if (!cachedClient) {
    cachedClient = new Stripe(secretKey);
  }

  return cachedClient;
}
