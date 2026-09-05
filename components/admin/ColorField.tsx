"use client";

import { isValidHex } from "@/lib/color";

export default function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (hex: string) => void;
}) {
  const valid = isValidHex(value);

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-text-muted">{label}</label>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={valid ? value : "#000000"}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 w-14 shrink-0 cursor-pointer rounded-lg border border-line bg-transparent p-1"
        />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#0e1f3c"
          className="w-32 rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-ink"
        />
        {!valid && <span className="text-xs text-signal-dark">#RRGGBB ফরম্যাটে দিন</span>}
      </div>
    </div>
  );
}
