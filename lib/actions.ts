"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured, getAddons, getBranding } from "@/lib/data";
import { sendSms } from "@/lib/sms";
import { isValidHex } from "@/lib/color";
import type { AddonsConfig, Branding, ProductLandingPage, HeroContent } from "@/lib/types";
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

  const addons = await getAddons();
  if (addons.fake_order_protection.enabled) {
    const verified = await isPhoneOtpVerified(input.customerPhone);
    if (!verified) {
      return { ok: false, error: "আগে মোবাইল নাম্বার OTP দিয়ে ভেরিফাই করুন।" };
    }
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

  if (addons.order_sms_notifications.enabled) {
    const branding = await getBranding();
    // Best-effort — a failed confirmation SMS shouldn't roll back a
    // successfully placed order, so this result is intentionally ignored.
    void sendSms(
      addons.sms_gateway,
      input.customerPhone,
      `আপনার ${branding.site_name} অর্ডার #${order.order_number} সফলভাবে গ্রহণ করা হয়েছে। মোট: ৳${total}। ধন্যবাদ!`
    );
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

  revalidatePath("/", "layout");
  return { ok: true };
}

export async function updateHeroContent(content: HeroContent): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      error: "ডেমো মোডে সেভ হয় না — Supabase কানেক্ট করার পর হোমপেজ হিরো সেকশন এডিট করা যাবে।",
    };
  }
  const supabase = await createClient();
  const { error } = await supabase
    .from("site_content")
    .upsert(
      { section_key: "homepage_hero", content, updated_at: new Date().toISOString() },
      { onConflict: "section_key" }
    );
  if (error) return { ok: false, error: "সেভ করা যায়নি।" };
  revalidatePath("/", "layout");
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

  revalidatePath("/", "layout");
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
  revalidatePath("/", "layout");
  return { ok: true };
}

export type UpdateCategoryInput = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  bannerImageUrl: string;
  trustPoints: { icon: string; title: string; description: string }[];
  testimonials: { name: string; quote: string; rating: number }[];
  faqs: { question: string; answer: string }[];
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
      testimonials: input.testimonials,
      faqs: input.faqs,
      is_active: input.isActive,
    })
    .eq("id", input.id);

  if (error) return { ok: false, error: "ক্যাটাগরি আপডেট করা যায়নি।" };
  revalidatePath("/", "layout");
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
    .upsert(
      { section_key: "addons", content: config, updated_at: new Date().toISOString() },
      { onConflict: "section_key" }
    );
  if (error) return { ok: false, error: "সেভ করা যায়নি।" };
  revalidatePath("/", "layout");
  return { ok: true };
}

// ============================================================
// OTP verification (Fake Order Protection)
// ============================================================

const OTP_TTL_MINUTES = 5;

export type SendOtpResult = { ok: true } | { ok: false; error: string };

export async function sendCheckoutOtp(phone: string): Promise<SendOtpResult> {
  const admin = createAdminClient();
  if (!admin) {
    return {
      ok: false,
      error: "OTP সিস্টেম সেটআপ সম্পূর্ণ হয়নি (SUPABASE_SECRET_KEY লাগবে)।",
    };
  }

  const addons = await getAddons();
  const branding = await getBranding();
  const code = String(Math.floor(100000 + Math.random() * 900000));
  const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000).toISOString();

  const { error: insertError } = await admin
    .from("otp_verifications")
    .insert({ phone, code, expires_at: expiresAt });
  if (insertError) return { ok: false, error: "OTP তৈরি করা যায়নি।" };

  const smsResult = await sendSms(
    addons.sms_gateway,
    phone,
    `আপনার ${branding.site_name} অর্ডার ভেরিফিকেশন কোড: ${code} — ${OTP_TTL_MINUTES} মিনিট মেয়াদী।`
  );
  if (!smsResult.ok) return smsResult;

  return { ok: true };
}

export type VerifyOtpResult = { ok: true } | { ok: false; error: string };

export async function verifyCheckoutOtp(phone: string, code: string): Promise<VerifyOtpResult> {
  const admin = createAdminClient();
  if (!admin) return { ok: false, error: "OTP সিস্টেম সেটআপ সম্পূর্ণ হয়নি।" };

  const { data, error } = await admin
    .from("otp_verifications")
    .select("id, expires_at")
    .eq("phone", phone)
    .eq("code", code)
    .eq("verified", false)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) return { ok: false, error: "কোডটি সঠিক নয়।" };
  if (new Date(data.expires_at).getTime() < Date.now()) {
    return { ok: false, error: "কোডের মেয়াদ শেষ — আবার পাঠান।" };
  }

  await admin.from("otp_verifications").update({ verified: true }).eq("id", data.id);
  return { ok: true };
}

/** Used server-side by submitOrder — never exposed as its own client-callable action. */
async function isPhoneOtpVerified(phone: string): Promise<boolean> {
  const admin = createAdminClient();
  if (!admin) return false;
  const { data } = await admin
    .from("otp_verifications")
    .select("id")
    .eq("phone", phone)
    .eq("verified", true)
    .gte("created_at", new Date(Date.now() - 30 * 60 * 1000).toISOString())
    .limit(1)
    .maybeSingle();
  return Boolean(data);
}

export async function updateBranding(branding: Branding): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      error: "ডেমো মোডে সেভ হয় না — Supabase কানেক্ট করার পর থিম/ব্র্যান্ডিং সেভ করা যাবে।",
    };
  }
  if (!isValidHex(branding.primary_color) || !isValidHex(branding.accent_color)) {
    return { ok: false, error: "রঙের কোড সঠিক নয় — #RRGGBB ফরম্যাটে দিন, যেমন #0e1f3c।" };
  }
  const supabase = await createClient();
  const { error } = await supabase
    .from("site_content")
    .upsert(
      { section_key: "branding", content: branding, updated_at: new Date().toISOString() },
      { onConflict: "section_key" }
    );
  if (error) return { ok: false, error: "সেভ করা যায়নি।" };
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function updateProductLandingPage(
  productId: string,
  landingPage: ProductLandingPage
): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      error: "ডেমো মোডে সেভ হয় না — Supabase কানেক্ট করার পর প্রমোশন পেজ সেভ করা যাবে।",
    };
  }
  const supabase = await createClient();
  const { error } = await supabase
    .from("products")
    .update({ landing_page: landingPage })
    .eq("id", productId);
  if (error) return { ok: false, error: "প্রমোশন পেজ সেভ করা যায়নি।" };
  revalidatePath("/", "layout");
  return { ok: true };
}
