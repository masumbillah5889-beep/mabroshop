import Link from "next/link";
import { Store, ShoppingCart, Home, Truck, Phone } from "lucide-react";

const tabs = [
  { href: "/shop", label: "শপ", icon: Store },
  { href: "/cart", label: "কার্ট", icon: ShoppingCart },
  { href: "/", label: "হোম", icon: Home },
  { href: "/track-order", label: "ট্র্যাক", icon: Truck },
  { href: "tel:+8801890672586", label: "কল", icon: Phone },
];

export default function MobileTabBar() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-line bg-paper-raised md:hidden">
      {tabs.map(({ href, label, icon: Icon }) => (
        <Link
          key={label}
          href={href}
          className="flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium text-text-muted active:text-signal"
        >
          <Icon size={20} />
          {label}
        </Link>
      ))}
    </nav>
  );
}
