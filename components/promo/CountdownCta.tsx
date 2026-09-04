"use client";

import { useEffect, useState } from "react";
import { formatTaka } from "@/lib/utils";

function useCountdown(endAt: string | null) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (!endAt) return;
    function tick() {
      const diff = Math.max(0, new Date(endAt as string).getTime() - Date.now());
      setRemaining(Math.floor(diff / 1000));
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endAt]);

  return remaining;
}

export default function CountdownCta({
  endAt,
  price,
}: {
  endAt: string | null;
  price: number;
}) {
  const seconds = useCountdown(endAt);
  const expired = seconds !== null && seconds <= 0;

  const h = seconds !== null ? Math.floor(seconds / 3600) : 0;
  const m = seconds !== null ? Math.floor((seconds % 3600) / 60) : 0;
  const s = seconds !== null ? seconds % 60 : 0;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-ink to-ink-light py-14 text-center">
      <div className="pointer-events-none absolute -right-20 -top-10 h-56 w-56 rounded-full bg-signal/25 blur-[90px]" />
      <div className="relative mx-auto max-w-lg px-6">
        <h2 className="font-display text-2xl font-bold text-white">
          {expired ? "এখনই অর্ডার করুন" : "এই অফারটা বেশিদিন থাকবে না"}
        </h2>
        {!expired && seconds !== null && (
          <>
            <p className="mt-2 text-sm text-text-inverse/70">নিচের সময় শেষ হওয়ার আগে অর্ডার করে ছাড় নিশ্চিত করুন</p>
            <div className="mt-6 flex justify-center gap-2.5">
              {[
                [h, "ঘণ্টা"],
                [m, "মিনিট"],
                [s, "সেকেন্ড"],
              ].map(([val, label], i) => (
                <div key={i} className="min-w-[64px] rounded-xl border border-white/15 bg-white/[0.08] px-4 py-2.5">
                  <div className="font-display text-xl font-bold text-white">{pad(val as number)}</div>
                  <div className="text-[10px] text-text-inverse/60">{label}</div>
                </div>
              ))}
            </div>
          </>
        )}
        <a
          href="#top-order"
          className="mt-7 inline-block rounded-full bg-signal px-9 py-3.5 text-sm font-bold text-white hover:bg-signal-dark"
        >
          এখনই {formatTaka(price)}-এ অর্ডার করুন
        </a>
      </div>
    </section>
  );
}
