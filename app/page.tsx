import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileTabBar from "@/components/layout/MobileTabBar";
import Hero from "@/components/home/Hero";
import TrustSection from "@/components/home/TrustSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PopularCategoryIcons from "@/components/home/PopularCategoryIcons";
import CategoryShowcaseList from "@/components/home/CategoryShowcaseList";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pb-16 md:pb-0">
        <Hero />
        <TrustSection />
        <FeaturedProducts />
        <div id="categories" className="scroll-mt-20">
          <PopularCategoryIcons />
        </div>
        <CategoryShowcaseList />
      </main>
      <Footer />
      <MobileTabBar />
    </>
  );
}
