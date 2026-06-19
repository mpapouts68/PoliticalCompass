import { PAYPAL_CLIENT_ID } from "@/config/paypalDonations";

declare global {
  interface Window {
    paypal?: {
      FUNDING?: { PAYPAL: string };
      Buttons?: (config: Record<string, unknown>) => {
        render: (selector: string | HTMLElement) => Promise<void>;
        isEligible: () => boolean;
        close: () => void;
      };
    };
  }
}

let scriptPromise: Promise<void> | null = null;

export function isPayPalConfigured(): boolean {
  return Boolean(PAYPAL_CLIENT_ID);
}

export function loadPayPalSdk(): Promise<void> {
  if (!isPayPalConfigured()) {
    return Promise.reject(new Error("PayPal client ID is not configured"));
  }

  if (window.paypal) {
    return Promise.resolve();
  }

  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const params = new URLSearchParams({
        "client-id": PAYPAL_CLIENT_ID,
        components: "buttons",
        currency: "EUR",
        intent: "capture",
        locale: "el_GR",
        "disable-funding": "venmo,paylater,card,credit,bancontact,blik,eps,giropay,ideal,mybank,p24,sofort",
      });
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?${params.toString()}`;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load PayPal SDK"));
      document.body.appendChild(script);
    });
  }

  return scriptPromise;
}
