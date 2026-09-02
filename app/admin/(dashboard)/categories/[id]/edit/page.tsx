import { notFound } from "next/navigation";
import { getCategoryById } from "@/lib/data";
import CategoryForm from "@/components/admin/CategoryForm";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = await getCategoryById(id);
  if (!category) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">ক্যাটাগরি এডিট করুন</h1>
      <p className="mt-1 text-sm text-text-muted">{category.name}</p>
      <CategoryForm category={category} />
    </div>
  );
}
