"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, PackageCheck, XCircle, Phone } from "lucide-react";
import { updateSupplierStatus } from "@/lib/actions";
import { formatTaka } from "@/lib/utils";
import type { Order, OrderItem, SupplierStatus } from "@/lib/types";

type OrderWithItems = Order & { items: OrderItem[] };

const TABS: { key: Extract<SupplierStatus, "approved" | "delivered" | "cancelled">; label: string }[] = [
  { key: "approved", label: "এপ্রুভড" },
  { key: "delivered", label: "ডেলিভারড" },
  { key: "cancelled", label: "ক্যান্সেল" },
];

export default function SupplierBoard({ orders }: { orders: OrderWithItems[] }) {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["key"]>("approved");
  const [isPending, startTransition] = useTransition();
  const [notice, setNotice] = useState<string | null>(null);

  const visibleOrders = orders.filter((o) => o.supplier_status === activeTab);
  const tabTotal = visibleOrders.reduce((sum, o) => sum + o.total, 0);

  function handleStatusChange(orderId: string, status: "approved" | "delivered" | "cancelled") {
    setNotice(null);
    startTransition(async () => {
      const result = await updateSupplierStatus(orderId, status);
      if (!result.ok) setNotice(result.error);
    });
  }

  return (
    <div>
      <div className="flex gap-2 border-b border-line">
        {TABS.map((tab) => {
          const count = orders.filter((o) => o.supplier_status === tab.key).length;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative -mb-px flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                activeTab === tab.key
                  ? "border-ink text-ink"
                  : "border-transparent text-text-muted hover:text-ink"
              }`}
            >
              {tab.label}
              <span className="rounded-full bg-paper px-1.5 py-0.5 text-xs font-medium text-text-muted">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {notice && (
        <p className="mt-4 rounded-lg bg-signal/10 px-3 py-2 text-xs text-signal-dark">{notice}</p>
      )}

      <div className="mt-5 space-y-4">
        {visibleOrders.length === 0 && (
          <p className="py-10 text-center text-sm text-text-muted">এই তালিকায় কোনো অর্ডার নেই।</p>
        )}

        {visibleOrders.map((order) => (
          <div key={order.id} className="overflow-hidden rounded-2xl border border-line bg-paper-raised">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-paper px-5 py-3">
              <div>
                <span className="font-display font-bold text-ink">অর্ডার #{order.order_number}</span>
                <span className="ml-3 text-sm text-text-muted">{order.customer_name}</span>
                <span className="ml-2 inline-flex items-center gap-1 text-xs text-text-muted">
                  <Phone size={11} /> {order.customer_phone}
                </span>
              </div>
              <div className="flex gap-2">
                {order.supplier_status !== "delivered" && order.supplier_status !== "cancelled" && (
                  <button
                    disabled={isPending}
                    onClick={() => handleStatusChange(order.id, "delivered")}
                    className="flex items-center gap-1.5 rounded-full bg-trust px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90 disabled:opacity-50"
                  >
                    <PackageCheck size={13} /> ডেলিভারড করুন
                  </button>
                )}
                {order.supplier_status === "approved" && (
                  <button
                    disabled={isPending}
                    onClick={() => handleStatusChange(order.id, "cancelled")}
                    className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-text-muted hover:border-signal hover:text-signal-dark disabled:opacity-50"
                  >
                    <XCircle size={13} /> ক্যান্সেল করুন
                  </button>
                )}
                {order.supplier_status === "cancelled" && (
                  <button
                    disabled={isPending}
                    onClick={() => handleStatusChange(order.id, "approved")}
                    className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-text-muted hover:border-ink hover:text-ink disabled:opacity-50"
                  >
                    <CheckCircle2 size={13} /> আবার এপ্রুভ করুন
                  </button>
                )}
              </div>
            </div>

            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase text-text-muted">
                <tr>
                  <th className="px-5 py-2 font-medium">প্রোডাক্ট</th>
                  <th className="px-5 py-2 font-medium">পরিমাণ</th>
                  <th className="px-5 py-2 text-right font-medium">দাম</th>
                  <th className="px-5 py-2 text-right font-medium">সাব-টোটাল</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-5 py-2.5 text-ink">{item.product_name}</td>
                    <td className="px-5 py-2.5 text-text-muted">{item.quantity}</td>
                    <td className="px-5 py-2.5 text-right text-text-muted">{formatTaka(item.unit_price)}</td>
                    <td className="px-5 py-2.5 text-right font-semibold text-ink">
                      {formatTaka(item.line_total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between border-t border-line bg-paper px-5 py-2.5 text-sm">
              <span className="text-text-muted">ডেলিভারি চার্জ + সাবটোটাল</span>
              <span className="font-display font-bold text-ink">{formatTaka(order.total)}</span>
            </div>
          </div>
        ))}
      </div>

      {visibleOrders.length > 0 && (
        <div className="mt-5 flex items-center justify-between rounded-2xl bg-ink px-6 py-4 text-white">
          <span className="text-sm font-medium text-text-inverse/80">
            {TABS.find((t) => t.key === activeTab)?.label} মোট ({visibleOrders.length}টি অর্ডার)
          </span>
          <span className="font-display text-xl font-bold">{formatTaka(tabTotal)}</span>
        </div>
      )}
    </div>
  );
}
