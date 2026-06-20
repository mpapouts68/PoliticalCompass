import { PAYPAL_CLIENT_ID as FALLBACK_CLIENT_ID } from "@/config/paypalDonations";

export type PayPalRuntimeConfig = {
  clientId: string;
  serverReady: boolean;
};

declare global {
  interface Window {
    paypal?: {
      FUNDING?: { PAYPAL: string };
      Buttons?: (config: Record<string, unknown>) => {
        render: (selector: string | HTMLElement) => Promise<void>;
        isEligible: () => boolean;
        close: () => void;
      };
      HostedButtons?: (config: { hostedButtonId: string }) => {
        render: (selector: string | HTMLElement) => Promise<void>;
      };
    };
  }
}

let configPromise: Promise<PayPalRuntimeConfig> | null = null;
let sdkPromise: Promise<void> | null = null;

export function isPayPalConfigured(): boolean {
  return Boolean(FALLBACK_CLIENT_ID);
}

export async function getPayPalConfig(): Promise<PayPalRuntimeConfig> {
  if (!configPromise) {
    configPromise = fetch("/api/paypal/config")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => ({
        clientId: (data?.clientId as string | undefined)?.trim() || FALLBACK_CLIENT_ID,
        serverReady: Boolean(data?.serverReady),
      }))
      .catch(() => ({
        clientId: FALLBACK_CLIENT_ID,
        serverReady: false,
      }));
  }
  return configPromise;
}

/** Load PayPal SDK once per page — matches dashboard embed (hosted-buttons + buttons). */
export function loadPayPalSdk(clientId: string): Promise<void> {
  if (!clientId) {
    return Promise.reject(new Error("PayPal client ID is not configured"));
  }

  if (window.paypal?.HostedButtons && window.paypal?.Buttons) {
    return Promise.resolve();
  }

  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise<void>((resolve, reject) => {
    const params = new URLSearchParams({
      "client-id": clientId,
      components: "hosted-buttons,buttons",
      currency: "EUR",
      "disable-funding": "venmo",
    });

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?${params.toString()}`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      sdkPromise = null;
      reject(new Error("Failed to load PayPal SDK"));
    };
    document.body.appendChild(script);
  });

  return sdkPromise;
}
