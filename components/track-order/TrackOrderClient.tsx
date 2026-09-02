"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Search } from "lucide-react";

const STATUS_LABEL: Record<string, string> = {
  pending: "গ্রহণ করা হয়েছে",
  processing: "প্রসেসিং চলছে",
  shipped: "কুরিয়ারে পাঠানো হয়েছে",
  completed: "ডেলিভারড হয়েছে",
  cancelled: "বাতিল হয়েছে",
};

export default function TrackOrderClient() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<null | "found" | "not-found">(null);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    // Demo-mode lookup — wire this to a real orders query once Supabase is connected
    // (SELECT * FROM orders WHERE order_number = $1 OR customer_phone = $1).
    setResult(query.trim() ? "not-found" : null);
  }

  return (
    <main className="mx-auto max-w-lg px-6 py-14">
        <h1 className="font-display text-2xl font-bold text-ink">অর্ডার ট্র্যাক করুন</h1>
        <p className="mt-1 text-sm text-text-muted">অর্ডার নম্বর অথবা মোবাইল নাম্বার দিয়ে খুঁজুন</p>

        <form onSubmit={handleSearch} className="mt-6 flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="যেমন: 1042 অথবা 01XXXXXXXXX"
            className="flex-1 rounded-xl border border-line bg-paper-raised px-4 py-2.5 text-sm outline-none focus:border-ink"
          />
          <Button type="submit">
            <Search size={16} />
          </Button>
        </form>

        {result === "not-found" && (
          <p className="mt-6 rounded-xl bg-paper-raised px-4 py-3 text-sm text-text-muted">
            এই তথ্য দিয়ে কোনো অর্ডার পাওয়া যায়নি। নম্বরটি আবার চেক করুন অথবা হোয়াটসঅ্যাপে যোগাযোগ করুন।
          </p>
        )}
      </main>
  );
}
