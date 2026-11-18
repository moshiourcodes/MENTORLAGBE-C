import Link from "next/link"

import {
  Calculator,
  Atom,
  Code2,
  Languages,
  FlaskConical,
  BookOpen,
  GraduationCap,
  UsersRound,
  BookMarked,
  TrendingUp,
} from "lucide-react"

const categories = [
  {
    name: "Mathematics",
    description: "Math tutoring",
    icon: Calculator,
  },
  {
    name: "Physics",
    description: "Science tutoring",
    icon: Atom,
  },
  {
    name: "Programming",
    description: "Coding lessons",
    icon: Code2,
  },
  {
    name: "English",
    description: "Language learning",
    icon: Languages,
  },
  {
    name: "Chemistry",
    description: "Chemistry tutoring",
    icon: FlaskConical,
  },
  {
    name: "Biology",
    description: "Biology tutoring",
    icon: BookOpen,
  },
]

const platformStats = [
  {
    value: "500+",
    label: "Active Tutors",
    icon: GraduationCap,
  },
  {
    value: "2,000+",
    label: "Happy Students",
    icon: UsersRound,
  },
  {
    value: "1,000+",
    label: "Approved Tuitions",
    icon: BookMarked,
  },
  {
    value: "98%",
    label: "Success Rate",
    icon: TrendingUp,
  },
]

export default function TopCategories() {
  return (
    <section className="w-full bg-[#F8FBFB] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section Heading */}
        <div className="mb-8">
          <span className="inline-flex items-center rounded-full border border-[#D5EAE7] bg-[#EAF6F5] px-3 py-1 text-[10px] font-semibold tracking-wide text-[#398985] uppercase">
            EXPLORE SUBJECTS
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#17202D] sm:text-4xl">
            Popular Subjects
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6B7C83] sm:text-base">
            Explore popular academic subjects and connect with experienced
            tutors who can guide you toward your goals.
          </p>
        </div>

        {/* Subject Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {categories.map((category) => {
            const Icon = category.icon

            return (
              <Link
                key={category.name}
                href={`/tuitions?subject=${encodeURIComponent(category.name)}`}
                className="group flex min-h-29 flex-col items-center justify-center rounded-xl border border-[#E4EEEE] bg-white px-3 py-5 text-center shadow-[0_2px_10px_rgba(23,47,53,0.025)] transition-all duration-300 hover:-translate-y-1 hover:border-[#399B98]/40 hover:shadow-[0_8px_22px_rgba(57,155,152,0.09)]"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF6F5] text-[#399B98] transition-colors duration-300 group-hover:bg-[#399B98] group-hover:text-white">
                  <Icon size={18} strokeWidth={1.8} />
                </div>

                <h3 className="text-xs font-semibold text-[#17202D] transition-colors group-hover:text-[#399B98] sm:text-sm">
                  {category.name}
                </h3>

                <p className="mt-1 text-[10px] text-[#87989A]">
                  {category.description}
                </p>
              </Link>
            )
          })}
        </div>

        {/* Platform Statistics */}
        <div className="mt-14 rounded-2xl border border-[#E5EEEE] bg-white px-5 py-8 shadow-[0_4px_20px_rgba(23,47,53,0.035)] sm:px-8 sm:py-9">
          <div className="grid grid-cols-2 gap-y-9 sm:grid-cols-4 sm:gap-4">
            {platformStats.map((stat) => {
              const Icon = stat.icon

              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF6F5] text-[#399B98]">
                    <Icon size={18} strokeWidth={1.8} />
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-[#17202D] sm:text-2xl">
                    {stat.value}
                  </h3>

                  <p className="mt-1 text-[11px] text-[#87989A] sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
