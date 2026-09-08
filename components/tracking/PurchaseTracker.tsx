"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/tracking-client";

export default function PurchaseTracker({ orderNumber }: { orderNumber: string | number }) {
  useEffect(() => {
    // skipServer: true — the server-side Conversions API call already fired
    // from submitOrder at the moment the order was created (see lib/actions.ts),
    // with the same "order-<number>" event ID and the full order value. This
    // client-side call only needs to reach the browser pixel for retargeting/
    // audience signal; Meta/TikTok deduplicate the two by event ID.
    trackEvent("Purchase", { eventId: `order-${orderNumber}`, skipServer: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
