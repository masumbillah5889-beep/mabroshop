import { getOrdersSentToSupplier } from "@/lib/data";
import SupplierBoard from "@/components/admin/SupplierBoard";

export default async function SendToSupplierPage() {
  const orders = await getOrdersSentToSupplier();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">সেন্ট টু সাপ্লায়ার</h1>
      <p className="mt-1 text-sm text-text-muted">
        সাপ্লায়ারের কাছে পাঠানো অর্ডারগুলোর স্ট্যাটাস — এপ্রুভড, ডেলিভারড ও ক্যান্সেল আলাদাভাবে দেখুন।
        প্রতিটি প্রোডাক্টের দাম আলাদাভাবে দেখা যাবে এবং নিচে যোগফল দেখা যাবে।
      </p>
      <div className="mt-6">
        <SupplierBoard orders={orders} />
      </div>
    </div>
  );
}
