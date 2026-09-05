import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/lib/data";

export default async function PopularCategoryIcons() {
  const categories = await getCategories();
  if (categories.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <h2 className="font-display text-center text-lg font-bold text-ink md:text-xl">জনপ্রিয় ক্যাটাগরি</h2>
      <div className="mt-6 flex flex-wrap justify-center gap-6 md:gap-8">
        {categories.map((cat) => (
          <Link key={cat.id} href={`/category/${cat.slug}`} className="group flex w-16 flex-col items-center gap-2 md:w-20">
            <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-line bg-paper-raised transition-colors group-hover:border-signal md:h-16 md:w-16">
              {cat.banner_image_url && (
                <Image src={cat.banner_image_url} alt={cat.name} fill sizes="64px" className="object-cover" />
              )}
            </div>
            <span className="line-clamp-2 text-center text-[11px] font-medium leading-tight text-text-muted group-hover:text-ink">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
