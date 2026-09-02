import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-6 py-14">
        <h1 className="font-display text-2xl font-bold text-ink">শর্তাবলী</h1>
        <div className="prose prose-sm mt-5 max-w-none text-text-muted">
          <p>এই ওয়েবসাইট ব্যবহার করে অর্ডার করার মাধ্যমে আপনি আমাদের মূল্য, ডেলিভারি ও রিটার্ন সংক্রান্ত শর্তাবলীর সাথে সম্মত হচ্ছেন। (এই টেক্সট প্লেসহোল্ডার — চূড়ান্ত শর্তাবলী ক্লায়েন্টের কাছ থেকে নিশ্চিত করে বসানো হবে।)</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
