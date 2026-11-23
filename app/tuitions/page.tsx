
"use client";

import { useEffect, useMemo, useState } from "react";
import TutionCard from "@/components/TutionCard";
import { Search, RotateCcw, Loader2 } from "lucide-react";

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

interface TuitionApiResponse {
  success: boolean;
  total: number;
  tuitions: Tuition[];
  message?: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Fetch and validate approved tuition listings
async function getApprovedTuitions(
  signal?: AbortSignal
): Promise<Tuition[]> {
  const response = await fetch(`${API_URL}/api/tuitions`, {
    method: "GET",
    cache: "no-store",
    signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch tuitions (${response.status})`);
  }

  const data: TuitionApiResponse = await response.json();

  if (!data.success || !Array.isArray(data.tuitions)) {
    throw new Error(data.message || "Invalid tuition data received.");
  }

  return data.tuitions.filter(
    (tuition) =>
      tuition.approvalStatus === "approved" &&
      tuition.isActive === true
  );
}

export default function AllTuitionsPage() {
  const [tuitions, setTuitions] = useState<Tuition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [subject, setSubject] = useState("all");
  const [classLevel, setClassLevel] = useState("all");
  const [mode, setMode] = useState("all");

  // Initial data loading
  useEffect(() => {
    const controller = new AbortController();

    getApprovedTuitions(controller.signal)
      .then((data) => {
        setTuitions(data);
        setError("");
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        console.error("Tuition API Error:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load tuition data."
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  // Refresh tuition listings
  const fetchTuitions = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getApprovedTuitions();

      setTuitions(data);
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

  // Generate filter options
  const subjects = useMemo(
    () =>
      Array.from(
        new Set(
          tuitions.map((tuition) => tuition.subject).filter(Boolean)
        )
      ).sort(),
    [tuitions]
  );

  const classLevels = useMemo(
    () =>
      Array.from(
        new Set(
          tuitions.map((tuition) => tuition.classLevel).filter(Boolean)
        )
      ).sort(),
    [tuitions]
  );

  // Search and filter tuition listings
  const filteredTuitions = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return tuitions.filter((tuition) => {
      const matchesSearch =
        !keyword ||
        tuition.title?.toLowerCase().includes(keyword) ||
        tuition.tutorName?.toLowerCase().includes(keyword) ||
        tuition.subject?.toLowerCase().includes(keyword) ||
        tuition.classLevel?.toLowerCase().includes(keyword) ||
        tuition.location?.toLowerCase().includes(keyword);

      const matchesSubject =
        subject === "all" || tuition.subject === subject;

      const matchesClass =
        classLevel === "all" || tuition.classLevel === classLevel;

      const matchesMode =
        mode === "all" || tuition.mode === mode;

      return (
        matchesSearch &&
        matchesSubject &&
        matchesClass &&
        matchesMode
      );
    });
  }, [tuitions, searchTerm, subject, classLevel, mode]);

  // Reset filters
  const handleReset = () => {
    setSearchTerm("");
    setSubject("all");
    setClassLevel("all");
    setMode("all");
  };

  return (
    <main className="min-h-screen bg-[#F7F9FC] px-4 py-16 dark:bg-[#0B1220] sm:px-6 lg:px-10">
      <div className="mx-auto max-w-350">

        {/* Page Heading */}
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <span className="inline-flex rounded-full bg-[#E3F4F2] px-5 py-2 text-sm font-semibold tracking-wide text-[#168B82] dark:bg-[#153B3B] dark:text-[#5FD3C9]">
            TUITION MARKETPLACE
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            Browse All Tuitions
          </h1>

          <p className="mx-auto mt-5 max-w-4xl text-lg leading-8 text-slate-600 dark:text-slate-400 sm:text-xl">
            Explore vetted tuition posts and mentorship batches.
            Filter by academic subject, grade level, and online
            or in-person delivery.
          </p>
        </div>

        {/* Search and Filters */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111C2E] sm:p-8">

          {/* Search */}
          <form
            onSubmit={(event) => event.preventDefault()}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <Search
                size={22}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search tuitions by title, tutor, or keyword..."
                className="h-16 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] pl-16 pr-5 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#159B91] focus:ring-2 focus:ring-[#159B91]/10 dark:border-slate-700 dark:bg-[#0B1220] dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="inline-flex h-16 items-center justify-center gap-3 rounded-2xl bg-[#119B8F] px-9 text-base font-semibold text-white transition hover:bg-[#0D8178]"
            >
              <Search size={22} />
              Search
            </button>
          </form>

          <div className="my-6 border-t border-slate-100 dark:border-slate-800" />

          {/* Filter Options */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-base font-medium text-slate-600 dark:text-slate-300"
              >
                Subject
              </label>

              <select
                id="subject"
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                className="h-14 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-5 text-base text-slate-700 outline-none focus:border-[#159B91] dark:border-slate-700 dark:bg-[#0B1220] dark:text-white"
              >
                <option value="all">All Subjects</option>

                {subjects.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Class Level */}
            <div>
              <label
                htmlFor="classLevel"
                className="mb-2 block text-base font-medium text-slate-600 dark:text-slate-300"
              >
                Class Level
              </label>

              <select
                id="classLevel"
                value={classLevel}
                onChange={(event) => setClassLevel(event.target.value)}
                className="h-14 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-5 text-base text-slate-700 outline-none focus:border-[#159B91] dark:border-slate-700 dark:bg-[#0B1220] dark:text-white"
              >
                <option value="all">All Levels</option>

                {classLevels.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Mode */}
            <div>
              <label
                htmlFor="mode"
                className="mb-2 block text-base font-medium text-slate-600 dark:text-slate-300"
              >
                Mode
              </label>

              <select
                id="mode"
                value={mode}
                onChange={(event) => setMode(event.target.value)}
                className="h-14 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-5 text-base text-slate-700 outline-none focus:border-[#159B91] dark:border-slate-700 dark:bg-[#0B1220] dark:text-white"
              >
                <option value="all">All Modes</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>

            {/* Reset */}
            <div className="flex flex-col">
              <span className="mb-2 hidden text-base font-medium lg:block">
                &nbsp;
              </span>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white text-base font-semibold text-slate-700 transition hover:border-[#159B91] hover:text-[#159B91] dark:border-slate-700 dark:bg-[#111C2E] dark:text-slate-200"
              >
                <RotateCcw size={19} />
                Reset
              </button>
            </div>
          </div>
        </section>

        {/* Results Information */}
        <div className="mb-8 mt-16 flex flex-wrap items-center justify-between gap-4">
          <p className="text-base text-slate-500 dark:text-slate-400">
            Showing{" "}
            <span className="font-bold text-slate-900 dark:text-white">
              {loading ? "..." : filteredTuitions.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-slate-900 dark:text-white">
              {loading ? "..." : tuitions.length}
            </span>{" "}
            tuitions
          </p>

          <button
            type="button"
            onClick={fetchTuitions}
            disabled={loading}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#159B91] transition hover:text-[#0D8178] disabled:opacity-50"
          >
            <RotateCcw size={16} />
            Refresh Listings
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-64 items-center justify-center">
            <div className="text-center">
              <Loader2
                className="mx-auto animate-spin text-[#159B91]"
                size={38}
              />

              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                Loading tuition opportunities...
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-3xl border border-red-200 bg-white px-6 py-16 text-center dark:border-red-900/40 dark:bg-[#111C2E]">
            <h3 className="text-xl font-bold text-red-600 dark:text-red-400">
              Unable to Load Tuitions
            </h3>

            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchTuitions}
              className="mt-6 rounded-xl bg-[#119B8F] px-6 py-3 font-semibold text-white hover:bg-[#0D8178]"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Tuition Cards */}
        {!loading && !error && filteredTuitions.length > 0 && (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTuitions.map((tuition) => (
              <TutionCard
                key={tuition._id}
                tuition={tuition}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredTuitions.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center dark:border-slate-700 dark:bg-[#111C2E]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E3F4F2] text-[#159B91] dark:bg-[#153B3B]">
              <Search size={28} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
              No Tuitions Found
            </h3>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Try changing your search keyword or filters.
            </p>

            <button
              type="button"
              onClick={handleReset}
              className="mt-6 rounded-xl bg-[#119B8F] px-6 py-3 font-semibold text-white transition hover:bg-[#0D8178]"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
