import { Star, Quote } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import type { Testimonial } from "@/lib/types";

export default function TestimonialsSection({
  categoryName,
  testimonials,
}: {
  categoryName: string;
  testimonials: Testimonial[];
}) {
  if (!testimonials?.length) return null;

  return (
    <section className="bg-ink py-14">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-display text-center text-2xl font-bold text-white md:text-3xl">
          {categoryName} নিয়ে ক্রেতারা যা বলছেন
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <TiltCard
              key={i}
              strength={5}
              className="rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/10 backdrop-blur-sm"
            >
              <Quote size={22} className="text-signal" style={{ transform: "translateZ(20px)" }} />
              <p
                className="mt-3 text-sm leading-relaxed text-text-inverse/90"
                style={{ transform: "translateZ(16px)" }}
              >
                {t.quote}
              </p>
              <div
                className="mt-4 flex items-center justify-between"
                style={{ transform: "translateZ(16px)" }}
              >
                <span className="text-sm font-semibold text-white">{t.name}</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={14}
                      className={idx < t.rating ? "fill-signal text-signal" : "text-white/20"}
                    />
                  ))}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
