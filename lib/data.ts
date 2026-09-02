import { createClient } from "@/lib/supabase/server";
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from "@/lib/mock-data";
import { MOCK_ORDERS } from "@/lib/mock-orders";
import type { Category, Product, Order, OrderItem } from "@/lib/types";

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured()) {
    return [...MOCK_CATEGORIES].sort((a, b) => a.display_order - b.display_order);
  }
  const supabase = await createClient();
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
  const supabase = await createClient();
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
  const supabase = await createClient();
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
  const supabase = await createClient();
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
  const supabase = await createClient();
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
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return MOCK_CATEGORIES.find((c) => c.id === id) ?? null;
  return data as Category;
}
