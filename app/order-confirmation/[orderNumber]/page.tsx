import Link from "next/link";
import { CheckCircle2, Printer } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LinkButton } from "@/components/ui/Button";
import PurchaseTracker from "@/components/tracking/PurchaseTracker";

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;

  return (
    <>
      <Header />
      <PurchaseTracker orderNumber={orderNumber} />
      <main className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center px-6 py-16 text-center">
        <CheckCircle2 size={56} className="text-trust" />
        <h1 className="font-display mt-5 text-2xl font-bold text-ink">ধন্যবাদ!</h1>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          আপনার অর্ডারটি সফলভাবে গৃহীত হয়েছে। আমাদের একজন বিক্রয় প্রতিনিধি শীঘ্রই আপনার
          সাথে যোগাযোগ করে অর্ডার নিশ্চিত করবেন।
        </p>
        <p className="mt-4 rounded-full bg-trust-bg px-5 py-2 text-sm font-semibold text-trust">
          আপনার অর্ডার নম্বর: #{orderNumber}
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <LinkButton href="/" variant="ghost">
            হোমে ফিরে যান
          </LinkButton>
          <LinkButton href="#" variant="secondary" className="print:hidden">
            <Printer size={16} /> ইনভয়েস প্রিন্ট করুন
          </LinkButton>
        </div>
      </main>
      <Footer />
    </>
  );
}
