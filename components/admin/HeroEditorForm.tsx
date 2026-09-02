"use client";

import { useState } from "react";
import { updateHeroContent } from "@/lib/actions";
import { Button } from "@/components/ui/Button";

export default function HeroEditorForm() {
  const [eyebrow, setEyebrow] = useState("১০,০০০+ সন্তুষ্ট গ্রাহক");
  const [headline, setHeadline] = useState("যে গ্যাজেট আজ অর্ডার করবেন, হাতে পাবেন হাতে টাকা দিয়ে");
  const [subtitle, setSubtitle] = useState(
    "ক্যামেরা থেকে স্মার্ট হোম, কিচেন থেকে গেমিং — যাচাই করা কোয়ালিটি, ক্যাশ অন ডেলিভারিতে সারা বাংলাদেশে।"
  );
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setNotice(null);
    const result = await updateHeroContent({ eyebrow, headline, subtitle });
    setSaving(false);
    setNotice(
      result.ok
        ? { ok: true, text: "সেভ হয়েছে।" }
        : { ok: false, text: result.error }
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 max-w-xl space-y-4">
      <div>
        <label className="mb-1.5 block text-xs font-medium text-text-muted">উপরের ছোট লাইন (eyebrow)</label>
        <input
          value={eyebrow}
          onChange={(e) => setEyebrow(e.target.value)}
          className="w-full rounded-xl border border-line bg-paper-raised px-4 py-2.5 text-sm outline-none focus:border-ink"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-text-muted">প্রধান হেডলাইন</label>
        <textarea
          rows={2}
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          className="w-full rounded-xl border border-line bg-paper-raised px-4 py-2.5 text-sm outline-none focus:border-ink"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-text-muted">সাব-টেক্সট</label>
        <textarea
          rows={3}
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="w-full rounded-xl border border-line bg-paper-raised px-4 py-2.5 text-sm outline-none focus:border-ink"
        />
      </div>

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
