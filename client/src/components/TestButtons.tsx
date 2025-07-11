import React from 'react';
import { Button } from '@/components/ui/button';

export function TestButtons() {
  return (
    <div className="space-y-4 p-4 border rounded-lg bg-yellow-50">
      <h3 className="font-bold text-lg">Test Buttons (for debugging)</h3>
      
      <Button
        onClick={() => {
          console.log("Test button clicked!");
          const popup = window.open('https://google.com', '_blank', 'width=600,height=400');
          if (!popup) {
            alert('Popup blocked!');
          } else {
            alert('Popup opened successfully!');
          }
        }}
        className="w-full"
      >
        Test Popup (Google)
      </Button>

      <Button
        onClick={() => {
          console.log("Twitter test clicked!");
          const twitterUrl = 'https://twitter.com/intent/tweet?text=Test%20tweet&url=https://ideologos.online';
          const popup = window.open(twitterUrl, '_blank', 'width=600,height=400');
          if (!popup) {
            alert('Twitter popup blocked!');
          } else {
            alert('Twitter opened!');
          }
        }}
        className="w-full"
        variant="outline"
      >
        Test Twitter
      </Button>

      <Button
        onClick={() => {
          console.log("Facebook test clicked!");
          const facebookUrl = 'https://www.facebook.com/sharer/sharer.php?u=https://ideologos.online';
          const popup = window.open(facebookUrl, '_blank', 'width=600,height=400');
          if (!popup) {
            alert('Facebook popup blocked!');
          } else {
            alert('Facebook opened!');
          }
        }}
        className="w-full"
        variant="outline"
      >
        Test Facebook
      </Button>

      <Button
        onClick={async () => {
          console.log("PayPal test clicked!");
          try {
            const response = await fetch('/paypal/order', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ amount: '3.50', currency: 'EUR', intent: 'CAPTURE' })
            });
            const data = await response.json();
            console.log("PayPal order:", data);
            const approvalUrl = `https://www.sandbox.paypal.com/checkoutnow?token=${data.id}`;
            const popup = window.open(approvalUrl, '_blank', 'width=500,height=700');
            if (!popup) {
              alert('PayPal popup blocked!');
            } else {
              alert('PayPal opened!');
            }
          } catch (error) {
            console.error("PayPal test error:", error);
            alert('PayPal test failed: ' + error.message);
          }
        }}
        className="w-full"
        variant="outline"
      >
        Test PayPal
      </Button>
    </div>
  );
}