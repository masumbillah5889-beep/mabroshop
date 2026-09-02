import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Category } from "@/lib/types";

export default function CategoryHero({ category }: { category: Category }) {
  return (
    <section className="relative overflow-hidden bg-ink">
      {category.banner_image_url && (
        <Image
          src={category.banner_image_url}
          alt={category.name}
          fill
          sizes="100vw"
          className="object-cover opacity-25"
          priority
        />
      )}
      <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-signal/25 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-14 md:py-20">
        <div className="mb-4 flex items-center gap-1.5 text-xs text-text-inverse/60">
          <Link href="/" className="hover:text-white">হোম</Link>
          <ChevronRight size={13} />
          <span className="text-white">{category.name}</span>
        </div>
        {category.tagline && (
          <p className="text-sm font-medium text-signal-light">{category.tagline}</p>
        )}
        <h1 className="font-display mt-2 max-w-2xl text-3xl font-bold text-white md:text-4xl">
          {category.name}
        </h1>
        {category.description && (
          <p className="mt-3 max-w-xl text-sm text-text-inverse/70 md:text-base">
            {category.description}
          </p>
        )}
      </div>
    </section>
  );
}
