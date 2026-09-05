"use client";

import { Plus, Trash2 } from "lucide-react";

export default function RepeatableSection<T>({
  title,
  hint,
  items,
  onChange,
  emptyItem,
  renderItem,
}: {
  title: string;
  hint?: string;
  items: T[];
  onChange: (items: T[]) => void;
  emptyItem: () => T;
  renderItem: (item: T, update: (patch: Partial<T>) => void) => React.ReactNode;
}) {
  function update(index: number, patch: Partial<T>) {
    onChange(items.map((it, i) => (i === index ? { ...it, ...patch } : it)));
  }
  function remove(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-ink">{title}</h2>
        <button
          type="button"
          onClick={() => onChange([...items, emptyItem()])}
          className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-ink hover:border-ink"
        >
          <Plus size={13} /> নতুন যোগ করুন
        </button>
      </div>
      {hint && <p className="mb-3 text-xs text-text-muted">{hint}</p>}
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="rounded-2xl border border-line bg-paper-raised p-4">
            <div className="flex items-start gap-3">
              <div className="flex-1 space-y-2">{renderItem(item, (patch) => update(i, patch))}</div>
              <button
                type="button"
                onClick={() => remove(i)}
                className="mt-1 shrink-0 text-text-muted hover:text-signal-dark"
                aria-label="মুছুন"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-xs text-text-muted">এখনো কিছু যোগ করা হয়নি।</p>}
      </div>
    </div>
  );
}
