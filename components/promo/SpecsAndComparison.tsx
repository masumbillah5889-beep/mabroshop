import type { Spec, ComparisonRow } from "@/lib/types";

export function SpecsTable({ specs }: { specs: Spec[] }) {
  if (!specs?.length) return null;
  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <h2 className="font-display text-center text-2xl font-bold text-ink">স্পেসিফিকেশন</h2>
      <div className="mt-7 overflow-hidden rounded-2xl border border-line">
        {specs.map((s, i) => (
          <div key={i} className={`flex text-sm ${i % 2 === 1 ? "bg-paper" : "bg-paper-raised"}`}>
            <div className="w-2/5 border-r border-line px-5 py-3 font-medium text-text-muted">{s.label}</div>
            <div className="px-5 py-3 font-medium text-ink">{s.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ComparisonTable({ label, rows }: { label: string; rows: ComparisonRow[] }) {
  if (!rows?.length) return null;
  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <h2 className="font-display text-center text-2xl font-bold text-ink">{label}-এর সাথে তুলনা</h2>
      <div className="mt-7 overflow-hidden rounded-2xl border border-line">
        <div className="grid grid-cols-3 bg-ink text-xs font-bold text-white">
          <div className="px-3.5 py-3">বিষয়</div>
          <div className="px-3.5 py-3 text-signal-light">Mabro Shop</div>
          <div className="px-3.5 py-3">{label}</div>
        </div>
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-3 border-t border-line bg-paper-raised text-xs">
            <div className="px-3.5 py-3 text-text-muted">{r.label}</div>
            <div className="px-3.5 py-3 font-semibold text-trust">{r.ours}</div>
            <div className="px-3.5 py-3 text-text-muted">{r.theirs}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
