import { getBranding } from "@/lib/data";
import BrandingForm from "@/components/admin/BrandingForm";

export default async function BrandingPage() {
  const branding = await getBranding();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">থিম / ব্র্যান্ডিং</h1>
      <p className="mt-1 text-sm text-text-muted">
        সাইটের নাম, লোগো, যোগাযোগের তথ্য ও রঙ — এখান থেকে বদলান। নতুন ক্লায়েন্টের জন্য এই একটা পেজ
        দিয়েই পুরো সাইট তাদের ব্র্যান্ডে সাজানো যাবে, কোনো কোড পরিবর্তন ছাড়াই।
      </p>
      <BrandingForm initial={branding} />
    </div>
  );
}
