/** Shared, server-safe pricing and limit constants for MentorLagbe Pro. */

export const FREE_LIMITS = {
  applications: 2,
  bookmarks: 2,
  tuitions: 2,
} as const;

export type BillingRole = "student" | "tutor";
export type UpgradeLimit = keyof typeof FREE_LIMITS;

export function isBillingRole(value: unknown): value is BillingRole {
  return value === "student" || value === "tutor";
}

export function isProPlan(value: unknown): boolean {
  return value === "pro";
}

/** Server-controlled price in USD cents. Never accept this from the client. */
export function planPriceCents(role: BillingRole): number {
  return role === "student" ? 1000 : 1500;
}

export function planDisplayName(role: BillingRole): string {
  return role === "student"
    ? "MentorLagbe Student Pro"
    : "MentorLagbe Tutor Pro";
}

/**
 * One canonical metadata shape shared by Checkout and the webhook so the two
 * can never disagree about which user/role a payment belongs to.
 */
export function buildCheckoutMetadata(user: {
  id: string;
  name: string;
  email: string;
  role: BillingRole;
}) {
  return {
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    userRole: user.role,
    planName: "pro",
  };
}

export function checkoutIdempotencyKey(userId: string): string {
  return `mentorlagbe-pro-checkout-${userId}`;
}
