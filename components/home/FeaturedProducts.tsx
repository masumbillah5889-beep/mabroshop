import { getFeaturedProducts, getAddons } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";

export default async function FeaturedProducts() {
  const [products, addons] = await Promise.all([getFeaturedProducts(), getAddons()]);
  if (products.length === 0) return null;
  const lowStockThreshold = addons.instant_sales_booster.enabled
    ? addons.instant_sales_booster.low_stock_threshold
    : undefined;

  return (
    <section className="mx-auto max-w-7xl px-6 py-4">
      <h2 className="font-display mb-6 text-2xl font-bold text-ink md:text-3xl">
        এই মুহূর্তে বেশি বিক্রি হচ্ছে
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} lowStockThreshold={lowStockThreshold} />
        ))}
      </div>
    </section>
  );
}
