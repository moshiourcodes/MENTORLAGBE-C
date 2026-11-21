
"use client";

import { useEffect, useState } from "react";
import TuitionCard from "@/components/TutionCard";

interface Tuition {
  _id: string;
  title: string;
  subject: string;
  classLevel: string;
  mode: "online" | "offline";
  location?: string;
  bannerImage: string;
  tutorName: string;
  monthlyFee: number;
  daysPerWeek: number;
  approvalStatus: "pending" | "approved" | "rejected";
  isActive: boolean;
}

interface TuitionCardGridProps {
  limit?: number;
}

export default function TuitionCardGrid({
  limit,
}: TuitionCardGridProps) {
  const [tuitions, setTuitions] = useState<Tuition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTuitions = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/tuitions",
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        const tuitionList: Tuition[] = Array.isArray(data)
          ? data
          : Array.isArray(data.tuitions)
            ? data.tuitions
            : [];

        // Show only approved and active tuition cards
        const approvedTuitions = tuitionList.filter(
          (tuition) =>
            tuition.approvalStatus === "approved" &&
            tuition.isActive === true
        );

        setTuitions(approvedTuitions);
      } catch (err) {
        console.error("Tuition API Error:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load tuition data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTuitions();
  }, []);

  // Loading State
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: limit ?? 6 }).map((_, index) => (
          <div
            key={index}
            className="h-[450px] animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-900"
          />
        ))}
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <p className="py-12 text-center text-sm text-red-500">
        {error}
      </p>
    );
  }

  // Limit cards
  const displayedTuitions =
    typeof limit === "number"
      ? tuitions.slice(0, limit)
      : tuitions;

  // Empty State
  if (displayedTuitions.length === 0) {
    return (
      <div className="py-16 text-center">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
          No Approved Tuitions Yet
        </h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          New tuition opportunities will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {displayedTuitions.map((tuition) => (
        <TuitionCard
          key={tuition._id}
          tuition={tuition}
        />
      ))}
    </div>
  );
}
