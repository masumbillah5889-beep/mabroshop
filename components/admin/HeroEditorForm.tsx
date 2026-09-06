"use client";

import { useState } from "react";
import { updateHeroContent } from "@/lib/actions";
import { Button } from "@/components/ui/Button";
import ImageUploadField from "@/components/admin/ImageUploadField";
import type { HeroContent } from "@/lib/types";

export default function HeroEditorForm({ initial }: { initial: HeroContent }) {
  const [form, setForm] = useState<HeroContent>(initial);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);

  function set<K extends keyof HeroContent>(key: K, value: HeroContent[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setNotice(null);
    const result = await updateHeroContent(form);
    setSaving(false);
    setNotice(result.ok ? { ok: true, text: "সেভ হয়েছে।" } : { ok: false, text: result.error });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 max-w-xl space-y-6">
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => set("mode", "custom")}
          className={`rounded-xl border-2 px-4 py-3 text-left text-sm font-semibold transition-colors ${
            form.mode === "custom" ? "border-ink bg-ink text-white" : "border-line text-ink hover:border-ink/40"
          }`}
        >
          কোডিং সিস্টেম
          <div className="mt-0.5 text-xs font-normal opacity-80">হেডলাইন + প্রোডাক্ট স্পটলাইট (এখন যেমন আছে)</div>
        </button>
        <button
          type="button"
          onClick={() => set("mode", "image")}
          className={`rounded-xl border-2 px-4 py-3 text-left text-sm font-semibold transition-colors ${
            form.mode === "image" ? "border-ink bg-ink text-white" : "border-line text-ink hover:border-ink/40"
          }`}
        >
          ছবি আপলোড
          <div className="mt-0.5 text-xs font-normal opacity-80">নিজের ডিজাইন করা একটা ব্যানার ছবি বসবে</div>
        </button>
      </div>

      {form.mode === "image" ? (
        <ImageUploadField
          label="হিরো ব্যানার ছবি"
          value={form.banner_image_url}
          onChange={(v) => set("banner_image_url", v)}
        />
      ) : (
        <>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-text-muted">উপরের ছোট লাইন (eyebrow)</label>
            <input
              value={form.eyebrow}
              onChange={(e) => set("eyebrow", e.target.value)}
              className="w-full rounded-xl border border-line bg-paper-raised px-4 py-2.5 text-sm outline-none focus:border-ink"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-text-muted">প্রধান হেডলাইন</label>
            <textarea
              rows={2}
              value={form.headline}
              onChange={(e) => set("headline", e.target.value)}
              className="w-full rounded-xl border border-line bg-paper-raised px-4 py-2.5 text-sm outline-none focus:border-ink"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-text-muted">সাব-টেক্সট</label>
            <textarea
              rows={3}
              value={form.subtitle}
              onChange={(e) => set("subtitle", e.target.value)}
              className="w-full rounded-xl border border-line bg-paper-raised px-4 py-2.5 text-sm outline-none focus:border-ink"
            />
          </div>
        </>
      )}

      {notice && (
        <p className={`rounded-lg px-3 py-2 text-xs ${notice.ok ? "bg-trust-bg text-trust" : "bg-signal/10 text-signal-dark"}`}>
          {notice.text}
        </p>
      )}

      <Button type="submit" size="lg" disabled={saving}>
        {saving ? "সেভ হচ্ছে..." : "হিরো সেকশন সেভ করুন"}
      </Button>
    </form>
  );
}
