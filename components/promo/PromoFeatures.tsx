import type { Feature } from "@/lib/types";

export default function PromoFeatures({ features }: { features: Feature[] }) {
  if (!features?.length) return null;
  return (
    <section className="bg-paper-raised py-12">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-center text-2xl font-bold text-ink">একটা প্রোডাক্টেই সমাধান</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {features.map((f, i) => (
            <div key={i} className="flex gap-4 rounded-2xl bg-paper p-5">
              <span className="font-display shrink-0 text-xl font-bold text-signal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-sm font-semibold text-ink">{f.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-text-muted">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
