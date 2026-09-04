export type Category = {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  banner_image_url: string | null;
  trust_points: TrustPoint[];
  display_order: number;
  is_active: boolean;
};

export type TrustPoint = {
  title: string;
  description: string;
  icon: string; // lucide-react icon name
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

export type AddonsConfig = {
  facebook_pixel: { enabled: boolean; pixel_id: string };
  google_tag_manager: { enabled: boolean; container_id: string };
  google_ads: { enabled: boolean; conversion_id: string };
  pwa: { enabled: boolean };
};

export const DEFAULT_ADDONS: AddonsConfig = {
  facebook_pixel: { enabled: false, pixel_id: "" },
  google_tag_manager: { enabled: false, container_id: "" },
  google_ads: { enabled: false, conversion_id: "" },
  pwa: { enabled: false },
};
