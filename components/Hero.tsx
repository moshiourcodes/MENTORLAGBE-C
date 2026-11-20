import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  GraduationCap,
  MapPin,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  UsersRound,
  Zap,
} from "lucide-react"

const stats = [
  {
    icon: UsersRound,
    value: "2,700+",
    label: "Verified Tutors",
  },
  {
    icon: GraduationCap,
    value: "17,000+",
    label: "Active Learners",
  },
  {
    icon: Star,
    value: "98.9%",
    label: "Student Satisfaction",
  },
]

const subjects = ["Math", "Physics", "HSC", "Admission"]

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute top-0 -left-32 h-80 w-80 rounded-full bg-teal-50/70 blur-3xl" />

      <div className="pointer-events-none absolute right-0 -bottom-40 h-112.5 w-137.5 rounded-full bg-teal-50/70 blur-3xl" />

      <div className="relative mx-auto grid min-h-147.5 max-w-360 items-center gap-8 px-6 py-12 sm:px-10 lg:grid-cols-[1.08fr_0.92fr] lg:px-16">
        {/* LEFT CONTENT */}
        <div className="relative z-10 max-w-175">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-4 py-2.5 text-xs font-semibold text-teal-700 sm:text-sm">
            <ShieldCheck size={17} />
            Bangladesh&apos;s Trusted Tutor Marketplace
          </div>

          {/* Heading */}
          <h1 className="text-[40px] leading-[1.12] font-extrabold tracking-[-1.8px] text-slate-900 sm:text-5xl lg:text-[54px]">
            Find the Perfect Tutor for
            <span className="relative mt-1 block w-fit text-teal-600">
              Your Learning Goals
              <span className="absolute -bottom-2 left-[34%] h-1 w-[30%] -rotate-2 rounded-full bg-teal-500" />
            </span>
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-152.5 text-base leading-8 text-slate-500 sm:text-lg">
            Learn from verified, experienced tutors in Mathematics, Physics,
            Programming, IELTS and many more — online or in person, anywhere in
            Bangladesh.
          </p>

          {/* Search Form */}
          <form
            action="/find-tutors"
            method="GET"
            className="mt-8 flex max-w-155 items-center gap-2 rounded-[20px] border border-slate-200 bg-white p-2 shadow-[0_10px_35px_rgba(15,23,42,0.08)] transition-all focus-within:border-teal-400"
          >
            <Search size={23} className="ml-2 shrink-0 text-teal-600" />

            <input
              type="text"
              name="q"
              placeholder="Search tutors, subjects, or locations..."
              aria-label="Search tutors, subjects, or locations"
              className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 sm:text-base"
            />

            <button
              type="submit"
              className="flex shrink-0 items-center gap-2 rounded-xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-teal-700 sm:px-7"
            >
              Find Tutors
              <ArrowRight size={19} />
            </button>
          </form>

          {/* Statistics */}
          <div className="mt-12 grid max-w-162.5 grid-cols-3 divide-x divide-slate-200">
            {stats.map((stat) => {
              const Icon = stat.icon

              return (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 px-2 first:pl-0 sm:gap-4 sm:px-5"
                >
                  <Icon
                    size={28}
                    strokeWidth={2.2}
                    className="shrink-0 text-teal-600 sm:size-8"
                  />

                  <div>
                    <h3 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                      {stat.value}
                    </h3>

                    <p className="mt-1 text-[10px] text-slate-500 sm:text-sm">
                      {stat.label}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* RIGHT VISUAL SECTION */}
        <div className="relative mx-auto flex h-112.5 w-full max-w-137.5 items-center justify-center lg:h-120">
          {/* Main Mint Background */}
          <div className="absolute top-1/2 left-1/2 h-85 w-85 -translate-x-1/2 -translate-y-1/2 -rotate-12 rounded-[42%_58%_60%_40%] bg-linear-to-br from-teal-100 via-teal-50 to-emerald-100 sm:h-97.5 sm:w-97.5" />

          {/* Orbit */}
          <div className="absolute top-1/2 left-1/2 h-72.5 w-110 -translate-x-1/2 -translate-y-1/2 rotate-[-25deg] rounded-[50%] border-2 border-teal-200/80 sm:h-80" />

          {/* Decorative Sparkles */}
          <div className="absolute top-[15%] left-[12%] rotate-[-20deg] text-teal-600">
            <Sparkles size={30} />
          </div>

          {/* Dot Decoration */}
          <div className="absolute right-[5%] bottom-[5%] grid grid-cols-5 gap-2">
            {Array.from({ length: 15 }).map((_, i) => (
              <span key={i} className="h-2 w-2 rounded-full bg-teal-500/50" />
            ))}
          </div>

          {/* Verified Tutors Badge */}
          <div className="absolute top-[3%] right-[2%] z-20 flex items-center gap-3 rounded-2xl border border-white bg-white px-4 py-3 shadow-lg sm:px-5">
            <Zap size={20} className="fill-amber-400 text-amber-400" />

            <span className="text-sm font-semibold text-slate-800">
              Verified Tutors
            </span>
          </div>

          {/* Tutor Profile Card - Smaller */}
          <div className="relative z-10 w-[min(100%,350px)] rounded-[26px] border border-white bg-white/95 p-5 shadow-[0_25px_65px_rgba(15,118,110,0.14)] backdrop-blur-md sm:p-6">
            {/* Tutor Profile */}
            <div className="flex items-center gap-4">
              {/* New Tutor Image */}
              <div className="h-[82px] w-[82px] shrink-0 overflow-hidden rounded-[18px] bg-teal-100">
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=faces"
                  alt="Tutor profile"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5">
                  <h3 className="text-base font-bold text-slate-900">
                    Rafiul Hasan
                  </h3>

                  <BadgeCheck size={18} className="fill-teal-600 text-white" />
                </div>

                <p className="mt-1 text-sm text-slate-500">Top Rated Tutor</p>

                {/* Rating */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-50">
                    <Star size={17} className="fill-amber-400 text-amber-400" />
                  </span>

                  <span className="text-sm font-bold text-slate-800">5.0</span>

                  <span className="text-xs text-slate-500">(420+ reviews)</span>
                </div>
              </div>
            </div>

            {/* Subjects */}
            <div className="mt-5 flex flex-wrap gap-2">
              {subjects.map((subject) => (
                <span
                  key={subject}
                  className="rounded-full bg-teal-50 px-3 py-1.5 text-xs font-medium text-teal-900"
                >
                  {subject}
                </span>
              ))}
            </div>

            <div className="my-4 h-px bg-slate-100" />

            {/* Tutor Details */}
            <div className="grid grid-cols-3 divide-x divide-slate-100">
              <div className="flex flex-col items-center gap-1 px-1">
                <div className="flex items-center gap-1">
                  <CalendarDays size={15} className="text-slate-600" />

                  <span className="text-[11px] font-semibold text-slate-800">
                    6+ Years
                  </span>
                </div>

                <span className="text-[10px] text-slate-400">Teaching</span>
              </div>

              <div className="flex flex-col items-center gap-1 px-1">
                <div className="flex items-center gap-1">
                  <UsersRound size={15} className="text-slate-600" />

                  <span className="text-[11px] font-semibold text-slate-800">
                    1,200+
                  </span>
                </div>

                <span className="text-[10px] text-slate-400">Students</span>
              </div>

              <div className="flex flex-col items-center gap-1 px-1">
                <div className="flex items-center gap-1">
                  <MapPin size={15} className="text-slate-600" />

                  <span className="text-[11px] font-semibold text-slate-800">
                    Online &
                  </span>
                </div>

                <span className="text-[10px] text-slate-400">In-person</span>
              </div>
            </div>

            {/* Book a Session button removed */}
          </div>

          {/* Flexible Learning Badge */}
          <div className="absolute top-[43%] left-[-1%] z-20 flex items-center gap-3 rounded-2xl border border-white bg-white px-3 py-2.5 shadow-lg">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white">
              <Play size={16} fill="currentColor" />
            </span>

            <span className="text-xs leading-4 font-semibold text-slate-800">
              Flexible
              <br />
              Learning
            </span>
          </div>

          {/* Group Sessions Badge */}
          <div className="absolute right-[-1%] bottom-[5%] z-20 flex items-center gap-3 rounded-2xl border border-white bg-white px-3 py-2.5 shadow-lg">
            <UsersRound size={22} className="fill-teal-600 text-teal-600" />

            <span className="text-xs leading-4 font-semibold text-slate-800">
              1:1 & Group
              <br />
              Sessions
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
