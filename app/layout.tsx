import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import WhatsAppBubble from "@/components/layout/WhatsAppBubble";
import AddonScripts from "@/components/layout/AddonScripts";
import PwaRegister from "@/components/layout/PwaRegister";
import { getAddons } from "@/lib/data";

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
  const addons = await getAddons();
  const base: Metadata = {
    title: "Mabro Shop — মানসম্মত গ্যাজেট, দ্রুত ডেলিভারি",
    description:
      "ক্যামেরা, ল্যাপটপ, স্মার্ট হোম, কিচেন, ফিটনেস, বেবি ও গেমিং গ্যাজেট — সারা বাংলাদেশে ক্যাশ অন ডেলিভারিতে।",
  };
  if (!addons.pwa.enabled) return base;
  return {
    ...base,
    manifest: "/manifest.json",
    appleWebApp: { capable: true, statusBarStyle: "default", title: "Mabro Shop" },
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
  const addons = await getAddons();

  return (
    <html lang="en">
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
