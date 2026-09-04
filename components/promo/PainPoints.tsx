import type { PainPoint } from "@/lib/types";

export default function PainPoints({ points }: { points: PainPoint[] }) {
  if (!points?.length) return null;
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <h2 className="font-display text-center text-2xl font-bold text-ink">
        প্রতিদিনের এই সমস্যাগুলো চেনা লাগছে?
      </h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {points.map((p, i) => (
          <div key={i} className="rounded-2xl border border-line bg-paper-raised p-5">
            <span className="text-2xl">{p.emoji}</span>
            <h3 className="mt-3 text-sm font-semibold text-ink">{p.title}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-text-muted">{p.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
