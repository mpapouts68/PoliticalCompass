import { useEffect, useRef, useState } from "react";
import { getDonationLabel, getHostedButtonIdForAmount } from "@/config/paypalDonations";
import { getPayPalConfig, loadPayPalSdk, type PayPalRuntimeConfig } from "@/lib/paypalSdk";

interface PayPalButtonProps {
  amount: string;
  customAmount?: string;
  currency?: string;
  donationLabel?: string;
}

function formatAmount(value: string): string {
  const n = parseFloat(value);
  if (Number.isNaN(n) || n <= 0) return "";
  return n.toFixed(2);
}

const BUTTON_STYLE = {
  layout: "horizontal" as const,
  color: "gold" as const,
  shape: "rect" as const,
  label: "paypal" as const,
  height: 35,
  tagline: false,
};

async function createServerOrder(currency: string, value: string, itemName: string): Promise<string> {
  const res = await fetch("/paypal/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      intent: "CAPTURE",
      amount: value,
      currency,
      description: `Ιδεολόγος — ${itemName}`,
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      typeof data?.error === "string"
        ? data.error
        : data?.message || "PayPal order creation failed";
    throw new Error(message);
  }
  if (!data?.id) {
    throw new Error("PayPal returned no order ID");
  }
  return data.id as string;
}

async function captureServerOrder(orderID: string): Promise<void> {
  const res = await fetch(`/paypal/order/${orderID}/capture`, { method: "POST" });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.error || "PayPal capture failed");
  }
}

function buildServerButtonConfig(currency: string, value: string, itemName: string, fundingSource?: string) {
  return {
    ...(fundingSource ? { fundingSource } : {}),
    style: BUTTON_STYLE,
    createOrder: () => createServerOrder(currency, value, itemName),
    onApprove: async (data: { orderID?: string }) => {
      if (!data.orderID) throw new Error("Missing PayPal order ID");
      await captureServerOrder(data.orderID);
      alert("Η δωρεά ολοκληρώθηκε επιτυχώς! Ευχαριστούμε για την υποστήριξή σας!");
    },
    onCancel: () => {
      alert("Η δωρεά ακυρώθηκε.");
    },
    onError: (err: unknown) => {
      console.error("PayPal error:", err);
      alert("Υπήρξε σφάλμα με το PayPal. Παρακαλώ δοκιμάστε ξανά.");
    },
  };
}

async function renderServerButton(
  container: HTMLElement,
  config: PayPalRuntimeConfig,
  currency: string,
  value: string,
  itemName: string,
): Promise<void> {
  await loadPayPalSdk(config.clientId, "buttons");

  const paypal = window.paypal;
  if (!paypal?.Buttons) {
    throw new Error("PayPal Buttons component unavailable");
  }

  const fundingSource = paypal.FUNDING?.PAYPAL;
  const configs = [
    fundingSource ? buildServerButtonConfig(currency, value, itemName, fundingSource) : null,
    buildServerButtonConfig(currency, value, itemName),
  ].filter(Boolean) as ReturnType<typeof buildServerButtonConfig>[];

  for (const buttonConfig of configs) {
    const button = paypal.Buttons(buttonConfig);
    if (!button.isEligible()) continue;
    await button.render(container);
    return;
  }

  throw new Error("PayPal is not available for this browser");
}

async function renderHostedButton(
  container: HTMLElement,
  config: PayPalRuntimeConfig,
  hostedButtonId: string,
): Promise<void> {
  await loadPayPalSdk(config.clientId, "hosted-buttons");

  const paypal = window.paypal;
  if (!paypal?.HostedButtons) {
    throw new Error("PayPal Hosted Buttons unavailable");
  }

  await paypal.HostedButtons({ hostedButtonId }).render(container);
}

export default function PayPalButton({
  amount,
  customAmount,
  currency = "EUR",
  donationLabel,
}: PayPalButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const isCustom = amount === "custom";
  const chargeAmount = isCustom ? formatAmount(customAmount ?? "") : amount;
  const itemName = donationLabel ?? getDonationLabel(amount);
  const hostedButtonId = getHostedButtonIdForAmount(amount);

  useEffect(() => {
    let cancelled = false;
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";
    setError(null);
    setLoading(true);

    async function renderPayPal() {
      try {
        const config = await getPayPalConfig();
        if (cancelled || !container) return;

        const value = isCustom ? chargeAmount : amount;

        if (config.serverReady) {
          if (isCustom && !value) {
            return;
          }
          if (!value) {
            throw new Error("Invalid donation amount");
          }
          await renderServerButton(container, config, currency, value, itemName);
          return;
        }

        if (hostedButtonId) {
          await renderHostedButton(container, config, hostedButtonId);
          return;
        }

        throw new Error("Το PayPal δεν έχει ρυθμιστεί στον διακομιστή.");
      } catch (err) {
        console.error("PayPal render failed:", err);
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "PayPal failed to load");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    renderPayPal();

    return () => {
      cancelled = true;
      if (container) container.innerHTML = "";
    };
  }, [amount, chargeAmount, currency, hostedButtonId, isCustom, itemName]);

  return (
    <div className="w-full h-[35px] relative">
      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-xs text-gray-400">PayPal…</span>
        </div>
      )}
      {error && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded p-1">{error}</p>
      )}
      <div ref={containerRef} className="paypal-button-container w-full h-[35px]" />
    </div>
  );
}
