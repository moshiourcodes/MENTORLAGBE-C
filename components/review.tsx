
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Tanvir Ahmed",
    role: "HSC Student",
    location: "Dhaka, Bangladesh",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces",
    review:
      "MentorLagbe made finding the right Mathematics tutor so much easier. I connected with a mentor who understood my learning needs and helped me prepare with confidence.",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    role: "IELTS Student",
    location: "Chattogram, Bangladesh",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces",
    review:
      "I was looking for an experienced IELTS mentor. The platform helped me discover tutors, compare their profiles, and find someone who matched my learning goals.",
  },
  {
    id: 3,
    name: "Rakib Hasan",
    role: "University Student",
    location: "Sylhet, Bangladesh",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=faces",
    review:
      "As a student, finding a suitable tutor used to take a lot of time. MentorLagbe makes discovering tutors and connecting with them much more convenient.",
  },
];

export default function Review() {
  return (
    <section className="w-full bg-[#F8FBFB] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Section Heading */}
        <div className="mx-auto mb-9 max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-[#D5EBE8] bg-[#EAF6F5] px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#398985]">
            STUDENT FEEDBACK
          </span>

          <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#17202D] sm:text-3xl">
            Trusted by Students Across Bangladesh
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#7B898F] sm:text-[15px]">
            Discover how MentorLagbe helps students find the right tutors,
            connect with academic mentors, and move closer to their learning goals.
          </p>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="group flex flex-col rounded-xl border border-[#E9EEEE] bg-white p-5 shadow-[0_3px_15px_rgba(23,32,45,0.025)] transition-all duration-300 hover:-translate-y-1 hover:border-[#B9DEDA] hover:shadow-[0_10px_25px_rgba(57,155,152,0.08)]"
            >
              {/* Star Rating */}
              <div className="mb-4 flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={14}
                    className="fill-[#E9B949] text-[#E9B949]"
                  />
                ))}
              </div>

              {/* Review Text */}
              <div className="relative flex-1">
                <Quote
                  size={25}
                  className="absolute -top-1 right-0 text-[#399B98]/10"
                />

                <p className="relative text-[12px] italic leading-[1.8] text-[#68777D]">
                  &quot;{review.review}&quot;
                </p>
              </div>

              {/* Divider */}
              <div className="my-4 h-px w-full bg-[#EDF1F1]" />

              {/* Reviewer Information */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[#D5EBE8] bg-[#EAF6F5]">
                  <img
                    src={review.image}
                    alt={review.name}
                    width={40}
                    height={40}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-[11px] font-bold text-[#17202D]">
                    {review.name}
                  </h3>

                  <p className="mt-0.5 text-[10px] text-[#89969B]">
                    {review.role} · {review.location}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
