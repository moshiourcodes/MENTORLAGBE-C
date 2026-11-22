
// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   Bookmark,
//   CalendarDays,
//   Globe,
//   MapPin,
//   UserRound,
//   ArrowRight,
// } from "lucide-react";

// interface Tuition {
//   _id: string;
//   title: string;
//   subject: string;
//   classLevel: string;
//   mode: "online" | "offline";
//   location?: string;
//   bannerImage: string;
//   tutorName: string;
//   monthlyFee: number;
//   daysPerWeek: number;
// }

// interface TuitionCardProps {
//   tuition: Tuition;
// }

// export default function TuitionCard({ tuition }: TuitionCardProps) {
//   const [isBookmarked, setIsBookmarked] = useState(false);

//   const isOnline = tuition.mode === "online";

//   return (
//     <article className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-card">

//       {/* Tuition Image */}
//       <div className="relative h-56.5 w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">

//         {tuition.bannerImage ? (
//           <Image
//             src={tuition.bannerImage}
//             alt={tuition.title}
//             fill
//             sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//             className="object-cover transition-transform duration-500 group-hover:scale-105"
//           />
//         ) : (
//           <div className="flex h-full items-center justify-center text-sm text-slate-400">
//             No Image Available
//           </div>
//         )}

//         {/* Online / Offline Badge */}
//         <div
//           className={`absolute left-3 top-3 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white ${
//             isOnline ? "bg-[#36B9AD]" : "bg-[#263344]"
//           }`}
//         >
//           {isOnline ? (
//             <Globe size={13} />
//           ) : (
//             <MapPin size={13} className="text-yellow-400" />
//           )}

//           {isOnline ? "Online" : tuition.location || "Offline"}
//         </div>

//         {/* Bookmark Button */}
//         <button
//           type="button"
//           onClick={() => setIsBookmarked(!isBookmarked)}
//           aria-label={isBookmarked ? "Remove bookmark" : "Bookmark tuition"}
//           aria-pressed={isBookmarked}
//           className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 dark:bg-[#111C2E] dark:text-slate-200 dark:hover:bg-slate-800"
//         >
//           <Bookmark
//             size={18}
//             className={
//               isBookmarked
//                 ? "fill-[#399B98] text-[#399B98] dark:text-[#5FD3C9]"
//                 : ""
//             }
//           />
//         </button>
//       </div>

//       {/* Card Information */}
//       <div className="pt-4">

//         {/* Subject and Class */}
//         <div className="mb-3 flex items-center justify-between gap-2">
//           <span className="max-w-[65%] truncate rounded-md border border-[#C8EBE7] bg-[#EDF8F6] px-2.5 py-1 text-xs font-medium text-[#16877F] dark:border-[#399B98]/30 dark:bg-[#399B98]/15 dark:text-[#5FD3C9]">
//             {tuition.subject}
//           </span>

//           <span className="shrink-0 text-xs text-slate-500 dark:text-slate-400">
//             Class {tuition.classLevel}
//           </span>
//         </div>

//         {/* Tuition Title */}
//         <h3
//           title={tuition.title}
//           className="truncate text-lg font-bold tracking-tight text-[#17202D] dark:text-foreground"
//         >
//           {tuition.title}
//         </h3>

//         {/* Tutor Information */}
//         <div className="mt-3 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">

//           <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
//             <UserRound size={14} />
//           </span>

//           <span className="max-w-30 truncate">
//             {tuition.tutorName}
//           </span>

//           <span className="text-slate-300">•</span>

//           <CalendarDays
//             size={14}
//             className="shrink-0 text-[#399B98] dark:text-[#5FD3C9]"
//           />

//           <span className="whitespace-nowrap">
//             {tuition.daysPerWeek}d/week
//           </span>
//         </div>

//         {/* Divider */}
//         <div className="my-4 border-t border-slate-100 dark:border-slate-800" />

//         {/* Fee and Details */}
//         <div className="flex items-center justify-between gap-3">

//           <div>
//             <p className="text-xs text-slate-500 dark:text-slate-400">
//               Monthly Fee
//             </p>

//             <p className="text-xl font-bold tracking-tight text-[#17202D] dark:text-foreground">
//               ৳ {tuition.monthlyFee.toLocaleString("en-BD")}
//               <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
//                 /mo
//               </span>
//             </p>
//           </div>

//           <Link
//             href={`/tuition/${tuition._id}`}
//             className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#111827] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#287F7C]"
//           >
//             View Details
//             <ArrowRight size={15} />
//           </Link>
//         </div>
//       </div>
//     </article>
//   );
// }











"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bookmark,
  CalendarDays,
  Globe,
  MapPin,
  UserRound,
  ArrowRight,
} from "lucide-react";

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
}

interface TuitionCardProps {
  tuition: Tuition;
}

export default function TutionCard({
  tuition,
}: TuitionCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isOnline = tuition.mode === "online";

  // Must match app/tuitions/[id]/page.tsx
  const detailsUrl = `/tuitions/${encodeURIComponent(tuition._id)}`;

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-card">

      {/* Tuition Image */}
      <div className="relative h-56.5 w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">

        {tuition.bannerImage && !imageError ? (
          <img
            src={tuition.bannerImage}
            alt={tuition.title}
            loading="lazy"
            onError={() => setImageError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            No Image Available
          </div>
        )}

        {/* Online / Offline Badge */}
        <div
          className={`absolute left-3 top-3 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white ${
            isOnline ? "bg-[#36B9AD]" : "bg-[#263344]"
          }`}
        >
          {isOnline ? (
            <Globe size={13} />
          ) : (
            <MapPin size={13} className="text-yellow-400" />
          )}

          {isOnline ? "Online" : tuition.location || "Offline"}
        </div>

        {/* Bookmark Button */}
        <button
          type="button"
          onClick={() => setIsBookmarked((previous) => !previous)}
          aria-label={
            isBookmarked ? "Remove bookmark" : "Bookmark tuition"
          }
          aria-pressed={isBookmarked}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 dark:bg-[#111C2E] dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <Bookmark
            size={18}
            className={
              isBookmarked
                ? "fill-[#399B98] text-[#399B98] dark:text-[#5FD3C9]"
                : ""
            }
          />
        </button>
      </div>

      {/* Card Information */}
      <div className="pt-4">

        {/* Subject and Class */}
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="max-w-[65%] truncate rounded-md border border-[#C8EBE7] bg-[#EDF8F6] px-2.5 py-1 text-xs font-medium text-[#16877F] dark:border-[#399B98]/30 dark:bg-[#399B98]/15 dark:text-[#5FD3C9]">
            {tuition.subject}
          </span>

          <span className="shrink-0 text-xs text-slate-500 dark:text-slate-400">
            Class {tuition.classLevel}
          </span>
        </div>

        {/* Tuition Title */}
        <h3
          title={tuition.title}
          className="truncate text-lg font-bold tracking-tight text-[#17202D] dark:text-foreground"
        >
          {tuition.title}
        </h3>

        {/* Tutor Information */}
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">

          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
            <UserRound size={14} />
          </span>

          <span className="max-w-30 truncate">
            {tuition.tutorName}
          </span>

          <span className="text-slate-300">•</span>

          <CalendarDays
            size={14}
            className="shrink-0 text-[#399B98] dark:text-[#5FD3C9]"
          />

          <span className="whitespace-nowrap">
            {tuition.daysPerWeek}d/week
          </span>
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-slate-100 dark:border-slate-800" />

        {/* Fee and Details */}
        <div className="flex items-center justify-between gap-3">

          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Monthly Fee
            </p>

            <p className="text-xl font-bold tracking-tight text-[#17202D] dark:text-foreground">
              ৳ {Number(tuition.monthlyFee || 0).toLocaleString("en-BD")}

              <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                /mo
              </span>
            </p>
          </div>

          {/* View Details */}
          <Link
            href={detailsUrl}
            aria-label={`View details for ${tuition.title}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#111827] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#287F7C] dark:bg-[#0B1220]"
          >
            View Details
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}
