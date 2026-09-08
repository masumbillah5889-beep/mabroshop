"use client";

import { useState } from "react";
import { Tag, Target, Smartphone, MessageSquare, PhoneCall, Flame, Info, Music2, BarChart3, Eye } from "lucide-react";
import { FacebookIcon } from "@/components/icons/SocialIcons";
import { updateAddons } from "@/lib/actions";
import { Button } from "@/components/ui/Button";
import type { AddonsConfig } from "@/lib/types";

function ToggleSwitch({ on, onClick, label }: { on: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-trust" : "bg-line"}`}
      aria-label={label}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          on ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

function AddonCard({
  icon: Icon,
  name,
  desc,
  enabled,
  onToggle,
  children,
}: {
  icon: React.ElementType;
  name: string;
  desc: string;
  enabled: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-line bg-paper-raised p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-paper">
            <Icon width={18} height={18} className="text-ink" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-ink">{name}</h3>
            <p className="mt-0.5 text-xs text-text-muted">{desc}</p>
          </div>
        </div>
        <ToggleSwitch on={enabled} onClick={onToggle} label={`${name} টগল করুন`} />
      </div>
      {enabled && children && <div className="mt-4 space-y-2.5">{children}</div>}
    </div>
  );
}

function TextField({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-line px-4 py-2.5 text-sm outline-none focus:border-ink"
    />
  );
}

const PIXEL_META = {
  facebook_pixel: { icon: FacebookIcon, name: "Facebook Pixel", desc: "ফেসবুক/ইনস্টাগ্রাম অ্যাডের কনভার্শন ট্র্যাক করবে।", fieldLabel: "Pixel ID", fieldKey: "pixel_id" as const },
  tiktok_pixel: { icon: Music2, name: "TikTok Pixel", desc: "TikTok অ্যাডের কনভার্শন ট্র্যাক করবে।", fieldLabel: "Pixel ID", fieldKey: "pixel_id" as const },
  google_analytics: { icon: BarChart3, name: "Google Analytics", desc: "সাইটের ভিজিটর, ট্রাফিক সোর্স ও আচরণ বিশ্লেষণ করবে (GA4)।", fieldLabel: "Measurement ID (G-XXXXXXXXXX)", fieldKey: "measurement_id" as const },
  microsoft_clarity: { icon: Eye, name: "Microsoft Clarity", desc: "হিটম্যাপ ও সেশন রেকর্ডিং দিয়ে দেখাবে ভিজিটররা সাইটে কী করছে।", fieldLabel: "Project ID", fieldKey: "project_id" as const },
  google_tag_manager: { icon: Tag, name: "Google Tag Manager", desc: "কোড ছাড়াই একসাথে একাধিক ট্র্যাকিং ট্যাগ ম্যানেজ করার জন্য।", fieldLabel: "Container ID (GTM-XXXXXXX)", fieldKey: "container_id" as const },
  google_ads: { icon: Target, name: "Google Ads", desc: "গুগল অ্যাডের কনভার্শন ট্র্যাক করবে।", fieldLabel: "Conversion ID (AW-XXXXXXXXX)", fieldKey: "conversion_id" as const },
} as const;

export default function AddonsForm({ initial }: { initial: AddonsConfig }) {
  const [config, setConfig] = useState<AddonsConfig>(initial);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);

  function togglePixel(key: keyof typeof PIXEL_META) {
    setConfig((c) => ({ ...c, [key]: { ...c[key], enabled: !c[key].enabled } }));
  }
  function setPixelField(key: keyof typeof PIXEL_META, value: string) {
    setConfig((c) => ({ ...c, [key]: { ...c[key], [PIXEL_META[key].fieldKey]: value } }));
  }

  async function handleSave() {
    setSaving(true);
    setNotice(null);
    const result = await updateAddons(config);
    setSaving(false);
    setNotice(result.ok ? { ok: true, text: "সেভ হয়েছে।" } : { ok: false, text: result.error });
  }

  const smsConfigured = Boolean(config.sms_gateway.api_key && config.sms_gateway.sender_id);

  return (
    <div className="mt-6 max-w-2xl space-y-8">
      {/* ---- Marketing pixels ---- */}
      <div className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-text-muted">মার্কেটিং ট্র্যাকিং</h2>
        {(Object.keys(PIXEL_META) as (keyof typeof PIXEL_META)[]).map((key) => {
          const meta = PIXEL_META[key];
          const addon = config[key];
          return (
            <AddonCard
              key={key}
              icon={meta.icon}
              name={meta.name}
              desc={meta.desc}
              enabled={addon.enabled}
              onToggle={() => togglePixel(key)}
            >
              <TextField
                value={(addon as unknown as Record<string, string>)[meta.fieldKey]}
                onChange={(v) => setPixelField(key, v)}
                placeholder={meta.fieldLabel}
              />
            </AddonCard>
          );
        })}
      </div>

      {/* ---- SMS gateway (shared by the two SMS-based addons below) ---- */}
      <div className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-text-muted">SMS গেটওয়ে (BulkSMSBD)</h2>
        <div className="rounded-2xl border border-line bg-paper-raised p-5">
          <p className="mb-3 text-xs text-text-muted">
            bulksmsbd.net ড্যাশবোর্ড থেকে API key ও Sender ID নিন — নিচের দুটো ফিচারই এটা ব্যবহার করবে।
          </p>
          <div className="space-y-2.5">
            <TextField
              value={config.sms_gateway.api_key}
              onChange={(v) => setConfig((c) => ({ ...c, sms_gateway: { ...c.sms_gateway, api_key: v } }))}
              placeholder="API Key"
            />
            <TextField
              value={config.sms_gateway.sender_id}
              onChange={(v) => setConfig((c) => ({ ...c, sms_gateway: { ...c.sms_gateway, sender_id: v } }))}
              placeholder="Sender ID"
            />
          </div>
        </div>

        <AddonCard
          icon={MessageSquare}
          name="Fake Order Protection"
          desc="অর্ডার কনফার্ম করার আগে গ্রাহকের মোবাইল নাম্বার OTP দিয়ে ভেরিফাই করাবে — ভুয়া অর্ডার ঠেকাতে।"
          enabled={config.fake_order_protection.enabled}
          onToggle={() =>
            setConfig((c) => ({ ...c, fake_order_protection: { enabled: !c.fake_order_protection.enabled } }))
          }
        >
          {!smsConfigured && (
            <p className="flex items-center gap-1.5 text-xs text-signal-dark">
              <Info size={13} /> উপরে SMS গেটওয়ে কনফিগার করুন, নাহলে OTP পাঠানো যাবে না।
            </p>
          )}
        </AddonCard>

        <AddonCard
          icon={MessageSquare}
          name="অর্ডার কনফার্মেশন SMS"
          desc="অর্ডার সফল হলে গ্রাহকের নাম্বারে অর্ডার নম্বর ও মোট টাকাসহ একটা SMS যাবে।"
          enabled={config.order_sms_notifications.enabled}
          onToggle={() =>
            setConfig((c) => ({ ...c, order_sms_notifications: { enabled: !c.order_sms_notifications.enabled } }))
          }
        >
          {!smsConfigured && (
            <p className="flex items-center gap-1.5 text-xs text-signal-dark">
              <Info size={13} /> উপরে SMS গেটওয়ে কনফিগার করুন, নাহলে SMS পাঠানো যাবে না।
            </p>
          )}
        </AddonCard>
      </div>

      {/* ---- AI Calling (generic — provider not wired yet) ---- */}
      <div className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-text-muted">অটোমেশন</h2>
        <AddonCard
          icon={PhoneCall}
          name="AI Calling (অর্ডার কনফার্মেশন কল)"
          desc="অর্ডার হলে স্বয়ংক্রিয়ভাবে গ্রাহককে কল করে কনফার্ম করাবে।"
          enabled={config.ai_calling.enabled}
          onToggle={() => setConfig((c) => ({ ...c, ai_calling: { ...c.ai_calling, enabled: !c.ai_calling.enabled } }))}
        >
          <p className="flex items-start gap-1.5 rounded-lg bg-signal/10 px-3 py-2 text-xs text-signal-dark">
            <Info size={13} className="mt-0.5 shrink-0" />
            শুধু সেটিংস ফর্ম রেডি করা আছে — আসল কল করার লজিক এখনো যুক্ত হয়নি। কোন
            প্রোভাইডার (EasyPBX, Twilio, ইত্যাদি) ব্যবহার করবেন বলুন, তারপর এটা পুরোপুরি চালু করে দেব।
          </p>
          <TextField
            value={config.ai_calling.api_key}
            onChange={(v) => setConfig((c) => ({ ...c, ai_calling: { ...c.ai_calling, api_key: v } }))}
            placeholder="API Key"
          />
          <TextField
            value={config.ai_calling.api_secret}
            onChange={(v) => setConfig((c) => ({ ...c, ai_calling: { ...c.ai_calling, api_secret: v } }))}
            placeholder="API Secret"
          />
          <TextField
            value={config.ai_calling.base_url}
            onChange={(v) => setConfig((c) => ({ ...c, ai_calling: { ...c.ai_calling, base_url: v } }))}
            placeholder="Base URL"
          />
          <TextField
            value={config.ai_calling.caller_number}
            onChange={(v) => setConfig((c) => ({ ...c, ai_calling: { ...c.ai_calling, caller_number: v } }))}
            placeholder="Caller Number"
          />
        </AddonCard>
      </div>

      {/* ---- Store experience ---- */}
      <div className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-text-muted">স্টোর এক্সপেরিয়েন্স</h2>
        <AddonCard
          icon={Flame}
          name="Instant Sales Booster"
          desc="স্টক কম থাকলে প্রোডাক্ট কার্ডে 'মাত্র X টি বাকি' ব্যাজ দেখাবে — আসল স্টক সংখ্যা থেকে, বানানো না।"
          enabled={config.instant_sales_booster.enabled}
          onToggle={() =>
            setConfig((c) => ({
              ...c,
              instant_sales_booster: { ...c.instant_sales_booster, enabled: !c.instant_sales_booster.enabled },
            }))
          }
        >
          <div>
            <label className="mb-1 block text-xs text-text-muted">এর নিচে স্টক থাকলে ব্যাজ দেখাবে</label>
            <input
              type="number"
              min={1}
              value={config.instant_sales_booster.low_stock_threshold}
              onChange={(e) =>
                setConfig((c) => ({
                  ...c,
                  instant_sales_booster: {
                    ...c.instant_sales_booster,
                    low_stock_threshold: Number(e.target.value) || 1,
                  },
                }))
              }
              className="w-24 rounded-xl border border-line px-3 py-2 text-sm outline-none focus:border-ink"
            />
          </div>
        </AddonCard>

        <AddonCard
          icon={Smartphone}
          name="Progressive Web App (PWA)"
          desc="গ্রাহকরা সাইটটা মোবাইলের হোম স্ক্রিনে অ্যাপের মতো ইনস্টল করতে পারবে।"
          enabled={config.pwa.enabled}
          onToggle={() => setConfig((c) => ({ ...c, pwa: { enabled: !c.pwa.enabled } }))}
        />
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
