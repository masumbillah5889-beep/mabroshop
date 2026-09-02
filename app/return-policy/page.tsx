import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-6 py-14">
        <h1 className="font-display text-2xl font-bold text-ink">রিটার্ন পলিসি</h1>
        <div className="prose prose-sm mt-5 max-w-none text-text-muted">
          <p>প্রোডাক্ট হাতে পাওয়ার ৭ দিনের মধ্যে ত্রুটিপূর্ণ বা ভুল প্রোডাক্টের জন্য রিপ্লেসমেন্ট অনুরোধ করা যাবে। প্রোডাক্ট অবশ্যই অব্যবহৃত ও অরিজিনাল প্যাকেজিং সহ ফেরত দিতে হবে। বিস্তারিত জানতে হোয়াটসঅ্যাপে যোগাযোগ করুন। (এই টেক্সট প্লেসহোল্ডার — চূড়ান্ত নীতিমালা ক্লায়েন্টের কাছ থেকে নিশ্চিত করে বসানো হবে।)</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
