import { getBranding } from "@/lib/data";
import { WhatsAppIcon } from "@/components/icons/SocialIcons";

export default async function WhatsAppBubble() {
  const branding = await getBranding();
  const digits = branding.whatsapp.replace(/\D/g, "");

  return (
    <a
      href={`https://wa.me/${digits}?text=আসসালামু%20আলাইকুম%2C%20আমি%20একটি%20প্রোডাক্ট%20নিয়ে%20জানতে%20চাই`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full text-white transition-transform duration-200 hover:scale-110 active:scale-95 md:bottom-6 md:right-6"
      style={{
        background: "radial-gradient(circle at 32% 28%, #3EE879 0%, #25D366 45%, #128C4A 100%)",
        boxShadow:
          "0 10px 20px -4px rgba(18, 140, 74, 0.55), 0 3px 8px rgba(0,0,0,0.25), inset 0 1px 2px rgba(255,255,255,0.5), inset 0 -3px 6px rgba(0,0,0,0.2)",
      }}
    >
      {/* glossy highlight, like light hitting the top of a raised button */}
      <span
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.35) 0%, transparent 45%)" }}
      />
      <WhatsAppIcon width={28} height={28} className="relative drop-shadow-sm" />
    </a>
  );
}
