import type { Category, Product } from "./types";

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
    banner_image_url: img("Camera+%26+Photography", "0e1f3c"),
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
    banner_image_url: img("Laptop+%26+Computer", "17335e"),
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
    banner_image_url: img("Smart+Home", "0e1f3c"),
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
    banner_image_url: img("Kitchen+Gadgets", "e0550a"),
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
    banner_image_url: img("Personal+Care", "17335e"),
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
    banner_image_url: img("Baby+%26+Kids", "e0550a"),
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
    banner_image_url: img("Gaming+Gadget", "17335e"),
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
