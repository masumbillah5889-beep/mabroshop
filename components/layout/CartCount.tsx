"use client";

import { useCart } from "@/lib/cart-context";

export default function CartCount() {
  const { itemCount } = useCart();
  if (itemCount === 0) return null;
  return (
    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-signal text-[11px] font-bold text-white">
      {itemCount}
    </span>
  );
}
