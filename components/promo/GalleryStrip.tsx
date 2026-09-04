import Image from "next/image";

export default function GalleryStrip({ images }: { images: string[] }) {
  if (!images?.length) return null;
  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      <h2 className="font-display text-center text-2xl font-bold text-ink">কাছ থেকে দেখুন</h2>
      <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {images.slice(0, 4).map((src, i) => (
          <div key={i} className="relative aspect-square overflow-hidden rounded-2xl">
            <Image src={src} alt="" fill sizes="200px" className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
