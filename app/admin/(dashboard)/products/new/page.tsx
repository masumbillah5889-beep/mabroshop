import { getAdminCategories } from "@/lib/data";
import ProductForm from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const categories = await getAdminCategories();
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">নতুন প্রোডাক্ট যোগ করুন</h1>
      <ProductForm categories={categories} />
    </div>
  );
}
