import { Star } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import type { Testimonial } from "@/lib/types";

export default function PromoTestimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials?.length) return null;
  return (
    <section className="bg-ink py-12">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-center text-2xl font-bold text-white">যারা কিনেছেন তাদের অভিজ্ঞতা</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <TiltCard key={i} strength={5} className="rounded-2xl bg-white/[0.06] p-5 ring-1 ring-white/10 backdrop-blur-sm">
              <div className="flex gap-0.5" style={{ transform: "translateZ(16px)" }}>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} size={13} className={idx < t.rating ? "fill-signal text-signal" : "text-white/20"} />
                ))}
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-text-inverse/90" style={{ transform: "translateZ(16px)" }}>
                {t.quote}
              </p>
              <p className="mt-3 text-xs font-semibold text-white" style={{ transform: "translateZ(16px)" }}>
                — {t.name}
              </p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
