import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import WhatsAppBubble from "@/components/layout/WhatsAppBubble";

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

export const metadata: Metadata = {
  title: "GadgetBari — মানসম্মত গ্যাজেট, দ্রুত ডেলিভারি",
  description:
    "ক্যামেরা, ল্যাপটপ, স্মার্ট হোম, কিচেন, ফিটনেস, বেবি ও গেমিং গ্যাজেট — সারা বাংলাদেশে ক্যাশ অন ডেলিভারিতে।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${jakarta.variable} ${hindSiliguri.variable} antialiased`}
      >
        <CartProvider>
          {children}
          <WhatsAppBubble />
        </CartProvider>
      </body>
    </html>
  );
}
