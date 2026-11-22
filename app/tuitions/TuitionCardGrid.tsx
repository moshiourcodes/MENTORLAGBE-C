
// "use client";

// import { useEffect, useState } from "react";
// import TuitionCard from "@/components/TutionCard";

// interface Tuition {
//   _id: string;
//   title: string;
//   subject: string;
//   classLevel: string;
//   mode: "online" | "offline";
//   location?: string;
//   bannerImage: string;
//   tutorName: string;
//   monthlyFee: number;
//   daysPerWeek: number;
//   approvalStatus: "pending" | "approved" | "rejected";
//   isActive: boolean;
// }

// interface TuitionCardGridProps {
//   limit?: number;
// }

// export default function TuitionCardGrid({
//   limit,
// }: TuitionCardGridProps) {
//   const [tuitions, setTuitions] = useState<Tuition[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchTuitions = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:5000/api/tuitions",
//           {
//             cache: "no-store",
//           }
//         );

//         if (!response.ok) {
//           throw new Error(`API Error: ${response.status}`);
//         }

//         const data = await response.json();

//         const tuitionList: Tuition[] = Array.isArray(data)
//           ? data
//           : Array.isArray(data.tuitions)
//             ? data.tuitions
//             : [];

//         // Show only approved and active tuition cards
//         const approvedTuitions = tuitionList.filter(
//           (tuition) =>
//             tuition.approvalStatus === "approved" &&
//             tuition.isActive === true
//         );

//         setTuitions(approvedTuitions);
//       } catch (err) {
//         console.error("Tuition API Error:", err);
//         setError(
//           err instanceof Error
//             ? err.message
//             : "Unable to load tuition data."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTuitions();
//   }, []);

//   // Loading State
//   if (loading) {
//     return (
//       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {Array.from({ length: limit ?? 6 }).map((_, index) => (
//           <div
//             key={index}
//             className="h-[450px] animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-900"
//           />
//         ))}
//       </div>
//     );
//   }

//   // Error State
//   if (error) {
//     return (
//       <p className="py-12 text-center text-sm text-red-500">
//         {error}
//       </p>
//     );
//   }

//   // Limit cards
//   const displayedTuitions =
//     typeof limit === "number"
//       ? tuitions.slice(0, limit)
//       : tuitions;

//   // Empty State
//   if (displayedTuitions.length === 0) {
//     return (
//       <div className="py-16 text-center">
//         <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
//           No Approved Tuitions Yet
//         </h3>
//         <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
//           New tuition opportunities will appear here.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//       {displayedTuitions.map((tuition) => (
//         <TuitionCard
//           key={tuition._id}
//           tuition={tuition}
//         />
//       ))}
//     </div>
//   );
// }













"use client";

import { useCallback, useEffect, useState } from "react";
import TutionCard from "@/components/TutionCard";
import { RefreshCw } from "lucide-react";

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

interface TuitionApiResponse {
  success: boolean;
  total: number;
  tuitions: Tuition[];
  message?: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function TuitionCardGrid({
  limit,
}: TuitionCardGridProps) {
  const [tuitions, setTuitions] = useState<Tuition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch approved tuition listings
  const fetchTuitions = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/tuitions`, {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data: TuitionApiResponse = await response.json();

      if (!data.success || !Array.isArray(data.tuitions)) {
        throw new Error(
          data.message || "Invalid tuition data received from server."
        );
      }

      // Only show approved and active tuition listings.
      const approvedTuitions = data.tuitions.filter(
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
  }, []);

  useEffect(() => {
    fetchTuitions();
  }, [fetchTuitions]);

  // Apply optional card limit.
  const displayedTuitions =
    typeof limit === "number"
      ? tuitions.slice(0, limit)
      : tuitions;

  // Loading State
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({
          length: typeof limit === "number" ? limit : 6,
        }).map((_, index) => (
          <div
            key={index}
            className="h-[450px] animate-pulse rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900"
          />
        ))}
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-white px-6 py-14 text-center dark:border-red-900/40 dark:bg-card">
        <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">
          Unable to Load Tuitions
        </h3>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {error}
        </p>

        <button
          type="button"
          onClick={fetchTuitions}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#399B98] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#287F7C]"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      </div>
    );
  }

  // Empty State
  if (displayedTuitions.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#DCE7E7] bg-white px-6 py-16 text-center dark:border-border dark:bg-card">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
          No Approved Tuitions Yet
        </h3>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          New approved tuition opportunities will appear here.
        </p>

        <button
          type="button"
          onClick={fetchTuitions}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#399B98] hover:text-[#287F7C]"
        >
          <RefreshCw size={15} />
          Refresh Listings
        </button>
      </div>
    );
  }

  // Display Tuition Cards
  return (
    <section>
      {/* Listing Information */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Showing{" "}
          <span className="font-semibold text-[#399B98] dark:text-[#5FD3C9]">
            {displayedTuitions.length}
          </span>{" "}
          approved tuition opportunities
        </p>

        <button
          type="button"
          onClick={fetchTuitions}
          className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-[#399B98] transition hover:text-[#287F7C] dark:text-[#5FD3C9]"
        >
          <RefreshCw size={15} />
          Refresh
        </button>
      </div>

      {/* Tuition Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayedTuitions.map((tuition) => (
          <TutionCard
            key={tuition._id}
            tuition={tuition}
          />
        ))}
      </div>
    </section>
  );
}
