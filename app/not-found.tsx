
import Link from "next/link";
import {
  SearchX,
  Home,
  ArrowLeft,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAFA] px-5 py-12 dark:bg-background">
      <div className="w-full max-w-xl text-center">

        {/* Illustration */}
        <div className="relative mx-auto mb-8 flex h-36 w-36 items-center justify-center rounded-full bg-[#E7F4F2] dark:bg-[#399B98]/10">
          <SearchX
            size={68}
            strokeWidth={1.4}
            className="text-[#399B98] dark:text-[#5FD3C9]"
          />

          <span className="absolute -right-2 -top-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#399B98] text-sm font-bold text-white shadow-lg">
            404
          </span>
        </div>

        {/* Message */}
        <span className="inline-flex rounded-full bg-[#E7F4F2] px-4 py-1.5 text-xs font-semibold tracking-wider text-[#399B98] dark:bg-[#399B98]/15 dark:text-[#5FD3C9]">
          PAGE NOT FOUND
        </span>

        <h1 className="mt-5 text-4xl font-bold tracking-tight text-[#17202D] sm:text-5xl dark:text-foreground">
          Oops! Lost Your Way?
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#6B7280] sm:text-base dark:text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          Don&apos;t worry, let&apos;s get you back on the right track.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

          <Link
            href="/"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#399B98] px-7 text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-[#287F7C] hover:shadow-md sm:w-auto"
          >
            <Home size={17} />
            Back to Home
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#DCE5E9] bg-white px-7 text-sm font-semibold text-[#475569] transition hover:bg-[#F1F7F6] sm:w-auto dark:border-border dark:bg-card dark:text-foreground"
          >
            <ArrowLeft size={17} />
            Go Back
          </button>

        </div>

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
