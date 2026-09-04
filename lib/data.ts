import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from "@/lib/mock-data";
import { MOCK_ORDERS } from "@/lib/mock-orders";
import type { Category, Product, Order, OrderItem, AddonsConfig } from "@/lib/types";
import { DEFAULT_ADDONS } from "@/lib/types";

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

// ============================================================
// PUBLIC storefront reads (Header, Footer, homepage, category
// pages, product pages, generateStaticParams). These use the
// cookie-free public client — active items only, safe to call
// at build time. Never import next/headers' cookies() on this
// side, or category pages lose static generation again.
// ============================================================

export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured()) {
    return [...MOCK_CATEGORIES].sort((a, b) => a.display_order - b.display_order);
  }
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("display_order");
  if (error || !data) return MOCK_CATEGORIES;
  return data as Category[];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (!isSupabaseConfigured()) {
    return MOCK_CATEGORIES.find((c) => c.slug === slug) ?? null;
  }
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error || !data) return MOCK_CATEGORIES.find((c) => c.slug === slug) ?? null;
  return data as Category;
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    return MOCK_PRODUCTS.filter((p) => p.category_id === categoryId);
  }
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, images:product_images(*)")
    .eq("category_id", categoryId)
    .eq("is_active", true);
  if (error || !data) return MOCK_PRODUCTS.filter((p) => p.category_id === categoryId);
  return data as Product[];
}

export async function getFeaturedProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    return MOCK_PRODUCTS.filter((p) => p.is_featured);
  }
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, images:product_images(*)")
    .eq("is_featured", true)
    .eq("is_active", true)
    .limit(8);
  if (error || !data) return MOCK_PRODUCTS.filter((p) => p.is_featured);
  return data as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured()) {
    return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
  }
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, images:product_images(*), category:categories(*)")
    .eq("slug", slug)
    .single();
  if (error || !data) return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
  return data as Product;
}

export async function getRelatedProducts(categoryId: string, excludeId: string): Promise<Product[]> {
  const all = await getProductsByCategory(categoryId);
  return all.filter((p) => p.id !== excludeId).slice(0, 4);
}

// ============================================================
// ADMIN reads (behind /admin auth). These use the cookie-aware
// server client on purpose — admin pages are already dynamic
// (the auth check itself depends on cookies), and admins should
// see inactive items too, which the "is_active = true" filter
// above would otherwise hide from them.
// ============================================================

export async function getAdminCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured()) {
    return [...MOCK_CATEGORIES].sort((a, b) => a.display_order - b.display_order);
  }
  const supabase = await createClient();
  const { data, error } = await supabase.from("categories").select("*").order("display_order");
  if (error || !data) return MOCK_CATEGORIES;
  return data as Category[];
}

export async function getAdminProductsByCategory(categoryId: string): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    return MOCK_PRODUCTS.filter((p) => p.category_id === categoryId);
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, images:product_images(*)")
    .eq("category_id", categoryId);
  if (error || !data) return MOCK_PRODUCTS.filter((p) => p.category_id === categoryId);
  return data as Product[];
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!isSupabaseConfigured()) {
    return MOCK_PRODUCTS.find((p) => p.id === id) ?? null;
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, images:product_images(*)")
    .eq("id", id)
    .single();
  if (error || !data) return MOCK_PRODUCTS.find((p) => p.id === id) ?? null;
  return data as Product;
}

export async function getCategoryById(id: string): Promise<Category | null> {
  if (!isSupabaseConfigured()) {
    return MOCK_CATEGORIES.find((c) => c.id === id) ?? null;
  }
  const supabase = await createClient();
  const { data, error } = await supabase.from("categories").select("*").eq("id", id).single();
  if (error || !data) return MOCK_CATEGORIES.find((c) => c.id === id) ?? null;
  return data as Category;
}

export async function getOrders(): Promise<(Order & { items: OrderItem[] })[]> {
  if (!isSupabaseConfigured()) {
    return [...MOCK_ORDERS].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*, items:order_items(*)")
    .order("created_at", { ascending: false });
  if (error || !data) return MOCK_ORDERS;
  return data as (Order & { items: OrderItem[] })[];
}

export async function getOrdersSentToSupplier(): Promise<(Order & { items: OrderItem[] })[]> {
  const orders = await getOrders();
  return orders.filter((o) => o.supplier_status !== "not_sent");
}

export const getAddons = cache(async (): Promise<AddonsConfig> => {
  if (!isSupabaseConfigured()) return DEFAULT_ADDONS;
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("site_content")
    .select("content")
    .eq("section_key", "addons")
    .single();
  if (error || !data) return DEFAULT_ADDONS;
  return { ...DEFAULT_ADDONS, ...(data.content as Partial<AddonsConfig>) };
});
