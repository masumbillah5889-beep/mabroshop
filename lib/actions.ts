"use server";

import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/data";
import type { AddonsConfig } from "@/lib/types";
import { deliveryChargeFor } from "@/lib/utils";
import type { CartLine, DeliveryZone, PaymentMethod } from "@/lib/types";

export type SubmitOrderInput = {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  deliveryZone: DeliveryZone;
  paymentMethod: PaymentMethod;
  lines: CartLine[];
};

export type SubmitOrderResult =
  | { ok: true; orderNumber: number }
  | { ok: false; error: string };

export async function submitOrder(input: SubmitOrderInput): Promise<SubmitOrderResult> {
  if (input.lines.length === 0) {
    return { ok: false, error: "কার্ট খালি — অন্তত একটি প্রোডাক্ট যোগ করুন।" };
  }
  if (!input.customerName || !input.customerPhone || !input.customerAddress) {
    return { ok: false, error: "নাম, মোবাইল নাম্বার ও ঠিকানা আবশ্যক।" };
  }

  const deliveryCharge = deliveryChargeFor(input.deliveryZone);
  const subtotal = input.lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
  const total = subtotal + deliveryCharge;

  // No live Supabase project connected yet — simulate a successful order so the
  // checkout flow is fully demonstrable. Swap this branch out once env vars are set;
  // the real insert below already matches the schema in supabase/schema.sql.
  if (!isSupabaseConfigured()) {
    return { ok: true, orderNumber: Math.floor(1000 + Math.random() * 9000) };
  }

  const supabase = await createClient();

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      customer_name: input.customerName,
      customer_phone: input.customerPhone,
      customer_address: input.customerAddress,
      delivery_zone: input.deliveryZone,
      delivery_charge: deliveryCharge,
      subtotal,
      total,
      payment_method: input.paymentMethod,
    })
    .select("id, order_number")
    .single();

  if (orderError || !order) {
    return { ok: false, error: "অর্ডার সেভ করা যায়নি। আবার চেষ্টা করুন।" };
  }

  const itemRows = input.lines.map((l) => ({
    order_id: order.id,
    product_id: l.productId,
    product_name: l.name,
    unit_price: l.price,
    quantity: l.quantity,
  }));

  const { error: itemsError } = await supabase.from("order_items").insert(itemRows);
  if (itemsError) {
    return { ok: false, error: "অর্ডার আইটেম সেভ করা যায়নি। সাপোর্টে যোগাযোগ করুন।" };
  }

  return { ok: true, orderNumber: order.order_number };
}

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function updateSupplierStatus(
  orderId: string,
  status: "approved" | "delivered" | "cancelled"
): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    // Demo mode — no persistence layer for mock data. The UI still reflects the
    // intended action optimistically; real projects update the row directly below.
    return { ok: false, error: "ডেমো মোডে স্ট্যাটাস সেভ হয় না — Supabase কানেক্ট করার পর কাজ করবে।" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("orders")
    .update({ supplier_status: status, supplier_sent_at: new Date().toISOString() })
    .eq("id", orderId);

  if (error) return { ok: false, error: "স্ট্যাটাস আপডেট করা যায়নি।" };
  return { ok: true };
}

export async function sendOrderToSupplier(orderId: string): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "ডেমো মোডে স্ট্যাটাস সেভ হয় না — Supabase কানেক্ট করার পর কাজ করবে।" };
  }
  const supabase = await createClient();
  const { error } = await supabase
    .from("orders")
    .update({ supplier_status: "approved", supplier_sent_at: new Date().toISOString() })
    .eq("id", orderId);
  if (error) return { ok: false, error: "পাঠানো যায়নি।" };
  return { ok: true };
}

export type CreateProductInput = {
  name: string;
  categoryId: string;
  price: number;
  compareAtPrice: number | null;
  description: string;
  imageUrl: string;
};

export async function createProduct(
  input: CreateProductInput
): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      error: "ডেমো মোডে প্রোডাক্ট সেভ হয় না — Supabase কানেক্ট করার পর নতুন প্রোডাক্ট যোগ করা যাবে।",
    };
  }

  const supabase = await createClient();
  const slug = input.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const { data: product, error } = await supabase
    .from("products")
    .insert({
      category_id: input.categoryId,
      name: input.name,
      slug,
      price: input.price,
      compare_at_price: input.compareAtPrice,
      description: input.description,
    })
    .select("id")
    .single();

  if (error || !product) return { ok: false, error: "প্রোডাক্ট সেভ করা যায়নি।" };

  if (input.imageUrl) {
    await supabase
      .from("product_images")
      .insert({ product_id: product.id, image_url: input.imageUrl, is_primary: true, display_order: 0 });
  }

  return { ok: true };
}

export async function updateHeroContent(content: {
  eyebrow: string;
  headline: string;
  subtitle: string;
}): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      error: "ডেমো মোডে সেভ হয় না — Supabase কানেক্ট করার পর হোমপেজ হিরো সেকশন এডিট করা যাবে।",
    };
  }
  const supabase = await createClient();
  const { error } = await supabase
    .from("site_content")
    .upsert({ section_key: "homepage_hero", content, updated_at: new Date().toISOString() });
  if (error) return { ok: false, error: "সেভ করা যায়নি।" };
  return { ok: true };
}

export type UpdateProductInput = CreateProductInput & {
  id: string;
  stockQuantity: number;
  isFeatured: boolean;
  isActive: boolean;
};

export async function updateProduct(input: UpdateProductInput): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      error: "ডেমো মোডে পরিবর্তন সেভ হয় না — Supabase কানেক্ট করার পর প্রোডাক্ট এডিট করা যাবে।",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("products")
    .update({
      category_id: input.categoryId,
      name: input.name,
      price: input.price,
      compare_at_price: input.compareAtPrice,
      description: input.description,
      stock_quantity: input.stockQuantity,
      is_featured: input.isFeatured,
      is_active: input.isActive,
    })
    .eq("id", input.id);

  if (error) return { ok: false, error: "প্রোডাক্ট আপডেট করা যায়নি।" };

  if (input.imageUrl) {
    const { data: existingImages } = await supabase
      .from("product_images")
      .select("id")
      .eq("product_id", input.id)
      .eq("is_primary", true)
      .limit(1);

    if (existingImages && existingImages.length > 0) {
      await supabase
        .from("product_images")
        .update({ image_url: input.imageUrl })
        .eq("id", existingImages[0].id);
    } else {
      await supabase
        .from("product_images")
        .insert({ product_id: input.id, image_url: input.imageUrl, is_primary: true, display_order: 0 });
    }
  }

  return { ok: true };
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      error: "ডেমো মোডে ডিলিট সেভ হয় না — Supabase কানেক্ট করার পর প্রোডাক্ট ডিলিট করা যাবে।",
    };
  }
  const supabase = await createClient();
  // product_images has ON DELETE CASCADE on product_id, so this removes its images too.
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return { ok: false, error: "প্রোডাক্ট ডিলিট করা যায়নি।" };
  return { ok: true };
}

export type UpdateCategoryInput = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  bannerImageUrl: string;
  trustPoints: { icon: string; title: string; description: string }[];
  isActive: boolean;
};

export async function updateCategory(input: UpdateCategoryInput): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      error: "ডেমো মোডে পরিবর্তন সেভ হয় না — Supabase কানেক্ট করার পর ক্যাটাগরি এডিট করা যাবে।",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("categories")
    .update({
      name: input.name,
      tagline: input.tagline,
      description: input.description,
      banner_image_url: input.bannerImageUrl,
      trust_points: input.trustPoints,
      is_active: input.isActive,
    })
    .eq("id", input.id);

  if (error) return { ok: false, error: "ক্যাটাগরি আপডেট করা যায়নি।" };
  return { ok: true };
}

export async function updateAddons(config: AddonsConfig): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      error: "ডেমো মোডে সেভ হয় না — Supabase কানেক্ট করার পর অ্যাডঅনস সেটিংস সেভ করা যাবে।",
    };
  }
  const supabase = await createClient();
  const { error } = await supabase
    .from("site_content")
    .upsert({ section_key: "addons", content: config, updated_at: new Date().toISOString() });
  if (error) return { ok: false, error: "সেভ করা যায়নি।" };
  return { ok: true };
}
