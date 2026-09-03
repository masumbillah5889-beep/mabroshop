import { notFound } from "next/navigation";
import { getAdminCategories, getProductById } from "@/lib/data";
import ProductForm from "@/components/admin/ProductForm";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [categories, product] = await Promise.all([getAdminCategories(), getProductById(id)]);
  if (!product) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">প্রোডাক্ট এডিট করুন</h1>
      <p className="mt-1 text-sm text-text-muted">{product.name}</p>
      <ProductForm categories={categories} product={product} />
    </div>
  );
}
