import { getAbandonedCheckouts } from "@/lib/data";
import AbandonedCheckoutsTable from "@/components/admin/AbandonedCheckoutsTable";

export default async function IncompleteOrdersPage() {
  const items = await getAbandonedCheckouts();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">অসম্পূর্ণ চেকআউট</h1>
      <p className="mt-1 text-sm text-text-muted">
        যারা চেকআউট পেজে তথ্য দেওয়া শুরু করেছেন কিন্তু অর্ডার শেষ করেননি — ফলো-আপ কল করার জন্য।
        কোনো ফোন নাম্বার অর্ডার সম্পূর্ণ করলেই এই তালিকা থেকে নিজে থেকে সরে যায়।
      </p>
      <AbandonedCheckoutsTable initial={items} />
    </div>
  );
}
