import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { getCategories } from "@/lib/data";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/icons/SocialIcons";

export default async function Footer() {
  const categories = await getCategories();

  return (
    <footer className="mt-20 bg-ink pb-24 pt-14 text-text-inverse md:pb-14">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="font-display text-xl font-bold text-white">
            Gadget<span className="text-signal">Bari</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-text-inverse/70">
            আসল প্রোডাক্ট, সৎ দাম। ক্যাশ অন ডেলিভারিতে সারা বাংলাদেশে পৌঁছে যাই।
          </p>
          <div className="mt-4 flex gap-3">
            {[FacebookIcon, YoutubeIcon, InstagramIcon].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-signal"
              >
                <Icon width={16} height={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">ক্যাটাগরি</h4>
          <ul className="space-y-2 text-sm text-text-inverse/70">
            {categories.slice(0, 6).map((c) => (
              <li key={c.id}>
                <Link href={`/category/${c.slug}`} className="hover:text-signal-light">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">সহায়তা</h4>
          <ul className="space-y-2 text-sm text-text-inverse/70">
            <li><Link href="/track-order" className="hover:text-signal-light">অর্ডার ট্র্যাক করুন</Link></li>
            <li><Link href="/return-policy" className="hover:text-signal-light">রিটার্ন পলিসি</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-signal-light">প্রাইভেসি পলিসি</Link></li>
            <li><Link href="/terms" className="hover:text-signal-light">শর্তাবলী</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">যোগাযোগ</h4>
          <ul className="space-y-2.5 text-sm text-text-inverse/70">
            <li className="flex items-center gap-2"><MapPin size={15} /> ঢাকা, বাংলাদেশ</li>
            <li className="flex items-center gap-2"><Phone size={15} /> ০১৮৬৩৫৩৮৪৭৮</li>
            <li className="flex items-center gap-2"><Mail size={15} /> admin@gadgetbari.com</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-6 pt-6 text-xs text-text-inverse/50">
        © {new Date().getFullYear()} GadgetBari. সর্বস্বত্ব সংরক্ষিত।
      </div>
    </footer>
  );
}
