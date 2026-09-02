import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-6 py-14">
        <h1 className="font-display text-2xl font-bold text-ink">প্রাইভেসি পলিসি</h1>
        <div className="prose prose-sm mt-5 max-w-none text-text-muted">
          <p>অর্ডার সম্পন্ন করতে সংগৃহীত তথ্য (নাম, ফোন নাম্বার, ঠিকানা) শুধুমাত্র ডেলিভারি ও যোগাযোগের উদ্দেশ্যে ব্যবহৃত হয়, তৃতীয় পক্ষের সাথে শেয়ার করা হয় না। (এই টেক্সট প্লেসহোল্ডার — চূড়ান্ত নীতিমালা ক্লায়েন্টের কাছ থেকে নিশ্চিত করে বসানো হবে।)</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
