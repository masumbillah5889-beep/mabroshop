"use client";

import { useState, useTransition } from "react";
import { Send } from "lucide-react";
import { sendOrderToSupplier } from "@/lib/actions";
import { formatTaka } from "@/lib/utils";
import type { Order, OrderItem } from "@/lib/types";

type OrderWithItems = Order & { items: OrderItem[] };

const STATUS_LABEL: Record<string, string> = {
  not_sent: "পাঠানো হয়নি",
  approved: "এপ্রুভড",
  delivered: "ডেলিভারড",
  cancelled: "ক্যান্সেল",
};

const STATUS_TONE: Record<string, string> = {
  not_sent: "bg-paper text-text-muted",
  approved: "bg-signal/10 text-signal-dark",
  delivered: "bg-trust-bg text-trust",
  cancelled: "bg-red-50 text-red-600",
};

export default function OrdersTable({ orders }: { orders: OrderWithItems[] }) {
  const [isPending, startTransition] = useTransition();
  const [notice, setNotice] = useState<string | null>(null);

  function handleSend(orderId: string) {
    setNotice(null);
    startTransition(async () => {
      const result = await sendOrderToSupplier(orderId);
      if (!result.ok) setNotice(result.error);
    });
  }

  return (
    <div>
      {notice && (
        <p className="mb-3 rounded-lg bg-signal/10 px-3 py-2 text-xs text-signal-dark">{notice}</p>
      )}
      <div className="overflow-x-auto rounded-2xl border border-line">
        <table className="w-full text-sm">
          <thead className="bg-paper text-left text-xs uppercase text-text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">অর্ডার</th>
              <th className="px-4 py-3 font-medium">গ্রাহক</th>
              <th className="px-4 py-3 font-medium">পেমেন্ট</th>
              <th className="px-4 py-3 font-medium">মোট</th>
              <th className="px-4 py-3 font-medium">সাপ্লায়ার স্ট্যাটাস</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-4 py-3 font-semibold text-ink">#{order.order_number}</td>
                <td className="px-4 py-3">
                  <div className="text-ink">{order.customer_name}</div>
                  <div className="text-xs text-text-muted">{order.customer_phone}</div>
                </td>
                <td className="px-4 py-3 text-text-muted">
                  {order.payment_method === "cod" ? "COD" : "অনলাইন"}
                </td>
                <td className="px-4 py-3 font-semibold text-ink">{formatTaka(order.total)}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_TONE[order.supplier_status]}`}>
                    {STATUS_LABEL[order.supplier_status]}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  {order.supplier_status === "not_sent" && (
                    <button
                      disabled={isPending}
                      onClick={() => handleSend(order.id)}
                      className="flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-white hover:bg-ink-light disabled:opacity-50"
                    >
                      <Send size={12} /> সাপ্লায়ারে পাঠান
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
