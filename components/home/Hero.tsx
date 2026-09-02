import Image from "next/image";
import { ShieldCheck, Truck } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import TiltCard from "@/components/ui/TiltCard";
import { getFeaturedProducts } from "@/lib/data";

export default async function Hero() {
  const featured = await getFeaturedProducts();
  const spotlight = featured[0];

  return (
    <section className="relative overflow-hidden bg-ink">
      {/* soft glow blobs for depth, not motion */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-signal/20 blur-[90px]" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-ink-soft blur-[80px]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 md:items-center md:py-24">
        <div>
          <p className="text-sm font-medium text-signal-light">১০,০০০+ সন্তুষ্ট গ্রাহক</p>
          <h1 className="font-display mt-3 text-4xl font-bold leading-[1.1] text-white md:text-5xl">
            যে গ্যাজেট আজ অর্ডার করবেন, হাতে পাবেন হাতে টাকা দিয়ে
          </h1>
          <p className="mt-4 max-w-md text-base text-text-inverse/70">
            ক্যামেরা থেকে স্মার্ট হোম, কিচেন থেকে গেমিং — যাচাই করা কোয়ালিটি, ক্যাশ অন
            ডেলিভারিতে সারা বাংলাদেশে।
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <LinkButton href="/shop" size="lg">
              এখনই কিনুন
            </LinkButton>
            <LinkButton href="#categories" variant="ghost" size="lg" className="border-white/20 text-white hover:border-white">
              ক্যাটাগরি দেখুন
            </LinkButton>
          </div>
          <div className="mt-9 flex gap-6 text-sm text-text-inverse/80">
            <div className="flex items-center gap-2">
              <Truck size={18} className="text-signal-light" /> ঢাকায় ১-২ দিনে ডেলিভারি
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-signal-light" /> ৭ দিন রিপ্লেসমেন্ট
            </div>
          </div>
        </div>

        {spotlight && (
          <div className="mx-auto w-full max-w-sm [perspective:1200px]">
            <TiltCard strength={14} className="rounded-3xl bg-white/5 p-5 backdrop-blur-sm ring-1 ring-white/10">
              <div className="relative aspect-square overflow-hidden rounded-2xl" style={{ transform: "translateZ(40px)" }}>
                <Image
                  src={spotlight.images[0]?.image_url}
                  alt={spotlight.name}
                  fill
                  sizes="400px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="mt-4 flex items-center justify-between" style={{ transform: "translateZ(24px)" }}>
                <span className="text-sm font-medium text-white">{spotlight.name}</span>
                <span className="font-display rounded-full bg-signal px-3 py-1 text-sm font-bold text-white">
                  ৳{spotlight.price.toLocaleString("en-BD")}
                </span>
              </div>
            </TiltCard>
          </div>
        )}
      </div>
    </section>
  );
}
