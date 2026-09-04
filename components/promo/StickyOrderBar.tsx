"use client";

import { useCart } from "@/lib/cart-context";
import { useRouter } from "next/navigation";
import { formatTaka } from "@/lib/utils";
import type { Product } from "@/lib/types";

export default function StickyOrderBar({ product }: { product: Product }) {
  const { addItem } = useCart();
  const router = useRouter();

  function handleOrder() {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images?.[0]?.image_url ?? null,
    });
    router.push("/checkout");
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-line bg-paper-raised px-4 py-2.5 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] md:hidden">
      <span className="font-display shrink-0 text-base font-bold text-ink">{formatTaka(product.price)}</span>
      <button
        onClick={handleOrder}
        className="flex-1 rounded-full bg-signal py-2.5 text-sm font-bold text-white hover:bg-signal-dark"
      >
        এখনই অর্ডার করুন
      </button>
    </div>
  );
}
