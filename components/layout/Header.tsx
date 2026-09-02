import Link from "next/link";
import { Truck, Phone, User, Search, ShoppingCart } from "lucide-react";
import { getCategories } from "@/lib/data";
import CartCount from "./CartCount";

export default async function Header() {
  const categories = await getCategories();

  return (
    <header className="sticky top-0 z-40 bg-paper-raised shadow-[0_1px_0_var(--color-line)]">
      {/* Utility bar */}
      <div className="hidden bg-ink text-text-inverse md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
          <span>ঢাকার ভিতরে ৳৮০, বাইরে ৳১৫০ ডেলিভারি চার্জ — ক্যাশ অন ডেলিভারি সুবিধা</span>
          <div className="flex items-center gap-5">
            <Link href="/track-order" className="flex items-center gap-1.5 hover:text-signal-light">
              <Truck size={14} /> অর্ডার ট্র্যাক করুন
            </Link>
            <a href="tel:+8801863538478" className="flex items-center gap-1.5 hover:text-signal-light">
              <Phone size={14} /> কল করুন
            </a>
          </div>
        </div>
      </div>

      {/* Main row */}
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:gap-8 md:px-6 md:py-4">
        <Link href="/" className="font-display text-xl font-bold text-ink shrink-0 md:text-2xl">
          <span className="text-signal">Mabro</span> Shop
        </Link>

        <div className="hidden flex-1 items-center rounded-full border border-line bg-paper px-4 py-2.5 md:flex">
          <Search size={16} className="text-text-muted" />
          <input
            type="text"
            placeholder="প্রোডাক্ট খুঁজুন..."
            className="ml-2 w-full bg-transparent text-sm outline-none placeholder:text-text-muted"
          />
        </div>

        <div className="ml-auto flex items-center gap-4 md:ml-0">
          <Link
            href="/admin"
            className="hidden items-center gap-1.5 text-sm font-medium text-text-muted hover:text-ink md:flex"
          >
            <User size={16} /> সাইন ইন
          </Link>
          <Link href="/cart" className="relative flex items-center gap-2 text-ink">
            <ShoppingCart size={22} />
            <CartCount />
          </Link>
        </div>
      </div>

      {/* Category pills */}
      <nav className="border-t border-line">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-2.5 md:px-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <Link
            href="/"
            className="shrink-0 rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-white"
          >
            হোম
          </Link>
          <Link
            href="/shop"
            className="shrink-0 rounded-full border border-line px-4 py-1.5 text-sm font-medium text-text hover:border-ink"
          >
            সব প্রোডাক্ট
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="shrink-0 rounded-full border border-line px-4 py-1.5 text-sm font-medium text-text hover:border-ink"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
