import Link from "next/link";
import { ShoppingBag, Truck, PackageCheck, Boxes } from "lucide-react";
import { getOrders, getCategories } from "@/lib/data";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { formatTaka } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const [orders, categories] = await Promise.all([getOrders(), getCategories()]);

  const delivered = orders.filter((o) => o.supplier_status === "delivered");
  const pendingSupplier = orders.filter((o) => o.supplier_status === "not_sent" || o.supplier_status === "approved");
  const deliveredTotal = delivered.reduce((sum, o) => sum + o.total, 0);

  const stats = [
    { label: "মোট অর্ডার", value: orders.length, icon: ShoppingBag, href: "/admin/orders" },
    { label: "সাপ্লায়ারে পেন্ডিং", value: pendingSupplier.length, icon: Truck, href: "/admin/send-to-supplier" },
    { label: "ডেলিভারড মূল্য (মোট)", value: formatTaka(deliveredTotal), icon: PackageCheck, href: "/admin/send-to-supplier" },
    { label: "একটিভ প্রোডাক্ট", value: MOCK_PRODUCTS.length, icon: Boxes, href: "/admin/products" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">ড্যাশবোর্ড</h1>
      <p className="mt-1 text-sm text-text-muted">{categories.length}টি ক্যাটাগরি চালু আছে</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="rounded-2xl border border-line bg-paper-raised p-5 transition-shadow hover:shadow-[0_8px_20px_rgba(14,31,60,0.08)]"
          >
            <Icon size={20} className="text-signal" />
            <div className="font-display mt-3 text-2xl font-bold text-ink">{value}</div>
            <div className="mt-0.5 text-xs text-text-muted">{label}</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-paper-raised p-6">
        <h2 className="text-sm font-semibold text-ink">সাম্প্রতিক অর্ডার</h2>
        <div className="mt-4 divide-y divide-line">
          {orders.slice(0, 5).map((order) => (
            <div key={order.id} className="flex items-center justify-between py-2.5 text-sm">
              <span className="font-medium text-ink">#{order.order_number} — {order.customer_name}</span>
              <span className="text-text-muted">{formatTaka(order.total)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
