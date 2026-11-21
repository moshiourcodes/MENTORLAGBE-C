import { Users, Search, Zap, Award } from "lucide-react"

const steps = [
  {
    number: "Step 01",
    title: "Create Your Account",
    description:
      "Sign up as a Student to find mentors or as a Tutor to offer your academic expertise.",
    icon: Users,
  },
  {
    number: "Step 02",
    title: "Browse & Discover",
    description:
      "Explore verified tuitions filtered by subject, class level, location, and learning mode.",
    icon: Search,
  },
  {
    number: "Step 03",
    title: "Apply & Connect",
    description:
      "Submit applications with your preferred schedule and communicate directly with tutors.",
    icon: Zap,
  },
  {
    number: "Step 04",
    title: "Start Learning",
    description:
      "Begin your personalized tuition sessions and achieve your academic goals with confidence.",
    icon: Award,
  },
]

export default function HowItWorks() {
  return (
    <section className="w-full bg-[#F8FAFA] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 dark:bg-[#0B1220]">
      <div className="mx-auto max-w-6xl">
        {/* Section Heading */}
        <div className="mb-8 text-center">
          <span className="inline-flex items-center rounded-full bg-[#E8F5F3] px-3 py-1 text-[10px] font-semibold tracking-wide text-[#399B98] uppercase dark:bg-[#399B98]/15 dark:text-[#5FD3C9]">
            HOW IT WORKS
          </span>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#17202D] sm:text-3xl dark:text-foreground">
            Start Learning in 4 Easy Steps
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#858B94] dark:text-slate-400">
            From profile setup to your first live session, we make connecting
            with verified mentors seamless.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon

            return (
              <div
                key={step.number}
                className="group min-h-37.5 rounded-xl border border-[#E9EEEE] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.025)] transition duration-300 hover:-translate-y-1 hover:border-[#B8DCD8] hover:shadow-[0_8px_24px_rgba(57,155,152,0.08)] dark:border-[#1E2C42] dark:bg-[#111C2E] dark:hover:border-[#399B98]/30"
              >
                {/* Top Row */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-[#EAF5F3] px-2.5 py-1 text-[10px] font-semibold tracking-wide text-[#568D89] dark:bg-[#399B98]/15 dark:text-[#8BB9B5]">
                    {step.number}
                  </span>

                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EDF8F6] text-[#399B98] transition group-hover:bg-[#399B98] group-hover:text-white dark:bg-[#399B98]/15 dark:text-[#5FD3C9]">
                    <Icon size={17} strokeWidth={2} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-sm font-semibold text-[#17202D] dark:text-foreground">
                  {step.title}
                </h3>

                <p className="mt-2 text-xs leading-[1.7] text-[#858B94] dark:text-slate-400">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
