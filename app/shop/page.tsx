import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileTabBar from "@/components/layout/MobileTabBar";
import ProductCard from "@/components/product/ProductCard";
import { getCategories, getProductsByCategory } from "@/lib/data";

export const metadata = { title: "সব প্রোডাক্ট — GadgetBari" };

export default async function ShopPage() {
  const categories = await getCategories();
  const productLists = await Promise.all(categories.map((c) => getProductsByCategory(c.id)));
  const products = productLists.flat();

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-8 pb-20 md:pb-8">
        <h1 className="font-display text-2xl font-bold text-ink">সব প্রোডাক্ট</h1>
        <p className="mt-1 text-sm text-text-muted">{products.length}টি প্রোডাক্ট পাওয়া গেছে</p>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </main>
      <Footer />
      <MobileTabBar />
    </>
  );
}
