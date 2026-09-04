"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { createProduct, updateProduct, deleteProduct } from "@/lib/actions";
import { Button } from "@/components/ui/Button";
import ImageUploadField from "@/components/admin/ImageUploadField";
import type { Category, Product } from "@/lib/types";

export default function ProductForm({
  categories,
  product,
}: {
  categories: Category[];
  product?: Product;
}) {
  const router = useRouter();
  const isEdit = Boolean(product);

  const [form, setForm] = useState({
    name: product?.name ?? "",
    categoryId: product?.category_id ?? categories[0]?.id ?? "",
    price: product ? String(product.price) : "",
    compareAtPrice: product?.compare_at_price ? String(product.compare_at_price) : "",
    description: product?.description ?? "",
    imageUrl: product?.images?.[0]?.image_url ?? "",
    stockQuantity: product ? String(product.stock_quantity) : "0",
    isFeatured: product?.is_featured ?? false,
    isActive: product?.is_active ?? true,
  });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const base = {
      name: form.name,
      categoryId: form.categoryId,
      price: Number(form.price),
      compareAtPrice: form.compareAtPrice ? Number(form.compareAtPrice) : null,
      description: form.description,
      imageUrl: form.imageUrl,
    };

    const result =
      isEdit && product
        ? await updateProduct({
            ...base,
            id: product.id,
            stockQuantity: Number(form.stockQuantity),
            isFeatured: form.isFeatured,
            isActive: form.isActive,
          })
        : await createProduct(base);

    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push("/admin/products");
    router.refresh();
  }

  async function handleDelete() {
    if (!product) return;
    if (!confirmingDelete) {
      setConfirmingDelete(true);
      return;
    }
    setDeleting(true);
    const result = await deleteProduct(product.id);
    setDeleting(false);
    if (!result.ok) {
      setError(result.error);
      setConfirmingDelete(false);
      return;
    }
    router.push("/admin/products");
    router.refresh();
  }

  const field = (key: "name" | "price" | "compareAtPrice" | "imageUrl" | "stockQuantity", label: string, type = "text") => (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-text-muted">{label}</label>
      <input
        type={type}
        required={key === "name" || key === "price"}
        value={form[key]}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        className="w-full rounded-xl border border-line bg-paper-raised px-4 py-2.5 text-sm outline-none focus:border-ink"
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="mt-6 max-w-xl space-y-4">
      {field("name", "প্রোডাক্টের নাম")}

      <div>
        <label className="mb-1.5 block text-xs font-medium text-text-muted">ক্যাটাগরি</label>
        <select
          value={form.categoryId}
          onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
          className="w-full rounded-xl border border-line bg-paper-raised px-4 py-2.5 text-sm outline-none focus:border-ink"
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {field("price", "দাম (৳)", "number")}
        {field("compareAtPrice", "আগের দাম (৳) — ঐচ্ছিক", "number")}
      </div>

      {isEdit && field("stockQuantity", "স্টক সংখ্যা", "number")}

      <ImageUploadField
        label="প্রোডাক্টের ছবি"
        value={form.imageUrl}
        onChange={(url) => setForm((f) => ({ ...f, imageUrl: url }))}
      />

      <div>
        <label className="mb-1.5 block text-xs font-medium text-text-muted">বিবরণ</label>
        <textarea
          rows={4}
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          className="w-full rounded-xl border border-line bg-paper-raised px-4 py-2.5 text-sm outline-none focus:border-ink"
        />
      </div>

      {isEdit && (
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm text-ink">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e) => setForm((f) => ({ ...f, isFeatured: e.target.checked }))}
              className="accent-signal"
            />
            ফিচার্ড (হোমপেজে দেখাবে)
          </label>
          <label className="flex items-center gap-2 text-sm text-ink">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
              className="accent-signal"
            />
            একটিভ (দোকানে দেখাবে)
          </label>
        </div>
      )}

      {error && <p className="rounded-lg bg-signal/10 px-3 py-2 text-xs text-signal-dark">{error}</p>}

      <div className="flex items-center gap-3">
        <Button type="submit" size="lg" disabled={saving}>
          {saving ? "সেভ হচ্ছে..." : isEdit ? "পরিবর্তন সেভ করুন" : "প্রোডাক্ট সেভ করুন"}
        </Button>

        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-1.5 rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-text-muted hover:border-signal hover:text-signal-dark disabled:opacity-50"
          >
            <Trash2 size={15} />
            {deleting ? "ডিলিট হচ্ছে..." : confirmingDelete ? "নিশ্চিত? আবার ক্লিক করুন" : "প্রোডাক্ট ডিলিট করুন"}
          </button>
        )}
      </div>
    </form>
  );
}
