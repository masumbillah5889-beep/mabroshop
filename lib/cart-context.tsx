"use client";

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { trackEvent } from "./tracking-client";
import type { CartLine } from "./types";

type CartContextValue = {
  lines: CartLine[];
  addItem: (line: Omit<CartLine, "quantity">, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  subtotal: number;
  itemCount: number;
};

const STORAGE_KEY = "mabroshop_cart_v1";

/**
 * Cart state lives outside React in a small external store, read via
 * useSyncExternalStore — the pattern React recommends for state backed by an
 * outside source (here, localStorage), rather than loading it in an effect and
 * calling a useState setter (which triggers an extra render).
 */
let cartLines: CartLine[] = [];
const listeners = new Set<() => void>();

function readStorage(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartLine[]) : [];
  } catch {
    return [];
  }
}

function commit(next: CartLine[]) {
  cartLines = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartLines));
  } catch {
    // storage unavailable (private mode, quota) — cart still works for this session
  }
  listeners.forEach((notify) => notify());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot() {
  return cartLines;
}

function getServerSnapshot() {
  return cartLines; // empty ([]) on the server; hydrated client-side below
}

function addItem(line: Omit<CartLine, "quantity">, quantity = 1) {
  const existing = cartLines.find((l) => l.productId === line.productId);
  commit(
    existing
      ? cartLines.map((l) =>
          l.productId === line.productId ? { ...l, quantity: l.quantity + quantity } : l
        )
      : [...cartLines, { ...line, quantity }]
  );
  trackEvent("AddToCart", {
    value: line.price * quantity,
    contentIds: [line.productId],
    contentName: line.name,
  });
}

function updateQuantity(productId: string, quantity: number) {
  commit(
    quantity <= 0
      ? cartLines.filter((l) => l.productId !== productId)
      : cartLines.map((l) => (l.productId === productId ? { ...l, quantity } : l))
  );
}

function removeItem(productId: string) {
  commit(cartLines.filter((l) => l.productId !== productId));
}

function clear() {
  commit([]);
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const storeLines = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // One-time hydration from localStorage. This calls the external store's own
  // `commit` (which notifies useSyncExternalStore subscribers), not a React
  // useState setter, so it doesn't trigger the cascading-render pattern.
  useEffect(() => {
    if (cartLines.length === 0) {
      const stored = readStorage();
      if (stored.length > 0) commit(stored);
    }
  }, []);

  const subtotal = useMemo(
    () => storeLines.reduce((sum, l) => sum + l.price * l.quantity, 0),
    [storeLines]
  );
  const itemCount = useMemo(
    () => storeLines.reduce((sum, l) => sum + l.quantity, 0),
    [storeLines]
  );

  return (
    <CartContext.Provider
      value={{ lines: storeLines, addItem, updateQuantity, removeItem, clear, subtotal, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
