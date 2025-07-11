import { Card, CardContent } from "@/components/ui/card";
import { Heart, Coffee, Laptop, ExternalLink, Euro } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function DonationSection() {
  const [customAmount, setCustomAmount] = useState("");

  const handleDonationClick = (amount: string) => {
    // Open PayPal donation page - this will work even if the SDK has issues
    const baseUrl = "https://www.paypal.com/paypalme/your-username"; // Replace with your PayPal.me link
    window.open(`${baseUrl}/${amount}EUR`, '_blank');
  };

  const handleCustomDonation = () => {
    const amount = parseFloat(customAmount);
    if (amount && amount > 0) {
      handleDonationClick(amount.toFixed(2));
      setCustomAmount("");
    }
  };

  const donationOptions = [
    {
      amount: "3.50",
      icon: <Coffee className="w-5 h-5" />,
      title: "Καφές",
      description: "Για τον δημιουργό"
    },
    {
      amount: "7.00", 
      icon: <Heart className="w-5 h-5" />,
      title: "Υποστήριξη",
      description: "Υποστήριξη του έργου"
    },
    {
      amount: "15.00",
      icon: <Laptop className="w-5 h-5" />,
      title: "Ανάπτυξη",
      description: "Βοήθεια στην ανάπτυξη"
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-md">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="flex justify-center items-center mb-3">
            <Heart className="w-6 h-6 text-red-500 mr-2" />
            <h3 className="text-xl font-semibold text-gray-800">
              Υποστήριξε το Ιδεολόγος
            </h3>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 inline-block">
            <p className="text-green-700 font-medium text-sm">
              🆓 Δωρεάν χρήση για όλους - Χωρίς κρυφές χρεώσεις
            </p>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed">
            Το Ιδεολόγος είναι ένα ανεξάρτητο έργο που βοηθά τους Έλληνες πολίτες να κατανοήσουν 
            τις πολιτικές τους θέσεις. Η υποστήριξή σας βοηθά στη συντήρηση και βελτίωση της πλατφόρμας.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          {donationOptions.map((option) => (
            <div key={option.amount} className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors flex flex-col h-full">
              <div className="text-center flex-1 flex flex-col">
                <div className="flex justify-center text-blue-600 mb-2">
                  {option.icon}
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">{option.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                <div className="text-lg font-bold text-blue-600 mb-3 flex-1 flex items-center justify-center">€{option.amount}</div>
                <Button 
                  onClick={() => handleDonationClick(option.amount)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-auto"
                  size="sm"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Δωρεά €{option.amount}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          ))}
          
          {/* Custom Amount Option */}
          <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors flex flex-col h-full">
            <div className="text-center flex-1 flex flex-col">
              <div className="flex justify-center text-blue-600 mb-2">
                <Euro className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Προσαρμοσμένο</h4>
              <p className="text-sm text-gray-600 mb-3">Δικό σας ποσό</p>
              <div className="flex-1 flex items-center justify-center mb-3">
                <Input
                  type="number"
                  placeholder="€"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  min="0.50"
                  step="0.50"
                  className="text-center max-w-20"
                />
              </div>
              <Button 
                onClick={handleCustomDonation}
                disabled={!customAmount || parseFloat(customAmount) <= 0}
                className="w-full bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-300 mt-auto"
                size="sm"
              >
                <Heart className="w-4 h-4 mr-2" />
                Δωρεά
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Οι δωρεές επεξεργάζονται με ασφάλεια μέσω PayPal • 
            Η πλατφόρμα παραμένει πάντα δωρεάν για όλους τους χρήστες
          </p>
        </div>
      </CardContent>
    </Card>
  );
}