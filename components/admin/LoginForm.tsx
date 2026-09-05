"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import type { Branding } from "@/lib/types";

export default function LoginForm({ branding }: { branding: Branding }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const restOfName = branding.site_name.replace(branding.site_name_accent, "").trim();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError("ইমেইল বা পাসওয়ার্ড সঠিক নয়।");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-6">
      <div className="w-full max-w-sm rounded-2xl bg-paper-raised p-8 shadow-xl">
        <div className="font-display text-xl font-bold text-ink">
          <span className="text-signal">{branding.site_name_accent}</span>
          {restOfName ? ` ${restOfName}` : ""} <span className="text-text-muted">অ্যাডমিন</span>
        </div>

        {!configured && (
          <p className="mt-4 rounded-lg bg-signal/10 px-3 py-2 text-xs text-signal-dark">
            Supabase এখনো কানেক্ট করা হয়নি — README.md এর সেটআপ ধাপ অনুসরণ করুন, তারপর এই
            পেজ থেকে লগইন করা যাবে।
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ইমেইল"
            className="w-full rounded-xl border border-line px-4 py-2.5 text-sm outline-none focus:border-ink"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="পাসওয়ার্ড"
            className="w-full rounded-xl border border-line px-4 py-2.5 text-sm outline-none focus:border-ink"
          />
          {error && <p className="text-xs text-signal-dark">{error}</p>}
          <Button type="submit" size="lg" className="w-full" disabled={loading || !configured}>
            {loading ? "..." : "লগইন করুন"}
          </Button>
        </form>
      </div>
    </main>
  );
}
