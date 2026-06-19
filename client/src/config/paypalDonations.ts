/** PayPal donation config — client ID from your PayPal embed code. */
export const PAYPAL_CLIENT_ID =
  (import.meta.env.VITE_PAYPAL_CLIENT_ID as string | undefined)?.trim() ||
  "BAA5OZw-BfpwsFEZkx46RD7tNx2A0JV_RL0nJdCixwQmx6IPv6db0Rhsltws3eDLw7HRw7ZUSZyPOWOfpE";

/** Hosted button IDs — Ideologos buttons from PayPal Dashboard (override via .env if needed) */
export const PAYPAL_HOSTED_BUTTON_IDS: Record<string, string> = {
  "3.50":
    (import.meta.env.VITE_PAYPAL_HOSTED_BUTTON_ID_350 as string | undefined)?.trim() ||
    "M4MMFWH7NZFGG",
  "7.00":
    (import.meta.env.VITE_PAYPAL_HOSTED_BUTTON_ID_700 as string | undefined)?.trim() ||
    "LPKAXMN846NQ4",
  "15.00":
    (import.meta.env.VITE_PAYPAL_HOSTED_BUTTON_ID_1500 as string | undefined)?.trim() ||
    "5Z43NJB2V3JRN",
};

/** Ideologos — payer chooses amount (no fixed price in dashboard) */
export const PAYPAL_CUSTOM_HOSTED_BUTTON_ID =
  (import.meta.env.VITE_PAYPAL_HOSTED_BUTTON_ID_CUSTOM as string | undefined)?.trim() ||
  "JA7PXANRWQNBU";

/** Display names shown in PayPal checkout (instead of Ideologos 1/2/3 from dashboard) */
export const DONATION_TIER_LABELS: Record<string, string> = {
  "3.50": "Καφές",
  "7.00": "Στήριξη",
  "15.00": "Ανάπτυξη",
  custom: "Δωρεά",
};

export function getDonationLabel(amount: string): string {
  return DONATION_TIER_LABELS[amount] ?? "Ιδεολόγος";
}

export function getHostedButtonIdForAmount(amount: string): string | undefined {
  if (amount === "custom") return PAYPAL_CUSTOM_HOSTED_BUTTON_ID || undefined;
  return PAYPAL_HOSTED_BUTTON_IDS[amount] || undefined;
}
