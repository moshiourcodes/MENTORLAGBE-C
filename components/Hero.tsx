
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Search,
//   ArrowRight,
//   GraduationCap,
//   Sparkles,
//   CheckCircle2,
//   Star,
//   Plus,
// } from "lucide-react";

// const stats = [
//   {
//     value: "2,700+",
//     label: "Verified Tutors",
//   },
//   {
//     value: "17,000+",
//     label: "Active Students",
//   },
//   {
//     value: "98.9%",
//     label: "Satisfaction",
//   },
// ];

// export default function Hero() {
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const query = searchQuery.trim();

//     if (query) {
//       router.push(`/tuitions?q=${encodeURIComponent(query)}`);
//     } else {
//       router.push("/tuitions");
//     }
//   };

//   return (
//     <section className="relative w-full overflow-hidden bg-white">
//       <div className="relative mx-auto grid min-h-120 max-w-360 grid-cols-1 items-center gap-12 overflow-hidden px-6 py-16 sm:px-10 lg:grid-cols-2 lg:px-16 lg:py-20">

//         {/* Background Decorations */}
//         <div className="pointer-events-none absolute -left-40 top-0 h-112.5 w-112.5 rounded-full bg-[#E9F7F6]/60 blur-[100px]" />

//         <div className="pointer-events-none absolute right-0 top-0 h-100 w-125 rounded-full bg-[#E9F6F5]/70 blur-[100px]" />

//         {/* LEFT CONTENT */}
//         <div className="relative z-10 max-w-155">

//           {/* Top Badge */}
//           <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D5EAE8] bg-[#EAF7F6] px-3 py-1.5">
//             <Sparkles size={12} className="text-[#3D9996]" />

//             <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#438D8B]">
//               Bangladesh&apos;s Premier Tuition Marketplace
//             </span>
//           </div>

//           {/* Main Heading */}
//           <h1 className="text-[38px] font-extrabold leading-[1.12] tracking-[-1.5px] text-[#111827] sm:text-[48px] lg:text-[52px]">
//             Find The Rifght Tutor For{" "}
//             <span className="text-[#399B98]">
//               Your Learning Journey
//             </span>{" "}
//             Today
//           </h1>

//           {/* Description */}
//           <p className="mt-5 max-w-135 text-[14px] leading-7 text-[#7A8492] sm:text-[15px]">
//             Connect with verified tutors for personalized learning
//             in Mathematics, Physics, Programming, IELTS & more
//             across Bangladesh.
//           </p>

//           {/* Search Bar */}
//           <form
//             onSubmit={handleSearch}
//             className="mt-7 flex h-12 w-full max-w-110 items-center rounded-xl border border-[#E5E9EA] bg-white p-1 shadow-[0_3px_10px_rgba(0,0,0,0.07)] transition-all focus-within:border-[#399B98] focus-within:ring-2 focus-within:ring-[#399B98]/10"
//           >
//             <Search
//               size={17}
//               className="ml-3 shrink-0 text-[#55A5A1]"
//             />

//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search by subject, class level, or keyword..."
//               className="h-full min-w-0 flex-1 bg-transparent px-3 text-[12px] text-[#263238] outline-none placeholder:text-[#A0A8B0] sm:text-[13px]"
//               aria-label="Search by subject, class level, or keyword"
//             />

//             <button
//               type="submit"
//               className="flex h-10 shrink-0 items-center gap-2 rounded-[9px] bg-[#399B98] px-4 text-[12px] font-semibold text-white transition-all hover:bg-[#287F7C] sm:px-5"
//             >
//               Search Tuitions
//               <ArrowRight size={14} />
//             </button>
//           </form>

//           {/* Statistics */}
//           <div className="mt-8 grid max-w-110 grid-cols-3 border-t border-[#EDF0F0] pt-5">

//             {stats.map((stat) => (
//               <div key={stat.label}>
//                 <h3 className="text-[21px] font-extrabold tracking-tight text-[#17202D] sm:text-[23px]">
//                   {stat.value}
//                 </h3>

//                 <p className="mt-1 text-[10px] font-medium text-[#89929D] sm:text-[11px]">
//                   {stat.label}
//                 </p>
//               </div>
//             ))}

//           </div>
//         </div>

//         {/* RIGHT ILLUSTRATION */}
//         <div className="relative mx-auto flex h-87.5 w-full max-w-117.5 items-center justify-center lg:h-100">

//           {/* Background Circle */}
//           <div className="absolute left-1/2 top-1/2 h-72.5 w-72.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#DDECEB] bg-linear-to-br from-[#F0FAF9] to-[#E5F4F2] sm:h-82.5 sm:w-82.5" />

//           {/* Decorative Plus */}
//           <div className="absolute right-[14%] top-[27%] z-20 flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF9C9] shadow-sm">
//             <Plus size={17} className="text-[#263238]" />
//           </div>

//           {/* Small Decorative Dot */}
//           <div className="absolute left-[12%] bottom-[20%] h-3 w-3 rounded-full bg-[#B6E4DF]" />

//           {/* Tutor Profile Card */}
//           <div className="relative z-10 w-68.75 rounded-[22px] border border-[#EDF0F0] bg-white p-5 shadow-[0_20px_50px_rgba(36,83,82,0.13)] sm:w-73.75">

//             {/* Tutor Header */}
//             <div className="flex items-center gap-3">

//               {/* Icon */}
//               <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#399B98] shadow-sm">
//                 <GraduationCap
//                   size={25}
//                   className="text-white"
//                 />
//               </div>

//               {/* Tutor Details */}
//               <div className="min-w-0">
//                 <h3 className="text-[13px] font-bold text-[#263238]">
//                   Top Rated Mentor
//                 </h3>

//                 <p className="mt-0.5 text-[10px] font-medium text-[#5A9F9B]">
//                   Verified BUET Graduate
//                 </p>
//               </div>
//             </div>

//             {/* Divider */}
//             <div className="my-4 h-px bg-[#F0F2F2]" />

//             {/* Tutor Information */}
//             <div className="space-y-3">

//               <div className="flex items-center justify-between gap-2">
//                 <span className="text-[11px] text-[#9099A1]">
//                   Subjects
//                 </span>

//                 <span className="text-[11px] font-semibold text-[#35404A]">
//                   Math & Physics
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-2">
//                 <span className="text-[11px] text-[#9099A1]">
//                   Class Level
//                 </span>

//                 <span className="text-[11px] font-semibold text-[#35404A]">
//                   HSC / A-Level
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-2">
//                 <span className="text-[11px] text-[#9099A1]">
//                   Batch Rate
//                 </span>

//                 <span className="text-[11px] font-bold text-[#399B98]">
//                   $120 / month
//                 </span>
//               </div>
//             </div>

//             {/* Rating and Approval */}
//             <div className="mt-5 flex items-center justify-between">

//               <div className="flex items-center gap-1">
//                 <div className="flex items-center text-[#F4BD45]">
//                   {Array.from({ length: 5 }).map((_, index) => (
//                     <Star
//                       key={index}
//                       size={13}
//                       fill="currentColor"
//                       strokeWidth={1}
//                     />
//                   ))}
//                 </div>

//                 <span className="text-[10px] font-semibold text-[#59616A]">
//                   5.0
//                 </span>
//               </div>

//               <div className="flex items-center gap-1 rounded-full bg-[#EAF7F3] px-2.5 py-1">
//                 <CheckCircle2
//                   size={10}
//                   className="text-[#469D86]"
//                 />

//                 <span className="text-[9px] font-semibold text-[#469D86]">
//                   Approved
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Floating Notification */}
//           <div className="absolute bottom-[2%] left-[7%] z-20 flex items-center gap-2 rounded-full border border-[#F0F0F0] bg-white px-5 py-3 shadow-[0_8px_25px_rgba(0,0,0,0.08)]">
//             <span className="relative flex h-2 w-2">
//               <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#55B8A5] opacity-50" />
//               <span className="relative inline-flex h-2 w-2 rounded-full bg-[#399B98]" />
//             </span>

//             <span className="text-[10px] font-semibold text-[#46515A]">
//               New requests live
//             </span>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }











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
} from "lucide-react";

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
];

const subjects = ["Math", "Physics", "HSC", "Admission"];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-teal-50/70 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 right-0 h-112.5 w-137.5 rounded-full bg-teal-50/70 blur-3xl" />

      <div className="relative mx-auto grid min-h-147.5 max-w-360 items-center gap-8 px-6 py-12 sm:px-10 lg:grid-cols-[1.08fr_0.92fr] lg:px-16">

        {/* LEFT CONTENT */}
        <div className="relative z-10 max-w-175">

          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-4 py-2.5 text-xs font-semibold text-teal-700 sm:text-sm">
            <ShieldCheck size={17} />
            Bangladesh&apos;s Trusted Tutor Marketplace
          </div>

          {/* Heading */}
          <h1 className="text-[40px] font-extrabold leading-[1.12] tracking-[-1.8px] text-slate-900 sm:text-5xl lg:text-[54px]">
            Find the Perfect Tutor for

            <span className="relative mt-1 block w-fit text-teal-600">
              Your Learning Goals

              <span className="absolute -bottom-2 left-[34%] h-1 w-[30%] -rotate-2 rounded-full bg-teal-500" />
            </span>
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-152.5 text-base leading-8 text-slate-500 sm:text-lg">
            Learn from verified, experienced tutors in Mathematics,
            Physics, Programming, IELTS and many more — online or in
            person, anywhere in Bangladesh.
          </p>

          {/* Search Form */}
          <form
            action="/find-tutors"
            method="GET"
            className="mt-8 flex max-w-155 items-center gap-2 rounded-[20px] border border-slate-200 bg-white p-2 shadow-[0_10px_35px_rgba(15,23,42,0.08)] transition-all focus-within:border-teal-400"
          >
            <Search
              size={23}
              className="ml-2 shrink-0 text-teal-600"
            />

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
              const Icon = stat.icon;

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
              );
            })}
          </div>
        </div>

        {/* RIGHT VISUAL SECTION */}
        <div className="relative mx-auto flex h-112.5 w-full max-w-137.5 items-center justify-center lg:h-120">

          {/* Main Mint Background */}
          <div className="absolute left-1/2 top-1/2 h-85 w-85 -translate-x-1/2 -translate-y-1/2 -rotate-12 rounded-[42%_58%_60%_40%] bg-linear-to-br from-teal-100 via-teal-50 to-emerald-100 sm:h-97.5 sm:w-97.5" />

          {/* Orbit */}
          <div className="absolute left-1/2 top-1/2 h-72.5 w-110 -translate-x-1/2 -translate-y-1/2 rotate-[-25deg] rounded-[50%] border-2 border-teal-200/80 sm:h-80" />

          {/* Decorative Sparkles */}
          <div className="absolute left-[12%] top-[15%] rotate-[-20deg] text-teal-600">
            <Sparkles size={30} />
          </div>

          {/* Dot Decoration */}
          <div className="absolute bottom-[5%] right-[5%] grid grid-cols-5 gap-2">
            {Array.from({ length: 15 }).map((_, i) => (
              <span
                key={i}
                className="h-2 w-2 rounded-full bg-teal-500/50"
              />
            ))}
          </div>

          {/* Verified Tutors Badge */}
          <div className="absolute right-[2%] top-[3%] z-20 flex items-center gap-3 rounded-2xl border border-white bg-white px-4 py-3 shadow-lg sm:px-5">
            <Zap
              size={20}
              className="fill-amber-400 text-amber-400"
            />

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

                  <BadgeCheck
                    size={18}
                    className="fill-teal-600 text-white"
                  />
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Top Rated Tutor
                </p>

                {/* Rating */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-50">
                    <Star
                      size={17}
                      className="fill-amber-400 text-amber-400"
                    />
                  </span>

                  <span className="text-sm font-bold text-slate-800">
                    5.0
                  </span>

                  <span className="text-xs text-slate-500">
                    (420+ reviews)
                  </span>
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

                <span className="text-[10px] text-slate-400">
                  Teaching
                </span>
              </div>

              <div className="flex flex-col items-center gap-1 px-1">
                <div className="flex items-center gap-1">
                  <UsersRound size={15} className="text-slate-600" />

                  <span className="text-[11px] font-semibold text-slate-800">
                    1,200+
                  </span>
                </div>

                <span className="text-[10px] text-slate-400">
                  Students
                </span>
              </div>

              <div className="flex flex-col items-center gap-1 px-1">
                <div className="flex items-center gap-1">
                  <MapPin size={15} className="text-slate-600" />

                  <span className="text-[11px] font-semibold text-slate-800">
                    Online &
                  </span>
                </div>

                <span className="text-[10px] text-slate-400">
                  In-person
                </span>
              </div>
            </div>

            {/* Book a Session button removed */}
          </div>

          {/* Flexible Learning Badge */}
          <div className="absolute left-[-1%] top-[43%] z-20 flex items-center gap-3 rounded-2xl border border-white bg-white px-3 py-2.5 shadow-lg">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white">
              <Play size={16} fill="currentColor" />
            </span>

            <span className="text-xs font-semibold leading-4 text-slate-800">
              Flexible
              <br />
              Learning
            </span>
          </div>

          {/* Group Sessions Badge */}
          <div className="absolute bottom-[5%] right-[-1%] z-20 flex items-center gap-3 rounded-2xl border border-white bg-white px-3 py-2.5 shadow-lg">
            <UsersRound
              size={22}
              className="fill-teal-600 text-teal-600"
            />

            <span className="text-xs font-semibold leading-4 text-slate-800">
              1:1 & Group
              <br />
              Sessions
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
