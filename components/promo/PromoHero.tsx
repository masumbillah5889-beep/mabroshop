"use client";

import { useState } from "react";
import Image from "next/image";
import TiltCard from "@/components/ui/TiltCard";
import { formatTaka, discountPercent } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { useRouter } from "next/navigation";
import { Minus, Plus, Truck, ShieldCheck, Wallet } from "lucide-react";
import type { Product } from "@/lib/types";

export default function PromoHero({ product }: { product: Product }) {
  const lp = product.landing_page;
  const images = lp.gallery_images?.length ? lp.gallery_images : product.images?.map((i) => i.image_url) ?? [];
  const [activeImg, setActiveImg] = useState(images[0]);
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const router = useRouter();

  const percent = discountPercent(product.price, product.compare_at_price);

  function handleOrder() {
    addItem(
      { productId: product.id, name: product.name, slug: product.slug, price: product.price, image: activeImg },
      qty
    );
    router.push("/checkout");
  }

  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-signal/20 blur-[100px]" />
      <div className="relative mx-auto grid max-w-6xl gap-9 px-6 py-10 md:grid-cols-2 md:items-center md:py-14">
        <TiltCard strength={8} className="rounded-3xl bg-white/[0.06] p-4 ring-1 ring-white/10 backdrop-blur-sm">
          <div className="relative aspect-square overflow-hidden rounded-2xl" style={{ transform: "translateZ(30px)" }}>
            {activeImg && <Image src={activeImg} alt={product.name} fill sizes="500px" className="object-cover" priority />}
          </div>
          {images.length > 1 && (
            <div className="mt-2.5 flex gap-2" style={{ transform: "translateZ(20px)" }}>
              {images.slice(0, 4).map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(src)}
                  className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 ${
                    activeImg === src ? "border-signal" : "border-transparent opacity-55"
                  }`}
                >
                  <Image src={src} alt="" fill sizes="56px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </TiltCard>

        <div>
          <div className="flex gap-2">
            {lp.badge_text && (
              <span className="rounded-full bg-signal px-3 py-1 text-xs font-bold text-white">{lp.badge_text}</span>
            )}
            {product.stock_quantity > 0 && product.stock_quantity <= 15 && (
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-text-inverse">
                মাত্র {product.stock_quantity}টি বাকি
              </span>
            )}
          </div>
          <h1 className="font-display mt-3 text-3xl font-bold text-white">{product.name}</h1>
          {lp.subtitle && <p className="mt-2.5 max-w-md text-sm text-text-inverse/70">{lp.subtitle}</p>}

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-4xl font-bold text-white">{formatTaka(product.price)}</span>
            {product.compare_at_price && (
              <span className="text-lg text-text-inverse/45 line-through">{formatTaka(product.compare_at_price)}</span>
            )}
            {percent && (
              <span className="rounded-full bg-trust px-2.5 py-1 text-xs font-bold text-white">-{percent}%</span>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border border-white/20">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-11 w-11 items-center justify-center text-white">
                <Minus size={16} />
              </button>
              <span className="w-6 text-center text-sm font-semibold text-white">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="flex h-11 w-11 items-center justify-center text-white">
                <Plus size={16} />
              </button>
            </div>
            <button
              onClick={handleOrder}
              className="h-11 rounded-full bg-signal px-7 text-sm font-bold text-white hover:bg-signal-dark"
            >
              এখনই অর্ডার করুন
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-text-inverse/75">
            <span className="flex items-center gap-1.5"><Truck size={14} /> ঢাকায় ১-২ দিনে ডেলিভারি</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} /> ৭ দিন রিপ্লেসমেন্ট</span>
            <span className="flex items-center gap-1.5"><Wallet size={14} /> ক্যাশ অন ডেলিভারি</span>
          </div>
        </div>
      </div>
    </section>
  );
}
