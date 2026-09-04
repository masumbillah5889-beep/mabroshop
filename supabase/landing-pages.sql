-- Mabro Shop — richer category landing pages (testimonials + FAQ)
-- Safe to run more than once. Run this in the Supabase SQL editor, after
-- schema.sql. Adds two columns, then backfills demo testimonials/FAQs onto
-- your existing 8 categories (UPDATE, not INSERT — works whether you ran
-- seed.sql before or after this file exists).

alter table categories add column if not exists testimonials jsonb not null default '[]'::jsonb;
alter table categories add column if not exists faqs jsonb not null default '[]'::jsonb;

update categories set
  testimonials = '[
    {"name":"রাফসান আহমেদ","quote":"প্রথমে সন্দেহ ছিল, কিন্তু ক্যামেরার কোয়ালিটি একদম রিভিউর মতোই। ভিডিও শার্প এসেছে।","rating":5},
    {"name":"নুসরাত জাহান","quote":"ডেলিভারি দ্রুত পেয়েছি, প্যাকেজিং ভালো ছিল। রেকমেন্ড করব।","rating":5}
  ]'::jsonb,
  faqs = '[
    {"question":"সেকেন্ড হ্যান্ড না নতুন প্রোডাক্ট?","answer":"সব প্রোডাক্ট একদম নতুন, আনবক্সিং থেকে শুরু করে আপনার সামনে টেস্ট করে পাঠানো হয়।"},
    {"question":"ওয়ারেন্টি আছে কি?","answer":"হ্যাঁ, প্রতিটি ক্যামেরায় নির্মাতার ওয়ারেন্টি থাকে, বিস্তারিত প্রোডাক্ট পেজে দেওয়া আছে।"},
    {"question":"ভিডিওগ্রাফির জন্য কোনটা ভালো হবে?","answer":"হোয়াটসঅ্যাপে আপনার বাজেট ও প্রয়োজন বললে আমরা সাজেস্ট করে দেব।"}
  ]'::jsonb
where slug = 'camera-photography';

update categories set
  testimonials = '[
    {"name":"ইমরান হোসেন","quote":"ডেস্ক সেটআপটা অর্ডার করেছিলাম, একদম প্রফেশনাল লাগছে এখন আমার হোম অফিস।","rating":5},
    {"name":"তানজিলা রহমান","quote":"স্টুডেন্ট হিসেবে বাজেটের মধ্যে ভালো কম্বো পেয়েছি।","rating":4}
  ]'::jsonb,
  faqs = '[
    {"question":"সেটআপ করতে কি টেকনিশিয়ান লাগবে?","answer":"না, সব প্রোডাক্টের সাথে সহজ গাইড দেওয়া থাকে, নিজেই ৫-১০ মিনিটে সেট করতে পারবেন।"},
    {"question":"কোনো ব্র্যান্ডের ল্যাপটপের সাথে কম্প্যাটিবল?","answer":"প্রায় সব ব্র্যান্ডের ল্যাপটপের সাথে কাজ করে, নির্দিষ্ট মডেল নিয়ে সন্দেহ থাকলে হোয়াটসঅ্যাপে জিজ্ঞাসা করুন।"},
    {"question":"ইএমআই সুবিধা আছে?","answer":"বর্তমানে ক্যাশ অন ডেলিভারি ও অনলাইন পেমেন্ট সুবিধা আছে।"}
  ]'::jsonb
where slug = 'laptop-computer-gadget';

update categories set
  testimonials = '[
    {"name":"ফারহান কবির","quote":"মোবাইল দিয়ে লাইট কন্ট্রোল করতে পারছি, বাসায় সবাই অবাক হয়ে গেছে।","rating":5},
    {"name":"সাদিয়া ইসলাম","quote":"ইনস্টল করা খুব সহজ ছিল, কোনো ওয়্যারিং লাগেনি।","rating":5}
  ]'::jsonb,
  faqs = '[
    {"question":"ইন্টারনেট ছাড়া কাজ করবে?","answer":"কন্ট্রোলের জন্য ওয়াইফাই লাগবে, তবে সাধারণ সুইচ হিসেবেও ব্যবহার করা যায়।"},
    {"question":"পুরনো বাসার ওয়্যারিং এ কাজ করবে?","answer":"হ্যাঁ, বেশিরভাগ প্রোডাক্ট স্ট্যান্ডার্ড সুইচবোর্ডে বসানো যায়, নির্দিষ্ট প্রশ্ন থাকলে ছবি পাঠান।"}
  ]'::jsonb
where slug = 'smart-home-gadgets';

update categories set
  testimonials = '[
    {"name":"রুমানা আক্তার","quote":"সবজি কাটা এখন অনেক সহজ, প্রতিদিন ব্যবহার করছি।","rating":5},
    {"name":"কামরুল হাসান","quote":"দাম অনুযায়ী পারফরম্যান্স খুব ভালো।","rating":4}
  ]'::jsonb,
  faqs = '[
    {"question":"মেশিন পরিষ্কার করা কি কঠিন?","answer":"না, বেশিরভাগ পার্টস খুলে পানি দিয়ে ধোয়া যায়।"},
    {"question":"ওয়ারেন্টি কতদিনের?","answer":"প্রোডাক্ট অনুযায়ী ভিন্ন, বিস্তারিত প্রোডাক্ট পেজে দেওয়া আছে।"}
  ]'::jsonb
where slug = 'kitchen-gadgets';

update categories set
  testimonials = '[
    {"name":"নাদিয়া সুলতানা","quote":"পার্লারে না গিয়ে বাসায় নিজেই করতে পারছি, টাকাও বাঁচছে।","rating":5},
    {"name":"শাকিল আহমেদ","quote":"ট্রিমারটা ভালো কোয়ালিটির, বেশ কিছুদিন ধরে ব্যবহার করছি।","rating":5}
  ]'::jsonb,
  faqs = '[
    {"question":"প্যাকেজিং কি বোঝা যায় ভেতরে কী আছে?","answer":"না, সম্পূর্ণ প্লেইন প্যাকেজিং এ পাঠানো হয়, প্রাইভেসি বজায় থাকে।"},
    {"question":"সেনসিটিভ স্কিনে ব্যবহার করা যাবে?","answer":"প্রোডাক্ট বিবরণে উপাদান উল্লেখ করা থাকে, নির্দিষ্ট সমস্যা থাকলে আগে জিজ্ঞাসা করে নিন।"}
  ]'::jsonb
where slug = 'personal-care-gadget';

update categories set
  testimonials = '[
    {"name":"তাহমিদ রহমান","quote":"প্রতিদিনের স্টেপ ও হার্টরেট ট্র্যাক করতে পারছি, একদম নির্ভুল মনে হয়েছে।","rating":5},
    {"name":"মিথিলা চৌধুরী","quote":"দাম কম হলেও ফিচার অনেক, ভালো লেগেছে।","rating":4}
  ]'::jsonb,
  faqs = '[
    {"question":"সাঁতার কাটার সময় পরা যাবে?","answer":"ওয়াটার রেজিস্ট্যান্ট মডেলগুলোতে যাবে, প্রোডাক্ট পেজে উল্লেখ করা থাকে।"},
    {"question":"মোবাইলে অ্যাপ লাগবে?","answer":"হ্যাঁ, একটা ফ্রি অ্যাপ দিয়ে কানেক্ট করতে হয়, সেটআপ গাইড বক্সে দেওয়া থাকে।"}
  ]'::jsonb
where slug = 'fitness-gadget';

update categories set
  testimonials = '[
    {"name":"শারমিন আক্তার","quote":"বাচ্চার ঘুমের সময় মনিটর দিয়ে দেখতে পারি, মনে অনেক শান্তি লাগে।","rating":5},
    {"name":"রাকিব হাসান","quote":"কোয়ালিটি ভালো, বাচ্চার জন্য নিরাপদ মনে হয়েছে।","rating":5}
  ]'::jsonb,
  faqs = '[
    {"question":"প্রোডাক্ট কি BPA-মুক্ত?","answer":"হ্যাঁ, শিশুদের প্রোডাক্টে নিরাপদ, পরীক্ষিত উপকরণ ব্যবহার করা হয়।"},
    {"question":"দ্রুত ডেলিভারি সম্ভব?","answer":"বেবি অর্ডার প্রায়োরিটি হিসেবে পাঠানো হয়, সাধারণত দ্রুততম সময়ে পৌঁছে যায়।"}
  ]'::jsonb
where slug = 'baby-kids-gadget';

update categories set
  testimonials = '[
    {"name":"আরিফুল ইসলাম","quote":"কন্ট্রোলারের রেসপন্স টাইম খুব ভালো, গেমিং এক্সপেরিয়েন্স বদলে গেছে।","rating":5},
    {"name":"নাফিজ রহমান","quote":"হেডসেটের সাউন্ড কোয়ালিটি এই দামে আশা করিনি।","rating":5}
  ]'::jsonb,
  faqs = '[
    {"question":"PC ও কনসোল দুটোতেই চলবে?","answer":"বেশিরভাগ প্রোডাক্ট PC ও কনসোল দুটোতেই কম্প্যাটিবল, নির্দিষ্ট প্রোডাক্ট পেজে উল্লেখ করা থাকে।"},
    {"question":"ওয়ারেন্টি ক্লেইম কীভাবে করব?","answer":"হোয়াটসঅ্যাপে অর্ডার নাম্বার সহ যোগাযোগ করলেই ওয়ারেন্টি প্রসেস শুরু হয়ে যাবে।"}
  ]'::jsonb
where slug = 'gaming-gadget';
