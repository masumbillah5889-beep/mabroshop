"use client";

import { useState } from "react";
import { updateBranding } from "@/lib/actions";
import { Button } from "@/components/ui/Button";
import ImageUploadField from "@/components/admin/ImageUploadField";
import ColorField from "@/components/admin/ColorField";
import type { Branding } from "@/lib/types";

export default function BrandingForm({ initial }: { initial: Branding }) {
  const [branding, setBranding] = useState<Branding>(initial);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);

  function set<K extends keyof Branding>(key: K, value: Branding[K]) {
    setBranding((b) => ({ ...b, [key]: value }));
  }

  const textInput = "w-full rounded-xl border border-line px-4 py-2.5 text-sm outline-none focus:border-ink";

  async function handleSave() {
    setSaving(true);
    setNotice(null);
    const result = await updateBranding(branding);
    setSaving(false);
    setNotice(result.ok ? { ok: true, text: "সেভ হয়েছে — পেজ রিফ্রেশ করলে নতুন থিম দেখা যাবে।" } : { ok: false, text: result.error });
  }

  return (
    <div className="mt-6 max-w-2xl space-y-8">
      {/* ---- Identity ---- */}
      <div className="space-y-4 rounded-2xl border border-line bg-paper-raised p-5">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-text-muted">পরিচিতি</h2>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-muted">সাইটের পুরো নাম</label>
          <input
            value={branding.site_name}
            onChange={(e) => set("site_name", e.target.value)}
            placeholder="যেমন: Mabro Shop"
            className={textInput}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-muted">
            নামের যে অংশ অ্যাকসেন্ট রঙে দেখাবে
          </label>
          <input
            value={branding.site_name_accent}
            onChange={(e) => set("site_name_accent", e.target.value)}
            placeholder="যেমন: Mabro"
            className={textInput}
          />
          <p className="mt-1 text-xs text-text-muted">
            এটা অবশ্যই উপরের পুরো নামের একটা অংশ হতে হবে — যেমন নাম &ldquo;Mabro Shop&rdquo; হলে এখানে &ldquo;Mabro&rdquo; দিলে
            লোগোতে দেখাবে: <span className="text-signal font-semibold">Mabro</span> Shop
          </p>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-muted">ট্যাগলাইন</label>
          <input
            value={branding.tagline}
            onChange={(e) => set("tagline", e.target.value)}
            className={textInput}
          />
        </div>
        <ImageUploadField label="লোগো (ঐচ্ছিক)" value={branding.logo_url} onChange={(v) => set("logo_url", v)} />
      </div>

      {/* ---- Contact ---- */}
      <div className="space-y-4 rounded-2xl border border-line bg-paper-raised p-5">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-text-muted">যোগাযোগ</h2>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-muted">ফোন (Call Now বাটনে ব্যবহৃত)</label>
          <input
            value={branding.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+8801XXXXXXXXX"
            className={textInput}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-muted">WhatsApp নাম্বার</label>
          <input
            value={branding.whatsapp}
            onChange={(e) => set("whatsapp", e.target.value)}
            placeholder="+8801XXXXXXXXX"
            className={textInput}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-muted">ইমেইল</label>
          <input
            value={branding.email}
            onChange={(e) => set("email", e.target.value)}
            className={textInput}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-muted">ঠিকানা (ফুটারে দেখাবে)</label>
          <input
            value={branding.address}
            onChange={(e) => set("address", e.target.value)}
            className={textInput}
          />
        </div>
      </div>

      {/* ---- Theme colors ---- */}
      <div className="space-y-4 rounded-2xl border border-line bg-paper-raised p-5">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-text-muted">থিম কালার</h2>
        <p className="text-xs text-text-muted">
          এই দুটো রঙ থেকেই পুরো সাইটের হালকা/গাঢ় সব শেড হিসাব করে বসানো হয় — পুরো সাইটের লুক বদলাতে
          শুধু এই দুটোই বদলানো লাগবে।
        </p>
        <ColorField label="প্রাইমারি (গাঢ় ব্যাকগ্রাউন্ড, হেডার, ফুটার)" value={branding.primary_color} onChange={(v) => set("primary_color", v)} />
        <ColorField label="অ্যাকসেন্ট (বাটন, ব্যাজ, হাইলাইট)" value={branding.accent_color} onChange={(v) => set("accent_color", v)} />
      </div>

      {notice && (
        <p className={`rounded-lg px-3 py-2 text-xs ${notice.ok ? "bg-trust-bg text-trust" : "bg-signal/10 text-signal-dark"}`}>
          {notice.text}
        </p>
      )}

      <Button size="lg" disabled={saving} onClick={handleSave}>
        {saving ? "সেভ হচ্ছে..." : "সেভ করুন"}
      </Button>
    </div>
  );
}
