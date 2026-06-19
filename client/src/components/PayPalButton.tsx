import { useEffect, useRef, useState } from "react";
import { getDonationLabel } from "@/config/paypalDonations";
import { isPayPalConfigured, loadPayPalSdk } from "@/lib/paypalSdk";

interface PayPalButtonProps {
  amount: string;
  customAmount?: string;
  currency?: string;
  /** Override checkout item name (defaults from tier) */
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

  useEffect(() => {
    let cancelled = false;
    const container = containerRef.current;
    if (!container) return;

    if (isCustom && !chargeAmount) {
      container.innerHTML = "";
      setLoading(false);
      setError(null);
      return;
    }

    container.innerHTML = "";
    setError(null);
    setLoading(true);

    async function renderPayPal() {
      try {
        await loadPayPalSdk();
        if (cancelled || !container) return;

        const paypal = window.paypal;
        const fundingSource = paypal?.FUNDING?.PAYPAL;
        if (!paypal?.Buttons || !fundingSource) {
          throw new Error("PayPal Buttons component unavailable");
        }

        const value = isCustom ? chargeAmount : amount;
        if (!value) return;

        const button = paypal.Buttons({
          fundingSource,
          style: BUTTON_STYLE,
          createOrder: (_data: unknown, actions: { order: { create: (payload: unknown) => Promise<string> } }) =>
            actions.order.create({
              purchase_units: [
                {
                  description: `Ιδεολόγος — ${itemName}`,
                  amount: {
                    currency_code: currency,
                    value,
                    breakdown: {
                      item_total: {
                        currency_code: currency,
                        value,
                      },
                    },
                  },
                  items: [
                    {
                      name: itemName,
                      description: "Δωρεά στο Ιδεολόγος",
                      unit_amount: {
                        currency_code: currency,
                        value,
                      },
                      quantity: "1",
                      category: "DONATION",
                    },
                  ],
                },
              ],
            }),
          onApprove: async (_data: unknown, actions: { order: { capture: () => Promise<unknown> } }) => {
            await actions.order.capture();
            alert("Η δωρεά ολοκληρώθηκε επιτυχώς! Ευχαριστούμε για την υποστήριξή σας!");
          },
          onCancel: () => {
            alert("Η δωρεά ακυρώθηκε.");
          },
          onError: (err: unknown) => {
            console.error("PayPal error:", err);
            alert("Υπήρξε σφάλμα με το PayPal. Παρακαλώ δοκιμάστε ξανά.");
          },
        });

        if (!button.isEligible()) {
          throw new Error("PayPal is not available for this browser");
        }

        await button.render(container);
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
  }, [amount, chargeAmount, currency, isCustom, itemName]);

  if (!isPayPalConfigured()) {
    return (
      <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded p-2">
        PayPal is not configured.
      </p>
    );
  }

  if (isCustom && !chargeAmount) {
    return null;
  }

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
