import type { OrderBenefit } from "@/lib/types";

export default function OrderBenefits({ benefits }: { benefits: OrderBenefit[] }) {
  if (!benefits?.length) return null;
  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      <h2 className="font-display text-center text-2xl font-bold text-ink">আজই অর্ডার করলে যা পাচ্ছেন</h2>
      <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4">
        {benefits.map((b, i) => (
          <div key={i} className="text-center">
            <span className="text-2xl">{b.icon}</span>
            <h3 className="mt-2 text-xs font-semibold text-ink">{b.title}</h3>
            <p className="mt-0.5 text-[11px] text-text-muted">{b.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
