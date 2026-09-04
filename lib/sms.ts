/**
 * Thin wrapper around bulksmsbd.net's HTTP API.
 * Docs (endpoint + params confirmed independently across several open-source
 * client libraries, since BulkSMSBD doesn't publish a single official page):
 *   GET https://bulksmsbd.net/api/smsapi
 *     ?api_key=...&type=text&senderid=...&number=8801XXXXXXXXX&message=...
 * Success responses carry response_code 202.
 */

type SendResult = { ok: true } | { ok: false; error: string };

function normalizeBdPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("880")) return digits;
  if (digits.startsWith("0")) return `88${digits}`;
  return `880${digits}`;
}

export async function sendSms(
  gateway: { api_key: string; sender_id: string },
  phone: string,
  message: string
): Promise<SendResult> {
  if (!gateway.api_key || !gateway.sender_id) {
    return { ok: false, error: "SMS গেটওয়ে কনফিগার করা নেই (Addons পেজে API key/Sender ID দিন)।" };
  }

  const params = new URLSearchParams({
    api_key: gateway.api_key,
    type: "text",
    senderid: gateway.sender_id,
    number: normalizeBdPhone(phone),
    message,
  });

  try {
    const res = await fetch(`https://bulksmsbd.net/api/smsapi?${params.toString()}`, {
      method: "GET",
    });
    const data = await res.json().catch(() => null);

    // BulkSMSBD returns response_code 202 on success; anything else (or a
    // response we can't parse) counts as a failure so we never silently
    // pretend an SMS went out when it didn't.
    if (data && (data.response_code === 202 || data.response_code === "202")) {
      return { ok: true };
    }
    return {
      ok: false,
      error: data?.error_message || data?.status_message || "SMS পাঠানো যায়নি।",
    };
  } catch {
    return { ok: false, error: "SMS গেটওয়ের সাথে যোগাযোগ করা যায়নি।" };
  }
}
