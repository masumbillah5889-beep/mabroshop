import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getProductById } from "@/lib/data";
import LandingPageForm from "@/components/admin/LandingPageForm";

export default async function ProductLandingPagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  return (
    <div>
      <Link href={`/admin/products/${product.id}/edit`} className="flex items-center gap-1 text-xs text-text-muted hover:text-ink">
        <ChevronLeft size={14} /> প্রোডাক্ট এডিটে ফিরে যান
      </Link>
      <h1 className="font-display mt-2 text-2xl font-bold text-ink">প্রমোশন পেজ এডিট করুন</h1>
      <p className="mt-1 text-sm text-text-muted">{product.name}</p>
      <LandingPageForm product={product} />
    </div>
  );
}
