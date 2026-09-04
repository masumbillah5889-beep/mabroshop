"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const BUCKET = "images";
const MAX_SIZE_MB = 5;

export default function ImageUploadField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file later
    if (!file) return;

    if (!configured) {
      setError("ডেমো মোডে ছবি আপলোড হয় না — Supabase কানেক্ট করার পর আপলোড করা যাবে।");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`ছবির সাইজ ${MAX_SIZE_MB}MB এর কম হতে হবে।`);
      return;
    }

    setError(null);
    setUploading(true);

    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const path = `${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

    if (uploadError) {
      setUploading(false);
      setError("আপলোড ব্যর্থ হয়েছে — Supabase Storage সেটআপ (storage.sql) করা আছে কিনা দেখুন।");
      return;
    }

    const { data: publicUrlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
    setUploading(false);
    onChange(publicUrlData.publicUrl);
  }

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-text-muted">{label}</label>

      {value ? (
        <div className="flex items-center gap-3">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-line bg-paper">
            <Image src={value} alt="" fill sizes="64px" className="object-cover" />
          </div>
          <div className="flex-1">
            <input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full rounded-xl border border-line bg-paper-raised px-4 py-2 text-xs text-text-muted outline-none focus:border-ink"
            />
          </div>
          <button
            type="button"
            onClick={() => onChange("")}
            className="shrink-0 text-text-muted hover:text-signal-dark"
            aria-label="ছবি সরান"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-line bg-paper-raised px-4 py-6 text-sm text-text-muted hover:border-ink hover:text-ink disabled:opacity-60"
        >
          {uploading ? (
            <>
              <Loader2 size={16} className="animate-spin" /> আপলোড হচ্ছে...
            </>
          ) : (
            <>
              <Upload size={16} /> ছবি আপলোড করুন, অথবা নিচে সরাসরি URL পেস্ট করুন
            </>
          )}
        </button>
      )}

      {!value && (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className="mt-2 w-full rounded-xl border border-line bg-paper-raised px-4 py-2.5 text-sm outline-none focus:border-ink"
        />
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {error && <p className="mt-1.5 text-xs text-signal-dark">{error}</p>}
    </div>
  );
}
