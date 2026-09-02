import { ShieldCheck, Truck, RotateCcw, Headset } from "lucide-react";

const points = [
  { icon: Truck, title: "৬৪ জেলাতেই ডেলিভারি", desc: "কুরিয়ারের মাধ্যমে সারা দেশে পৌঁছে যাই" },
  { icon: ShieldCheck, title: "যাচাই করা প্রোডাক্ট", desc: "শিপ করার আগে প্রতিটি ইউনিট চেক করা হয়" },
  { icon: RotateCcw, title: "৭ দিনের রিপ্লেসমেন্ট", desc: "ত্রুটি পেলে সহজ শর্তে বদলে দেওয়া হয়" },
  { icon: Headset, title: "হোয়াটসঅ্যাপে সরাসরি সাপোর্ট", desc: "অর্ডারের আগে-পরে যেকোনো প্রশ্নে" },
];

export default function TrustSection() {
  return (
    <section className="border-y border-line bg-paper-raised">
      <div className="mx-auto grid max-w-7xl divide-y divide-line px-6 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
        {points.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-3.5 py-6 sm:px-6">
            <Icon size={22} className="mt-0.5 shrink-0 text-signal" />
            <div>
              <h3 className="text-sm font-semibold text-ink">{title}</h3>
              <p className="mt-0.5 text-xs text-text-muted">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
