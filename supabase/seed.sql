-- GadgetBari — demo seed data
-- Run after schema.sql. Safe to re-run (uses ON CONFLICT DO NOTHING on slugs).
-- Replace with real inventory via the admin panel once the client is ready.

insert into categories (name, slug, tagline, description, banner_image_url, display_order, trust_points) values
('Camera & Photography', 'camera-photography', 'Shoot like a creator, not a tourist',
 'Mirrorless bodies, vlogging rigs and lens kits picked for people who post — not just people who point and shoot.',
 'https://placehold.co/800x800/0e1f3c/ffffff?text=Camera+%26+Photography', 1,
 '[{"icon":"ShieldCheck","title":"৭ দিনের রিপ্লেসমেন্ট","description":"ত্রুটিপূর্ণ প্রোডাক্ট হলে ৭ দিনের মধ্যে পরিবর্তন।"},{"icon":"Truck","title":"সারাদেশে ডেলিভারি","description":"ঢাকার ভিতরে ১-২ দিন, বাইরে ৩-৫ দিন।"},{"icon":"BadgeCheck","title":"টেস্টেড ইউনিট","description":"প্রতিটি ক্যামেরা শিপ করার আগে চালিয়ে পরীক্ষা করা হয়।"}]'::jsonb),
('Laptop & Computer Gadget', 'laptop-computer-gadget', 'Desk setups that actually get built',
 'Laptop stands, docks, and full workstation combos for people who work from three different rooms a week.',
 'https://placehold.co/800x800/17335e/ffffff?text=Laptop+%26+Computer', 2,
 '[{"icon":"ShieldCheck","title":"১ বছর ওয়ারেন্টি","description":"সকল ইলেকট্রনিক আইটেমে নির্মাতার ওয়ারেন্টি।"},{"icon":"Truck","title":"ফ্রি শিপিং ৳২০০০+","description":"নির্দিষ্ট অঙ্কের বেশি অর্ডারে ডেলিভারি চার্জ মাফ।"},{"icon":"Headset","title":"সেটআপ সাপোর্ট","description":"হোয়াটসঅ্যাপে ফ্রি সেটআপ গাইড।"}]'::jsonb),
('Smart Home Gadgets', 'smart-home-gadgets', 'A home that responds when you talk to it',
 'Smart bulbs, plugs, and sensors that install in minutes and don''t need an engineer to maintain.',
 'https://placehold.co/800x800/0e1f3c/ffffff?text=Smart+Home', 3,
 '[{"icon":"Wifi","title":"অ্যাপ দিয়ে কন্ট্রোল","description":"যেকোনো জায়গা থেকে মোবাইল অ্যাপে নিয়ন্ত্রণ।"},{"icon":"ShieldCheck","title":"সেফটি সার্টিফাইড","description":"ফায়ার-সেফ ওয়্যারিং ও ওভারলোড প্রোটেকশন।"},{"icon":"Truck","title":"ক্যাশ অন ডেলিভারি","description":"হাতে পেয়ে টাকা দিন, কোনো ঝুঁকি নেই।"}]'::jsonb),
('Kitchen Gadgets', 'kitchen-gadgets', 'Less prep time, same taste',
 'Choppers, grinders and electric essentials that cut kitchen time down without cutting corners.',
 'https://placehold.co/800x800/e0550a/ffffff?text=Kitchen+Gadgets', 4,
 '[{"icon":"ShieldCheck","title":"ফুড-গ্রেড উপাদান","description":"BPA-মুক্ত, নিরাপদ প্লাস্টিক ও স্টেইনলেস স্টিল।"},{"icon":"Truck","title":"৪৮ ঘণ্টায় ডেলিভারি","description":"ঢাকার ভিতরে অর্ডারের পরদিনই হাতে পাবেন।"},{"icon":"BadgeCheck","title":"১৫,০০০+ অর্ডার","description":"প্রতি মাসে হাজারো ক্রেতা পুনরায় অর্ডার করেন।"}]'::jsonb),
('Personal Care Gadget', 'personal-care-gadget', 'Salon routines, done at home',
 'Trimmers, styling tools and grooming devices that pay for themselves in a couple of salon visits.',
 'https://placehold.co/800x800/17335e/ffffff?text=Personal+Care', 5,
 '[{"icon":"ShieldCheck","title":"স্কিন-সেফ","description":"ডার্মাটোলজিক্যালি টেস্টেড উপাদান।"},{"icon":"Truck","title":"ডিসক্রিট প্যাকেজিং","description":"প্লেইন প্যাকেজে ডেলিভারি, প্রাইভেসি বজায় থাকে।"},{"icon":"Headset","title":"সহজ রিটার্ন","description":"না পছন্দ হলে সহজ শর্তে রিটার্ন।"}]'::jsonb),
('Fitness Gadget', 'fitness-gadget', 'Track it, or it didn''t happen',
 'Smartwatches, bands and home-gym accessories for people who like their progress in numbers.',
 'https://placehold.co/800x800/0e1f3c/ffffff?text=Fitness+Gadget', 6,
 '[{"icon":"BadgeCheck","title":"নির্ভুল ট্র্যাকিং","description":"হার্টরেট, স্টেপস ও ক্যালরি নিখুঁতভাবে পরিমাপ।"},{"icon":"ShieldCheck","title":"ওয়াটার রেজিস্ট্যান্ট","description":"ঘাম ও হালকা বৃষ্টিতে নিশ্চিন্তে ব্যবহার।"},{"icon":"Truck","title":"৭ দিন এক্সচেঞ্জ","description":"সাইজ বা মডেল না মিললে বদলে নিন।"}]'::jsonb),
('Baby & Kids Gadget', 'baby-kids-gadget', 'Peace of mind, in one small device',
 'Monitors, feeders and safety gadgets chosen for parents who check twice before adding anything to the crib.',
 'https://placehold.co/800x800/e0550a/ffffff?text=Baby+%26+Kids', 7,
 '[{"icon":"ShieldCheck","title":"নন-টক্সিক","description":"শিশুদের জন্য নিরাপদ, পরীক্ষিত উপকরণ।"},{"icon":"Truck","title":"প্রায়োরিটি ডেলিভারি","description":"বেবি অর্ডার আলাদাভাবে দ্রুত পাঠানো হয়।"},{"icon":"Headset","title":"প্যারেন্ট সাপোর্ট","description":"ব্যবহারবিধি নিয়ে হোয়াটসঅ্যাপে সরাসরি সহায়তা।"}]'::jsonb),
('Gaming Gadget', 'gaming-gadget', 'Built for the 2 a.m. ranked match',
 'Controllers, headsets and RGB peripherals for setups that need to look as good as they perform.',
 'https://placehold.co/800x800/17335e/ffffff?text=Gaming+Gadget', 8,
 '[{"icon":"BadgeCheck","title":"লো-ল্যাটেন্সি","description":"প্রতিটি ডিভাইস রেসপন্স টাইম টেস্ট করে পাস করা।"},{"icon":"ShieldCheck","title":"৬ মাস ওয়ারেন্টি","description":"হার্ডওয়্যার ত্রুটিতে ফ্রি সার্ভিসিং।"},{"icon":"Truck","title":"সারাদেশে ডেলিভারি","description":"৬৪ জেলাতেই কুরিয়ারে পাঠানো হয়।"}]'::jsonb)
on conflict (slug) do nothing;

-- ---------- Products (2 per category) ----------
insert into products (category_id, name, slug, price, compare_at_price, description, is_featured, stock_quantity)
select id, 'Content Creator Mirrorless Kit', 'content-creator-mirrorless-kit', 19999, 24999,
  'আসল প্রোডাক্ট, আসল ছবি। অর্ডার করার আগে হোয়াটসঅ্যাপে চ্যাট করে যেকোনো প্রশ্ন জিজ্ঞাসা করতে পারেন।', true, 24
  from categories where slug = 'camera-photography'
union all
select id, 'Vlogging Camera + Mic Combo', 'vlogging-camera-mic-combo', 14000, 17500, null, false, 18
  from categories where slug = 'camera-photography'
union all
select id, 'Laptop Mobile Desk Setup', 'laptop-mobile-desk-setup', 50000, 69999, null, true, 12
  from categories where slug = 'laptop-computer-gadget'
union all
select id, 'Complete Digital Workstation', 'complete-digital-workstation', 50000, 58000, null, false, 9
  from categories where slug = 'laptop-computer-gadget'
union all
select id, 'Smart Bulb + Plug Starter Pack', 'smart-bulb-plug-starter-pack', 2499, 3200, null, true, 40
  from categories where slug = 'smart-home-gadgets'
union all
select id, 'WiFi Video Doorbell', 'wifi-video-doorbell', 4200, null, null, false, 22
  from categories where slug = 'smart-home-gadgets'
union all
select id, 'Electric Vegetable Chopper', 'electric-vegetable-chopper', 1450, 1900, null, true, 60
  from categories where slug = 'kitchen-gadgets'
union all
select id, '3-in-1 Juicer Grinder', '3-in-1-juicer-grinder', 3200, 3900, null, false, 30
  from categories where slug = 'kitchen-gadgets'
union all
select id, 'Cordless Hair Trimmer Pro', 'cordless-hair-trimmer-pro', 1650, 2100, null, true, 45
  from categories where slug = 'personal-care-gadget'
union all
select id, 'Facial Steamer + Cleanser Set', 'facial-steamer-cleanser-set', 2100, null, null, false, 20
  from categories where slug = 'personal-care-gadget'
union all
select id, 'Smart Fitness Band X2', 'smart-fitness-band-x2', 1899, 2500, null, true, 50
  from categories where slug = 'fitness-gadget'
union all
select id, 'Adjustable Resistance Band Set', 'adjustable-resistance-band-set', 990, 1300, null, false, 35
  from categories where slug = 'fitness-gadget'
union all
select id, 'Smart Baby Monitor Camera', 'smart-baby-monitor-camera', 3600, 4500, null, true, 15
  from categories where slug = 'baby-kids-gadget'
union all
select id, 'Portable Bottle Warmer', 'portable-bottle-warmer', 1350, null, null, false, 25
  from categories where slug = 'baby-kids-gadget'
union all
select id, 'RGB Wireless Gaming Controller', 'rgb-wireless-gaming-controller', 2450, 3100, null, true, 33
  from categories where slug = 'gaming-gadget'
union all
select id, '7.1 Surround Gaming Headset', '7-1-surround-gaming-headset', 2900, 3600, null, false, 28
  from categories where slug = 'gaming-gadget'
on conflict (slug) do nothing;

-- ---------- One placeholder image per product ----------
insert into product_images (product_id, image_url, is_primary, display_order)
select id, 'https://placehold.co/800x800/0e1f3c/ffffff?text=' || replace(name, ' ', '+'), true, 0
from products
where not exists (select 1 from product_images where product_images.product_id = products.id);

-- ---------- Homepage hero content (the "zero section") ----------
insert into site_content (section_key, content) values
('homepage_hero', '{
  "eyebrow": "১০,০০০+ সন্তুষ্ট গ্রাহক",
  "headline": "যে গ্যাজেট আজ অর্ডার করবেন, হাতে পাবেন হাতে টাকা দিয়ে",
  "subtitle": "ক্যামেরা থেকে স্মার্ট হোম, কিচেন থেকে গেমিং — যাচাই করা কোয়ালিটি, ক্যাশ অন ডেলিভারিতে সারা বাংলাদেশে।"
}'::jsonb)
on conflict (section_key) do nothing;
