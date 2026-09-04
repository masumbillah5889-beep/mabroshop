import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileTabBar from "@/components/layout/MobileTabBar";
import CategoryHero from "@/components/category/CategoryHero";
import CategoryTrust from "@/components/category/CategoryTrust";
import ProductCard from "@/components/product/ProductCard";
import { getCategories, getCategoryBySlug, getProductsByCategory, getAddons } from "@/lib/data";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.name} — Mabro Shop`,
    description: category.description ?? undefined,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const products = await getProductsByCategory(category.id);
  const addons = await getAddons();
  const lowStockThreshold = addons.instant_sales_booster.enabled
    ? addons.instant_sales_booster.low_stock_threshold
    : undefined;

  return (
    <>
      <Header />
      <main className="pb-16 md:pb-0">
        <CategoryHero category={category} />
        <CategoryTrust points={category.trust_points} />

        <section className="mx-auto max-w-7xl px-6 pb-16">
          <h2 className="font-display mb-6 text-xl font-bold text-ink md:text-2xl">
            {category.name} — সব প্রোডাক্ট
            <span className="ml-2 text-sm font-normal text-text-muted">({products.length})</span>
          </h2>

          {products.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-line py-16 text-center text-sm text-text-muted">
              এই ক্যাটাগরিতে এখনো কোনো প্রোডাক্ট যোগ করা হয়নি। অ্যাডমিন প্যানেল থেকে যোগ করুন।
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} lowStockThreshold={lowStockThreshold} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
      <MobileTabBar />
    </>
  );
}
