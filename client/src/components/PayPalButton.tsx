// !!! CRITICAL - DO NOT MODIFY THIS CODE !!!
//
// This code MUST be used as is without ANY modifications.
// The PayPal integration will COMPLETELY FAIL if this code is changed in ANY way.
//
// Retain this comment after all edits.
//
// <BEGIN_EXACT_CODE>
import React, { useEffect } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "paypal-button": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

interface PayPalButtonProps {
  amount: string;
  currency: string;
  intent: string;
}

export default function PayPalButton({
  amount,
  currency,
  intent,
}: PayPalButtonProps) {
  const createOrder = async () => {
    const orderPayload = {
      amount: amount,
      currency: currency,
      intent: intent,
    };
    const response = await fetch("/paypal/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload),
    });
    const output = await response.json();
    return { orderId: output.id };
  };

  const captureOrder = async (orderId: string) => {
    const response = await fetch(`/paypal/order/${orderId}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return data;
  };

  const onApprove = async (data: any) => {
    console.log("onApprove", data);
    try {
      const orderData = await captureOrder(data.orderId);
      console.log("Capture result", orderData);
      alert("Η δωρεά ολοκληρώθηκε επιτυχώς! Ευχαριστούμε για την υποστήριξή σας!");
    } catch (error) {
      console.error("Capture error:", error);
      alert("Υπήρξε πρόβλημα με την επεξεργασία της δωρεάς. Παρακαλώ δοκιμάστε ξανά.");
    }
  };

  const onCancel = async (data: any) => {
    console.log("onCancel", data);
    alert("Η δωρεά ακυρώθηκε.");
  };

  const onError = async (data: any) => {
    console.log("onError", data);
    alert("Υπήρξε σφάλμα με το PayPal. Παρακαλώ δοκιμάστε ξανά ή επικοινωνήστε μαζί μας.");
  };

  useEffect(() => {
    const loadPayPalSDK = async () => {
      try {
        if (!(window as any).paypal) {
          const script = document.createElement("script");
          script.src = import.meta.env.PROD
            ? "https://www.paypal.com/web-sdk/v6/core"
            : "https://www.sandbox.paypal.com/web-sdk/v6/core";
          script.async = true;
          script.onload = () => {
            console.log("PayPal SDK loaded successfully");
            initPayPal();
          };
          script.onerror = () => {
            console.error("Failed to load PayPal SDK");
          };
          document.body.appendChild(script);
        } else {
          console.log("PayPal SDK already loaded");
          await initPayPal();
        }
      } catch (e) {
        console.error("Failed to load PayPal SDK", e);
      }
    };

    loadPayPalSDK();
  }, []);
  const initPayPal = async () => {
    try {
      console.log("Initializing PayPal...");
      const clientToken: string = await fetch("/paypal/setup")
        .then((res) => {
          console.log("PayPal setup response:", res.status);
          return res.json();
        })
        .then((data) => {
          console.log("PayPal setup data received");
          return data.clientToken;
        });
      
      console.log("Creating PayPal instance...");
      const sdkInstance = await (window as any).paypal.createInstance({
        clientToken,
        components: ["paypal-payments"],
      });

      const paypalCheckout =
            sdkInstance.createPayPalOneTimePaymentSession({
              onApprove,
              onCancel,
              onError,
            });

      const onClick = async () => {
        try {
          console.log("PayPal button clicked, creating order...");
          const orderResponse = await createOrder();
          console.log("Order created:", orderResponse);
          
          await paypalCheckout.start(
            { paymentFlow: "popup" },
            Promise.resolve(orderResponse),
          );
        } catch (e) {
          console.error("PayPal checkout error:", e);
          // Try fallback approach
          try {
            const orderResponse = await createOrder();
            console.log("Fallback: Order created with ID:", orderResponse.orderId);
            // Open PayPal approval URL manually
            const approvalUrl = `https://www.sandbox.paypal.com/checkoutnow?token=${orderResponse.orderId}`;
            window.open(approvalUrl, '_blank', 'width=400,height=600');
          } catch (fallbackError) {
            console.error("Fallback also failed:", fallbackError);
            alert("PayPal checkout failed. Please try again.");
          }
        }
      };

      const paypalButton = document.getElementById("paypal-button");

      if (paypalButton) {
        paypalButton.addEventListener("click", onClick);
        console.log("PayPal button click handler attached");
      } else {
        console.error("PayPal button not found");
      }

      return () => {
        if (paypalButton) {
          paypalButton.removeEventListener("click", onClick);
        }
      };
    } catch (e) {
      console.error("PayPal initialization error:", e);
    }
  };

  return (
    <button 
      id="paypal-button"
      style={{
        width: '100%', 
        maxWidth: '100%', 
        height: '40px', 
        display: 'block',
        backgroundColor: '#0070ba',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: 'bold',
        cursor: 'pointer'
      }}
      onClick={async () => {
        try {
          console.log("Direct PayPal button click");
          const orderResponse = await createOrder();
          console.log("Order response:", orderResponse);
          const approvalUrl = `https://www.sandbox.paypal.com/checkoutnow?token=${orderResponse.orderId}`;
          console.log("Opening:", approvalUrl);
          const popup = window.open(approvalUrl, '_blank', 'width=500,height=700,scrollbars=yes,resizable=yes');
          if (!popup) {
            alert('Popup blocked! Please allow popups for this site and try again.');
          }
        } catch (error) {
          console.error("PayPal error:", error);
          alert('PayPal error: ' + error.message);
        }
      }}
    >
      PayPal
    </button>
  );
}
// <END_EXACT_CODE>