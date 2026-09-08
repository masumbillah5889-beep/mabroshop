"use client";

import { useState, useTransition } from "react";
import { Phone, MessageCircle, Trash2 } from "lucide-react";
import { deleteAbandonedCheckout } from "@/lib/actions";
import { formatTaka } from "@/lib/utils";
import type { AbandonedCheckout } from "@/lib/types";

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diffMs / 3600000);
  if (hours < 1) return "এইমাত্র";
  if (hours < 24) return `${hours} ঘণ্টা আগে`;
  const days = Math.floor(hours / 24);
  return `${days} দিন আগে`;
}

export default function AbandonedCheckoutsTable({ initial }: { initial: AbandonedCheckout[] }) {
  const [items, setItems] = useState(initial);
  const [isPending, startTransition] = useTransition();

  function handleDismiss(id: string) {
    startTransition(async () => {
      const result = await deleteAbandonedCheckout(id);
      if (result.ok) setItems((prev) => prev.filter((i) => i.id !== id));
    });
  }

  if (items.length === 0) {
    return (
      <p className="mt-6 rounded-2xl border border-line bg-paper-raised py-12 text-center text-sm text-text-muted">
        এখন কোনো অসম্পূর্ণ চেকআউট নেই।
      </p>
    );
  }

  return (
    <div className="mt-6 space-y-3">
      {items.map((item) => (
        <div key={item.id} className="rounded-2xl border border-line bg-paper-raised p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-ink">{item.customer_name || "নাম দেওয়া হয়নি"}</span>
                <span className="text-xs text-text-muted">{timeAgo(item.updated_at)}</span>
              </div>
              <div className="mt-1 text-sm text-ink">{item.customer_phone}</div>
              <div className="mt-0.5 text-xs text-text-muted">
                {item.customer_address || "ঠিকানা দেওয়া হয়নি"}
              </div>
            </div>
            <div className="text-right">
              <div className="font-display font-bold text-ink">
                {item.cart_total ? formatTaka(item.cart_total) : "—"}
              </div>
              <div className="text-xs text-text-muted">{item.cart_items.length} আইটেম</div>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {item.cart_items.map((line, i) => (
              <span key={i} className="rounded-full bg-paper px-2.5 py-1 text-xs text-text-muted">
                {line.name} × {line.quantity}
              </span>
            ))}
          </div>

          <div className="mt-3 flex gap-2">
            <a
              href={`tel:${item.customer_phone}`}
              className="flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-white hover:bg-ink-light"
            >
              <Phone size={12} /> কল করুন
            </a>
            <a
              href={`https://wa.me/${item.customer_phone.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90"
            >
              <MessageCircle size={12} /> WhatsApp
            </a>
            <button
              disabled={isPending}
              onClick={() => handleDismiss(item.id)}
              className="ml-auto flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-text-muted hover:border-signal hover:text-signal-dark disabled:opacity-50"
            >
              <Trash2 size={12} /> মুছুন
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
