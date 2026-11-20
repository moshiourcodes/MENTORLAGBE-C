
"use client";

import Link from "next/link";
import { useEffect } from "react";

import {
  AlertTriangle,
  RefreshCw,
  Home,
} from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAFA] px-5 py-12 dark:bg-background">
      <div className="w-full max-w-xl text-center">

        {/* Illustration */}
        <div className="relative mx-auto mb-8 flex h-36 w-36 items-center justify-center rounded-full bg-[#FFF3E8] dark:bg-orange-500/10">
          <AlertTriangle
            size={68}
            strokeWidth={1.4}
            className="text-[#F59E0B]"
          />

          <span className="absolute -right-2 -top-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#F59E0B] text-xs font-bold text-white shadow-lg">
            !
          </span>
        </div>

        {/* Message */}
        <span className="inline-flex rounded-full bg-[#FFF3E8] px-4 py-1.5 text-xs font-semibold tracking-wider text-[#D97706] dark:bg-orange-500/10 dark:text-orange-400">
          SOMETHING WENT WRONG
        </span>

        <h1 className="mt-5 text-4xl font-bold tracking-tight text-[#17202D] sm:text-5xl dark:text-foreground">
          Oops! Something Broke
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#6B7280] sm:text-base dark:text-muted-foreground">
          We encountered an unexpected problem while loading this page.
          Please try again or return to the homepage.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#399B98] px-7 text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-[#287F7C] hover:shadow-md sm:w-auto"
          >
            <RefreshCw size={17} />
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#DCE5E9] bg-white px-7 text-sm font-semibold text-[#475569] transition hover:bg-[#F1F7F6] sm:w-auto dark:border-border dark:bg-card dark:text-foreground"
          >
            <Home size={17} />
            Back to Home
          </Link>

        </div>

        {/* Error Reference */}
        {error.digest && (
          <p className="mt-7 text-xs text-[#94A3B8]">
            Error Reference: {error.digest}
          </p>
        )}

        {/* Brand */}
        <div className="mt-12 flex items-center justify-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#399B98] text-sm font-bold text-white">
            ML
          </div>

          <span className="text-sm font-bold text-[#17202D] dark:text-foreground">
            Mentor<span className="text-[#399B98]">Lagbe</span>
          </span>
        </div>

      </div>
    </main>
  );
}
