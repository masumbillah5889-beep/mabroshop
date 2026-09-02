"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ShieldCheck, Truck, BadgeCheck, Headset, Wifi } from "lucide-react";
import { updateCategory } from "@/lib/actions";
import { Button } from "@/components/ui/Button";
import type { Category, TrustPoint } from "@/lib/types";

const ICON_OPTIONS: { value: TrustPoint["icon"]; label: string; Icon: typeof ShieldCheck }[] = [
  { value: "ShieldCheck", label: "শিল্ড (নিরাপত্তা/ওয়ারেন্টি)", Icon: ShieldCheck },
  { value: "Truck", label: "ট্রাক (ডেলিভারি)", Icon: Truck },
  { value: "BadgeCheck", label: "ব্যাজ (যাচাইকৃত)", Icon: BadgeCheck },
  { value: "Headset", label: "হেডসেট (সাপোর্ট)", Icon: Headset },
  { value: "Wifi", label: "ওয়াইফাই (স্মার্ট/কানেক্টেড)", Icon: Wifi },
];

function emptyTrustPoint(): TrustPoint {
  return { icon: "ShieldCheck", title: "", description: "" };
}

export default function CategoryForm({ category }: { category: Category }) {
  const router = useRouter();
  const [name, setName] = useState(category.name);
  const [tagline, setTagline] = useState(category.tagline ?? "");
  const [description, setDescription] = useState(category.description ?? "");
  const [bannerImageUrl, setBannerImageUrl] = useState(category.banner_image_url ?? "");
  const [isActive, setIsActive] = useState(category.is_active);
  const [trustPoints, setTrustPoints] = useState<TrustPoint[]>(
    category.trust_points?.length ? category.trust_points : [emptyTrustPoint()]
  );
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function updatePoint(index: number, patch: Partial<TrustPoint>) {
    setTrustPoints((points) => points.map((p, i) => (i === index ? { ...p, ...patch } : p)));
  }

  function removePoint(index: number) {
    setTrustPoints((points) => points.filter((_, i) => i !== index));
  }

  function addPoint() {
    setTrustPoints((points) => [...points, emptyTrustPoint()]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setSaving(true);

    const result = await updateCategory({
      id: category.id,
      name,
      tagline,
      description,
      bannerImageUrl,
      isActive,
      trustPoints: trustPoints.filter((p) => p.title.trim() !== ""),
    });

    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setNotice("সেভ হয়েছে।");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 max-w-2xl space-y-6">
      <div className="space-y-4 rounded-2xl border border-line bg-paper-raised p-5">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-muted">ক্যাটাগরির নাম</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-line px-4 py-2.5 text-sm outline-none focus:border-ink"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-muted">ট্যাগলাইন (ব্যানারের নিচের ছোট লাইন)</label>
          <input
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full rounded-xl border border-line px-4 py-2.5 text-sm outline-none focus:border-ink"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-muted">বিবরণ</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-xl border border-line px-4 py-2.5 text-sm outline-none focus:border-ink"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-muted">ব্যানার ছবির URL</label>
          <input
            value={bannerImageUrl}
            onChange={(e) => setBannerImageUrl(e.target.value)}
            className="w-full rounded-xl border border-line px-4 py-2.5 text-sm outline-none focus:border-ink"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="accent-signal"
          />
          একটিভ (দোকানে ও নেভিগেশনে দেখাবে)
        </label>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink">ট্রাস্ট পয়েন্ট</h2>
          <button
            type="button"
            onClick={addPoint}
            className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-ink hover:border-ink"
          >
            <Plus size={13} /> নতুন যোগ করুন
          </button>
        </div>

        <div className="space-y-3">
          {trustPoints.map((point, i) => (
            <div key={i} className="rounded-2xl border border-line bg-paper-raised p-4">
              <div className="flex items-start gap-3">
                <select
                  value={point.icon}
                  onChange={(e) => updatePoint(i, { icon: e.target.value })}
                  className="w-40 shrink-0 rounded-xl border border-line px-3 py-2 text-xs outline-none focus:border-ink"
                >
                  {ICON_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <div className="flex-1 space-y-2">
                  <input
                    value={point.title}
                    onChange={(e) => updatePoint(i, { title: e.target.value })}
                    placeholder="শিরোনাম, যেমন: ৭ দিনের রিপ্লেসমেন্ট"
                    className="w-full rounded-xl border border-line px-3 py-2 text-sm outline-none focus:border-ink"
                  />
                  <input
                    value={point.description}
                    onChange={(e) => updatePoint(i, { description: e.target.value })}
                    placeholder="ছোট বর্ণনা"
                    className="w-full rounded-xl border border-line px-3 py-2 text-sm outline-none focus:border-ink"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removePoint(i)}
                  className="mt-1 text-text-muted hover:text-signal-dark"
                  aria-label="মুছুন"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {trustPoints.length === 0 && (
            <p className="text-xs text-text-muted">এখনো কোনো ট্রাস্ট পয়েন্ট নেই — উপরের বাটনে চাপুন।</p>
          )}
        </div>
      </div>

      {error && <p className="rounded-lg bg-signal/10 px-3 py-2 text-xs text-signal-dark">{error}</p>}
      {notice && <p className="rounded-lg bg-trust-bg px-3 py-2 text-xs text-trust">{notice}</p>}

      <Button type="submit" size="lg" disabled={saving}>
        {saving ? "সেভ হচ্ছে..." : "পরিবর্তন সেভ করুন"}
      </Button>
    </form>
  );
}
