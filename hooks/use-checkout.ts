"use client";

import { useState } from "react";
import { toast } from "sonner";

/**
 * Starts the official Stripe-hosted Checkout flow. All pricing, role and
 * identity decisions are made by the server route.
 */
export function useCheckout() {
  const [isLoading, setIsLoading] = useState(false);

  const startCheckout = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      const response = await fetch("/api/payment/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = (await response.json()) as {
        success?: boolean;
        url?: string;
        message?: string;
      };

      if (!response.ok || !data.success || !data.url) {
        throw new Error(data.message || "Unable to start Stripe Checkout.");
      }

      window.location.assign(data.url);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { startCheckout, isLoading };
}
