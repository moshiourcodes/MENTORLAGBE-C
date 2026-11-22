// import Link from "next/link"
// import { BookOpen, ArrowRight } from "lucide-react"
// import Footer from "@/components/Footer"

// export const metadata = {
//   title: "Browse Tuitions | MentorLagbe",
//   description:
//     "Explore approved tuition batches and mentorship programmes on MentorLagbe.",
// }

// export default function TuitionsPage() {
//   return (
//     <>
//       <main className="min-h-[calc(100vh-68px)] bg-[#F8FAFA] px-4 py-16 sm:px-6 lg:px-8 dark:bg-background">
//         <div className="mx-auto max-w-6xl">
//           {/* Page Header */}
//           <div className="mb-10">
//             <span className="inline-flex items-center rounded-full bg-[#E7F4F2] px-3 py-1 text-xs font-semibold tracking-wide text-[#399B98] dark:bg-[#399B98]/15 dark:text-[#5FD3C9]">
//               BROWSE
//             </span>

//             <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#17202D] sm:text-4xl dark:text-foreground">
//               Browse Tuitions
//             </h1>

//             <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6B7280] sm:text-base dark:text-muted-foreground">
//               Find approved tuition batches and one-on-one mentorship programmes
//               from verified tutors.
//             </p>
//           </div>

//           {/* Empty State */}
//           <div className="flex min-h-[380px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#DCE7E7] bg-white px-6 py-14 text-center dark:border-border dark:bg-card">
//             <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E7F4F2] text-[#399B98] dark:bg-[#399B98]/15 dark:text-[#5FD3C9]">
//               <BookOpen size={30} />
//             </div>

//             <h2 className="mt-6 text-xl font-bold text-[#17202D] dark:text-foreground">
//               No Tuition Listings Yet
//             </h2>

//             <p className="mt-3 max-w-md text-sm leading-6 text-[#6B7280] dark:text-muted-foreground">
//               Once tutors publish tuition opportunities and an administrator
//               approves them, they will appear here.
//             </p>

//             <Link
//               href="/"
//               className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#399B98] px-6 text-sm font-semibold text-white transition hover:bg-[#287F7C]"
//             >
//               Back to Home
//               <ArrowRight size={17} />
//             </Link>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </>
//   )
// }
















import type { Metadata } from "next";
import TuitionCardGrid from "./TuitionCardGrid";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Browse Tuitions | MentorLagbe",
  description:
    "Explore approved tuition batches and mentorship programmes on MentorLagbe.",
};

export default function TuitionsPage() {
  return (
    <>
      <main className="min-h-[calc(100vh-68px)] bg-[#F8FAFA] px-4 py-16 sm:px-6 lg:px-8 dark:bg-background">
        <div className="mx-auto max-w-6xl">

          {/* Page Header */}
          <div className="mb-10">
            <span className="inline-flex items-center rounded-full bg-[#E7F4F2] px-3 py-1 text-xs font-semibold tracking-wide text-[#399B98] dark:bg-[#399B98]/15 dark:text-[#5FD3C9]">
              BROWSE
            </span>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#17202D] sm:text-4xl dark:text-foreground">
              Browse Tuitions
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6B7280] sm:text-base dark:text-muted-foreground">
              Find approved tuition batches and one-on-one mentorship programmes
              from verified tutors.
            </p>
          </div>

          {/* All Approved Tuition Listings */}
          <TuitionCardGrid />

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}




