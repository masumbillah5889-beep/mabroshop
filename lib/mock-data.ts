import type { Category, Product, ProductLandingPage } from "./types";
import { DEFAULT_LANDING_PAGE } from "./types";

// Placeholder imagery — swap for real product photography via the admin panel
// once the client's Supabase project is connected. Kept as a named export so
// data.ts can fall back to this when NEXT_PUBLIC_SUPABASE_URL isn't set yet,
// meaning the site is fully browsable the moment it's downloaded.

function img(label: string, bg: string) {
  return `https://placehold.co/800x800/${bg}/ffffff?text=${encodeURIComponent(label)}&font=roboto`;
}

export const MOCK_CATEGORIES: Category[] = [
  {
    id: "cat-camera",
    name: "Camera & Photography",
    slug: "camera-photography",
    tagline: "Shoot like a creator, not a tourist",
    description:
      "Mirrorless bodies, vlogging rigs and lens kits picked for people who post — not just people who point and shoot.",
    banner_image_url: "/banners/camera-photography.jpg",
    display_order: 1,
    is_active: true,
    trust_points: [
      { icon: "ShieldCheck", title: "৭ দিনের রিপ্লেসমেন্ট", description: "ত্রুটিপূর্ণ প্রোডাক্ট হলে ৭ দিনের মধ্যে পরিবর্তন।" },
      { icon: "Truck", title: "সারাদেশে ডেলিভারি", description: "ঢাকার ভিতরে ১-২ দিন, বাইরে ৩-৫ দিন।" },
      { icon: "BadgeCheck", title: "টেস্টেড ইউনিট", description: "প্রতিটি ক্যামেরা শিপ করার আগে চালিয়ে পরীক্ষা করা হয়।" },
    ],
    testimonials: [
      { name: "রাফসান আহমেদ", quote: "প্রথমে সন্দেহ ছিল, কিন্তু ক্যামেরার কোয়ালিটি একদম রিভিউর মতোই। ভিডিও শার্প এসেছে।", rating: 5 },
      { name: "নুসরাত জাহান", quote: "ডেলিভারি দ্রুত পেয়েছি, প্যাকেজিং ভালো ছিল। রেকমেন্ড করব।", rating: 5 },
    ],
    faqs: [
      { question: "সেকেন্ড হ্যান্ড না নতুন প্রোডাক্ট?", answer: "সব প্রোডাক্ট একদম নতুন, আনবক্সিং থেকে শুরু করে আপনার সামনে টেস্ট করে পাঠানো হয়।" },
      { question: "ওয়ারেন্টি আছে কি?", answer: "হ্যাঁ, প্রতিটি ক্যামেরায় নির্মাতার ওয়ারেন্টি থাকে, বিস্তারিত প্রোডাক্ট পেজে দেওয়া আছে।" },
      { question: "ভিডিওগ্রাফির জন্য কোনটা ভালো হবে?", answer: "হোয়াটসঅ্যাপে আপনার বাজেট ও প্রয়োজন বললে আমরা সাজেস্ট করে দেব।" },
    ],
  },
  {
    id: "cat-laptop",
    name: "Laptop & Computer Gadget",
    slug: "laptop-computer-gadget",
    tagline: "Desk setups that actually get built",
    description:
      "Laptop stands, docks, and full workstation combos for people who work from three different rooms a week.",
    banner_image_url: "/banners/laptop-computer-gadget.jpg",
    display_order: 2,
    is_active: true,
    trust_points: [
      { icon: "ShieldCheck", title: "১ বছর ওয়ারেন্টি", description: "সকল ইলেকট্রনিক আইটেমে নির্মাতার ওয়ারেন্টি।" },
      { icon: "Truck", title: "ফ্রি শিপিং ৳২০০০+", description: "নির্দিষ্ট অঙ্কের বেশি অর্ডারে ডেলিভারি চার্জ মাফ।" },
      { icon: "Headset", title: "সেটআপ সাপোর্ট", description: "হোয়াটসঅ্যাপে ফ্রি সেটআপ গাইড।" },
    ],
    testimonials: [
      { name: "ইমরান হোসেন", quote: "ডেস্ক সেটআপটা অর্ডার করেছিলাম, একদম প্রফেশনাল লাগছে এখন আমার হোম অফিস।", rating: 5 },
      { name: "তানজিলা রহমান", quote: "স্টুডেন্ট হিসেবে বাজেটের মধ্যে ভালো কম্বো পেয়েছি।", rating: 4 },
    ],
    faqs: [
      { question: "সেটআপ করতে কি টেকনিশিয়ান লাগবে?", answer: "না, সব প্রোডাক্টের সাথে সহজ গাইড দেওয়া থাকে, নিজেই ৫-১০ মিনিটে সেট করতে পারবেন।" },
      { question: "কোনো ব্র্যান্ডের ল্যাপটপের সাথে কম্প্যাটিবল?", answer: "প্রায় সব ব্র্যান্ডের ল্যাপটপের সাথে কাজ করে, নির্দিষ্ট মডেল নিয়ে সন্দেহ থাকলে হোয়াটসঅ্যাপে জিজ্ঞাসা করুন।" },
      { question: "ইএমআই সুবিধা আছে?", answer: "বর্তমানে ক্যাশ অন ডেলিভারি ও অনলাইন পেমেন্ট সুবিধা আছে।" },
    ],
  },
  {
    id: "cat-smart-home",
    name: "Smart Home Gadgets",
    slug: "smart-home-gadgets",
    tagline: "A home that responds when you talk to it",
    description:
      "Smart bulbs, plugs, and sensors that install in minutes and don't need an engineer to maintain.",
    banner_image_url: "/banners/smart-home-gadgets.jpg",
    display_order: 3,
    is_active: true,
    trust_points: [
      { icon: "Wifi", title: "অ্যাপ দিয়ে কন্ট্রোল", description: "যেকোনো জায়গা থেকে মোবাইল অ্যাপে নিয়ন্ত্রণ।" },
      { icon: "ShieldCheck", title: "সেফটি সার্টিফাইড", description: "ফায়ার-সেফ ওয়্যারিং ও ওভারলোড প্রোটেকশন।" },
      { icon: "Truck", title: "ক্যাশ অন ডেলিভারি", description: "হাতে পেয়ে টাকা দিন, কোনো ঝুঁকি নেই।" },
    ],
    testimonials: [
      { name: "ফারহান কবির", quote: "মোবাইল দিয়ে লাইট কন্ট্রোল করতে পারছি, বাসায় সবাই অবাক হয়ে গেছে।", rating: 5 },
      { name: "সাদিয়া ইসলাম", quote: "ইনস্টল করা খুব সহজ ছিল, কোনো ওয়্যারিং লাগেনি।", rating: 5 },
    ],
    faqs: [
      { question: "ইন্টারনেট ছাড়া কাজ করবে?", answer: "কন্ট্রোলের জন্য ওয়াইফাই লাগবে, তবে সাধারণ সুইচ হিসেবেও ব্যবহার করা যায়।" },
      { question: "পুরনো বাসার ওয়্যারিং এ কাজ করবে?", answer: "হ্যাঁ, বেশিরভাগ প্রোডাক্ট স্ট্যান্ডার্ড সুইচবোর্ডে বসানো যায়, নির্দিষ্ট প্রশ্ন থাকলে ছবি পাঠান।" },
    ],
  },
  {
    id: "cat-kitchen",
    name: "Kitchen Gadgets",
    slug: "kitchen-gadgets",
    tagline: "Less prep time, same taste",
    description:
      "Choppers, grinders and electric essentials that cut kitchen time down without cutting corners.",
    banner_image_url: "/banners/kitchen-gadgets.jpg",
    display_order: 4,
    is_active: true,
    trust_points: [
      { icon: "ShieldCheck", title: "ফুড-গ্রেড উপাদান", description: "BPA-মুক্ত, নিরাপদ প্লাস্টিক ও স্টেইনলেস স্টিল।" },
      { icon: "Truck", title: "৪৮ ঘণ্টায় ডেলিভারি", description: "ঢাকার ভিতরে অর্ডারের পরদিনই হাতে পাবেন।" },
      { icon: "BadgeCheck", title: "১৫,০০০+ অর্ডার", description: "প্রতি মাসে হাজারো ক্রেতা পুনরায় অর্ডার করেন।" },
    ],
    testimonials: [
      { name: "রুমানা আক্তার", quote: "সবজি কাটা এখন অনেক সহজ, প্রতিদিন ব্যবহার করছি।", rating: 5 },
      { name: "কামরুল হাসান", quote: "দাম অনুযায়ী পারফরম্যান্স খুব ভালো।", rating: 4 },
    ],
    faqs: [
      { question: "মেশিন পরিষ্কার করা কি কঠিন?", answer: "না, বেশিরভাগ পার্টস খুলে পানি দিয়ে ধোয়া যায়।" },
      { question: "ওয়ারেন্টি কতদিনের?", answer: "প্রোডাক্ট অনুযায়ী ভিন্ন, বিস্তারিত প্রোডাক্ট পেজে দেওয়া আছে।" },
    ],
  },
  {
    id: "cat-personal-care",
    name: "Personal Care Gadget",
    slug: "personal-care-gadget",
    tagline: "Salon routines, done at home",
    description:
      "Trimmers, styling tools and grooming devices that pay for themselves in a couple of salon visits.",
    banner_image_url: "/banners/personal-care-gadget.jpg",
    display_order: 5,
    is_active: true,
    trust_points: [
      { icon: "ShieldCheck", title: "স্কিন-সেফ", description: "ডার্মাটোলজিক্যালি টেস্টেড উপাদান।" },
      { icon: "Truck", title: "ডিসক্রিট প্যাকেজিং", description: "প্লেইন প্যাকেজে ডেলিভারি, প্রাইভেসি বজায় থাকে।" },
      { icon: "Headset", title: "সহজ রিটার্ন", description: "না পছন্দ হলে সহজ শর্তে রিটার্ন।" },
    ],
    testimonials: [
      { name: "নাদিয়া সুলতানা", quote: "পার্লারে না গিয়ে বাসায় নিজেই করতে পারছি, টাকাও বাঁচছে।", rating: 5 },
      { name: "শাকিল আহমেদ", quote: "ট্রিমারটা ভালো কোয়ালিটির, বেশ কিছুদিন ধরে ব্যবহার করছি।", rating: 5 },
    ],
    faqs: [
      { question: "প্যাকেজিং কি বোঝা যায় ভেতরে কী আছে?", answer: "না, সম্পূর্ণ প্লেইন প্যাকেজিং এ পাঠানো হয়, প্রাইভেসি বজায় থাকে।" },
      { question: "সেনসিটিভ স্কিনে ব্যবহার করা যাবে?", answer: "প্রোডাক্ট বিবরণে উপাদান উল্লেখ করা থাকে, নির্দিষ্ট সমস্যা থাকলে আগে জিজ্ঞাসা করে নিন।" },
    ],
  },
  {
    id: "cat-fitness",
    name: "Fitness Gadget",
    slug: "fitness-gadget",
    tagline: "Track it, or it didn't happen",
    description:
      "Smartwatches, bands and home-gym accessories for people who like their progress in numbers.",
    banner_image_url: img("Fitness+Gadget", "0e1f3c"),
    display_order: 6,
    is_active: true,
    trust_points: [
      { icon: "BadgeCheck", title: "নির্ভুল ট্র্যাকিং", description: "হার্টরেট, স্টেপস ও ক্যালরি নিখুঁতভাবে পরিমাপ।" },
      { icon: "ShieldCheck", title: "ওয়াটার রেজিস্ট্যান্ট", description: "ঘাম ও হালকা বৃষ্টিতে নিশ্চিন্তে ব্যবহার।" },
      { icon: "Truck", title: "৭ দিন এক্সচেঞ্জ", description: "সাইজ বা মডেল না মিললে বদলে নিন।" },
    ],
    testimonials: [
      { name: "তাহমিদ রহমান", quote: "প্রতিদিনের স্টেপ ও হার্টরেট ট্র্যাক করতে পারছি, একদম নির্ভুল মনে হয়েছে।", rating: 5 },
      { name: "মিথিলা চৌধুরী", quote: "দাম কম হলেও ফিচার অনেক, ভালো লেগেছে।", rating: 4 },
    ],
    faqs: [
      { question: "সাঁতার কাটার সময় পরা যাবে?", answer: "ওয়াটার রেজিস্ট্যান্ট মডেলগুলোতে যাবে, প্রোডাক্ট পেজে উল্লেখ করা থাকে।" },
      { question: "মোবাইলে অ্যাপ লাগবে?", answer: "হ্যাঁ, একটা ফ্রি অ্যাপ দিয়ে কানেক্ট করতে হয়, সেটআপ গাইড বক্সে দেওয়া থাকে।" },
    ],
  },
  {
    id: "cat-baby-kids",
    name: "Baby & Kids Gadget",
    slug: "baby-kids-gadget",
    tagline: "Peace of mind, in one small device",
    description:
      "Monitors, feeders and safety gadgets chosen for parents who check twice before adding anything to the crib.",
    banner_image_url: "/banners/baby-kids-gadget.jpg",
    display_order: 7,
    is_active: true,
    trust_points: [
      { icon: "ShieldCheck", title: "নন-টক্সিক", description: "শিশুদের জন্য নিরাপদ, পরীক্ষিত উপকরণ।" },
      { icon: "Truck", title: "প্রায়োরিটি ডেলিভারি", description: "বেবি অর্ডার আলাদাভাবে দ্রুত পাঠানো হয়।" },
      { icon: "Headset", title: "প্যারেন্ট সাপোর্ট", description: "ব্যবহারবিধি নিয়ে হোয়াটসঅ্যাপে সরাসরি সহায়তা।" },
    ],
    testimonials: [
      { name: "শারমিন আক্তার", quote: "বাচ্চার ঘুমের সময় মনিটর দিয়ে দেখতে পারি, মনে অনেক শান্তি লাগে।", rating: 5 },
      { name: "রাকিব হাসান", quote: "কোয়ালিটি ভালো, বাচ্চার জন্য নিরাপদ মনে হয়েছে।", rating: 5 },
    ],
    faqs: [
      { question: "প্রোডাক্ট কি BPA-মুক্ত?", answer: "হ্যাঁ, শিশুদের প্রোডাক্টে নিরাপদ, পরীক্ষিত উপকরণ ব্যবহার করা হয়।" },
      { question: "দ্রুত ডেলিভারি সম্ভব?", answer: "বেবি অর্ডার প্রায়োরিটি হিসেবে পাঠানো হয়, সাধারণত দ্রুততম সময়ে পৌঁছে যায়।" },
    ],
  },
  {
    id: "cat-gaming",
    name: "Gaming Gadget",
    slug: "gaming-gadget",
    tagline: "Built for the 2 a.m. ranked match",
    description:
      "Controllers, headsets and RGB peripherals for setups that need to look as good as they perform.",
    banner_image_url: "/banners/gaming-gadget.jpg",
    display_order: 8,
    is_active: true,
    trust_points: [
      { icon: "BadgeCheck", title: "লো-ল্যাটেন্সি", description: "প্রতিটি ডিভাইস রেসপন্স টাইম টেস্ট করে পাস করা।" },
      { icon: "ShieldCheck", title: "৬ মাস ওয়ারেন্টি", description: "হার্ডওয়্যার ত্রুটিতে ফ্রি সার্ভিসিং।" },
      { icon: "Truck", title: "সারাদেশে ডেলিভারি", description: "৬৪ জেলাতেই কুরিয়ারে পাঠানো হয়।" },
    ],
    testimonials: [
      { name: "আরিফুল ইসলাম", quote: "কন্ট্রোলারের রেসপন্স টাইম খুব ভালো, গেমিং এক্সপেরিয়েন্স বদলে গেছে।", rating: 5 },
      { name: "নাফিজ রহমান", quote: "হেডসেটের সাউন্ড কোয়ালিটি এই দামে আশা করিনি।", rating: 5 },
    ],
    faqs: [
      { question: "PC ও কনসোল দুটোতেই চলবে?", answer: "বেশিরভাগ প্রোডাক্ট PC ও কনসোল দুটোতেই কম্প্যাটিবল, নির্দিষ্ট প্রোডাক্ট পেজে উল্লেখ করা থাকে।" },
      { question: "ওয়ারেন্টি ক্লেইম কীভাবে করব?", answer: "হোয়াটসঅ্যাপে অর্ডার নাম্বার সহ যোগাযোগ করলেই ওয়ারেন্টি প্রসেস শুরু হয়ে যাবে।" },
    ],
  },
];

function product(
  id: string,
  categoryId: string,
  name: string,
  slug: string,
  price: number,
  compareAt: number | null,
  imgLabel: string,
  bg: string,
  featured = false
): Product {
  return {
    id,
    category_id: categoryId,
    name,
    slug,
    short_description: null,
    description:
      "আসল প্রোডাক্ট, আসল ছবি। অর্ডার করার আগে হোয়াটসঅ্যাপে চ্যাট করে যেকোনো প্রশ্ন জিজ্ঞাসা করতে পারেন।",
    price,
    compare_at_price: compareAt,
    stock_quantity: 24,
    is_featured: featured,
    is_active: true,
    images: [
      { id: `${id}-img1`, product_id: id, image_url: img(imgLabel, bg), display_order: 0, is_primary: true },
    ],
    landing_page: { ...DEFAULT_LANDING_PAGE },
  };
}

/** Same as product(), but with a real uploaded photo instead of a generated placeholder. */
function productWithImage(
  id: string,
  categoryId: string,
  name: string,
  slug: string,
  price: number,
  compareAt: number | null,
  imageUrl: string,
  featured = false
): Product {
  return {
    id,
    category_id: categoryId,
    name,
    slug,
    short_description: null,
    description:
      "আসল প্রোডাক্ট, আসল ছবি। অর্ডার করার আগে হোয়াটসঅ্যাপে চ্যাট করে যেকোনো প্রশ্ন জিজ্ঞাসা করতে পারেন।",
    price,
    compare_at_price: compareAt,
    stock_quantity: 24,
    is_featured: featured,
    is_active: true,
    images: [{ id: `${id}-img1`, product_id: id, image_url: imageUrl, display_order: 0, is_primary: true }],
    landing_page: { ...DEFAULT_LANDING_PAGE },
  };
}

export const MOCK_PRODUCTS: Product[] = [
  product("p1", "cat-camera", "Content Creator Mirrorless Kit", "content-creator-mirrorless-kit", 19999, 24999, "Mirrorless+Kit", "0e1f3c", true),
  product("p2", "cat-camera", "Vlogging Camera + Mic Combo", "vlogging-camera-mic-combo", 14000, 17500, "Vlogging+Combo", "17335e"),
  product("p3", "cat-laptop", "Laptop Mobile Desk Setup", "laptop-mobile-desk-setup", 50000, 69999, "Desk+Setup", "0e1f3c", true),
  product("p4", "cat-laptop", "Complete Digital Workstation", "complete-digital-workstation", 50000, 58000, "Workstation", "17335e"),
  product("p5", "cat-smart-home", "Smart Bulb + Plug Starter Pack", "smart-bulb-plug-starter-pack", 2499, 3200, "Starter+Pack", "0e1f3c", true),
  product("p6", "cat-smart-home", "WiFi Video Doorbell", "wifi-video-doorbell", 4200, null, "Video+Doorbell", "17335e"),
  product("p7", "cat-kitchen", "Electric Vegetable Chopper", "electric-vegetable-chopper", 1450, 1900, "Veg+Chopper", "e0550a", true),
  product("p8", "cat-kitchen", "3-in-1 Juicer Grinder", "3-in-1-juicer-grinder", 3200, 3900, "Juicer+Grinder", "0e1f3c"),
  product("p9", "cat-personal-care", "Cordless Hair Trimmer Pro", "cordless-hair-trimmer-pro", 1650, 2100, "Hair+Trimmer", "17335e", true),
  product("p10", "cat-personal-care", "Facial Steamer + Cleanser Set", "facial-steamer-cleanser-set", 2100, null, "Facial+Steamer", "e0550a"),
  product("p11", "cat-fitness", "Smart Fitness Band X2", "smart-fitness-band-x2", 1899, 2500, "Fitness+Band", "0e1f3c", true),
  product("p12", "cat-fitness", "Adjustable Resistance Band Set", "adjustable-resistance-band-set", 990, 1300, "Resistance+Bands", "17335e"),
  product("p13", "cat-baby-kids", "Smart Baby Monitor Camera", "smart-baby-monitor-camera", 3600, 4500, "Baby+Monitor", "e0550a", true),
  product("p14", "cat-baby-kids", "Portable Bottle Warmer", "portable-bottle-warmer", 1350, null, "Bottle+Warmer", "0e1f3c"),
  product("p15", "cat-gaming", "RGB Wireless Gaming Controller", "rgb-wireless-gaming-controller", 2450, 3100, "Gaming+Controller", "17335e", true),
  product("p16", "cat-gaming", "7.1 Surround Gaming Headset", "7-1-surround-gaming-headset", 2900, 3600, "Gaming+Headset", "0e1f3c"),
];

// Additional demo products from real uploaded photos (recategorized by
// actual content, not by the source folder they arrived in — see chat).
MOCK_PRODUCTS.push(productWithImage("p17", "cat-camera", "Mini Action Camera 4K", "mini-action-camera-4k", 3200, 4000, "/products/camera-photography/mini-action-camera.jpg"));
MOCK_PRODUCTS.push(productWithImage("p18", "cat-camera", "Wireless Lavalier Microphone Set", "wireless-lavalier-mic-set", 1450, 1900, "/products/camera-photography/wireless-lavalier-mic-set.jpg"));
MOCK_PRODUCTS.push(productWithImage("p19", "cat-laptop", "Foldable Laptop Stand", "foldable-laptop-stand", 890, 1200, "/products/laptop-computer-gadget/foldable-laptop-stand.jpg"));
MOCK_PRODUCTS.push(productWithImage("p20", "cat-laptop", "Wall-Mount Router Shelf", "wall-mount-router-shelf", 650, null, "/products/laptop-computer-gadget/wall-mount-router-shelf.jpg"));
MOCK_PRODUCTS.push(productWithImage("p21", "cat-laptop", "Wireless Audio Smart Glasses", "wireless-audio-smart-glasses", 2800, 3500, "/products/laptop-computer-gadget/wireless-audio-smart-glasses.jpg"));
MOCK_PRODUCTS.push(productWithImage("p22", "cat-laptop", "Adjustable Tablet & Book Stand", "adjustable-tablet-book-stand", 750, null, "/products/laptop-computer-gadget/adjustable-tablet-stand.jpg"));
MOCK_PRODUCTS.push(productWithImage("p23", "cat-laptop", "WiFi Range Extender", "wifi-range-extender", 1350, 1700, "/products/laptop-computer-gadget/wifi-range-extender.jpg"));
MOCK_PRODUCTS.push(productWithImage("p24", "cat-smart-home", "Mosquito Coil Holder Box", "mosquito-coil-holder-box", 350, null, "/products/smart-home-gadgets/mosquito-coil-holder-box.jpg"));
MOCK_PRODUCTS.push(productWithImage("p25", "cat-smart-home", "High-Pressure Spray Gun Nozzle", "high-pressure-spray-gun-nozzle", 450, 600, "/products/smart-home-gadgets/high-pressure-spray-gun-nozzle.jpg"));
MOCK_PRODUCTS.push(productWithImage("p26", "cat-smart-home", "Humane Mouse Trap Set (4pc)", "humane-mouse-trap-set", 380, null, "/products/smart-home-gadgets/humane-mouse-trap-set.jpg"));
MOCK_PRODUCTS.push(productWithImage("p27", "cat-smart-home", "Solar Motion Sensor Wall Light", "solar-motion-sensor-wall-light", 990, 1300, "/products/smart-home-gadgets/solar-motion-sensor-wall-light.jpg"));
MOCK_PRODUCTS.push(productWithImage("p28", "cat-smart-home", "Foldable Shoe Rack Organizer", "foldable-shoe-rack-organizer", 1450, 1800, "/products/smart-home-gadgets/foldable-shoe-rack-organizer.jpg"));
MOCK_PRODUCTS.push(productWithImage("p29", "cat-smart-home", "Portable Handheld Turbo Fan", "portable-handheld-turbo-fan", 690, null, "/products/smart-home-gadgets/portable-handheld-turbo-fan.jpg"));
MOCK_PRODUCTS.push(productWithImage("p30", "cat-smart-home", "Motion Sensor Plug Night Light", "motion-sensor-plug-night-light", 450, 600, "/products/smart-home-gadgets/motion-sensor-plug-night-light.jpg"));
MOCK_PRODUCTS.push(productWithImage("p31", "cat-smart-home", "Heavy-Duty Door Closer", "heavy-duty-door-closer", 550, null, "/products/smart-home-gadgets/heavy-duty-door-closer.jpg"));
MOCK_PRODUCTS.push(productWithImage("p32", "cat-smart-home", "Solar Decorative Lantern Light", "solar-decorative-lantern-light", 850, 1100, "/products/smart-home-gadgets/solar-decorative-lantern-light.jpg"));
MOCK_PRODUCTS.push(productWithImage("p33", "cat-smart-home", "Adhesive Wall Hook Set", "adhesive-wall-hook-set", 250, null, "/products/smart-home-gadgets/adhesive-wall-hook-set.jpg"));
MOCK_PRODUCTS.push(productWithImage("p34", "cat-smart-home", "Powerful Toilet Plunger Pump", "powerful-toilet-plunger-pump", 480, null, "/products/smart-home-gadgets/powerful-toilet-plunger-pump.jpg"));
MOCK_PRODUCTS.push(productWithImage("p35", "cat-kitchen", "Portable Bag Sealing Machine", "portable-bag-sealing-machine", 590, 750, "/products/kitchen-gadgets/portable-bag-sealing-machine.jpg"));
MOCK_PRODUCTS.push(productWithImage("p36", "cat-kitchen", "Ceramic Cartridge Water Purifier", "ceramic-cartridge-water-purifier", 1250, 1600, "/products/kitchen-gadgets/ceramic-cartridge-water-purifier.jpg"));
MOCK_PRODUCTS.push(productWithImage("p37", "cat-kitchen", "Portable USB Juicer Bottle", "portable-usb-juicer-bottle", 990, 1300, "/products/kitchen-gadgets/portable-usb-juicer-bottle.jpg"));
MOCK_PRODUCTS.push(productWithImage("p38", "cat-kitchen", "Electric Spice & Coffee Grinder", "electric-spice-coffee-grinder", 1450, 1800, "/products/kitchen-gadgets/electric-spice-coffee-grinder.jpg"));
MOCK_PRODUCTS.push(productWithImage("p39", "cat-kitchen", "Kitchen Exhaust Cleaner Spray", "kitchen-exhaust-cleaner-spray", 320, null, "/products/kitchen-gadgets/kitchen-exhaust-cleaner-spray.jpg"));
MOCK_PRODUCTS.push(productWithImage("p40", "cat-kitchen", "Multi-Blade Cheese Grater", "multi-blade-cheese-grater", 450, 600, "/products/kitchen-gadgets/multi-blade-cheese-grater.jpg"));
MOCK_PRODUCTS.push(productWithImage("p41", "cat-kitchen", "4-Layer Faucet Water Filter", "4-layer-faucet-water-filter", 890, 1100, "/products/kitchen-gadgets/4-layer-faucet-water-filter.jpg"));
MOCK_PRODUCTS.push(productWithImage("p42", "cat-personal-care", "Long-Lasting Hair Color", "long-lasting-hair-color", 450, null, "/products/personal-care-gadget/long-lasting-hair-color.jpg"));
MOCK_PRODUCTS.push(productWithImage("p43", "cat-personal-care", "5-in-1 Facial Cleansing Brush Set", "5in1-facial-cleansing-brush-set", 890, 1200, "/products/personal-care-gadget/5in1-facial-cleansing-brush-set.jpg"));
MOCK_PRODUCTS.push(productWithImage("p44", "cat-personal-care", "Neck-Mounted Portable Fan", "neck-mounted-portable-fan", 650, null, "/products/personal-care-gadget/neck-mounted-portable-fan.jpg"));
MOCK_PRODUCTS.push(productWithImage("p45", "cat-personal-care", "Magnetic Therapy Bracelet", "magnetic-therapy-bracelet", 590, 800, "/products/personal-care-gadget/magnetic-therapy-bracelet.jpg"));
MOCK_PRODUCTS.push(productWithImage("p46", "cat-personal-care", "Hair Oil Applicator Comb", "hair-oil-applicator-comb", 490, null, "/products/personal-care-gadget/hair-oil-applicator-comb.jpg"));
MOCK_PRODUCTS.push(productWithImage("p47", "cat-personal-care", "Digital Arm Blood Pressure Monitor", "digital-arm-bp-monitor", 1850, 2300, "/products/personal-care-gadget/digital-arm-bp-monitor.jpg"));
MOCK_PRODUCTS.push(productWithImage("p48", "cat-personal-care", "Period Relief Heating Belt", "period-relief-heating-belt", 990, 1300, "/products/personal-care-gadget/period-relief-heating-belt.jpg"));
MOCK_PRODUCTS.push(productWithImage("p49", "cat-personal-care", "Flawless Facial Hair Remover", "flawless-facial-hair-remover", 690, 900, "/products/personal-care-gadget/flawless-facial-hair-remover.jpg"));
MOCK_PRODUCTS.push(productWithImage("p50", "cat-personal-care", "Anti-Aging Derma Roller", "anti-aging-derma-roller", 550, 750, "/products/personal-care-gadget/anti-aging-derma-roller.jpg"));
MOCK_PRODUCTS.push(productWithImage("p51", "cat-personal-care", "Portable Ear Cleaning Tool Set", "portable-ear-cleaning-tool-set", 750, null, "/products/personal-care-gadget/portable-ear-cleaning-tool-set.jpg"));
MOCK_PRODUCTS.push(productWithImage("p52", "cat-fitness", "Core Trainer Sit-Up Bar", "core-trainer-situp-bar", 1450, 1900, "/products/fitness-gadget/core-trainer-situp-bar.jpg"));
MOCK_PRODUCTS.push(productWithImage("p53", "cat-fitness", "Sports Wireless Neckband Earphones", "sports-wireless-neckband-earphones", 890, 1200, "/products/fitness-gadget/sports-neckband-earphones.jpg"));
MOCK_PRODUCTS.push(productWithImage("p54", "cat-fitness", "Adjustable Knee Support Brace", "adjustable-knee-support-brace", 450, null, "/products/fitness-gadget/knee-support-brace.jpg"));
MOCK_PRODUCTS.push(productWithImage("p55", "cat-fitness", "Posture Corrector Back Brace", "posture-corrector-back-brace", 690, 900, "/products/fitness-gadget/posture-corrector-brace.jpg"));
MOCK_PRODUCTS.push(productWithImage("p56", "cat-baby-kids", "Portable Travel Potty Seat", "portable-travel-potty-seat", 890, 1100, "/products/baby-kids-gadget/portable-travel-potty-seat.jpg"));
MOCK_PRODUCTS.push(productWithImage("p57", "cat-baby-kids", "Soft Toddler Potty Seat", "soft-toddler-potty-seat", 750, null, "/products/baby-kids-gadget/soft-toddler-potty-seat.jpg"));
MOCK_PRODUCTS.push(productWithImage("p58", "cat-baby-kids", "Inflatable Kids Arm Floats", "inflatable-kids-arm-floats", 350, 450, "/products/baby-kids-gadget/inflatable-kids-arm-floats.jpg"));
MOCK_PRODUCTS.push(productWithImage("p59", "cat-baby-kids", "Baby Hooded Towel", "baby-hooded-towel", 590, null, "/products/baby-kids-gadget/baby-hooded-towel.jpg"));
MOCK_PRODUCTS.push(productWithImage("p60", "cat-baby-kids", "Baby Walking Assistant Harness", "baby-walking-assistant-harness", 890, 1100, "/products/baby-kids-gadget/baby-walking-assistant-harness.jpg"));
MOCK_PRODUCTS.push(productWithImage("p61", "cat-baby-kids", "Wooden Solitaire Game", "wooden-solitaire-game", 450, null, "/products/baby-kids-gadget/wooden-solitaire-game.jpg"));
MOCK_PRODUCTS.push(productWithImage("p62", "cat-baby-kids", "Baby Carrier Straps", "baby-carrier-straps", 1250, 1600, "/products/baby-kids-gadget/baby-carrier-straps.jpg"));
MOCK_PRODUCTS.push(product("p63", "cat-gaming", "Mechanical RGB Gaming Keyboard", "mechanical-rgb-gaming-keyboard", 3200, 4000, "Mechanical+RGB+Gaming+Keyboard", "17335e"));
MOCK_PRODUCTS.push(product("p64", "cat-gaming", "RGB Gaming Mouse", "rgb-gaming-mouse", 1450, 1800, "RGB+Gaming+Mouse", "17335e"));
MOCK_PRODUCTS.push(product("p65", "cat-gaming", "Gaming Mouse Pad XXL", "gaming-mouse-pad-xxl", 650, null, "Gaming+Mouse+Pad+XXL", "17335e"));

// Real photos replacing two existing demo products' placeholders
function setImage(id: string, url: string) {
  const p = MOCK_PRODUCTS.find((pr) => pr.id === id);
  if (p) p.images = [{ id: `${id}-img1`, product_id: id, image_url: url, display_order: 0, is_primary: true }];
}
setImage("p7", "/products/kitchen-gadgets/electric-vegetable-chopper.jpg");
setImage("p10", "/products/personal-care-gadget/facial-steamer-cleanser-set.jpg");

// Rich promotional landing pages for a subset of products (Landing Page
// Builder feature) — matches the design previewed as standalone HTML.
const LANDING_PAGES: Record<string, ProductLandingPage> = {
  "p3": {
    "enabled": true,
    "subtitle": "যেকোনো রুমে ৩০ সেকেন্ডে বসিয়ে নিন সম্পূর্ণ কাজের জায়গা — বিছানায়, সোফায়, বারান্দায়, যেখানেই বসুন।",
    "badge_text": "বেস্ট সেলার",
    "announcement": "🔥 সীমিত সময়ের অফার — ২৮% ছাড় চলছে এই প্রোডাক্টে",
    "gallery_images": [
      "https://placehold.co/600x600/17335e/ffffff?text=Desk+Setup&font=roboto",
      "https://placehold.co/600x600/0e1f3c/ffffff?text=Folded+View&font=roboto",
      "https://placehold.co/600x600/17335e/ffffff?text=In+Use&font=roboto",
      "https://placehold.co/600x600/0e1f3c/ffffff?text=Box+Contents&font=roboto"
    ],
    "pain_points": [
      {
        "emoji": "🛏️",
        "title": "বিছানায় কাজ করলে ঘাড়ে-কোমরে ব্যথা",
        "description": "ল্যাপটপ কোলে নিয়ে ঘণ্টার পর ঘণ্টা কাজ করলে শরীরে চাপ পড়ে, দীর্ঘমেয়াদে ক্ষতি হয়।"
      },
      {
        "emoji": "📦",
        "title": "আলাদা কাজের রুম বা টেবিল নেই",
        "description": "ছোট বাসায় স্থায়ী ডেস্ক রাখার জায়গা অনেকের নেই — কিন্তু প্রফেশনাল সেটআপ তো লাগবেই।"
      },
      {
        "emoji": "🔌",
        "title": "ক্যাবল আর জিনিসপত্র সব এলোমেলো",
        "description": "চার্জার, মাউস, হেডফোন — সব ছড়িয়ে থাকে, প্রতিবার গোছাতে সময় নষ্ট হয়।"
      }
    ],
    "features": [
      {
        "title": "যেকোনো উচ্চতায় অ্যাডজাস্ট করুন",
        "description": "বসে বা দাঁড়িয়ে, আপনার আরাম অনুযায়ী উচ্চতা ঠিক করে নিন।"
      },
      {
        "title": "৩০ সেকেন্ডে ভাঁজ করে রাখুন",
        "description": "ব্যবহার শেষে ফোল্ড করে বিছানার নিচে বা ওয়ারড্রোবে রেখে দিন।"
      },
      {
        "title": "বিল্ট-ইন ক্যাবল ম্যানেজমেন্ট",
        "description": "চার্জার ও তার গুছিয়ে রাখার আলাদা জায়গা আছে, টেবিল থাকবে পরিপাটি।"
      },
      {
        "title": "মজবুত অথচ হালকা",
        "description": "এভিয়েশন-গ্রেড অ্যালুমিনিয়াম ফ্রেম — ১৫ কেজি পর্যন্ত ভার নিতে পারে, ওজন মাত্র ২.৩ কেজি।"
      }
    ],
    "specs": [
      {
        "label": "উপাদান",
        "value": "অ্যালুমিনিয়াম অ্যালয় + ABS"
      },
      {
        "label": "ভার ধারণক্ষমতা",
        "value": "১৫ কেজি পর্যন্ত"
      },
      {
        "label": "ওজন",
        "value": "২.৩ কেজি"
      },
      {
        "label": "উচ্চতা রেঞ্জ",
        "value": "২৫ সেমি – ৪৫ সেমি (অ্যাডজাস্টেবল)"
      },
      {
        "label": "ভাঁজ করা আকার",
        "value": "৫২ সেমি × ২৪ সেমি × ৬ সেমি"
      },
      {
        "label": "রঙ",
        "value": "স্পেস গ্রে, নেভি ব্লু"
      },
      {
        "label": "বক্সে যা থাকছে",
        "value": "ডেস্ক ইউনিট, ক্যারি ব্যাগ, ইউজার গাইড"
      }
    ],
    "comparison_label": "সাধারণ টেবিল",
    "comparison_rows": [
      {
        "label": "উচ্চতা অ্যাডজাস্টেবল",
        "ours": "✓ হ্যাঁ",
        "theirs": "✗ না"
      },
      {
        "label": "বহনযোগ্য / ভাঁজযোগ্য",
        "ours": "✓ হ্যাঁ",
        "theirs": "✗ না"
      },
      {
        "label": "ক্যাবল ম্যানেজমেন্ট",
        "ours": "✓ বিল্ট-ইন",
        "theirs": "✗ নেই"
      },
      {
        "label": "ওজন",
        "ours": "২.৩ কেজি",
        "theirs": "৮-১৫ কেজি"
      },
      {
        "label": "দাম",
        "ours": "৳৫০,০০০",
        "theirs": "৳৪০,০০০+"
      }
    ],
    "testimonials": [
      {
        "name": "তানভীর হাসান",
        "quote": "বিছানায় বসে আরামে অফিসের কাজ করতে পারছি, ঘাড়ে ব্যথাও কমে গেছে।",
        "rating": 5
      },
      {
        "name": "ফারজানা আক্তার",
        "quote": "ফোল্ড করে রাখা যায় বলে ছোট রুমেও সমস্যা হয় না। কোয়ালিটিও প্রিমিয়াম মনে হয়েছে।",
        "rating": 5
      },
      {
        "name": "রাকিব উদ্দিন",
        "quote": "দামটা একটু বেশি মনে হয়েছিল প্রথমে, কিন্তু ব্যবহার করার পর মনে হচ্ছে টাকা উসুল।",
        "rating": 4
      }
    ],
    "order_benefits": [
      {
        "icon": "🚚",
        "title": "ফ্রি ডেলিভারি",
        "description": "ঢাকার ভিতরে"
      },
      {
        "icon": "🛡️",
        "title": "৭ দিন রিপ্লেসমেন্ট",
        "description": "ত্রুটি পেলে বদলে দেওয়া হয়"
      },
      {
        "icon": "💵",
        "title": "ক্যাশ অন ডেলিভারি",
        "description": "হাতে পেয়ে টাকা দিন"
      },
      {
        "icon": "🎒",
        "title": "ফ্রি ক্যারি ব্যাগ",
        "description": "প্রতিটি অর্ডারের সাথে"
      }
    ],
    "faqs": [
      {
        "question": "অ্যাসেম্বল করা লাগবে কি?",
        "answer": "না, একদম রেডি অবস্থায় আসে — বক্স থেকে বের করে খুলে নিলেই ব্যবহার করা যায়।"
      },
      {
        "question": "কোন সাইজের ল্যাপটপে ফিট হবে?",
        "answer": "১১ ইঞ্চি থেকে ১৭ ইঞ্চি পর্যন্ত সব ল্যাপটপের জন্য উপযুক্ত।"
      },
      {
        "question": "কতদিনের ওয়ারেন্টি?",
        "answer": "১ বছরের ম্যানুফ্যাকচারার ওয়ারেন্টি, প্লাস ৭ দিনের রিপ্লেসমেন্ট গ্যারান্টি।"
      },
      {
        "question": "ঢাকার বাইরে ডেলিভারি হয়?",
        "answer": "হ্যাঁ, সারা বাংলাদেশে কুরিয়ারের মাধ্যমে পাঠানো হয়, ৩-৫ দিন সময় লাগে।"
      }
    ],
    "countdown_end_at": "2026-09-20T18:00:00.000Z",
    "show_contact_card": true
  },
  "p8": {
    "enabled": true,
    "subtitle": "জুস, মসলা বাটা, আর ব্লেন্ডিং — একটা মেশিনেই তিনটা কাজ, রান্নাঘরে জায়গাও কম লাগবে।",
    "badge_text": "বেস্ট সেলার",
    "announcement": "🔥 সীমিত সময়ের অফার — ১৮% ছাড় চলছে এই প্রোডাক্টে",
    "gallery_images": [
      "https://placehold.co/600x600/e0550a/ffffff?text=Juicer+Grinder&font=roboto",
      "https://placehold.co/600x600/0e1f3c/ffffff?text=Jars&font=roboto",
      "https://placehold.co/600x600/17335e/ffffff?text=In+Kitchen&font=roboto",
      "https://placehold.co/600x600/0e1f3c/ffffff?text=Box+Contents&font=roboto"
    ],
    "pain_points": [
      {
        "emoji": "🧄",
        "title": "প্রতিদিন হাতে মসলা বাটা কষ্টকর",
        "description": "শীল-পাটায় বাটতে সময় ও শক্তি দুটোই বেশি লাগে, হাতেও ব্যথা হয়।"
      },
      {
        "emoji": "💸",
        "title": "আলাদা আলাদা মেশিন কিনতে বেশি টাকা লাগে",
        "description": "জুসার, গ্রাইন্ডার, ব্লেন্ডার আলাদা কিনলে খরচ ও জায়গা দুটোই বেড়ে যায়।"
      },
      {
        "emoji": "🧽",
        "title": "পরিষ্কার করা ঝামেলার",
        "description": "বেশিরভাগ মেশিন খুলে পরিষ্কার করা কঠিন, তাই ব্যবহারই কমে যায়।"
      }
    ],
    "features": [
      {
        "title": "৩টা আলাদা জার — জুস, গ্রাইন্ড, ব্লেন্ড",
        "description": "একই মোটরে তিন ধরনের জার বদলে বদলে ব্যবহার করা যায়।"
      },
      {
        "title": "৫০০ ওয়াট শক্তিশালী মোটর",
        "description": "শক্ত মসলা, বরফ, বাদাম — সবকিছু সহজে গুঁড়ো করে ফেলে।"
      },
      {
        "title": "স্টেইনলেস স্টিল ব্লেড",
        "description": "মরিচা পড়ে না, দীর্ঘদিন ধারালো থাকে, খাবারের জন্য নিরাপদ।"
      },
      {
        "title": "সহজে খোলা-লাগানো জার",
        "description": "প্রতিটা জার আলাদা করে ধুয়ে নেওয়া যায়, পানির নিচেও ধরা যায় নিশ্চিন্তে।"
      }
    ],
    "specs": [
      {
        "label": "মোটর পাওয়ার",
        "value": "৫০০ ওয়াট"
      },
      {
        "label": "জারের সংখ্যা",
        "value": "৩টি (জুসার, গ্রাইন্ডার, ব্লেন্ডার)"
      },
      {
        "label": "জারের উপাদান",
        "value": "ফুড-গ্রেড ট্রাইট্যান প্লাস্টিক"
      },
      {
        "label": "ব্লেড",
        "value": "স্টেইনলেস স্টিল"
      },
      {
        "label": "ভোল্টেজ",
        "value": "২২০-২৪০V, ৫০Hz"
      },
      {
        "label": "ওয়ারেন্টি",
        "value": "১ বছর মোটর ওয়ারেন্টি"
      },
      {
        "label": "বক্সে যা থাকছে",
        "value": "মোটর বেস, ৩টি জার, ইউজার গাইড"
      }
    ],
    "comparison_label": "আলাদা ৩টি মেশিন",
    "comparison_rows": [
      {
        "label": "মোট দাম",
        "ours": "৳৩,২০০",
        "theirs": "৳৭,০০০+"
      },
      {
        "label": "রান্নাঘরে জায়গা লাগে",
        "ours": "১টা মেশিনের সমান",
        "theirs": "৩টা মেশিনের সমান"
      },
      {
        "label": "পরিষ্কার করা",
        "ours": "সহজ, খুলে ধোয়া যায়",
        "theirs": "মেশিনভেদে ভিন্ন"
      },
      {
        "label": "ওয়ারেন্টি ম্যানেজ করা",
        "ours": "১টা ওয়ারেন্টি",
        "theirs": "৩টা আলাদা ওয়ারেন্টি"
      }
    ],
    "testimonials": [
      {
        "name": "রুমানা আক্তার",
        "quote": "মসলা বাটা এখন ২ মিনিটের কাজ, আগে যেখানে ২০ মিনিট লাগত।",
        "rating": 5
      },
      {
        "name": "কামরুল হাসান",
        "quote": "তিনটা জার আলাদা থাকায় একসাথে জুস আর মসলা বাটা দুটোই করতে পারি।",
        "rating": 5
      },
      {
        "name": "সাবরিনা ইয়াসমিন",
        "quote": "দামের তুলনায় পারফরম্যান্স খুব ভালো, তবে আওয়াজ একটু বেশি মনে হয়েছে।",
        "rating": 4
      }
    ],
    "order_benefits": [
      {
        "icon": "🚚",
        "title": "ফ্রি ডেলিভারি",
        "description": "ঢাকার ভিতরে"
      },
      {
        "icon": "🛡️",
        "title": "৭ দিন রিপ্লেসমেন্ট",
        "description": "ত্রুটি পেলে বদলে দেওয়া হয়"
      },
      {
        "icon": "💵",
        "title": "ক্যাশ অন ডেলিভারি",
        "description": "হাতে পেয়ে টাকা দিন"
      },
      {
        "icon": "📖",
        "title": "ফ্রি রেসিপি বুকলেট",
        "description": "প্রতিটি অর্ডারের সাথে"
      }
    ],
    "faqs": [
      {
        "question": "জার কি ফুড-সেফ?",
        "answer": "হ্যাঁ, BPA-মুক্ত ফুড-গ্রেড প্লাস্টিক দিয়ে তৈরি, সরাসরি খাবারের সংস্পর্শে নিরাপদ।"
      },
      {
        "question": "মোটর কতদিন টিকবে?",
        "answer": "স্বাভাবিক ব্যবহারে বহু বছর চলে, সাথে ১ বছরের ওয়ারেন্টিও আছে।"
      },
      {
        "question": "বরফ ভাঙতে পারবে?",
        "answer": "হ্যাঁ, ৫০০ ওয়াট মোটর দিয়ে সহজেই বরফ ভাঙা যায়।"
      },
      {
        "question": "ধোয়ার সময় মোটর অংশে পানি লাগলে সমস্যা হবে?",
        "answer": "মোটর বেস আলাদা থাকে, শুধু জারগুলোই খুলে ধোয়া যায় — মোটরে পানি দেওয়ার দরকার নেই।"
      }
    ],
    "countdown_end_at": "2026-09-18T18:00:00.000Z",
    "show_contact_card": true
  },
  "p5": {
    "enabled": true,
    "subtitle": "মোবাইল দিয়ে ঘরের বাতি ও প্লাগ নিয়ন্ত্রণ করুন যেকোনো জায়গা থেকে — কোনো ওয়্যারিং ছাড়াই, ৫ মিনিটে সেটআপ।",
    "badge_text": "বেস্ট সেলার",
    "announcement": "🔥 সীমিত সময়ের অফার — ২২% ছাড় চলছে এই প্রোডাক্টে",
    "gallery_images": [
      "https://placehold.co/600x600/0e1f3c/ffffff?text=Smart+Starter+Pack&font=roboto",
      "https://placehold.co/600x600/17335e/ffffff?text=App+Control&font=roboto",
      "https://placehold.co/600x600/0e1f3c/ffffff?text=In+Room&font=roboto",
      "https://placehold.co/600x600/17335e/ffffff?text=Box+Contents&font=roboto"
    ],
    "pain_points": [
      {
        "emoji": "🔑",
        "title": "বাসায় না থেকে চিন্তা — লাইট বন্ধ করেছি তো?",
        "description": "বাইরে থেকে বাসার বাতি/ফ্যান বন্ধ আছে কিনা জানার কোনো উপায় নেই।"
      },
      {
        "emoji": "🔧",
        "title": "ইলেকট্রিশিয়ান ছাড়া স্মার্ট হোম কঠিন মনে হয়",
        "description": "স্মার্ট হোম মানেই জটিল ওয়্যারিং আর খরচ — এমন ধারণা থেকেই অনেকে শুরু করেন না।"
      },
      {
        "emoji": "🔌",
        "title": "একগাদা রিমোট আর সুইচ মনে রাখা যায় না",
        "description": "প্রতিটা ডিভাইসের আলাদা কন্ট্রোল, কোনটা কী করে মনে রাখাই কঠিন।"
      }
    ],
    "features": [
      {
        "title": "যেকোনো জায়গা থেকে কন্ট্রোল",
        "description": "অফিসে বসেই বাসার বাতি অন/অফ করুন মোবাইল অ্যাপ দিয়ে।"
      },
      {
        "title": "শিডিউল ও টাইমার সেট করুন",
        "description": "সকাল-সন্ধ্যা নির্দিষ্ট সময়ে অটোমেটিক অন/অফ হয়ে যাবে।"
      },
      {
        "title": "কোনো ওয়্যারিং লাগবে না",
        "description": "বিদ্যমান হোল্ডার ও সুইচবোর্ডেই বসিয়ে নেওয়া যায়, ইলেকট্রিশিয়ান লাগে না।"
      },
      {
        "title": "ভয়েস অ্যাসিস্ট্যান্ট সাপোর্ট",
        "description": "Google Assistant ও Alexa দিয়ে কণ্ঠস্বরেই নিয়ন্ত্রণ করা যায়।"
      }
    ],
    "specs": [
      {
        "label": "প্যাকেজে যা আছে",
        "value": "২টি স্মার্ট বাল্ব + ২টি স্মার্ট প্লাগ"
      },
      {
        "label": "কানেক্টিভিটি",
        "value": "WiFi 2.4GHz"
      },
      {
        "label": "বাল্ব পাওয়ার",
        "value": "৯ ওয়াট, ৮০৬ লুমেন"
      },
      {
        "label": "প্লাগ ম্যাক্স লোড",
        "value": "২৪০০ ওয়াট"
      },
      {
        "label": "অ্যাপ কম্প্যাটিবিলিটি",
        "value": "Android ও iOS, ফ্রি অ্যাপ"
      },
      {
        "label": "ভয়েস অ্যাসিস্ট্যান্ট",
        "value": "Google Assistant, Amazon Alexa"
      },
      {
        "label": "ওয়ারেন্টি",
        "value": "১ বছর"
      }
    ],
    "comparison_label": "সাধারণ সুইচ",
    "comparison_rows": [
      {
        "label": "দূর থেকে নিয়ন্ত্রণ",
        "ours": "✓ হ্যাঁ",
        "theirs": "✗ না"
      },
      {
        "label": "শিডিউল/টাইমার",
        "ours": "✓ হ্যাঁ",
        "theirs": "✗ না"
      },
      {
        "label": "ইনস্টলেশন",
        "ours": "৫ মিনিট, নিজেই",
        "theirs": "ইলেকট্রিশিয়ান লাগে"
      },
      {
        "label": "ভয়েস কন্ট্রোল",
        "ours": "✓ হ্যাঁ",
        "theirs": "✗ না"
      }
    ],
    "testimonials": [
      {
        "name": "ফারহান কবির",
        "quote": "অফিসে বসেই বাসার লাইট বন্ধ করতে পারি এখন, খুব শান্তি লাগে।",
        "rating": 5
      },
      {
        "name": "সাদিয়া ইসলাম",
        "quote": "ইনস্টল করা এত সহজ ছিল ভাবিনি, কোনো ওয়্যারিং লাগেনি।",
        "rating": 5
      },
      {
        "name": "ইমতিয়াজ আলম",
        "quote": "শিডিউল ফিচারটা দারুণ, তবে অ্যাপে মাঝে মাঝে একটু দেরিতে কানেক্ট হয়।",
        "rating": 4
      }
    ],
    "order_benefits": [
      {
        "icon": "🚚",
        "title": "ফ্রি ডেলিভারি",
        "description": "ঢাকার ভিতরে"
      },
      {
        "icon": "🛡️",
        "title": "৭ দিন রিপ্লেসমেন্ট",
        "description": "ত্রুটি পেলে বদলে দেওয়া হয়"
      },
      {
        "icon": "💵",
        "title": "ক্যাশ অন ডেলিভারি",
        "description": "হাতে পেয়ে টাকা দিন"
      },
      {
        "icon": "📞",
        "title": "ফ্রি সেটআপ সাপোর্ট কল",
        "description": "ইনস্টল করতে সমস্যা হলে"
      }
    ],
    "faqs": [
      {
        "question": "ইন্টারনেট ছাড়া কাজ করবে?",
        "answer": "দূর থেকে নিয়ন্ত্রণের জন্য ওয়াইফাই লাগবে, তবে সরাসরি সুইচ হিসেবেও ব্যবহার করা যায়।"
      },
      {
        "question": "পুরনো বাসার ওয়্যারিং-এ বসবে?",
        "answer": "হ্যাঁ, স্ট্যান্ডার্ড হোল্ডার ও সকেটে সরাসরি বসানো যায়, কোনো পরিবর্তন লাগে না।"
      },
      {
        "question": "অ্যাপ কি ফ্রি?",
        "answer": "হ্যাঁ, অ্যাপ সম্পূর্ণ ফ্রি, কোনো সাবস্ক্রিপশন ফি নেই।"
      },
      {
        "question": "একসাথে কতগুলো ডিভাইস যোগ করা যাবে?",
        "answer": "একটা অ্যাকাউন্টে সীমাহীন ডিভাইস যোগ করা যায়, ঘরভিত্তিক গ্রুপও বানানো যায়।"
      }
    ],
    "countdown_end_at": "2026-09-16T18:00:00.000Z",
    "show_contact_card": true
  },
  "p13": {
    "enabled": true,
    "subtitle": "অন্য রুম থেকেও বাচ্চাকে লাইভ দেখুন ও শুনুন, রাতের অন্ধকারেও — মোবাইলে সরাসরি নোটিফিকেশন সহ।",
    "badge_text": "প্যারেন্টদের পছন্দ",
    "announcement": "🔥 সীমিত সময়ের অফার — ২০% ছাড় চলছে এই প্রোডাক্টে",
    "gallery_images": [
      "https://placehold.co/600x600/0e1f3c/ffffff?text=Baby+Monitor&font=roboto",
      "https://placehold.co/600x600/17335e/ffffff?text=App+View&font=roboto",
      "https://placehold.co/600x600/0e1f3c/ffffff?text=Night+Vision&font=roboto",
      "https://placehold.co/600x600/17335e/ffffff?text=In+Nursery&font=roboto"
    ],
    "pain_points": [
      {
        "emoji": "🌙",
        "title": "রাতে বারবার উঠে চেক করতে হয়",
        "description": "বাচ্চা ঠিকমতো ঘুমাচ্ছে কিনা দেখতে বারবার রুমে যেতে হয়, ঘুম ভেঙে যায়।"
      },
      {
        "emoji": "👂",
        "title": "অন্য রুমে থাকলে কান্না শোনা যায় না",
        "description": "রান্নাঘরে বা অন্য কাজে থাকলে বাচ্চার কান্না বুঝতে দেরি হয়ে যায়।"
      },
      {
        "emoji": "📹",
        "title": "সস্তা মনিটরে ভিডিও অস্পষ্ট থাকে",
        "description": "কম দামি মনিটরে অন্ধকারে কিছুই দেখা যায় না, বিশ্বাস করে ভরসা করা যায় না।"
      }
    ],
    "features": [
      {
        "title": "লাইভ ভিডিও + টু-ওয়ে অডিও",
        "description": "দেখুন ও কথা বলুন — বাচ্চাকে দূর থেকেই শান্ত করতে পারবেন।"
      },
      {
        "title": "নাইট ভিশন",
        "description": "ঘর অন্ধকার থাকলেও পরিষ্কার দেখা যায়, ইনফ্রারেড লাইট চোখের জন্য নিরাপদ।"
      },
      {
        "title": "কান্না ও নড়াচড়ার অ্যালার্ট",
        "description": "বাচ্চা কাঁদলে বা নড়াচড়া করলেই মোবাইলে সাথে সাথে নোটিফিকেশন আসবে।"
      },
      {
        "title": "তাপমাত্রা মনিটরিং",
        "description": "রুমের তাপমাত্রা খুব বেশি বা কম হলেও অ্যাপে জানিয়ে দেবে।"
      }
    ],
    "specs": [
      {
        "label": "ক্যামেরা রেজোলিউশন",
        "value": "১০৮০p ফুল HD"
      },
      {
        "label": "নাইট ভিশন রেঞ্জ",
        "value": "৫ মিটার পর্যন্ত"
      },
      {
        "label": "ব্যাটারি লাইফ",
        "value": "একবার চার্জে ১০ ঘণ্টা"
      },
      {
        "label": "কানেক্টিভিটি",
        "value": "WiFi 2.4GHz"
      },
      {
        "label": "অ্যাপ কম্প্যাটিবিলিটি",
        "value": "Android ও iOS, ফ্রি অ্যাপ"
      },
      {
        "label": "ডেটা সিকিউরিটি",
        "value": "এনক্রিপ্টেড কানেকশন"
      },
      {
        "label": "ওয়ারেন্টি",
        "value": "১ বছর"
      }
    ],
    "comparison_label": "শুধু কান পেতে থাকা",
    "comparison_rows": [
      {
        "label": "অন্য রুম থেকে দেখা",
        "ours": "✓ লাইভ ভিডিওতে",
        "theirs": "✗ সম্ভব না"
      },
      {
        "label": "রাতে অন্ধকারে দেখা",
        "ours": "✓ নাইট ভিশন",
        "theirs": "✗ সম্ভব না"
      },
      {
        "label": "তাৎক্ষণিক অ্যালার্ট",
        "ours": "✓ মোবাইলে",
        "theirs": "✗ নেই"
      },
      {
        "label": "একসাথে অন্য কাজ করা",
        "ours": "✓ নিশ্চিন্তে",
        "theirs": "✗ কঠিন"
      }
    ],
    "testimonials": [
      {
        "name": "শারমিন আক্তার",
        "quote": "বাচ্চার ঘুমের সময় মনিটর দিয়ে দেখতে পারি, মনে অনেক শান্তি লাগে।",
        "rating": 5
      },
      {
        "name": "রাকিব হাসান",
        "quote": "নাইট ভিশন খুব ভালো কাজ করে, অন্ধকারেও স্পষ্ট দেখা যায়।",
        "rating": 5
      },
      {
        "name": "নাফিসা চৌধুরী",
        "quote": "অ্যালার্ট সিস্টেমটা দারুণ, তবে ওয়াইফাই দুর্বল হলে একটু দেরি হয়।",
        "rating": 4
      }
    ],
    "order_benefits": [
      {
        "icon": "🚚",
        "title": "ফ্রি ডেলিভারি",
        "description": "ঢাকার ভিতরে"
      },
      {
        "icon": "🛡️",
        "title": "৭ দিন রিপ্লেসমেন্ট",
        "description": "ত্রুটি পেলে বদলে দেওয়া হয়"
      },
      {
        "icon": "💵",
        "title": "ক্যাশ অন ডেলিভারি",
        "description": "হাতে পেয়ে টাকা দিন"
      },
      {
        "icon": "✅",
        "title": "সেফটি টেস্টেড",
        "description": "প্রতিটা ইউনিট পাঠানোর আগে চেক করা"
      }
    ],
    "faqs": [
      {
        "question": "নাইট ভিশনের ইনফ্রারেড লাইট কি বাচ্চার চোখের জন্য ক্ষতিকর?",
        "answer": "না, এই ধরনের ইনফ্রারেড লাইট চোখের জন্য সম্পূর্ণ নিরাপদ এবং বাচ্চা টেরই পায় না।"
      },
      {
        "question": "কতদূর থেকে কাজ করবে?",
        "answer": "একই ওয়াইফাই নেটওয়ার্কে থাকলে বাসার যেকোনো জায়গা থেকে দেখা যায়, বাইরে থেকেও ইন্টারনেট থাকলে দেখা যাবে।"
      },
      {
        "question": "একসাথে দুইজন মোবাইলে দেখতে পারবে?",
        "answer": "হ্যাঁ, একই অ্যাকাউন্টে একাধিক ডিভাইস থেকে একসাথে দেখা যায়।"
      },
      {
        "question": "ভিডিও কি অন্য কেউ দেখতে পারবে?",
        "answer": "না, কানেকশন এনক্রিপ্টেড, শুধু আপনার অ্যাকাউন্ট থেকেই অ্যাক্সেস করা যায়।"
      }
    ],
    "countdown_end_at": "2026-09-17T18:00:00.000Z",
    "show_contact_card": true
  },
  "p11": {
    "enabled": true,
    "subtitle": "হার্টরেট, স্টেপ, ঘুম — সবকিছু হাতের কব্জিতেই ট্র্যাক করুন, এক চার্জে ৭ দিন চলে।",
    "badge_text": "বেস্ট সেলার",
    "announcement": "🔥 সীমিত সময়ের অফার — ২৪% ছাড় চলছে এই প্রোডাক্টে",
    "gallery_images": [
      "https://placehold.co/600x600/0e1f3c/ffffff?text=Fitness+Band+X2&font=roboto",
      "https://placehold.co/600x600/17335e/ffffff?text=App+Data&font=roboto",
      "https://placehold.co/600x600/0e1f3c/ffffff?text=On+Wrist&font=roboto",
      "https://placehold.co/600x600/17335e/ffffff?text=Colors&font=roboto"
    ],
    "pain_points": [
      {
        "emoji": "📊",
        "title": "নিজের প্রোগ্রেস ট্র্যাক করার উপায় নেই",
        "description": "প্রতিদিন কত হাঁটলাম, কত ক্যালরি পোড়ালাম — কোনো হিসাব থাকে না।"
      },
      {
        "emoji": "😴",
        "title": "ঘুম ভালো হচ্ছে কিনা বোঝা যায় না",
        "description": "রাতে ঠিকমতো ঘুম হচ্ছে কিনা, কতবার ভাঙছে — এসব ট্র্যাক করার উপায় নেই।"
      },
      {
        "emoji": "💰",
        "title": "দামি স্মার্টওয়াচ কেনার বাজেট নেই",
        "description": "ব্র্যান্ডেড স্মার্টওয়াচের দাম অনেক বেশি, অথচ দরকার শুধু বেসিক ট্র্যাকিং।"
      }
    ],
    "features": [
      {
        "title": "রিয়েল-টাইম হার্টরেট মনিটর",
        "description": "সারাদিন ধরে হার্টরেট মাপে, ব্যায়ামের সময়ও নির্ভুল রিডিং দেয়।"
      },
      {
        "title": "স্লিপ ট্র্যাকিং",
        "description": "গভীর ঘুম, হালকা ঘুম, জাগ্রত সময় — বিস্তারিত ঘুমের প্যাটার্ন দেখায়।"
      },
      {
        "title": "৭ দিনের ব্যাটারি ব্যাকআপ",
        "description": "একবার চার্জ দিলে সপ্তাহভর নিশ্চিন্তে ব্যবহার করা যায়।"
      },
      {
        "title": "ওয়াটার রেজিস্ট্যান্ট",
        "description": "হাত ধোয়া, বৃষ্টি, ঘাম — কোনো কিছুতেই সমস্যা হয় না।"
      }
    ],
    "specs": [
      {
        "label": "ডিসপ্লে",
        "value": "১.১ ইঞ্চি কালার AMOLED টাচ"
      },
      {
        "label": "ব্যাটারি লাইফ",
        "value": "ফুল চার্জে ৭ দিন পর্যন্ত"
      },
      {
        "label": "ওয়াটার রেজিস্ট্যান্স",
        "value": "IP68 (৩০ মিনিট পর্যন্ত পানির নিচে)"
      },
      {
        "label": "সেন্সর",
        "value": "হার্টরেট, স্টেপ কাউন্টার, স্লিপ ট্র্যাকার"
      },
      {
        "label": "অ্যাপ কম্প্যাটিবিলিটি",
        "value": "Android ও iOS"
      },
      {
        "label": "স্ট্র্যাপ উপাদান",
        "value": "সফট সিলিকন, পরিবর্তনযোগ্য"
      },
      {
        "label": "ওয়ারেন্টি",
        "value": "৬ মাস"
      }
    ],
    "comparison_label": "কিছুই ট্র্যাক না করা",
    "comparison_rows": [
      {
        "label": "হার্টরেট জানা",
        "ours": "✓ রিয়েল-টাইম",
        "theirs": "✗ অজানা"
      },
      {
        "label": "ঘুমের প্যাটার্ন",
        "ours": "✓ বিস্তারিত ডেটা",
        "theirs": "✗ ধারণা নেই"
      },
      {
        "label": "প্রতিদিনের লক্ষ্য",
        "ours": "✓ স্টেপ গোল সেট করা যায়",
        "theirs": "✗ কোনো লক্ষ্য নেই"
      },
      {
        "label": "দাম",
        "ours": "৳১,৮৯৯",
        "theirs": "ব্র্যান্ডেড ওয়াচ ৳১০,০০০+"
      }
    ],
    "testimonials": [
      {
        "name": "তাহমিদ রহমান",
        "quote": "প্রতিদিনের স্টেপ ও হার্টরেট ট্র্যাক করতে পারছি, একদম নির্ভুল মনে হয়েছে।",
        "rating": 5
      },
      {
        "name": "মিথিলা চৌধুরী",
        "quote": "দাম কম হলেও ফিচার অনেক, ঘুমের ডেটাটা খুব কাজে লাগছে।",
        "rating": 5
      },
      {
        "name": "জাহিদ হাসান",
        "quote": "ব্যাটারি ৫-৬ দিন যায় আমার ব্যবহারে, তবে বিজ্ঞাপনে বলা ৭ দিনের কাছাকাছিই।",
        "rating": 4
      }
    ],
    "order_benefits": [
      {
        "icon": "🚚",
        "title": "ফ্রি ডেলিভারি",
        "description": "ঢাকার ভিতরে"
      },
      {
        "icon": "🛡️",
        "title": "৭ দিন রিপ্লেসমেন্ট",
        "description": "ত্রুটি পেলে বদলে দেওয়া হয়"
      },
      {
        "icon": "💵",
        "title": "ক্যাশ অন ডেলিভারি",
        "description": "হাতে পেয়ে টাকা দিন"
      },
      {
        "icon": "🎁",
        "title": "ফ্রি স্ক্রিন প্রোটেক্টর",
        "description": "প্রতিটি অর্ডারের সাথে"
      }
    ],
    "faqs": [
      {
        "question": "সাঁতার কাটার সময় পরা যাবে?",
        "answer": "হ্যাঁ, IP68 ওয়াটার রেজিস্ট্যান্স রেটিং থাকায় সাঁতার কাটার সময়ও পরা যায়।"
      },
      {
        "question": "মোবাইলে অ্যাপ লাগবে?",
        "answer": "হ্যাঁ, একটা ফ্রি অ্যাপ দিয়ে কানেক্ট করতে হয়, সেটআপ গাইড বক্সে দেওয়া থাকে।"
      },
      {
        "question": "হার্টরেট রিডিং কতটা নির্ভুল?",
        "answer": "মেডিকেল-গ্রেড না হলেও দৈনন্দিন ফিটনেস ট্র্যাকিংয়ের জন্য যথেষ্ট নির্ভুল।"
      },
      {
        "question": "স্ট্র্যাপ পরিবর্তন করা যায়?",
        "answer": "হ্যাঁ, স্ট্যান্ডার্ড সাইজের যেকোনো স্ট্র্যাপ দিয়ে বদলানো যায়।"
      }
    ],
    "countdown_end_at": "2026-09-14T18:00:00.000Z",
    "show_contact_card": true
  }
};

MOCK_PRODUCTS.forEach((p) => {
  if (LANDING_PAGES[p.id]) p.landing_page = LANDING_PAGES[p.id];
});