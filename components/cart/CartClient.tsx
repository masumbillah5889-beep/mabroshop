"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { useCart } from "@/lib/cart-context";
import { formatTaka } from "@/lib/utils";

export default function CartClient() {
  const { lines, updateQuantity, removeItem, subtotal } = useCart();

  return (
    <main className="mx-auto min-h-[50vh] max-w-4xl px-6 py-10 pb-24 md:pb-10">
        <h1 className="font-display text-2xl font-bold text-ink">আপনার কার্ট</h1>

        {lines.length === 0 ? (
          <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-line py-16 text-center">
            <ShoppingBag size={40} className="text-text-muted" />
            <p className="mt-4 text-sm text-text-muted">আপনার কার্ট খালি।</p>
            <LinkButton href="/shop" className="mt-5">
              কেনাকাটা শুরু করুন
            </LinkButton>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 md:grid-cols-[1fr_320px]">
            <ul className="divide-y divide-line">
              {lines.map((line) => (
                <li key={line.productId} className="flex gap-4 py-5">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-paper-raised">
                    {line.image && (
                      <Image src={line.image} alt={line.name} fill sizes="80px" className="object-cover" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <Link href={`/product/${line.slug}`} className="text-sm font-medium text-ink hover:text-signal">
                        {line.name}
                      </Link>
                      <button
                        onClick={() => removeItem(line.productId)}
                        className="text-text-muted hover:text-signal"
                        aria-label="সরান"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-line">
                        <button
                          onClick={() => updateQuantity(line.productId, line.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center text-text-muted hover:text-ink"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-6 text-center text-xs font-semibold">{line.quantity}</span>
                        <button
                          onClick={() => updateQuantity(line.productId, line.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center text-text-muted hover:text-ink"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <span className="font-display text-sm font-bold text-ink">
                        {formatTaka(line.price * line.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="h-fit rounded-2xl border border-line bg-paper-raised p-5">
              <div className="flex justify-between text-sm text-text-muted">
                <span>সাবটোটাল</span>
                <span className="font-semibold text-ink">{formatTaka(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-text-muted">ডেলিভারি চার্জ চেকআউটে যোগ হবে</p>
              <LinkButton href="/checkout" size="lg" className="mt-4 w-full">
                চেকআউটে যান
              </LinkButton>
            </div>
          </div>
        )}
      </main>
  );
}
