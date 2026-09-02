import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTaka(amount: number) {
  return `৳${amount.toLocaleString("en-BD", { maximumFractionDigits: 0 })}`;
}

export function discountPercent(price: number, compareAt: number | null) {
  if (!compareAt || compareAt <= price) return null;
  return Math.round(((compareAt - price) / compareAt) * 100);
}

export function deliveryChargeFor(zone: "inside_dhaka" | "outside_dhaka") {
  return zone === "inside_dhaka" ? 80 : 150;
}
