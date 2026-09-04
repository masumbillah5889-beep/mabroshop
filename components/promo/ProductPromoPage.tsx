import PromoHero from "@/components/promo/PromoHero";
import PainPoints from "@/components/promo/PainPoints";
import PromoFeatures from "@/components/promo/PromoFeatures";
import GalleryStrip from "@/components/promo/GalleryStrip";
import { SpecsTable, ComparisonTable } from "@/components/promo/SpecsAndComparison";
import PromoTestimonials from "@/components/promo/PromoTestimonials";
import OrderBenefits from "@/components/promo/OrderBenefits";
import ContactCard from "@/components/promo/ContactCard";
import FaqSection from "@/components/category/FaqSection";
import CountdownCta from "@/components/promo/CountdownCta";
import StickyOrderBar from "@/components/promo/StickyOrderBar";
import type { Product } from "@/lib/types";

export default function ProductPromoPage({ product }: { product: Product }) {
  const lp = product.landing_page;

  return (
    <div id="top-order" className="pb-20 md:pb-0">
      {lp.announcement && (
        <div className="bg-ink py-2 text-center text-xs font-semibold text-text-inverse">{lp.announcement}</div>
      )}

      <PromoHero product={product} />
      <PainPoints points={lp.pain_points} />
      <PromoFeatures features={lp.features} />
      <GalleryStrip images={lp.gallery_images} />
      <SpecsTable specs={lp.specs} />
      {lp.comparison_rows?.length > 0 && (
        <ComparisonTable label={lp.comparison_label || "সাধারণ প্রোডাক্ট"} rows={lp.comparison_rows} />
      )}
      <PromoTestimonials testimonials={lp.testimonials} />
      <OrderBenefits benefits={lp.order_benefits} />
      {lp.show_contact_card && <ContactCard />}
      {lp.faqs?.length > 0 && <FaqSection faqs={lp.faqs} />}
      <CountdownCta endAt={lp.countdown_end_at} price={product.price} />
      <StickyOrderBar product={product} />
    </div>
  );
}
