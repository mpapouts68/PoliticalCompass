import { Card, CardContent } from "@/components/ui/card";
import { Heart, Coffee, Laptop, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DonationSection() {
  const handleDonationClick = (amount: string) => {
    // For now, open PayPal directly with a donation link
    // This can be replaced with the PayPal SDK integration once credentials are configured
    const paypalUrl = `https://www.paypal.com/donate/?hosted_button_id=YOUR_BUTTON_ID&amount=${amount}&currency_code=EUR`;
    window.open(paypalUrl, '_blank');
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
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {donationOptions.map((option) => (
            <div key={option.amount} className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors">
              <div className="text-center">
                <div className="flex justify-center text-blue-600 mb-2">
                  {option.icon}
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">{option.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                <div className="text-lg font-bold text-blue-600 mb-3">€{option.amount}</div>
                <Button 
                  onClick={() => handleDonationClick(option.amount)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  size="sm"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Δωρεά €{option.amount}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          ))}
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