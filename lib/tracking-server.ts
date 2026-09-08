"use server";

import crypto from "crypto";
import { getAddons } from "@/lib/data";
import type { AddonsConfig } from "@/lib/types";

function sha256(value: string): string {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

/**
 * Normalizes to E.164 digits-only (country code + number, no leading +)
 * before hashing — this is what Meta/TikTok's own hashed phone records use,
 * so a mismatch here means the hash silently never matches, with no error
 * to signal it. Bangladeshi customers type the local "01XXXXXXXXX" format
 * (confirmed by the checkout form's placeholder text), so that's the one
 * case this needs to actually convert; anything already carrying a country
 * code passes through untouched.
 */
function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("880")) return digits; // already has the country code
  if (digits.startsWith("0")) return "880" + digits.slice(1); // local 01XXXXXXXXX -> 8801XXXXXXXXX
  return digits;
}

export type TrackedEventName = "ViewContent" | "AddToCart" | "InitiateCheckout" | "Purchase";

export type TrackedEventData = {
  eventId: string; // shared with the client-side pixel call for deduplication
  value?: number;
  currency?: string; // e.g. "BDT"
  contentIds?: string[];
  contentName?: string;
  customerPhone?: string;
  sourceUrl: string; // the page the event happened on
};

// Facebook event names line up 1:1 with our names; TikTok uses its own set.
const TIKTOK_EVENT_NAME: Record<TrackedEventName, string> = {
  ViewContent: "ViewContent",
  AddToCart: "AddToCart",
  InitiateCheckout: "InitiateCheckout",
  Purchase: "CompletePayment",
};

/**
 * Server Action called directly from client components. Takes only public
 * event data — never the addons config itself, so the Facebook/TikTok
 * access tokens never need to exist in client-side code or bundles; this
 * function fetches them itself, server-side, via getAddons().
 *
 * Best-effort and fire-and-forget by design — callers should never await
 * this in a way that blocks the page/checkout, and a tracking failure must
 * never surface as a user-facing error.
 */
export async function sendServerConversionEvents(eventName: TrackedEventName, data: TrackedEventData): Promise<void> {
  const addons = await getAddons();
  const jobs: Promise<void>[] = [];
  if (addons.facebook_pixel.enabled && addons.facebook_pixel.access_token) {
    jobs.push(sendFacebookEvent(addons.facebook_pixel, eventName, data));
  }
  if (addons.tiktok_pixel.enabled && addons.tiktok_pixel.access_token) {
    jobs.push(sendTikTokEvent(addons.tiktok_pixel, eventName, data));
  }
  await Promise.allSettled(jobs);
}

/** Same as above, but for server-only call sites (like submitOrder) that already have the addons config loaded — avoids a redundant fetch. */
export async function sendServerConversionEventsWithAddons(
  addons: AddonsConfig,
  eventName: TrackedEventName,
  data: TrackedEventData
): Promise<void> {
  const jobs: Promise<void>[] = [];
  if (addons.facebook_pixel.enabled && addons.facebook_pixel.access_token) {
    jobs.push(sendFacebookEvent(addons.facebook_pixel, eventName, data));
  }
  if (addons.tiktok_pixel.enabled && addons.tiktok_pixel.access_token) {
    jobs.push(sendTikTokEvent(addons.tiktok_pixel, eventName, data));
  }
  await Promise.allSettled(jobs);
}

async function sendFacebookEvent(
  config: { pixel_id: string; access_token: string },
  eventName: TrackedEventName,
  data: TrackedEventData
): Promise<void> {
  try {
    const userData: Record<string, unknown> = {};
    if (data.customerPhone) userData.ph = [sha256(normalizePhone(data.customerPhone))];

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: data.eventId,
          event_source_url: data.sourceUrl,
          action_source: "website",
          user_data: userData,
          custom_data: {
            currency: data.currency ?? "BDT",
            value: data.value,
            content_ids: data.contentIds,
            content_name: data.contentName,
          },
        },
      ],
    };

    await fetch(`https://graph.facebook.com/v21.0/${config.pixel_id}/events?access_token=${config.access_token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // Best-effort — a tracking failure should never break the storefront.
  }
}

async function sendTikTokEvent(
  config: { pixel_id: string; access_token: string },
  eventName: TrackedEventName,
  data: TrackedEventData
): Promise<void> {
  try {
    const userData: Record<string, unknown> = {};
    if (data.customerPhone) userData.phone = [sha256(normalizePhone(data.customerPhone))];

    const payload = {
      event_source: "web",
      event_source_id: config.pixel_id,
      data: [
        {
          event: TIKTOK_EVENT_NAME[eventName],
          event_id: data.eventId,
          event_time: Math.floor(Date.now() / 1000),
          user: userData,
          properties: {
            currency: data.currency ?? "BDT",
            value: data.value,
            content_ids: data.contentIds,
            content_name: data.contentName,
          },
          page: { url: data.sourceUrl },
        },
      ],
    };

    await fetch("https://business-api.tiktok.com/open_api/v1.3/event/track/", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Access-Token": config.access_token },
      body: JSON.stringify(payload),
    });
  } catch {
    // Best-effort — a tracking failure should never break the storefront.
  }
}
