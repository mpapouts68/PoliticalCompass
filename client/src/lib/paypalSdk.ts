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
const scriptPromises = new Map<string, Promise<void>>();

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

export function loadPayPalSdk(
  clientId: string,
  components: "buttons" | "hosted-buttons" = "buttons",
): Promise<void> {
  if (!clientId) {
    return Promise.reject(new Error("PayPal client ID is not configured"));
  }

  const cacheKey = `${clientId}:${components}`;
  if (window.paypal) {
    const hasButtons = Boolean(window.paypal.Buttons);
    const hasHosted = Boolean(window.paypal.HostedButtons);
    if ((components === "buttons" && hasButtons) || (components === "hosted-buttons" && hasHosted)) {
      return Promise.resolve();
    }
  }

  const existing = scriptPromises.get(cacheKey);
  if (existing) return existing;

  const promise = new Promise<void>((resolve, reject) => {
    const params = new URLSearchParams({
      "client-id": clientId,
      components,
      currency: "EUR",
      intent: "capture",
      locale: "el_GR",
    });

    if (components === "buttons") {
      params.set(
        "disable-funding",
        "venmo,paylater,card,credit,bancontact,blik,eps,giropay,ideal,mybank,p24,sofort",
      );
    }

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?${params.toString()}`;
    script.async = true;
    script.dataset.paypalSdk = cacheKey;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load PayPal SDK"));
    document.body.appendChild(script);
  });

  scriptPromises.set(cacheKey, promise);
  return promise;
}
