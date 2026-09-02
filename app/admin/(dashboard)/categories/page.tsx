import Image from "next/image";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { getCategories } from "@/lib/data";

export default async function CategoriesPage() {
  const categories = await getCategories();
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">ক্যাটাগরি ({categories.length})</h1>
      <p className="mt-1 text-sm text-text-muted">
        প্রতিটি ক্যাটাগরির নিজস্ব ল্যান্ডিং পেজ, ব্যানার ও ট্রাস্ট পয়েন্ট এখান থেকে এডিট করা যাবে।
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/admin/categories/${c.id}/edit`}
            className="group overflow-hidden rounded-2xl border border-line bg-paper-raised transition-shadow hover:shadow-[0_8px_20px_rgba(14,31,60,0.1)]"
          >
            <div className="relative h-28">
              {c.banner_image_url && (
                <Image src={c.banner_image_url} alt={c.name} fill sizes="400px" className="object-cover" />
              )}
              <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 transition-opacity group-hover:opacity-100">
                <Pencil size={14} />
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-ink">{c.name}</h3>
              <p className="mt-0.5 line-clamp-1 text-xs text-text-muted">{c.tagline}</p>
              <p className="mt-2 text-xs text-text-muted">{c.trust_points?.length ?? 0}টি ট্রাস্ট পয়েন্ট সেট করা আছে</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
