"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import OtpVerification from "@/components/checkout/OtpVerification";
import { useCart } from "@/lib/cart-context";
import { submitOrder } from "@/lib/actions";
import { trackEvent } from "@/lib/tracking-client";
import { formatTaka, deliveryChargeFor } from "@/lib/utils";
import type { DeliveryZone, PaymentMethod } from "@/lib/types";

export default function CheckoutClient({ otpRequired }: { otpRequired: boolean }) {
  const { lines, subtotal, clear } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (lines.length === 0) return;
    trackEvent("InitiateCheckout", {
      value: subtotal,
      contentIds: lines.map((l) => l.productId),
      contentName: lines.map((l) => l.name).join(", "),
    });
    // Only once, when the checkout page first has items to check out —
    // not on every subtotal/lines change while the shopper is on this page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines.length > 0]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [zone, setZone] = useState<DeliveryZone>("inside_dhaka");
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [otpVerified, setOtpVerified] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deliveryCharge = deliveryChargeFor(zone);
  const total = subtotal + deliveryCharge;

  function handlePhoneChange(value: string) {
    setPhone(value);
    setOtpVerified(false); // a changed number needs to be re-verified
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (otpRequired && !otpVerified) {
      setError("অর্ডার কনফার্ম করার আগে মোবাইল নাম্বার OTP দিয়ে ভেরিফাই করুন।");
      return;
    }
    setSubmitting(true);
    const result = await submitOrder({
      customerName: name,
      customerPhone: phone,
      customerAddress: address,
      deliveryZone: zone,
      paymentMethod: payment,
      lines,
    });
    setSubmitting(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    clear();
    router.push(`/order-confirmation/${result.orderNumber}`);
  }

  if (lines.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="text-sm text-text-muted">চেকআউট করার আগে কার্টে কিছু যোগ করুন।</p>
        <Link href="/shop" className="mt-4 inline-block font-semibold text-signal">
          শপে যান
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-8">
        <h1 className="font-display text-2xl font-bold text-ink">অর্ডার ডিটেইলস</h1>

        <div className="mt-6 grid gap-8 md:grid-cols-[1fr_360px]">
          <div>
            <div className="overflow-hidden rounded-2xl border border-line">
              <table className="w-full text-sm">
                <thead className="bg-paper text-left text-xs uppercase text-text-muted">
                  <tr>
                    <th className="px-4 py-3 font-medium">প্রোডাক্ট</th>
                    <th className="px-4 py-3 font-medium">দাম</th>
                    <th className="px-4 py-3 font-medium">পরিমাণ</th>
                    <th className="px-4 py-3 text-right font-medium">সর্বমোট</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {lines.map((l) => (
                    <tr key={l.productId}>
                      <td className="flex items-center gap-3 px-4 py-3">
                        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-paper">
                          {l.image && <Image src={l.image} alt={l.name} fill sizes="44px" className="object-cover" />}
                        </div>
                        <span className="line-clamp-2 text-ink">{l.name}</span>
                      </td>
                      <td className="px-4 py-3 text-text-muted">{formatTaka(l.price)}</td>
                      <td className="px-4 py-3 text-text-muted">{l.quantity}</td>
                      <td className="px-4 py-3 text-right font-semibold text-ink">
                        {formatTaka(l.price * l.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 space-y-1.5 rounded-2xl border border-line px-5 py-4 text-sm">
              <div className="flex justify-between text-text-muted">
                <span>সাবটোটাল</span>
                <span>{formatTaka(subtotal)}</span>
              </div>
              <div className="flex justify-between text-text-muted">
                <span>ডেলিভারি চার্জ</span>
                <span>{formatTaka(deliveryCharge)}</span>
              </div>
              <div className="flex justify-between border-t border-line pt-1.5 text-base font-bold text-ink">
                <span>সর্বমোট</span>
                <span>{formatTaka(total)}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <h2 className="text-sm font-semibold text-ink">শিপিং ঠিকানা</h2>
              <div className="mt-3 space-y-3">
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="আপনার নাম"
                  className="w-full rounded-xl border border-line bg-paper-raised px-4 py-2.5 text-sm outline-none focus:border-ink"
                />
                <input
                  required
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="আপনার মোবাইল নাম্বার (01XXXXXXXXX)"
                  className="w-full rounded-xl border border-line bg-paper-raised px-4 py-2.5 text-sm outline-none focus:border-ink"
                />
                {otpRequired && (
                  <OtpVerification phone={phone} verified={otpVerified} onVerified={() => setOtpVerified(true)} />
                )}
                <textarea
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="আপনার সম্পূর্ণ ঠিকানা (জেলা, থানা, রোড, বাসা)"
                  rows={3}
                  className="w-full rounded-xl border border-line bg-paper-raised px-4 py-2.5 text-sm outline-none focus:border-ink"
                />
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-ink">ডেলিভারি এলাকা নির্বাচন করুন</h2>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {(
                  [
                    { key: "inside_dhaka", label: "ঢাকার ভিতর", charge: 80 },
                    { key: "outside_dhaka", label: "ঢাকার বাইরে", charge: 150 },
                  ] as const
                ).map((opt) => (
                  <button
                    type="button"
                    key={opt.key}
                    onClick={() => setZone(opt.key)}
                    className={`rounded-xl border-2 px-4 py-3 text-left text-sm font-semibold transition-colors ${
                      zone === opt.key
                        ? "border-ink bg-ink text-white"
                        : "border-line text-ink hover:border-ink/40"
                    }`}
                  >
                    {opt.label}
                    <div className="mt-0.5 text-xs font-normal opacity-80">৳{opt.charge}.00</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-ink">পেমেন্ট মেথড সিলেক্ট করুন</h2>
              <div className="mt-3 space-y-2">
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-line px-4 py-3 text-sm has-[:checked]:border-ink">
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === "cod"}
                    onChange={() => setPayment("cod")}
                    className="accent-signal"
                  />
                  ক্যাশ অন ডেলিভারি (Cash on Delivery)
                </label>
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-line px-4 py-3 text-sm has-[:checked]:border-ink">
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === "online"}
                    onChange={() => setPayment("online")}
                    className="accent-signal"
                  />
                  অনলাইন পেমেন্ট (Card / SSLCommerz)
                </label>
              </div>
            </div>

            {error && <p className="text-sm text-signal-dark">{error}</p>}

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={submitting || (otpRequired && !otpVerified)}
            >
              {submitting ? "অপেক্ষা করুন..." : "অর্ডার কনফার্ম করুন"}
            </Button>
          </form>
        </div>
    </main>
  );
}
