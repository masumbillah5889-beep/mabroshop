export type Category = {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  banner_image_url: string | null;
  trust_points: TrustPoint[];
  testimonials: Testimonial[];
  faqs: Faq[];
  display_order: number;
  is_active: boolean;
};

export type TrustPoint = {
  title: string;
  description: string;
  icon: string; // lucide-react icon name
};

export type Testimonial = {
  name: string;
  quote: string;
  rating: number; // 1-5
};

export type Faq = {
  question: string;
  answer: string;
};

export type ProductImage = {
  id: string;
  product_id: string;
  image_url: string;
  display_order: number;
  is_primary: boolean;
};

export type Product = {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  stock_quantity: number;
  is_featured: boolean;
  is_active: boolean;
  images: ProductImage[];
  category?: Category;
  landing_page: ProductLandingPage;
};

export type PainPoint = { emoji: string; title: string; description: string };
export type Feature = { title: string; description: string };
export type Spec = { label: string; value: string };
export type ComparisonRow = { label: string; ours: string; theirs: string };
export type OrderBenefit = { icon: string; title: string; description: string };

export type ProductLandingPage = {
  enabled: boolean;
  subtitle: string;
  badge_text: string;
  announcement: string;
  gallery_images: string[];
  pain_points: PainPoint[];
  features: Feature[];
  specs: Spec[];
  comparison_label: string; // what the "theirs" column represents, e.g. "সাধারণ টেবিল"
  comparison_rows: ComparisonRow[];
  testimonials: Testimonial[];
  order_benefits: OrderBenefit[];
  faqs: Faq[];
  countdown_end_at: string | null; // ISO timestamp; null/past = no countdown shown
  show_contact_card: boolean;
};

export const DEFAULT_LANDING_PAGE: ProductLandingPage = {
  enabled: false,
  subtitle: "",
  badge_text: "",
  announcement: "",
  gallery_images: [],
  pain_points: [],
  features: [],
  specs: [],
  comparison_label: "",
  comparison_rows: [],
  testimonials: [],
  order_benefits: [],
  faqs: [],
  countdown_end_at: null,
  show_contact_card: true,
};

export type DeliveryZone = "inside_dhaka" | "outside_dhaka";
export type PaymentMethod = "cod" | "online";
export type SupplierStatus = "not_sent" | "approved" | "delivered" | "cancelled";

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  unit_price: number;
  quantity: number;
  supplier_price: number | null;
  line_total: number;
};

export type Order = {
  id: string;
  order_number: number;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  delivery_zone: DeliveryZone;
  delivery_charge: number;
  subtotal: number;
  total: number;
  payment_method: PaymentMethod;
  payment_status: "pending" | "paid" | "failed";
  order_status: "pending" | "processing" | "shipped" | "completed" | "cancelled";
  supplier_status: SupplierStatus;
  created_at: string;
  items?: OrderItem[];
};

export type AbandonedCheckoutItem = { productId: string; name: string; price: number; quantity: number };

export type AbandonedCheckout = {
  id: string;
  customer_name: string | null;
  customer_phone: string;
  customer_address: string | null;
  delivery_zone: DeliveryZone | null;
  cart_items: AbandonedCheckoutItem[];
  cart_total: number | null;
  created_at: string;
  updated_at: string;
};

export type CartLine = {
  productId: string;
  name: string;
  slug: string;
  price: number;
  image: string | null;
  quantity: number;
};

export type SiteContent = {
  section_key: string;
  content: Record<string, unknown>;
};

export type Branding = {
  site_name: string;
  site_name_accent: string; // the part of the name shown in the accent color, e.g. "Mabro" in "Mabro Shop"
  tagline: string;
  logo_url: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  primary_color: string; // hex — replaces --color-ink
  accent_color: string; // hex — replaces --color-signal
};

export const DEFAULT_BRANDING: Branding = {
  site_name: "Mabro Shop",
  site_name_accent: "Mabro",
  tagline: "মানসম্মত গ্যাজেট, দ্রুত ডেলিভারি",
  logo_url: "",
  phone: "+8801890672586",
  whatsapp: "+8801890672586",
  email: "admin@mabroshop.com",
  address: "ঢাকা, বাংলাদেশ",
  primary_color: "#0e1f3c",
  accent_color: "#ff6a1a",
};

export type HeroContent = {
  mode: "custom" | "image";
  eyebrow: string;
  headline: string;
  subtitle: string;
  banner_image_url: string;
};

export const DEFAULT_HERO_CONTENT: HeroContent = {
  mode: "custom",
  eyebrow: "১০,০০০+ সন্তুষ্ট গ্রাহক",
  headline: "যে গ্যাজেট আজ অর্ডার করবেন, হাতে পাবেন হাতে টাকা দিয়ে",
  subtitle:
    "ক্যামেরা থেকে স্মার্ট হোম, কিচেন থেকে গেমিং — যাচাই করা কোয়ালিটি, ক্যাশ অন ডেলিভারিতে সারা বাংলাদেশে।",
  banner_image_url: "",
};

export type AddonsConfig = {
  facebook_pixel: { enabled: boolean; pixel_id: string; access_token: string };
  tiktok_pixel: { enabled: boolean; pixel_id: string; access_token: string };
  google_analytics: { enabled: boolean; measurement_id: string };
  microsoft_clarity: { enabled: boolean; project_id: string };
  google_tag_manager: { enabled: boolean; container_id: string };
  google_ads: { enabled: boolean; conversion_id: string };
  pwa: { enabled: boolean };
  sms_gateway: { api_key: string; sender_id: string };
  fake_order_protection: { enabled: boolean };
  order_sms_notifications: { enabled: boolean };
  ai_calling: {
    enabled: boolean;
    api_key: string;
    api_secret: string;
    base_url: string;
    caller_number: string;
  };
  instant_sales_booster: { enabled: boolean; low_stock_threshold: number };
};

export const DEFAULT_ADDONS: AddonsConfig = {
  facebook_pixel: { enabled: false, pixel_id: "", access_token: "" },
  tiktok_pixel: { enabled: false, pixel_id: "", access_token: "" },
  google_analytics: { enabled: false, measurement_id: "" },
  microsoft_clarity: { enabled: false, project_id: "" },
  google_tag_manager: { enabled: false, container_id: "" },
  google_ads: { enabled: false, conversion_id: "" },
  pwa: { enabled: false },
  sms_gateway: { api_key: "", sender_id: "" },
  fake_order_protection: { enabled: false },
  order_sms_notifications: { enabled: false },
  ai_calling: { enabled: false, api_key: "", api_secret: "", base_url: "", caller_number: "" },
  instant_sales_booster: { enabled: false, low_stock_threshold: 5 },
};
