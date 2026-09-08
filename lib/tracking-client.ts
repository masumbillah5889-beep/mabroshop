"use client";

import { sendServerConversionEvents, type TrackedEventName } from "@/lib/tracking-server";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (event: string, data?: Record<string, unknown>, options?: Record<string, unknown>) => void };
    dataLayer?: Record<string, unknown>[];
  }
}

const TIKTOK_EVENT_NAME: Record<TrackedEventName, string> = {
  ViewContent: "ViewContent",
  AddToCart: "AddToCart",
  InitiateCheckout: "InitiateCheckout",
  Purchase: "CompletePayment",
};

// GTM's own naming convention (matches the "GTM-এ Event name" column in the
// tracking guide) — pushed to dataLayer so a GTM setup's own custom-event
// triggers can pick these up when the theme isn't injecting fbq/ttq directly.
const GTM_EVENT_NAME: Record<TrackedEventName, string> = {
  ViewContent: "view_item",
  AddToCart: "add_to_cart",
  InitiateCheckout: "begin_checkout",
  Purchase: "purchase",
};

export type TrackEventInput = {
  value?: number;
  currency?: string;
  contentIds?: string[];
  contentName?: string;
  customerPhone?: string;
  /** Use a specific ID instead of generating a random one — for events
   *  (like Purchase) where a server-side call elsewhere needs to share
   *  the exact same ID for deduplication. */
  eventId?: string;
  /** Skip the server-side Conversions API call — for when it was already
   *  fired from elsewhere (e.g. Purchase fired server-side from
   *  submitOrder at order-creation time, before the confirmation page
   *  even loads) and this call should only handle the browser pixel. */
  skipServer?: boolean;
};

/**
 * Fires a conversion event down every path at once: the browser pixel
 * (fbq/ttq, if their scripts loaded — i.e. theme mode), a dataLayer push
 * (for a GTM-mode setup's own triggers), and the server-side Conversions
 * API (via a Server Action) — all sharing one event ID so Meta/TikTok
 * treat the browser and server copies as the same event rather than
 * double-counting the conversion.
 *
 * Fire-and-forget: never await this in a way that blocks navigation or
 * shows an error to the shopper if a pixel script hasn't loaded or a
 * network call fails.
 */
export function trackEvent(eventName: TrackedEventName, input: TrackEventInput = {}): void {
  if (typeof window === "undefined") return;

  const eventId =
    input.eventId ??
    (typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`);

  const currency = input.currency ?? "BDT";

  try {
    window.fbq?.(
      "track",
      eventName,
      {
        value: input.value,
        currency,
        content_ids: input.contentIds,
        content_name: input.contentName,
      },
      { eventID: eventId }
    );
  } catch {
    // A missing/blocked pixel script should never break the page.
  }

  try {
    window.ttq?.track(
      TIKTOK_EVENT_NAME[eventName],
      {
        value: input.value,
        currency,
        content_id: input.contentIds?.[0],
        content_name: input.contentName,
      },
      { event_id: eventId }
    );
  } catch {
    // Same — never let this break the page.
  }

  try {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({
      event: GTM_EVENT_NAME[eventName],
      event_id: eventId,
      value: input.value,
      currency,
      content_ids: input.contentIds,
      content_name: input.contentName,
    });
  } catch {
    // Same — never let this break the page.
  }

  if (!input.skipServer) {
    void sendServerConversionEvents(eventName, {
      eventId,
      value: input.value,
      currency,
      contentIds: input.contentIds,
      contentName: input.contentName,
      customerPhone: input.customerPhone,
      sourceUrl: window.location.href,
    });
  }
}
