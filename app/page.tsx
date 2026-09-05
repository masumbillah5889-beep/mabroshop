import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileTabBar from "@/components/layout/MobileTabBar";
import Hero from "@/components/home/Hero";
import TrustSection from "@/components/home/TrustSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CategoryShowcaseList from "@/components/home/CategoryShowcaseList";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pb-16 md:pb-0">
        <Hero />
        <TrustSection />
        <FeaturedProducts />
        <div id="categories" className="mx-auto max-w-7xl scroll-mt-20 px-6 pt-10">
          <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">ক্যাটাগরি অনুযায়ী কিনুন</h2>
          <p className="mt-1 text-sm text-text-muted">প্রতিটি ক্যাটাগরির সেরা প্রোডাক্টগুলো এক নজরে</p>
        </div>
        <CategoryShowcaseList />
      </main>
      <Footer />
      <MobileTabBar />
    </>
  );
}
