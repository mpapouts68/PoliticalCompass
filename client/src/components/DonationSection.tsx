import { Card, CardContent } from "@/components/ui/card";
import { Heart, Coffee, Laptop, ExternalLink, Euro } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import PayPalButton from "./PayPalButton";
import { useTranslation } from "@/lib/i18n";

export function DonationSection() {
  const [customAmount, setCustomAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleSelectAmount = (amount: string) => {
    setSelectedAmount(amount);
  };

  const handleSelectCustomAmount = () => {
    const amount = parseFloat(customAmount);
    if (amount && amount > 0) {
      setSelectedAmount(amount.toFixed(2));
    }
  };

  const donationOptions = [
    {
      amount: "3.50",
      icon: <Coffee className="w-5 h-5" />,
      title: t('buyMeCoffee'),
      description: t('language') === 'el' ? "Για τον δημιουργό" : "For the creator"
    },
    {
      amount: "7.00", 
      icon: <Heart className="w-5 h-5" />,
      title: t('supportDevelopment'),
      description: t('language') === 'el' ? "Υποστήριξη του έργου" : "Support the project"
    },
    {
      amount: "15.00",
      icon: <Laptop className="w-5 h-5" />,
      title: t('boostDevelopment'),
      description: t('language') === 'el' ? "Βοήθεια στην ανάπτυξη" : "Help development"
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-md">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="flex justify-center items-center mb-3">
            <Heart className="w-6 h-6 text-red-500 mr-2" />
            <h3 className="text-xl font-semibold text-gray-800">
              {t('supportProject')}
            </h3>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 inline-block">
            <p className="text-green-700 font-medium text-sm">
              🆓 {t('freeForAll')} - {t('language') === 'el' ? 'Χωρίς κρυφές χρεώσεις' : 'No hidden charges'}
            </p>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed">
            {t('donationDescription')}
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
                {selectedAmount === option.amount ? (
                  <div className="w-full">
                    <PayPalButton 
                      amount={option.amount}
                      currency="EUR"
                      intent="CAPTURE"
                    />
                  </div>
                ) : (
                  <Button 
                    onClick={() => handleSelectAmount(option.amount)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-auto"
                    size="sm"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    {t('language') === 'el' ? `Δωρεά €${option.amount}` : `Donate €${option.amount}`}
                  </Button>
                )}
              </div>
            </div>
          ))}
          
          {/* Custom Amount Option */}
          <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors flex flex-col h-full">
            <div className="text-center flex-1 flex flex-col">
              <div className="flex justify-center text-blue-600 mb-2">
                <Euro className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">
                {t('language') === 'el' ? 'Προσαρμοσμένο' : 'Custom'}
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                {t('language') === 'el' ? 'Δικό σας ποσό' : 'Your amount'}
              </p>
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
              {selectedAmount === customAmount && customAmount ? (
                <div className="w-full">
                  <PayPalButton 
                    amount={customAmount}
                    currency="EUR"
                    intent="CAPTURE"
                  />
                </div>
              ) : (
                <Button 
                  onClick={handleSelectCustomAmount}
                  disabled={!customAmount || parseFloat(customAmount) <= 0}
                  className="w-full bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-300 mt-auto"
                  size="sm"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  {t('language') === 'el' ? 'Δωρεά' : 'Donate'}
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-gray-500">
            {t('language') === 'el' 
              ? 'Οι δωρεές επεξεργάζονται με ασφάλεια μέσω PayPal • Η πλατφόρμα παραμένει πάντα δωρεάν για όλους τους χρήστες'
              : 'Donations processed securely via PayPal • Platform remains always free for all users'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}