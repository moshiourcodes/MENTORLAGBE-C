
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CancelApplicationButton({
  applicationId,
}: {
  applicationId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    if (loading) return;

    if (!window.confirm("Are you sure you want to cancel this application?")) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `/api/applications/${applicationId}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to cancel application.");
      }

      toast.success(result.message);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCancel}
      disabled={loading}
      className="rounded-lg border border-[#F5D5D5] px-3 py-1.5 text-xs font-semibold text-[#C24B4B] transition hover:bg-[#FDECEC] disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#D45B5B]/30 dark:text-[#F0A3A3] dark:hover:bg-[#D45B5B]/10"
    >
      {loading ? "Cancelling..." : "Cancel"}
    </button>
  );
}
