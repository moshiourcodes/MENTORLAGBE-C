
import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

import {
  ShieldCheck,
  Target,
  Sparkles,
  UsersRound,
  Search,
  
  Award,
  ArrowRight,
  ChevronDown,

  CalendarCheck,
  
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | MentorLagbe",
  description:
    "Discover MentorLagbe's mission to connect students with trusted tutors and exceptional mentors across Bangladesh.",
};

const principles = [
  {
    icon: ShieldCheck,
    title: "Academic Integrity",
    description:
      "We aim to create a trustworthy learning environment through educator verification, transparent information, and responsible educational practices.",
  },
  {
    icon: Target,
    title: "Equal Opportunity",
    description:
      "We make it easier for students from different locations and educational backgrounds to discover learning opportunities that match their needs.",
  },
  {
    icon: Sparkles,
    title: "Empowering Mentors",
    description:
      "We help passionate educators share their knowledge, connect with students, and build meaningful teaching opportunities.",
  },
];

const workflow = [
  {
    number: "01",
    icon: UsersRound,
    title: "Create Your Account",
    description:
      "Join MentorLagbe as a student looking for academic support or as a tutor ready to share your knowledge.",
  },
  {
    number: "02",
    icon: Search,
    title: "Browse & Discover",
    description:
      "Explore tuition opportunities by subject, class level, location, and learning mode to find a suitable match.",
  },
  {
    number: "03",
    icon: CalendarCheck,
    title: "Apply & Schedule",
    description:
      "Students can apply for suitable tuition opportunities and coordinate learning schedules with tutors.",
  },
  {
    number: "04",
    icon: Award,
    title: "Learn & Review",
    description:
      "Begin your learning journey, track your progress, and share feedback about your educational experience.",
  },
];

const faqs = [
  {
    question: "How does MentorLagbe verify tutors?",
    answer:
      "MentorLagbe aims to provide a trustworthy platform by reviewing tutor information and submitted credentials as part of its verification process.",
  },
  {
    question: "Is MentorLagbe free to use?",
    answer:
      "You can explore available tuition opportunities on the platform. Specific features and subscription benefits may depend on the plan you choose.",
  },
  {
    question: "Can I choose between online and in-person tuitions?",
    answer:
      "Yes. You can explore both online and offline tuition opportunities and select the learning mode that suits your needs.",
  },
  {
    question: "How do student reviews work?",
    answer:
      "Students can share feedback about their learning experience. Reviews help other users understand what to expect from a tuition opportunity.",
  },
  {
    question: "How does the Pro subscription work?",
    answer:
      "MentorLagbe offers subscription plans with different features. Visit the Pricing page to explore the currently available plans and their benefits.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F8FAFC] text-[#111827] dark:bg-background dark:text-foreground">

      {/* ================= HERO SECTION ================= */}
      <section className="px-5 pb-24 pt-24 sm:px-8 sm:pb-28 sm:pt-28 lg:pt-32">
        <div className="mx-auto flex max-w-6xl flex-col items-center text-center">

          <span className="rounded-full border border-[#BDE9E5] bg-[#E8F6F5] px-5 py-2 text-sm font-semibold uppercase tracking-wide text-[#16877F] dark:border-[#287F7C] dark:bg-[#163B3A] dark:text-[#65CFC5]">
            About MentorLagbe
          </span>

          <h1 className="mt-10 max-w-5xl text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl md:text-6xl lg:text-[76px]">
            Connecting Bangladesh’s
            <br className="hidden sm:block" />
            Ambitious Students with
            <span className="block text-[#159B90] dark:text-[#5FD3C9]">
              Exceptional Mentors
            </span>
          </h1>

          <p className="mt-10 max-w-5xl text-lg leading-relaxed text-slate-600 dark:text-slate-400 sm:text-xl md:text-2xl">
            Founded with a simple yet ambitious vision: to make quality,
            verified tuition and mentorship accessible to every student
            across Bangladesh, from primary school to university levels.
          </p>

        </div>
      </section>

      {/* ================= MISSION SECTION ================= */}
      <section className="px-5 py-10 sm:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl rounded-[32px] border border-slate-200 bg-white px-7 py-12 dark:border-slate-800 dark:bg-card sm:px-12 sm:py-16 lg:px-16 lg:py-20">

          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.9fr]">

            {/* Mission Content */}
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-[#159B90] dark:text-[#5FD3C9]">
                Our Educational Mission
              </span>

              <h2 className="mt-7 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[46px]">
                Personalized Mentorship That Transforms Academic Potential
              </h2>

              <p className="mt-7 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                In traditional classrooms, students may struggle to receive
                individual feedback tailored to their learning pace.
                Meanwhile, passionate educators want meaningful ways to
                share their knowledge and experience.
              </p>

              <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                MentorLagbe aims to close that gap. We provide a platform
                where students can discover tutors, explore tuition
                opportunities, and connect with educators through a more
                organized learning experience.
              </p>
            </div>

            {/* Mission Statistics */}
            <div className="grid grid-cols-2 gap-4">

              <div className="flex min-h-38.75 flex-col items-center justify-center rounded-[24px] border border-slate-100 bg-[#F8FAFC] p-5 text-center dark:border-slate-800 dark:bg-slate-900">
                <span className="text-3xl font-bold tracking-tight text-[#159B90] sm:text-4xl dark:text-[#5FD3C9]">
                  1:1
                </span>
                <p className="mt-3 text-sm font-medium text-slate-500 sm:text-base dark:text-slate-400">
                  Personalized Learning
                </p>
              </div>

              <div className="flex min-h-38.75 flex-col items-center justify-center rounded-[24px] border border-slate-100 bg-[#F8FAFC] p-5 text-center dark:border-slate-800 dark:bg-slate-900">
                <span className="text-3xl font-bold tracking-tight sm:text-4xl">
                  2
                </span>
                <p className="mt-3 text-sm font-medium text-slate-500 sm:text-base dark:text-slate-400">
                  Learning Modes
                </p>
              </div>

              <div className="flex min-h-38.75 flex-col items-center justify-center rounded-[24px] border border-slate-100 bg-[#F8FAFC] p-5 text-center dark:border-slate-800 dark:bg-slate-900">
                <span className="text-3xl font-bold tracking-tight sm:text-4xl">
                  64
                </span>
                <p className="mt-3 text-sm font-medium text-slate-500 sm:text-base dark:text-slate-400">
                  Districts in Bangladesh
                </p>
              </div>

              <div className="flex min-h-38.75 flex-col items-center justify-center rounded-[24px] border border-slate-100 bg-[#F8FAFC] p-5 text-center dark:border-slate-800 dark:bg-slate-900">
                <span className="text-3xl font-bold tracking-tight text-[#159B90] sm:text-4xl dark:text-[#5FD3C9]">
                  All
                </span>
                <p className="mt-3 text-sm font-medium text-slate-500 sm:text-base dark:text-slate-400">
                  Learning Levels
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ================= GUIDING PRINCIPLES ================= */}
      <section className="px-5 py-24 sm:px-8 lg:py-28">

        <div className="mx-auto max-w-4xl text-center">

          <span className="rounded-full bg-[#E5F4F2] px-5 py-2 text-sm font-semibold uppercase tracking-wide text-[#16877F] dark:bg-[#163B3A] dark:text-[#65CFC5]">
            What We Stand For
          </span>

          <h2 className="mt-7 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Our Guiding Principles
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-400 sm:text-xl">
            Every feature and policy on MentorLagbe is designed with
            student safety, educational excellence, and educator
            respect at the center.
          </p>

        </div>

        <div className="mx-auto mt-16 grid max-w-7xl gap-7 md:grid-cols-3">

          {principles.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-[26px] border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 dark:border-slate-800 dark:bg-card dark:hover:shadow-black/20 sm:p-10"
              >
                <div className="flex size-17.5 items-center justify-center rounded-[20px] bg-[#EAF7F5] text-[#159B90] dark:bg-[#163B3A] dark:text-[#5FD3C9]">
                  <Icon size={34} strokeWidth={2} />
                </div>

                <h3 className="mt-8 text-2xl font-bold tracking-tight">
                  {item.title}
                </h3>

                <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">
                  {item.description}
                </p>
              </div>
            );
          })}

        </div>
      </section>

      {/* ================= WORKFLOW SECTION ================= */}
      <section className="px-5 py-24 sm:px-8 lg:py-28">

        <div className="mx-auto max-w-4xl text-center">

          <span className="rounded-full bg-[#E5F4F2] px-5 py-2 text-sm font-semibold uppercase tracking-wide text-[#16877F] dark:bg-[#163B3A] dark:text-[#65CFC5]">
            Workflow
          </span>

          <h2 className="mt-7 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            How MentorLagbe Works
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-400 sm:text-xl">
            A clear, structured path from your initial search to
            your first completed tuition journey.
          </p>

        </div>

        <div className="mx-auto mt-16 grid max-w-7xl gap-6 sm:grid-cols-2 xl:grid-cols-4">

          {workflow.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.number}
                className="rounded-[26px] border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 dark:border-slate-800 dark:bg-card dark:hover:shadow-black/20"
              >

                <div className="flex items-center justify-between">

                  <span className="rounded-full border border-[#BDE9E5] bg-[#EFF9F8] px-4 py-2 font-mono text-sm font-bold text-[#16877F] dark:border-[#287F7C] dark:bg-[#163B3A] dark:text-[#65CFC5]">
                    {item.number}
                  </span>

                  <div className="flex size-14 items-center justify-center rounded-[18px] bg-[#EAF7F5] text-[#159B90] dark:bg-[#163B3A] dark:text-[#5FD3C9]">
                    <Icon size={25} />
                  </div>

                </div>

                <h3 className="mt-8 text-xl font-bold tracking-tight">
                  {item.title}
                </h3>

                <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
                  {item.description}
                </p>

              </div>
            );
          })}

        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="px-5 py-24 sm:px-8 lg:py-28">

        <div className="mx-auto max-w-4xl text-center">

          <span className="rounded-full bg-[#E5F4F2] px-5 py-2 text-sm font-semibold uppercase tracking-wide text-[#16877F] dark:bg-[#163B3A] dark:text-[#65CFC5]">
            Got Questions?
          </span>

          <h2 className="mt-7 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-400 sm:text-xl">
            Find answers to common questions about finding tutors,
            posting tuitions, and managing your learning journey.
          </p>

        </div>

        <div className="mx-auto mt-14 max-w-5xl space-y-5">

          {faqs.map((faq, ) => (
            <details
              key={faq.question}
              className="group rounded-[24px] border border-slate-200 bg-white px-7 py-6 transition hover:border-[#B9E6E1] open:border-[#B9E6E1] dark:border-slate-800 dark:bg-card dark:hover:border-[#287F7C] dark:open:border-[#399B98]/30"
            >

              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-lg font-bold tracking-tight [&::-webkit-details-marker]:hidden">
                <span className="transition-colors group-open:text-[#159B90] dark:group-open:text-[#5FD3C9]">
                  {faq.question}
                </span>

                <ChevronDown
                  size={22}
                  className="shrink-0 text-slate-400 transition-transform duration-300 group-open:rotate-180 group-open:text-[#159B90] dark:group-open:text-[#5FD3C9]"
                />
              </summary>

              <p className="mt-5 max-w-4xl border-t border-slate-100 pt-5 text-base leading-8 text-slate-600 dark:border-slate-800 dark:text-slate-400">
                {faq.answer}
              </p>

            </details>
          ))}

        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="px-5 pb-24 pt-10 sm:px-8 lg:pb-28">

        <div className="mx-auto max-w-7xl rounded-[32px] border border-[#B5E5DF] bg-[#E6F5F3] px-6 py-16 text-center dark:border-[#287F7C] dark:bg-[#163B3A] sm:px-12 sm:py-20 lg:py-24">

          <h2 className="text-3xl font-extrabold tracking-tight text-[#111827] dark:text-white sm:text-4xl lg:text-5xl">
            Your Learning Journey Starts Here
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-300 sm:text-xl">
            Whether you want to improve your academic performance
            or share your knowledge with learners across Bangladesh,
            MentorLagbe is ready to help you take the next step.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

            <Link
              href="/sign-up"
              className="inline-flex min-h-16 items-center justify-center gap-3 rounded-[18px] bg-[#10998D] px-9 text-base font-bold text-white shadow-lg shadow-[#10998D]/20 transition hover:-translate-y-1 hover:bg-[#0C8279]"
            >
              Get Started Free
              <ArrowRight size={20} />
            </Link>

            <Link
              href="/tuition"
              className="inline-flex min-h-16 items-center justify-center rounded-[18px] border border-slate-300 bg-white px-9 text-base font-bold text-[#17202D] transition hover:-translate-y-1 hover:border-[#159B90] hover:text-[#159B90] dark:border-slate-700 dark:bg-card dark:text-foreground dark:hover:text-[#5FD3C9]"
            >
              Browse Tuitions
            </Link>

          </div>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <Footer />

    </main>
  );
}
