"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  UserX,
  Boxes,
  Layers,
  Image as ImageIcon,
  Truck,
  Puzzle,
  Palette,
  LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import type { Branding } from "@/lib/types";

const links = [
  { href: "/admin", label: "ড্যাশবোর্ড", icon: LayoutDashboard, exact: true },
  { href: "/admin/orders", label: "অর্ডারসমূহ", icon: ShoppingBag },
  { href: "/admin/incomplete-orders", label: "অসম্পূর্ণ চেকআউট", icon: UserX },
  { href: "/admin/send-to-supplier", label: "সেন্ট টু সাপ্লায়ার", icon: Truck },
  { href: "/admin/products", label: "প্রোডাক্ট", icon: Boxes },
  { href: "/admin/categories", label: "ক্যাটাগরি", icon: Layers },
  { href: "/admin/homepage", label: "হোমপেজ / হিরো সেকশন", icon: ImageIcon },
  { href: "/admin/addons", label: "অ্যাডঅনস", icon: Puzzle },
  { href: "/admin/branding", label: "থিম / ব্র্যান্ডিং", icon: Palette },
];

export default function AdminSidebar({ branding }: { branding: Branding }) {
  const pathname = usePathname();
  const router = useRouter();
  const restOfName = branding.site_name.replace(branding.site_name_accent, "").trim();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-line bg-paper-raised">
      <div className="border-b border-line px-5 py-5">
        <div className="font-display text-lg font-bold text-ink">
          <span className="text-signal">{branding.site_name_accent}</span>
          {restOfName ? ` ${restOfName}` : ""}
        </div>
        <span className="text-xs text-text-muted">কন্ট্রোল প্যানেল</span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {links.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-ink text-white" : "text-text-muted hover:bg-paper hover:text-ink"
              )}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="mx-3 mb-4 flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-text-muted hover:bg-paper hover:text-signal"
      >
        <LogOut size={17} /> লগআউট
      </button>
    </aside>
  );
}
