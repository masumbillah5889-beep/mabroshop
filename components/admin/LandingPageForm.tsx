"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { updateProductLandingPage } from "@/lib/actions";
import { Button } from "@/components/ui/Button";
import ImageUploadField from "@/components/admin/ImageUploadField";
import RepeatableSection from "@/components/admin/RepeatableSection";
import type {
  Product,
  ProductLandingPage,
  PainPoint,
  Feature,
  Spec,
  ComparisonRow,
  Testimonial,
  OrderBenefit,
  Faq,
} from "@/lib/types";

const textInput =
  "w-full rounded-xl border border-line px-3 py-2 text-sm outline-none focus:border-ink";

function isoToLocalInput(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function localInputToIso(local: string): string | null {
  if (!local) return null;
  const d = new Date(local);
  return isNaN(d.getTime()) ? null : d.toISOString();
}

export default function LandingPageForm({ product }: { product: Product }) {
  const [lp, setLp] = useState<ProductLandingPage>(product.landing_page);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);

  function patch(p: Partial<ProductLandingPage>) {
    setLp((prev) => ({ ...prev, ...p }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setNotice(null);
    const result = await updateProductLandingPage(product.id, lp);
    setSaving(false);
    setNotice(result.ok ? { ok: true, text: "সেভ হয়েছে।" } : { ok: false, text: result.error });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 max-w-2xl space-y-8">
      {/* ---- Master toggle ---- */}
      <div className="flex items-center justify-between rounded-2xl border border-line bg-paper-raised p-5">
        <div>
          <h2 className="text-sm font-semibold text-ink">প্রমোশন পেজ চালু করুন</h2>
          <p className="mt-0.5 text-xs text-text-muted">
            বন্ধ থাকলে সাধারণ প্রোডাক্ট পেজ দেখাবে, নিচের কিছুই লাইভ হবে না।
          </p>
        </div>
        <button
          type="button"
          onClick={() => patch({ enabled: !lp.enabled })}
          className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${lp.enabled ? "bg-trust" : "bg-line"}`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
              lp.enabled ? "translate-x-5" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>

      {lp.enabled && (
        <>
          {/* ---- Basic hero text ---- */}
          <div className="space-y-3 rounded-2xl border border-line bg-paper-raised p-5">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-text-muted">হিরো টেক্সট</h2>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-muted">সাবটাইটেল</label>
              <textarea value={lp.subtitle} onChange={(e) => patch({ subtitle: e.target.value })} rows={2} className={textInput} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-text-muted">ব্যাজ টেক্সট</label>
                <input value={lp.badge_text} onChange={(e) => patch({ badge_text: e.target.value })} placeholder="বেস্ট সেলার" className={textInput} />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-text-muted">উপরের অ্যানাউন্সমেন্ট</label>
                <input value={lp.announcement} onChange={(e) => patch({ announcement: e.target.value })} placeholder="🔥 সীমিত সময়ের অফার..." className={textInput} />
              </div>
            </div>
          </div>

          {/* ---- Gallery ---- */}
          <div>
            <h2 className="mb-3 text-sm font-semibold text-ink">গ্যালারি ছবি</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {lp.gallery_images.map((url, i) => (
                <div key={i} className="relative">
                  <ImageUploadField
                    label=""
                    value={url}
                    onChange={(v) => {
                      const next = [...lp.gallery_images];
                      if (v) next[i] = v;
                      else next.splice(i, 1);
                      patch({ gallery_images: next });
                    }}
                  />
                </div>
              ))}
            </div>
            {lp.gallery_images.length < 6 && (
              <button
                type="button"
                onClick={() => patch({ gallery_images: [...lp.gallery_images, ""] })}
                className="mt-3 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-ink hover:border-ink"
              >
                + আরেকটা ছবি যোগ করুন
              </button>
            )}
          </div>

          {/* ---- Pain points ---- */}
          <RepeatableSection<PainPoint>
            title="পেইন পয়েন্ট"
            hint="গ্রাহকের সমস্যাগুলো — কেন এই প্রোডাক্ট দরকার।"
            items={lp.pain_points}
            onChange={(items) => patch({ pain_points: items })}
            emptyItem={() => ({ emoji: "🔧", title: "", description: "" })}
            renderItem={(item, update) => (
              <>
                <div className="flex gap-2">
                  <input
                    value={item.emoji}
                    onChange={(e) => update({ emoji: e.target.value })}
                    placeholder="🔧"
                    className={`${textInput} w-16 text-center`}
                  />
                  <input
                    value={item.title}
                    onChange={(e) => update({ title: e.target.value })}
                    placeholder="শিরোনাম"
                    className={textInput}
                  />
                </div>
                <textarea
                  value={item.description}
                  onChange={(e) => update({ description: e.target.value })}
                  placeholder="বিস্তারিত"
                  rows={2}
                  className={textInput}
                />
              </>
            )}
          />

          {/* ---- Features ---- */}
          <RepeatableSection<Feature>
            title="ফিচার"
            hint="প্রোডাক্টের মূল সুবিধাগুলো, নাম্বার দিয়ে দেখানো হবে।"
            items={lp.features}
            onChange={(items) => patch({ features: items })}
            emptyItem={() => ({ title: "", description: "" })}
            renderItem={(item, update) => (
              <>
                <input value={item.title} onChange={(e) => update({ title: e.target.value })} placeholder="শিরোনাম" className={textInput} />
                <textarea value={item.description} onChange={(e) => update({ description: e.target.value })} placeholder="বিস্তারিত" rows={2} className={textInput} />
              </>
            )}
          />

          {/* ---- Specs ---- */}
          <RepeatableSection<Spec>
            title="স্পেসিফিকেশন"
            items={lp.specs}
            onChange={(items) => patch({ specs: items })}
            emptyItem={() => ({ label: "", value: "" })}
            renderItem={(item, update) => (
              <div className="grid grid-cols-2 gap-2">
                <input value={item.label} onChange={(e) => update({ label: e.target.value })} placeholder="লেবেল" className={textInput} />
                <input value={item.value} onChange={(e) => update({ value: e.target.value })} placeholder="মান" className={textInput} />
              </div>
            )}
          />

          {/* ---- Comparison ---- */}
          <div>
            <h2 className="mb-1 text-sm font-semibold text-ink">তুলনা টেবিল</h2>
            <p className="mb-3 text-xs text-text-muted">কীসের সাথে তুলনা করছেন (যেমন: &ldquo;সাধারণ টেবিল&rdquo;)।</p>
            <input
              value={lp.comparison_label}
              onChange={(e) => patch({ comparison_label: e.target.value })}
              placeholder="সাধারণ টেবিল"
              className={`${textInput} mb-3`}
            />
            <RepeatableSection<ComparisonRow>
              title="তুলনার সারি"
              items={lp.comparison_rows}
              onChange={(items) => patch({ comparison_rows: items })}
              emptyItem={() => ({ label: "", ours: "", theirs: "" })}
              renderItem={(item, update) => (
                <div className="space-y-2">
                  <input value={item.label} onChange={(e) => update({ label: e.target.value })} placeholder="বিষয়" className={textInput} />
                  <div className="grid grid-cols-2 gap-2">
                    <input value={item.ours} onChange={(e) => update({ ours: e.target.value })} placeholder="আমাদের" className={textInput} />
                    <input value={item.theirs} onChange={(e) => update({ theirs: e.target.value })} placeholder="ওদের" className={textInput} />
                  </div>
                </div>
              )}
            />
          </div>

          {/* ---- Testimonials ---- */}
          <RepeatableSection<Testimonial>
            title="টেস্টিমোনিয়াল"
            items={lp.testimonials}
            onChange={(items) => patch({ testimonials: items })}
            emptyItem={() => ({ name: "", quote: "", rating: 5 })}
            renderItem={(item, update) => (
              <>
                <input value={item.name} onChange={(e) => update({ name: e.target.value })} placeholder="ক্রেতার নাম" className={textInput} />
                <textarea value={item.quote} onChange={(e) => update({ quote: e.target.value })} placeholder="মন্তব্য" rows={2} className={textInput} />
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} type="button" onClick={() => update({ rating: n })} aria-label={`${n} স্টার`}>
                      <Star size={16} className={n <= item.rating ? "fill-signal text-signal" : "text-line"} />
                    </button>
                  ))}
                </div>
              </>
            )}
          />

          {/* ---- Order benefits ---- */}
          <RepeatableSection<OrderBenefit>
            title="অর্ডার বেনিফিট"
            hint="আজই অর্ডার করলে যা পাবে — ইমোজি + শিরোনাম + ছোট বিবরণ।"
            items={lp.order_benefits}
            onChange={(items) => patch({ order_benefits: items })}
            emptyItem={() => ({ icon: "🚚", title: "", description: "" })}
            renderItem={(item, update) => (
              <div className="flex gap-2">
                <input value={item.icon} onChange={(e) => update({ icon: e.target.value })} placeholder="🚚" className={`${textInput} w-16 text-center`} />
                <div className="flex-1 space-y-2">
                  <input value={item.title} onChange={(e) => update({ title: e.target.value })} placeholder="শিরোনাম" className={textInput} />
                  <input value={item.description} onChange={(e) => update({ description: e.target.value })} placeholder="বিবরণ" className={textInput} />
                </div>
              </div>
            )}
          />

          {/* ---- FAQ ---- */}
          <RepeatableSection<Faq>
            title="সচরাচর জিজ্ঞাসা (FAQ)"
            items={lp.faqs}
            onChange={(items) => patch({ faqs: items })}
            emptyItem={() => ({ question: "", answer: "" })}
            renderItem={(item, update) => (
              <>
                <input value={item.question} onChange={(e) => update({ question: e.target.value })} placeholder="প্রশ্ন" className={textInput} />
                <textarea value={item.answer} onChange={(e) => update({ answer: e.target.value })} placeholder="উত্তর" rows={2} className={textInput} />
              </>
            )}
          />

          {/* ---- Countdown + contact card ---- */}
          <div className="space-y-4 rounded-2xl border border-line bg-paper-raised p-5">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-text-muted">অফার শেষ ও যোগাযোগ</h2>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-muted">
                অফার কখন শেষ হবে (খালি রাখলে কাউন্টডাউন দেখাবে না)
              </label>
              <input
                type="datetime-local"
                value={isoToLocalInput(lp.countdown_end_at)}
                onChange={(e) => patch({ countdown_end_at: localInputToIso(e.target.value) })}
                className={textInput}
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-ink">
              <input
                type="checkbox"
                checked={lp.show_contact_card}
                onChange={(e) => patch({ show_contact_card: e.target.checked })}
                className="accent-signal"
              />
              কল/হোয়াটসঅ্যাপ কার্ড দেখান
            </label>
          </div>
        </>
      )}

      {notice && (
        <p className={`rounded-lg px-3 py-2 text-xs ${notice.ok ? "bg-trust-bg text-trust" : "bg-signal/10 text-signal-dark"}`}>
          {notice.text}
        </p>
      )}

      <Button type="submit" size="lg" disabled={saving}>
        {saving ? "সেভ হচ্ছে..." : "সেভ করুন"}
      </Button>
    </form>
  );
}
