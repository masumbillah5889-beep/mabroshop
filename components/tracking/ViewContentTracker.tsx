"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/tracking-client";

export default function ViewContentTracker({
  productId,
  name,
  price,
}: {
  productId: string;
  name: string;
  price: number;
}) {
  useEffect(() => {
    trackEvent("ViewContent", { value: price, contentIds: [productId], contentName: name });
    // Only ever once per page load, regardless of any later prop identity changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
