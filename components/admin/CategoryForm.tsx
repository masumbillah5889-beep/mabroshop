"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ShieldCheck, Truck, BadgeCheck, Headset, Wifi, Star } from "lucide-react";
import { updateCategory } from "@/lib/actions";
import { Button } from "@/components/ui/Button";
import ImageUploadField from "@/components/admin/ImageUploadField";
import type { Category, TrustPoint, Testimonial, Faq } from "@/lib/types";

const ICON_OPTIONS: { value: TrustPoint["icon"]; label: string; Icon: typeof ShieldCheck }[] = [
  { value: "ShieldCheck", label: "শিল্ড (নিরাপত্তা/ওয়ারেন্টি)", Icon: ShieldCheck },
  { value: "Truck", label: "ট্রাক (ডেলিভারি)", Icon: Truck },
  { value: "BadgeCheck", label: "ব্যাজ (যাচাইকৃত)", Icon: BadgeCheck },
  { value: "Headset", label: "হেডসেট (সাপোর্ট)", Icon: Headset },
  { value: "Wifi", label: "ওয়াইফাই (স্মার্ট/কানেক্টেড)", Icon: Wifi },
];

const emptyTrustPoint = (): TrustPoint => ({ icon: "ShieldCheck", title: "", description: "" });
const emptyTestimonial = (): Testimonial => ({ name: "", quote: "", rating: 5 });
const emptyFaq = (): Faq => ({ question: "", answer: "" });

const textInput =
  "w-full rounded-xl border border-line px-3 py-2 text-sm outline-none focus:border-ink";

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
  const [testimonials, setTestimonials] = useState<Testimonial[]>(
    category.testimonials?.length ? category.testimonials : [emptyTestimonial()]
  );
  const [faqs, setFaqs] = useState<Faq[]>(category.faqs?.length ? category.faqs : [emptyFaq()]);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function updatePoint(index: number, patch: Partial<TrustPoint>) {
    setTrustPoints((points) => points.map((p, i) => (i === index ? { ...p, ...patch } : p)));
  }
  function updateTestimonial(index: number, patch: Partial<Testimonial>) {
    setTestimonials((items) => items.map((t, i) => (i === index ? { ...t, ...patch } : t)));
  }
  function updateFaq(index: number, patch: Partial<Faq>) {
    setFaqs((items) => items.map((f, i) => (i === index ? { ...f, ...patch } : f)));
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
      testimonials: testimonials.filter((t) => t.name.trim() !== "" && t.quote.trim() !== ""),
      faqs: faqs.filter((f) => f.question.trim() !== "" && f.answer.trim() !== ""),
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
        <ImageUploadField label="ব্যানার ছবি" value={bannerImageUrl} onChange={setBannerImageUrl} />
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

      {/* ---- Trust points ---- */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink">ট্রাস্ট পয়েন্ট</h2>
          <button
            type="button"
            onClick={() => setTrustPoints((p) => [...p, emptyTrustPoint()])}
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
                    className={textInput}
                  />
                  <input
                    value={point.description}
                    onChange={(e) => updatePoint(i, { description: e.target.value })}
                    placeholder="ছোট বর্ণনা"
                    className={textInput}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setTrustPoints((p) => p.filter((_, idx) => idx !== i))}
                  className="mt-1 text-text-muted hover:text-signal-dark"
                  aria-label="মুছুন"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Testimonials ---- */}
      <div>
        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink">টেস্টিমোনিয়াল</h2>
          <button
            type="button"
            onClick={() => setTestimonials((t) => [...t, emptyTestimonial()])}
            className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-ink hover:border-ink"
          >
            <Plus size={13} /> নতুন যোগ করুন
          </button>
        </div>
        <p className="mb-3 text-xs text-text-muted">ক্যাটাগরি পেজের নিচে, প্রোডাক্ট গ্রিডের পর এগুলো দেখানো হবে।</p>
        <div className="space-y-3">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-2xl border border-line bg-paper-raised p-4">
              <div className="flex items-start gap-3">
                <div className="flex-1 space-y-2">
                  <input
                    value={t.name}
                    onChange={(e) => updateTestimonial(i, { name: e.target.value })}
                    placeholder="ক্রেতার নাম"
                    className={textInput}
                  />
                  <textarea
                    value={t.quote}
                    onChange={(e) => updateTestimonial(i, { quote: e.target.value })}
                    placeholder="মন্তব্য"
                    rows={2}
                    className={textInput}
                  />
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => updateTestimonial(i, { rating: n })}
                        aria-label={`${n} স্টার`}
                      >
                        <Star size={16} className={n <= t.rating ? "fill-signal text-signal" : "text-line"} />
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setTestimonials((items) => items.filter((_, idx) => idx !== i))}
                  className="mt-1 text-text-muted hover:text-signal-dark"
                  aria-label="মুছুন"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---- FAQ ---- */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink">সচরাচর জিজ্ঞাসা (FAQ)</h2>
          <button
            type="button"
            onClick={() => setFaqs((f) => [...f, emptyFaq()])}
            className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-ink hover:border-ink"
          >
            <Plus size={13} /> নতুন যোগ করুন
          </button>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="rounded-2xl border border-line bg-paper-raised p-4">
              <div className="flex items-start gap-3">
                <div className="flex-1 space-y-2">
                  <input
                    value={f.question}
                    onChange={(e) => updateFaq(i, { question: e.target.value })}
                    placeholder="প্রশ্ন"
                    className={textInput}
                  />
                  <textarea
                    value={f.answer}
                    onChange={(e) => updateFaq(i, { answer: e.target.value })}
                    placeholder="উত্তর"
                    rows={2}
                    className={textInput}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setFaqs((items) => items.filter((_, idx) => idx !== i))}
                  className="mt-1 text-text-muted hover:text-signal-dark"
                  aria-label="মুছুন"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
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
