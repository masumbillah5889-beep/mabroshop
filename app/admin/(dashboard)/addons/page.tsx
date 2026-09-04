import { getAddons } from "@/lib/data";
import AddonsForm from "@/components/admin/AddonsForm";

export default async function AddonsPage() {
  const addons = await getAddons();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">অ্যাডঅনস</h1>
      <p className="mt-1 text-sm text-text-muted">
        মার্কেটিং ট্র্যাকিং ও অতিরিক্ত ফিচার চালু/বন্ধ করুন — কোনো কোড ছাড়াই।
      </p>
      <AddonsForm initial={addons} />
    </div>
  );
}
