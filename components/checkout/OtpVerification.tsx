"use client";

import { useState } from "react";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { sendCheckoutOtp, verifyCheckoutOtp } from "@/lib/actions";
import { Button } from "@/components/ui/Button";

export default function OtpVerification({
  phone,
  verified,
  onVerified,
}: {
  phone: string;
  verified: boolean;
  onVerified: () => void;
}) {
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState("");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSend() {
    if (!phone) {
      setError("প্রথমে মোবাইল নাম্বার লিখুন।");
      return;
    }
    setError(null);
    setSending(true);
    const result = await sendCheckoutOtp(phone);
    setSending(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setSent(true);
  }

  async function handleVerify() {
    setError(null);
    setVerifying(true);
    const result = await verifyCheckoutOtp(phone, code);
    setVerifying(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    onVerified();
  }

  if (verified) {
    return (
      <div className="flex items-center gap-2 rounded-xl bg-trust-bg px-4 py-2.5 text-sm text-trust">
        <CheckCircle2 size={16} /> মোবাইল নাম্বার ভেরিফাই করা হয়েছে
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-line bg-paper-raised p-4">
      <div className="flex items-center gap-2 text-sm font-medium text-ink">
        <ShieldCheck size={16} className="text-signal" /> মোবাইল নাম্বার ভেরিফিকেশন
      </div>
      <p className="mt-1 text-xs text-text-muted">
        ভুয়া অর্ডার ঠেকাতে অর্ডার কনফার্ম করার আগে একটা OTP কোড দিয়ে যাচাই করুন।
      </p>

      {!sent ? (
        <Button
          type="button"
          variant="ghost"
          size="md"
          className="mt-3"
          onClick={handleSend}
          disabled={sending}
        >
          {sending ? "পাঠানো হচ্ছে..." : "OTP পাঠান"}
        </Button>
      ) : (
        <div className="mt-3 flex gap-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="৬ ডিজিটের কোড"
            inputMode="numeric"
            className="w-36 rounded-xl border border-line px-4 py-2.5 text-sm outline-none focus:border-ink"
          />
          <Button type="button" size="md" onClick={handleVerify} disabled={verifying || code.length < 6}>
            {verifying ? "যাচাই হচ্ছে..." : "ভেরিফাই করুন"}
          </Button>
          <button
            type="button"
            onClick={handleSend}
            disabled={sending}
            className="text-xs font-medium text-text-muted underline hover:text-ink"
          >
            আবার পাঠান
          </button>
        </div>
      )}

      {error && <p className="mt-2 text-xs text-signal-dark">{error}</p>}
    </div>
  );
}
