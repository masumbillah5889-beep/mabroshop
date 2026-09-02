import Image from "next/image";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { getCategories, getProductsByCategory } from "@/lib/data";
import { formatTaka } from "@/lib/utils";

export default async function ProductsPage() {
  const categories = await getCategories();
  const lists = await Promise.all(categories.map((c) => getProductsByCategory(c.id)));
  const products = lists.flat();
  const categoryName = (id: string) => categories.find((c) => c.id === id)?.name ?? "—";

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-ink">প্রোডাক্ট ({products.length})</h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-ink-light"
        >
          <Plus size={15} /> নতুন প্রোডাক্ট
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-line">
        <table className="w-full text-sm">
          <thead className="bg-paper text-left text-xs uppercase text-text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">প্রোডাক্ট</th>
              <th className="px-4 py-3 font-medium">ক্যাটাগরি</th>
              <th className="px-4 py-3 font-medium">দাম</th>
              <th className="px-4 py-3 font-medium">স্টক</th>
              <th className="px-4 py-3 font-medium">স্ট্যাটাস</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {products.map((p) => (
              <tr key={p.id}>
                <td className="flex items-center gap-3 px-4 py-3">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-paper">
                    {p.images?.[0] && (
                      <Image src={p.images[0].image_url} alt={p.name} fill sizes="40px" className="object-cover" />
                    )}
                  </div>
                  <span className="text-ink">{p.name}</span>
                </td>
                <td className="px-4 py-3 text-text-muted">{categoryName(p.category_id)}</td>
                <td className="px-4 py-3 font-semibold text-ink">{formatTaka(p.price)}</td>
                <td className="px-4 py-3 text-text-muted">{p.stock_quantity}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      p.is_active ? "bg-trust-bg text-trust" : "bg-paper text-text-muted"
                    }`}
                  >
                    {p.is_active ? "একটিভ" : "নিষ্ক্রিয়"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/products/${p.id}/edit`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-ink hover:border-ink"
                  >
                    <Pencil size={12} /> এডিট
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
