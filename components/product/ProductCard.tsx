import Link from "next/link";
import Image from "next/image";
import TiltCard from "@/components/ui/TiltCard";
import { DiscountBadge } from "@/components/ui/Badge";
import { formatTaka, discountPercent } from "@/lib/utils";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const image = product.images?.find((i) => i.is_primary) ?? product.images?.[0];
  const percent = discountPercent(product.price, product.compare_at_price);

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <TiltCard strength={6} className="rounded-2xl bg-paper-raised p-3 shadow-[0_1px_2px_rgba(14,31,60,0.06)] transition-shadow group-hover:shadow-[0_12px_28px_rgba(14,31,60,0.14)]">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-paper" style={{ transform: "translateZ(20px)" }}>
          {image && (
            <Image
              src={image.image_url}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          )}
          {percent && <DiscountBadge percent={percent} />}
        </div>
        <div className="mt-3 px-1" style={{ transform: "translateZ(12px)" }}>
          <h3 className="line-clamp-2 text-sm font-medium text-text">{product.name}</h3>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="font-display text-base font-bold text-ink">
              {formatTaka(product.price)}
            </span>
            {product.compare_at_price && (
              <span className="text-xs text-text-muted line-through">
                {formatTaka(product.compare_at_price)}
              </span>
            )}
          </div>
        </div>
      </TiltCard>
    </Link>
  );
}
