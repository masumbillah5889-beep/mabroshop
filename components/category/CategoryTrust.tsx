import { ShieldCheck, Truck, BadgeCheck, Headset, Wifi, HelpCircle } from "lucide-react";
import type { TrustPoint } from "@/lib/types";

const ICONS: Record<string, typeof ShieldCheck> = {
  ShieldCheck,
  Truck,
  BadgeCheck,
  Headset,
  Wifi,
};

export default function CategoryTrust({ points }: { points: TrustPoint[] }) {
  if (!points?.length) return null;
  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid gap-4 sm:grid-cols-3">
        {points.map((p) => {
          const Icon = ICONS[p.icon] ?? HelpCircle;
          return (
            <div key={p.title} className="rounded-2xl border border-line bg-paper-raised p-5">
              <Icon size={22} className="text-signal" />
              <h3 className="mt-3 text-sm font-semibold text-ink">{p.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-text-muted">{p.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
