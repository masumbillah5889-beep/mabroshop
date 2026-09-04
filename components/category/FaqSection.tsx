"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/types";

export default function FaqSection({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs?.length) return null;

  return (
    <section className="mx-auto max-w-3xl px-6 py-14">
      <h2 className="font-display text-center text-2xl font-bold text-ink md:text-3xl">
        সচরাচর জিজ্ঞাসা
      </h2>
      <div className="mt-7 divide-y divide-line rounded-2xl border border-line bg-paper-raised">
        {faqs.map((faq, i) => {
          const open = openIndex === i;
          return (
            <div key={i}>
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-sm font-semibold text-ink">{faq.question}</span>
                <ChevronDown
                  size={17}
                  className={`shrink-0 text-text-muted transition-transform ${open ? "rotate-180" : ""}`}
                />
              </button>
              {open && (
                <p className="px-5 pb-4 text-sm leading-relaxed text-text-muted">{faq.answer}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
