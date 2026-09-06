import { getHeroContent } from "@/lib/data";
import HeroEditorForm from "@/components/admin/HeroEditorForm";

export default async function HomepageEditorPage() {
  const hero = await getHeroContent();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">হোমপেজ / হিরো সেকশন</h1>
      <p className="mt-1 text-sm text-text-muted">
        হোমপেজের সবার উপরের ব্যানার এখান থেকে বদলান — কোনো কোড ছাড়াই। চাইলে আগের মতো
        হেডলাইন-ভিত্তিক ডিজাইন রাখুন, অথবা নিজের একটা ব্যানার ছবি আপলোড করে দিন।
      </p>
      <HeroEditorForm initial={hero} />
    </div>
  );
}
