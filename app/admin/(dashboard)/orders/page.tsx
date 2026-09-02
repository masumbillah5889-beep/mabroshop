import { getOrders } from "@/lib/data";
import OrdersTable from "@/components/admin/OrdersTable";

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">অর্ডারসমূহ</h1>
      <p className="mt-1 text-sm text-text-muted">সব অর্ডার এখানে দেখুন এবং সাপ্লায়ারে পাঠান।</p>
      <div className="mt-6">
        <OrdersTable orders={orders} />
      </div>
    </div>
  );
}
