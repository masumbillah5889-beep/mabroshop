import { MessageCircle, Phone } from "lucide-react";
import { getBranding } from "@/lib/data";

export default async function ContactCard() {
  const branding = await getBranding();
  const digits = branding.whatsapp.replace(/\D/g, "");

  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <div className="rounded-3xl border border-line bg-paper-raised px-8 py-10 text-center">
        <h2 className="font-display text-xl font-bold text-ink">সরাসরি কল বা হোয়াটসঅ্যাপে অর্ডার করতে চান?</h2>
        <p className="mt-2 text-sm text-text-muted">যেকোনো প্রশ্ন বা দ্রুত অর্ডারের জন্য আমাদের প্রতিনিধি সর্বদা প্রস্তুত</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={`https://wa.me/${digits}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white hover:opacity-90"
          >
            <MessageCircle size={16} /> WhatsApp: {branding.whatsapp}
          </a>
          <a
            href={`tel:${branding.phone}`}
            className="flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white hover:bg-ink-light"
          >
            <Phone size={16} /> কল করুন: {branding.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
