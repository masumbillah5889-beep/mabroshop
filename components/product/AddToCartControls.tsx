"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/lib/types";

export default function AddToCartControls({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const router = useRouter();

  function handleAdd(goToCheckout = false) {
    addItem(
      {
        productId: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.images?.[0]?.image_url ?? null,
      },
      qty
    );
    if (goToCheckout) router.push("/checkout");
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-full border border-line">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-10 w-10 items-center justify-center text-text-muted hover:text-ink"
            aria-label="কমান"
          >
            <Minus size={16} />
          </button>
          <span className="w-8 text-center text-sm font-semibold">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="flex h-10 w-10 items-center justify-center text-text-muted hover:text-ink"
            aria-label="বাড়ান"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <Button variant="ghost" size="lg" className="flex-1" onClick={() => handleAdd(false)}>
          <ShoppingCart size={18} /> কার্টে যোগ করুন
        </Button>
        <Button size="lg" className="flex-1" onClick={() => handleAdd(true)}>
          এখনই অর্ডার করুন
        </Button>
      </div>
    </div>
  );
}
