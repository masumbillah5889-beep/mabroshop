import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import WhatsAppBubble from "@/components/layout/WhatsAppBubble";
import AddonScripts from "@/components/layout/AddonScripts";
import PwaRegister from "@/components/layout/PwaRegister";
import { getAddons, getBranding } from "@/lib/data";
import { lighten, darken, isValidHex } from "@/lib/color";
import { DEFAULT_BRANDING } from "@/lib/types";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const [addons, branding] = await Promise.all([getAddons(), getBranding()]);
  const base: Metadata = {
    title: `${branding.site_name} — ${branding.tagline}`,
    description:
      "ক্যামেরা, ল্যাপটপ, স্মার্ট হোম, কিচেন, ফিটনেস, বেবি ও গেমিং গ্যাজেট — সারা বাংলাদেশে ক্যাশ অন ডেলিভারিতে।",
  };
  if (!addons.pwa.enabled) return base;
  return {
    ...base,
    manifest: "/manifest.json",
    appleWebApp: { capable: true, statusBarStyle: "default", title: branding.site_name },
    icons: {
      icon: [
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [addons, branding] = await Promise.all([getAddons(), getBranding()]);

  // The whole design system is CSS custom properties (see globals.css), so
  // overriding just these two per deployment re-themes every component —
  // no rebuild needed, just a page load. Everything else (light/dark
  // variants) is derived from these two so an admin only ever picks two
  // colors, never eight.
  // Validate before it ever reaches dangerouslySetInnerHTML — a malformed
  // value saved by mistake (or any future accidental widening of who can
  // write this row) should never become raw CSS injection.
  const primary = isValidHex(branding.primary_color) ? branding.primary_color : DEFAULT_BRANDING.primary_color;
  const accent = isValidHex(branding.accent_color) ? branding.accent_color : DEFAULT_BRANDING.accent_color;

  const themeVars = `
    :root {
      --color-ink: ${primary} !important;
      --color-ink-light: ${lighten(primary, 0.15)} !important;
      --color-ink-soft: ${lighten(primary, 0.28)} !important;
      --color-signal: ${accent} !important;
      --color-signal-light: ${lighten(accent, 0.15)} !important;
      --color-signal-dark: ${darken(accent, 0.13)} !important;
    }
  `;

  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeVars }} />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jakarta.variable} ${hindSiliguri.variable} antialiased`}
      >
        <CartProvider>
          {children}
          <WhatsAppBubble />
        </CartProvider>
        <AddonScripts />
        <PwaRegister enabled={addons.pwa.enabled} />
      </body>
    </html>
  );
}
