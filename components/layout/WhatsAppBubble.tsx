import { MessageCircle } from "lucide-react";

export default function WhatsAppBubble() {
  return (
    <a
      href="https://wa.me/8801863538478?text=আসসালামু%20আলাইকুম%2C%20আমি%20একটি%20প্রোডাক্ট%20নিয়ে%20জানতে%20চাই"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 md:bottom-6 md:right-6"
    >
      <MessageCircle size={26} fill="white" className="text-[#25D366]" />
    </a>
  );
}
