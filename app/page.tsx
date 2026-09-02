import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileTabBar from "@/components/layout/MobileTabBar";
import Hero from "@/components/home/Hero";
import TrustSection from "@/components/home/TrustSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pb-16 md:pb-0">
        <Hero />
        <TrustSection />
        <CategoryGrid />
        <FeaturedProducts />
      </main>
      <Footer />
      <MobileTabBar />
    </>
  );
}
