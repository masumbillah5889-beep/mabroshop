import { LinkButton } from "@/components/ui/Button";
import type { Category } from "@/lib/types";

export default function CategoryCta({ category }: { category: Category }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-ink to-ink-light py-14">
      <div className="pointer-events-none absolute -right-20 -top-10 h-56 w-56 rounded-full bg-signal/25 blur-[90px]" />
      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
          {category.name} এখনই দেখুন
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-text-inverse/70">
          স্টক সীমিত, দাম যেকোনো সময় বদলাতে পারে — এখনই অর্ডার করুন।
        </p>
        <LinkButton href="#products" size="lg" className="mt-6">
          এখনই কিনুন
        </LinkButton>
      </div>
    </section>
  );
}
