import HeroEditorForm from "@/components/admin/HeroEditorForm";

export default function HomepageEditorPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">হোমপেজ / হিরো সেকশন</h1>
      <p className="mt-1 text-sm text-text-muted">
        হোমপেজের সবার উপরের ব্যানার টেক্সট এখান থেকে বদলান — কোনো কোড ছাড়াই।
      </p>
      <HeroEditorForm />
    </div>
  );
}
