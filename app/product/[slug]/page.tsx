import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Truck, ShieldCheck } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileTabBar from "@/components/layout/MobileTabBar";
import ProductCard from "@/components/product/ProductCard";
import AddToCartControls from "@/components/product/AddToCartControls";
import { DiscountBadge } from "@/components/ui/Badge";
import { formatTaka, discountPercent } from "@/lib/utils";
import { getProductBySlug, getRelatedProducts, getCategoryBySlug } from "@/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return { title: `${product.name} — Mabro Shop` };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [related, category] = await Promise.all([
    getRelatedProducts(product.category_id, product.id),
    getCategoryBySlug(product.category?.slug ?? ""),
  ]);
  const image = product.images?.find((i) => i.is_primary) ?? product.images?.[0];
  const percent = discountPercent(product.price, product.compare_at_price);

  return (
    <>
      <Header />
      <main className="pb-16 md:pb-0">
        <div className="mx-auto max-w-7xl px-6 pt-6">
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <Link href="/" className="hover:text-ink">হোম</Link>
            <ChevronRight size={13} />
            {category && (
              <>
                <Link href={`/category/${category.slug}`} className="hover:text-ink">
                  {category.name}
                </Link>
                <ChevronRight size={13} />
              </>
            )}
            <span className="text-ink">{product.name}</span>
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-8 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-paper-raised shadow-[0_1px_2px_rgba(14,31,60,0.06)]">
            {image && (
              <Image src={image.image_url} alt={product.name} fill sizes="600px" className="object-cover" priority />
            )}
            {percent && <DiscountBadge percent={percent} />}
          </div>

          <div>
            <h1 className="font-display text-2xl font-bold text-ink md:text-3xl">{product.name}</h1>

            <div className="mt-3 flex items-baseline gap-3">
              <span className="font-display text-3xl font-bold text-ink">{formatTaka(product.price)}</span>
              {product.compare_at_price && (
                <span className="text-base text-text-muted line-through">
                  {formatTaka(product.compare_at_price)}
                </span>
              )}
            </div>

            <div className="mt-5 flex flex-col gap-2.5 rounded-xl bg-trust-bg px-4 py-3 text-sm text-trust">
              <div className="flex items-center gap-2"><Truck size={16} /> ঢাকার ভিতরে ৳৮০, বাইরে ৳১৫০ ডেলিভারি চার্জ</div>
              <div className="flex items-center gap-2"><ShieldCheck size={16} /> ক্যাশ অন ডেলিভারি — হাতে পেয়ে টাকা দিন</div>
            </div>

            <div className="mt-6">
              <AddToCartControls product={product} />
            </div>

            {product.description && (
              <div className="mt-8 border-t border-line pt-6">
                <h2 className="mb-2 text-sm font-semibold text-ink">বিস্তারিত</h2>
                <p className="text-sm leading-relaxed text-text-muted">{product.description}</p>
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 pb-16">
            <h2 className="font-display mb-6 text-xl font-bold text-ink">সম্পর্কিত প্রোডাক্ট</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
      <MobileTabBar />
    </>
  );
}
