import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import type { Category, Product } from "@/lib/types";

export default function CategoryShowcase({
  category,
  products,
  lowStockThreshold,
}: {
  category: Category;
  products: Product[];
  lowStockThreshold?: number;
}) {
  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <div className="grid gap-5 md:grid-cols-[280px_1fr]">
        {/* Container 1 — the category's banner, editable from /admin/categories */}
        <Link
          href={`/category/${category.slug}`}
          className="group relative flex min-h-[200px] flex-col justify-end overflow-hidden rounded-2xl bg-ink md:min-h-full"
        >
          {category.banner_image_url && (
            <Image
              src={category.banner_image_url}
              alt={category.name}
              fill
              sizes="(max-width: 768px) 100vw, 280px"
              className="object-cover opacity-75 transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
          <div className="relative p-5">
            <h2 className="font-display text-lg font-bold text-white md:text-xl">{category.name}</h2>
            <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-signal-light">
              সব দেখুন <ArrowRight size={13} />
            </span>
          </div>
        </Link>

        {/* Container 2 — up to 6 products from this category */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {products.slice(0, 6).map((p) => (
            <ProductCard key={p.id} product={p} lowStockThreshold={lowStockThreshold} />
          ))}
        </div>
      </div>
    </section>
  );
}
