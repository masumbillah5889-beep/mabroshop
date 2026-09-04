"use client";

import { useState } from "react";
import { Tag, Target, Smartphone } from "lucide-react";
import { FacebookIcon } from "@/components/icons/SocialIcons";
import { updateAddons } from "@/lib/actions";
import { Button } from "@/components/ui/Button";
import type { AddonsConfig } from "@/lib/types";

const ADDON_META = {
  facebook_pixel: {
    icon: FacebookIcon,
    name: "Facebook Pixel",
    desc: "ফেসবুক/ইনস্টাগ্রাম অ্যাডের কনভার্শন ট্র্যাক করবে।",
    fieldLabel: "Pixel ID",
    fieldKey: "pixel_id" as const,
  },
  google_tag_manager: {
    icon: Tag,
    name: "Google Tag Manager",
    desc: "কোড ছাড়াই একসাথে একাধিক ট্র্যাকিং ট্যাগ ম্যানেজ করার জন্য।",
    fieldLabel: "Container ID (GTM-XXXXXXX)",
    fieldKey: "container_id" as const,
  },
  google_ads: {
    icon: Target,
    name: "Google Ads",
    desc: "গুগল অ্যাডের কনভার্শন ট্র্যাক করবে।",
    fieldLabel: "Conversion ID (AW-XXXXXXXXX)",
    fieldKey: "conversion_id" as const,
  },
} as const;

export default function AddonsForm({ initial }: { initial: AddonsConfig }) {
  const [config, setConfig] = useState<AddonsConfig>(initial);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);

  function toggle(key: keyof typeof ADDON_META) {
    setConfig((c) => ({ ...c, [key]: { ...c[key], enabled: !c[key].enabled } }));
  }

  function setField(key: keyof typeof ADDON_META, value: string) {
    setConfig((c) => ({
      ...c,
      [key]: { ...c[key], [ADDON_META[key].fieldKey]: value },
    }));
  }

  async function handleSave() {
    setSaving(true);
    setNotice(null);
    const result = await updateAddons(config);
    setSaving(false);
    setNotice(result.ok ? { ok: true, text: "সেভ হয়েছে।" } : { ok: false, text: result.error });
  }

  return (
    <div className="mt-6 max-w-2xl space-y-4">
      {(Object.keys(ADDON_META) as (keyof typeof ADDON_META)[]).map((key) => {
        const meta = ADDON_META[key];
        const Icon = meta.icon;
        const addon = config[key];
        return (
          <div key={key} className="rounded-2xl border border-line bg-paper-raised p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-paper">
                  <Icon width={18} height={18} className="text-ink" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-ink">{meta.name}</h3>
                  <p className="mt-0.5 text-xs text-text-muted">{meta.desc}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => toggle(key)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  addon.enabled ? "bg-trust" : "bg-line"
                }`}
                aria-label={`${meta.name} টগল করুন`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    addon.enabled ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            {addon.enabled && (
              <input
                value={(addon as unknown as Record<string, string>)[meta.fieldKey]}
                onChange={(e) => setField(key, e.target.value)}
                placeholder={meta.fieldLabel}
                className="mt-4 w-full rounded-xl border border-line px-4 py-2.5 text-sm outline-none focus:border-ink"
              />
            )}
          </div>
        );
      })}

      <div className="rounded-2xl border border-line bg-paper-raised p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-paper">
              <Smartphone size={18} className="text-ink" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-ink">Progressive Web App (PWA)</h3>
              <p className="mt-0.5 text-xs text-text-muted">
                গ্রাহকরা সাইটটা মোবাইলের হোম স্ক্রিনে অ্যাপের মতো ইনস্টল করতে পারবে।
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setConfig((c) => ({ ...c, pwa: { enabled: !c.pwa.enabled } }))}
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
              config.pwa.enabled ? "bg-trust" : "bg-line"
            }`}
            aria-label="PWA টগল করুন"
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                config.pwa.enabled ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
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
