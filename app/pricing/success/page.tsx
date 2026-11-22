import { redirect } from "next/navigation";

/** Compatibility redirect to the canonical payment status route. */
export default async function LegacyPaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const query = session_id ? `?session_id=${encodeURIComponent(session_id)}` : "";

  redirect(`/payment/success${query}`);
}
