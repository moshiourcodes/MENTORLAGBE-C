




import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";

export default function CTA() {
  return (
    <section className="w-full bg-[#F8FBFB] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* CTA Container */}
        <div className="relative overflow-hidden rounded-2xl border border-[#CFE8E5] bg-[#EAF6F5] px-6 py-14 text-center shadow-[0_4px_20px_rgba(57,155,152,0.04)] sm:px-12 sm:py-16">

          {/* Background Decorations */}
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#399B98]/6" />

          <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[#399B98]/5" />

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-2xl">

            {/* Label */}
            <span className="inline-flex items-center rounded-full border border-[#CFE8E5] bg-[#DDF0EE] px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#398985]">
              START YOUR JOURNEY WITH MENTORLAGBE
            </span>

            {/* Heading */}
            <h2 className="mx-auto mt-5 max-w-xl text-3xl font-bold leading-tight tracking-tight text-[#17202D] sm:text-4xl lg:text-[38px]">
              Find the Right Tutor. Achieve Your Goals.
            </h2>

            {/* Description */}
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#6B7C83] sm:text-[15px]">
              Whether you&apos;re looking for personalized academic support or
              ready to share your teaching expertise, MentorLagbe connects
              students and tutors in one trusted learning community.
            </p>

            {/* Action Buttons */}
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">

              {/* Student Button */}
              <Link
                href="/sign-up"
                className="group inline-flex h-11 min-w-36.25 items-center justify-center gap-2 rounded-lg bg-[#399B98] px-5 text-xs font-semibold text-white shadow-[0_4px_12px_rgba(57,155,152,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#287F7C] hover:shadow-lg"
              >
                Join as Student
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              {/* Tutor Button */}
              <Link
                href="/sign-up"
                className="inline-flex h-11 min-w-31.25 items-center justify-center gap-2 rounded-lg border border-[#D5E2E1] bg-white px-5 text-xs font-semibold text-[#263C43] transition duration-300 hover:-translate-y-0.5 hover:border-[#399B98] hover:bg-[#F5FBFA]"
              >
                <GraduationCap size={15} className="text-[#399B98]" />
                Join as Tutor
              </Link>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
