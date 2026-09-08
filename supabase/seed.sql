-- Mabro Shop — demo seed data
-- Run after schema.sql. Safe to re-run (uses ON CONFLICT DO NOTHING on slugs).
-- Replace with real inventory via the admin panel once the client is ready.

insert into categories (name, slug, tagline, description, banner_image_url, display_order, trust_points) values
('Camera & Photography', 'camera-photography', 'Shoot like a creator, not a tourist',
 'Mirrorless bodies, vlogging rigs and lens kits picked for people who post — not just people who point and shoot.',
 '/banners/camera-photography.jpg', 1,
 '[{"icon":"ShieldCheck","title":"৭ দিনের রিপ্লেসমেন্ট","description":"ত্রুটিপূর্ণ প্রোডাক্ট হলে ৭ দিনের মধ্যে পরিবর্তন।"},{"icon":"Truck","title":"সারাদেশে ডেলিভারি","description":"ঢাকার ভিতরে ১-২ দিন, বাইরে ৩-৫ দিন।"},{"icon":"BadgeCheck","title":"টেস্টেড ইউনিট","description":"প্রতিটি ক্যামেরা শিপ করার আগে চালিয়ে পরীক্ষা করা হয়।"}]'::jsonb),
('Laptop & Computer Gadget', 'laptop-computer-gadget', 'Desk setups that actually get built',
 'Laptop stands, docks, and full workstation combos for people who work from three different rooms a week.',
 '/banners/laptop-computer-gadget.jpg', 2,
 '[{"icon":"ShieldCheck","title":"১ বছর ওয়ারেন্টি","description":"সকল ইলেকট্রনিক আইটেমে নির্মাতার ওয়ারেন্টি।"},{"icon":"Truck","title":"ফ্রি শিপিং ৳২০০০+","description":"নির্দিষ্ট অঙ্কের বেশি অর্ডারে ডেলিভারি চার্জ মাফ।"},{"icon":"Headset","title":"সেটআপ সাপোর্ট","description":"হোয়াটসঅ্যাপে ফ্রি সেটআপ গাইড।"}]'::jsonb),
('Smart Home Gadgets', 'smart-home-gadgets', 'A home that responds when you talk to it',
 'Smart bulbs, plugs, and sensors that install in minutes and don''t need an engineer to maintain.',
 '/banners/smart-home-gadgets.jpg', 3,
 '[{"icon":"Wifi","title":"অ্যাপ দিয়ে কন্ট্রোল","description":"যেকোনো জায়গা থেকে মোবাইল অ্যাপে নিয়ন্ত্রণ।"},{"icon":"ShieldCheck","title":"সেফটি সার্টিফাইড","description":"ফায়ার-সেফ ওয়্যারিং ও ওভারলোড প্রোটেকশন।"},{"icon":"Truck","title":"ক্যাশ অন ডেলিভারি","description":"হাতে পেয়ে টাকা দিন, কোনো ঝুঁকি নেই।"}]'::jsonb),
('Kitchen Gadgets', 'kitchen-gadgets', 'Less prep time, same taste',
 'Choppers, grinders and electric essentials that cut kitchen time down without cutting corners.',
 '/banners/kitchen-gadgets.jpg', 4,
 '[{"icon":"ShieldCheck","title":"ফুড-গ্রেড উপাদান","description":"BPA-মুক্ত, নিরাপদ প্লাস্টিক ও স্টেইনলেস স্টিল।"},{"icon":"Truck","title":"৪৮ ঘণ্টায় ডেলিভারি","description":"ঢাকার ভিতরে অর্ডারের পরদিনই হাতে পাবেন।"},{"icon":"BadgeCheck","title":"১৫,০০০+ অর্ডার","description":"প্রতি মাসে হাজারো ক্রেতা পুনরায় অর্ডার করেন।"}]'::jsonb),
('Personal Care Gadget', 'personal-care-gadget', 'Salon routines, done at home',
 'Trimmers, styling tools and grooming devices that pay for themselves in a couple of salon visits.',
 '/banners/personal-care-gadget.jpg', 5,
 '[{"icon":"ShieldCheck","title":"স্কিন-সেফ","description":"ডার্মাটোলজিক্যালি টেস্টেড উপাদান।"},{"icon":"Truck","title":"ডিসক্রিট প্যাকেজিং","description":"প্লেইন প্যাকেজে ডেলিভারি, প্রাইভেসি বজায় থাকে।"},{"icon":"Headset","title":"সহজ রিটার্ন","description":"না পছন্দ হলে সহজ শর্তে রিটার্ন।"}]'::jsonb),
('Fitness Gadget', 'fitness-gadget', 'Track it, or it didn''t happen',
 'Smartwatches, bands and home-gym accessories for people who like their progress in numbers.',
 'https://placehold.co/800x800/0e1f3c/ffffff?text=Fitness+Gadget', 6,
 '[{"icon":"BadgeCheck","title":"নির্ভুল ট্র্যাকিং","description":"হার্টরেট, স্টেপস ও ক্যালরি নিখুঁতভাবে পরিমাপ।"},{"icon":"ShieldCheck","title":"ওয়াটার রেজিস্ট্যান্ট","description":"ঘাম ও হালকা বৃষ্টিতে নিশ্চিন্তে ব্যবহার।"},{"icon":"Truck","title":"৭ দিন এক্সচেঞ্জ","description":"সাইজ বা মডেল না মিললে বদলে নিন।"}]'::jsonb),
('Baby & Kids Gadget', 'baby-kids-gadget', 'Peace of mind, in one small device',
 'Monitors, feeders and safety gadgets chosen for parents who check twice before adding anything to the crib.',
 '/banners/baby-kids-gadget.jpg', 7,
 '[{"icon":"ShieldCheck","title":"নন-টক্সিক","description":"শিশুদের জন্য নিরাপদ, পরীক্ষিত উপকরণ।"},{"icon":"Truck","title":"প্রায়োরিটি ডেলিভারি","description":"বেবি অর্ডার আলাদাভাবে দ্রুত পাঠানো হয়।"},{"icon":"Headset","title":"প্যারেন্ট সাপোর্ট","description":"ব্যবহারবিধি নিয়ে হোয়াটসঅ্যাপে সরাসরি সহায়তা।"}]'::jsonb),
('Gaming Gadget', 'gaming-gadget', 'Built for the 2 a.m. ranked match',
 'Controllers, headsets and RGB peripherals for setups that need to look as good as they perform.',
 '/banners/gaming-gadget.jpg', 8,
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
union all
select id, 'Mini Action Camera 4K', 'mini-action-camera-4k', 3200, 4000, null, false, 24
  from categories where slug = 'camera-photography'
union all
select id, 'Wireless Lavalier Microphone Set', 'wireless-lavalier-mic-set', 1450, 1900, null, false, 24
  from categories where slug = 'camera-photography'
union all
select id, 'Foldable Laptop Stand', 'foldable-laptop-stand', 890, 1200, null, false, 24
  from categories where slug = 'laptop-computer-gadget'
union all
select id, 'Wall-Mount Router Shelf', 'wall-mount-router-shelf', 650, null, null, false, 24
  from categories where slug = 'laptop-computer-gadget'
union all
select id, 'Wireless Audio Smart Glasses', 'wireless-audio-smart-glasses', 2800, 3500, null, false, 24
  from categories where slug = 'laptop-computer-gadget'
union all
select id, 'Adjustable Tablet & Book Stand', 'adjustable-tablet-book-stand', 750, null, null, false, 24
  from categories where slug = 'laptop-computer-gadget'
union all
select id, 'WiFi Range Extender', 'wifi-range-extender', 1350, 1700, null, false, 24
  from categories where slug = 'laptop-computer-gadget'
union all
select id, 'Mosquito Coil Holder Box', 'mosquito-coil-holder-box', 350, null, null, false, 24
  from categories where slug = 'smart-home-gadgets'
union all
select id, 'High-Pressure Spray Gun Nozzle', 'high-pressure-spray-gun-nozzle', 450, 600, null, false, 24
  from categories where slug = 'smart-home-gadgets'
union all
select id, 'Humane Mouse Trap Set (4pc)', 'humane-mouse-trap-set', 380, null, null, false, 24
  from categories where slug = 'smart-home-gadgets'
union all
select id, 'Solar Motion Sensor Wall Light', 'solar-motion-sensor-wall-light', 990, 1300, null, false, 24
  from categories where slug = 'smart-home-gadgets'
union all
select id, 'Foldable Shoe Rack Organizer', 'foldable-shoe-rack-organizer', 1450, 1800, null, false, 24
  from categories where slug = 'smart-home-gadgets'
union all
select id, 'Portable Handheld Turbo Fan', 'portable-handheld-turbo-fan', 690, null, null, false, 24
  from categories where slug = 'smart-home-gadgets'
union all
select id, 'Motion Sensor Plug Night Light', 'motion-sensor-plug-night-light', 450, 600, null, false, 24
  from categories where slug = 'smart-home-gadgets'
union all
select id, 'Heavy-Duty Door Closer', 'heavy-duty-door-closer', 550, null, null, false, 24
  from categories where slug = 'smart-home-gadgets'
union all
select id, 'Solar Decorative Lantern Light', 'solar-decorative-lantern-light', 850, 1100, null, false, 24
  from categories where slug = 'smart-home-gadgets'
union all
select id, 'Adhesive Wall Hook Set', 'adhesive-wall-hook-set', 250, null, null, false, 24
  from categories where slug = 'smart-home-gadgets'
union all
select id, 'Powerful Toilet Plunger Pump', 'powerful-toilet-plunger-pump', 480, null, null, false, 24
  from categories where slug = 'smart-home-gadgets'
union all
select id, 'Portable Bag Sealing Machine', 'portable-bag-sealing-machine', 590, 750, null, false, 24
  from categories where slug = 'kitchen-gadgets'
union all
select id, 'Ceramic Cartridge Water Purifier', 'ceramic-cartridge-water-purifier', 1250, 1600, null, false, 24
  from categories where slug = 'kitchen-gadgets'
union all
select id, 'Portable USB Juicer Bottle', 'portable-usb-juicer-bottle', 990, 1300, null, false, 24
  from categories where slug = 'kitchen-gadgets'
union all
select id, 'Electric Spice & Coffee Grinder', 'electric-spice-coffee-grinder', 1450, 1800, null, false, 24
  from categories where slug = 'kitchen-gadgets'
union all
select id, 'Kitchen Exhaust Cleaner Spray', 'kitchen-exhaust-cleaner-spray', 320, null, null, false, 24
  from categories where slug = 'kitchen-gadgets'
union all
select id, 'Multi-Blade Cheese Grater', 'multi-blade-cheese-grater', 450, 600, null, false, 24
  from categories where slug = 'kitchen-gadgets'
union all
select id, '4-Layer Faucet Water Filter', '4-layer-faucet-water-filter', 890, 1100, null, false, 24
  from categories where slug = 'kitchen-gadgets'
union all
select id, 'Long-Lasting Hair Color', 'long-lasting-hair-color', 450, null, null, false, 24
  from categories where slug = 'personal-care-gadget'
union all
select id, '5-in-1 Facial Cleansing Brush Set', '5in1-facial-cleansing-brush-set', 890, 1200, null, false, 24
  from categories where slug = 'personal-care-gadget'
union all
select id, 'Neck-Mounted Portable Fan', 'neck-mounted-portable-fan', 650, null, null, false, 24
  from categories where slug = 'personal-care-gadget'
union all
select id, 'Magnetic Therapy Bracelet', 'magnetic-therapy-bracelet', 590, 800, null, false, 24
  from categories where slug = 'personal-care-gadget'
union all
select id, 'Hair Oil Applicator Comb', 'hair-oil-applicator-comb', 490, null, null, false, 24
  from categories where slug = 'personal-care-gadget'
union all
select id, 'Digital Arm Blood Pressure Monitor', 'digital-arm-bp-monitor', 1850, 2300, null, false, 24
  from categories where slug = 'personal-care-gadget'
union all
select id, 'Period Relief Heating Belt', 'period-relief-heating-belt', 990, 1300, null, false, 24
  from categories where slug = 'personal-care-gadget'
union all
select id, 'Flawless Facial Hair Remover', 'flawless-facial-hair-remover', 690, 900, null, false, 24
  from categories where slug = 'personal-care-gadget'
union all
select id, 'Anti-Aging Derma Roller', 'anti-aging-derma-roller', 550, 750, null, false, 24
  from categories where slug = 'personal-care-gadget'
union all
select id, 'Portable Ear Cleaning Tool Set', 'portable-ear-cleaning-tool-set', 750, null, null, false, 24
  from categories where slug = 'personal-care-gadget'
union all
select id, 'Core Trainer Sit-Up Bar', 'core-trainer-situp-bar', 1450, 1900, null, false, 24
  from categories where slug = 'fitness-gadget'
union all
select id, 'Sports Wireless Neckband Earphones', 'sports-wireless-neckband-earphones', 890, 1200, null, false, 24
  from categories where slug = 'fitness-gadget'
union all
select id, 'Adjustable Knee Support Brace', 'adjustable-knee-support-brace', 450, null, null, false, 24
  from categories where slug = 'fitness-gadget'
union all
select id, 'Posture Corrector Back Brace', 'posture-corrector-back-brace', 690, 900, null, false, 24
  from categories where slug = 'fitness-gadget'
union all
select id, 'Portable Travel Potty Seat', 'portable-travel-potty-seat', 890, 1100, null, false, 24
  from categories where slug = 'baby-kids-gadget'
union all
select id, 'Soft Toddler Potty Seat', 'soft-toddler-potty-seat', 750, null, null, false, 24
  from categories where slug = 'baby-kids-gadget'
union all
select id, 'Inflatable Kids Arm Floats', 'inflatable-kids-arm-floats', 350, 450, null, false, 24
  from categories where slug = 'baby-kids-gadget'
union all
select id, 'Baby Hooded Towel', 'baby-hooded-towel', 590, null, null, false, 24
  from categories where slug = 'baby-kids-gadget'
union all
select id, 'Baby Walking Assistant Harness', 'baby-walking-assistant-harness', 890, 1100, null, false, 24
  from categories where slug = 'baby-kids-gadget'
union all
select id, 'Wooden Solitaire Game', 'wooden-solitaire-game', 450, null, null, false, 24
  from categories where slug = 'baby-kids-gadget'
union all
select id, 'Baby Carrier Straps', 'baby-carrier-straps', 1250, 1600, null, false, 24
  from categories where slug = 'baby-kids-gadget'
union all
select id, 'Mechanical RGB Gaming Keyboard', 'mechanical-rgb-gaming-keyboard', 3200, 4000, null, false, 24
  from categories where slug = 'gaming-gadget'
union all
select id, 'RGB Gaming Mouse', 'rgb-gaming-mouse', 1450, 1800, null, false, 24
  from categories where slug = 'gaming-gadget'
union all
select id, 'Gaming Mouse Pad XXL', 'gaming-mouse-pad-xxl', 650, null, null, false, 24
  from categories where slug = 'gaming-gadget'
on conflict (slug) do nothing;

-- ---------- Real photos for the new demo products ----------
-- WHERE NOT EXISTS (not ON CONFLICT) because product_images has no unique
-- constraint to conflict on -- this is what actually makes re-running the
-- script safe.
insert into product_images (product_id, image_url, is_primary, display_order)
select p.id, v.image_url, true, 0
from (values
    ('mini-action-camera-4k', '/products/camera-photography/mini-action-camera.jpg'),
    ('wireless-lavalier-mic-set', '/products/camera-photography/wireless-lavalier-mic-set.jpg'),
    ('foldable-laptop-stand', '/products/laptop-computer-gadget/foldable-laptop-stand.jpg'),
    ('wall-mount-router-shelf', '/products/laptop-computer-gadget/wall-mount-router-shelf.jpg'),
    ('wireless-audio-smart-glasses', '/products/laptop-computer-gadget/wireless-audio-smart-glasses.jpg'),
    ('adjustable-tablet-book-stand', '/products/laptop-computer-gadget/adjustable-tablet-stand.jpg'),
    ('wifi-range-extender', '/products/laptop-computer-gadget/wifi-range-extender.jpg'),
    ('mosquito-coil-holder-box', '/products/smart-home-gadgets/mosquito-coil-holder-box.jpg'),
    ('high-pressure-spray-gun-nozzle', '/products/smart-home-gadgets/high-pressure-spray-gun-nozzle.jpg'),
    ('humane-mouse-trap-set', '/products/smart-home-gadgets/humane-mouse-trap-set.jpg'),
    ('solar-motion-sensor-wall-light', '/products/smart-home-gadgets/solar-motion-sensor-wall-light.jpg'),
    ('foldable-shoe-rack-organizer', '/products/smart-home-gadgets/foldable-shoe-rack-organizer.jpg'),
    ('portable-handheld-turbo-fan', '/products/smart-home-gadgets/portable-handheld-turbo-fan.jpg'),
    ('motion-sensor-plug-night-light', '/products/smart-home-gadgets/motion-sensor-plug-night-light.jpg'),
    ('heavy-duty-door-closer', '/products/smart-home-gadgets/heavy-duty-door-closer.jpg'),
    ('solar-decorative-lantern-light', '/products/smart-home-gadgets/solar-decorative-lantern-light.jpg'),
    ('adhesive-wall-hook-set', '/products/smart-home-gadgets/adhesive-wall-hook-set.jpg'),
    ('powerful-toilet-plunger-pump', '/products/smart-home-gadgets/powerful-toilet-plunger-pump.jpg'),
    ('portable-bag-sealing-machine', '/products/kitchen-gadgets/portable-bag-sealing-machine.jpg'),
    ('ceramic-cartridge-water-purifier', '/products/kitchen-gadgets/ceramic-cartridge-water-purifier.jpg'),
    ('portable-usb-juicer-bottle', '/products/kitchen-gadgets/portable-usb-juicer-bottle.jpg'),
    ('electric-spice-coffee-grinder', '/products/kitchen-gadgets/electric-spice-coffee-grinder.jpg'),
    ('kitchen-exhaust-cleaner-spray', '/products/kitchen-gadgets/kitchen-exhaust-cleaner-spray.jpg'),
    ('multi-blade-cheese-grater', '/products/kitchen-gadgets/multi-blade-cheese-grater.jpg'),
    ('4-layer-faucet-water-filter', '/products/kitchen-gadgets/4-layer-faucet-water-filter.jpg'),
    ('long-lasting-hair-color', '/products/personal-care-gadget/long-lasting-hair-color.jpg'),
    ('5in1-facial-cleansing-brush-set', '/products/personal-care-gadget/5in1-facial-cleansing-brush-set.jpg'),
    ('neck-mounted-portable-fan', '/products/personal-care-gadget/neck-mounted-portable-fan.jpg'),
    ('magnetic-therapy-bracelet', '/products/personal-care-gadget/magnetic-therapy-bracelet.jpg'),
    ('hair-oil-applicator-comb', '/products/personal-care-gadget/hair-oil-applicator-comb.jpg'),
    ('digital-arm-bp-monitor', '/products/personal-care-gadget/digital-arm-bp-monitor.jpg'),
    ('period-relief-heating-belt', '/products/personal-care-gadget/period-relief-heating-belt.jpg'),
    ('flawless-facial-hair-remover', '/products/personal-care-gadget/flawless-facial-hair-remover.jpg'),
    ('anti-aging-derma-roller', '/products/personal-care-gadget/anti-aging-derma-roller.jpg'),
    ('portable-ear-cleaning-tool-set', '/products/personal-care-gadget/portable-ear-cleaning-tool-set.jpg'),
    ('core-trainer-situp-bar', '/products/fitness-gadget/core-trainer-situp-bar.jpg'),
    ('sports-wireless-neckband-earphones', '/products/fitness-gadget/sports-neckband-earphones.jpg'),
    ('adjustable-knee-support-brace', '/products/fitness-gadget/knee-support-brace.jpg'),
    ('posture-corrector-back-brace', '/products/fitness-gadget/posture-corrector-brace.jpg'),
    ('portable-travel-potty-seat', '/products/baby-kids-gadget/portable-travel-potty-seat.jpg'),
    ('soft-toddler-potty-seat', '/products/baby-kids-gadget/soft-toddler-potty-seat.jpg'),
    ('inflatable-kids-arm-floats', '/products/baby-kids-gadget/inflatable-kids-arm-floats.jpg'),
    ('baby-hooded-towel', '/products/baby-kids-gadget/baby-hooded-towel.jpg'),
    ('baby-walking-assistant-harness', '/products/baby-kids-gadget/baby-walking-assistant-harness.jpg'),
    ('wooden-solitaire-game', '/products/baby-kids-gadget/wooden-solitaire-game.jpg'),
    ('baby-carrier-straps', '/products/baby-kids-gadget/baby-carrier-straps.jpg')
  ) as v(slug, image_url)
  join products p on p.slug = v.slug
where not exists (select 1 from product_images pi where pi.product_id = p.id);

-- ---------- Real photos replacing two existing products' placeholders ----------
update product_images set image_url = '/products/kitchen-gadgets/electric-vegetable-chopper.jpg'
  from products where products.id = product_images.product_id and products.slug = 'electric-vegetable-chopper';
update product_images set image_url = '/products/personal-care-gadget/facial-steamer-cleanser-set.jpg'
  from products where products.id = product_images.product_id and products.slug = 'facial-steamer-cleanser-set';

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
