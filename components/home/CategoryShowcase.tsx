import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Award, Headset, ArrowRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import type { Category, Product } from "@/lib/types";

const GENERIC_BADGES = [
  { icon: ShieldCheck, label: "যাচাইকৃত মান" },
  { icon: Award, label: "সেরা ব্র্যান্ড" },
  { icon: Headset, label: "নির্ভরযোগ্য সাপোর্ট" },
];

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
      {/* Container 1 — the category's own banner graphic, full width. Admins
          design/upload this in /admin/categories, so it can carry whatever
          icons/copy they want baked into the image itself. */}
      <Link
        href={`/category/${category.slug}`}
        className="group relative block h-56 overflow-hidden rounded-2xl bg-ink sm:h-72 md:h-[420px]"
      >
        {category.banner_image_url && (
          <Image
            src={category.banner_image_url}
            alt={category.name}
            fill
            sizes="(max-width: 1200px) 100vw, 1152px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
      </Link>

      {/* Generic trust strip under every banner */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-medium text-text-muted">
        {GENERIC_BADGES.map(({ icon: Icon, label }) => (
          <span key={label} className="flex items-center gap-1.5">
            <Icon size={14} className="text-signal" /> {label}
          </span>
        ))}
      </div>

      {/* Heading + View All */}
      <div className="mt-6 flex items-end justify-between">
        <h2 className="font-display text-xl font-bold text-ink md:text-2xl">{category.name}</h2>
        <Link
          href={`/category/${category.slug}`}
          className="flex items-center gap-1 text-sm font-semibold text-signal hover:text-signal-dark"
        >
          সব দেখুন <ArrowRight size={13} />
        </Link>
      </div>

      {/* Container 2 — up to 6 products from this category */}
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        {products.slice(0, 6).map((p) => (
          <ProductCard key={p.id} product={p} lowStockThreshold={lowStockThreshold} />
        ))}
      </div>
    </section>
  );
}
