import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/lib/data";

export default async function CategoryGrid() {
  const categories = await getCategories();

  return (
    <section id="categories" className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
            যা খুঁজছেন, বেছে নিন
          </h2>
          <p className="mt-1 text-sm text-text-muted">প্রতিটি ক্যাটাগরির নিজস্ব পেজে বিস্তারিত দেখুন</p>
        </div>
        <Link href="/shop" className="hidden text-sm font-semibold text-signal hover:text-signal-dark md:block">
          সব প্রোডাক্ট
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {categories.map((cat, i) => (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            className={`group relative overflow-hidden rounded-2xl bg-ink ${
              i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-square"
            }`}
          >
            {cat.banner_image_url && (
              <Image
                src={cat.banner_image_url}
                alt={cat.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <h3 className="font-display text-sm font-semibold text-white md:text-base">
                {cat.name}
              </h3>
              {cat.tagline && (
                <p className="mt-0.5 line-clamp-1 text-xs text-white/70">{cat.tagline}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
