
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  applicationId: string;
  status: string;
}

export default function ApplicationReviewButtons({
  applicationId,
  status,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleReview = async (newStatus: "accepted" | "rejected") => {
    if (loading || status !== "pending") return;

    const confirmed = window.confirm(
      newStatus === "accepted"
        ? "Are you sure you want to approve this student?"
        : "Are you sure you want to reject this application?"
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      const response = await fetch(
        `/api/applications/${applicationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to update application.");
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

  if (status !== "pending") return null;

  return (
    <div className="mt-5 flex flex-wrap gap-3 border-t border-border pt-4">
      <button
        type="button"
        disabled={loading}
        onClick={() => handleReview("accepted")}
        className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#399B98] px-4 text-xs font-semibold text-white transition hover:bg-[#287F7C] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Check size={15} />
        {loading ? "Updating..." : "Approve"}
      </button>

      <button
        type="button"
        disabled={loading}
        onClick={() => handleReview("rejected")}
        className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#F5D5D5] px-4 text-xs font-semibold text-[#C24B4B] transition hover:bg-[#FDECEC] disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#D45B5B]/30 dark:text-[#F0A3A3] dark:hover:bg-[#D45B5B]/10"
      >
        <X size={15} />
        Reject
      </button>
    </div>
  );
}
