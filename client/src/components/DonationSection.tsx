import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Coffee, Laptop, Euro } from "lucide-react";
import PayPalButton from "./PayPalButton";
import { useTranslation, useLanguage } from "@/lib/i18n";

export function DonationSection() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [customAmount, setCustomAmount] = useState("");

  const donationOptions = [
    {
      amount: "3.50",
      label: "Καφές",
      icon: <Coffee className="w-5 h-5" />,
      title: t("buyMeCoffee"),
      description: t("forTheCreator"),
    },
    {
      amount: "7.00",
      label: "Στήριξη",
      icon: <Heart className="w-5 h-5" />,
      title: t("supportDevelopment"),
      description: t("supportTheProject"),
    },
    {
      amount: "15.00",
      label: "Ανάπτυξη",
      icon: <Laptop className="w-5 h-5" />,
      title: t("boostDevelopment"),
      description: t("helpDevelopment"),
    },
  ];

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-md">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="flex justify-center items-center mb-3">
            <Heart className="w-6 h-6 text-red-500 mr-2" />
            <h3 className="text-xl font-semibold text-gray-800">{t("supportProject")}</h3>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 inline-block">
            <p className="text-green-700 font-medium text-sm">
              🆓 {t("freeForAll")} - {t("noHiddenCharges")}
            </p>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed">
            {t("donationDescription")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          {donationOptions.map((option) => (
            <div
              key={option.amount}
              className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors flex flex-col h-full"
            >
              <div className="text-center flex-1 flex flex-col">
                <div className="flex justify-center text-blue-600 mb-2">{option.icon}</div>
                <h4 className="font-semibold text-gray-800 mb-1">{option.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                <div className="text-lg font-bold text-blue-600 mb-3 flex-1 flex items-center justify-center">
                  €{option.amount}
                </div>
                <PayPalButton
                  amount={option.amount}
                  currency="EUR"
                  donationLabel={option.label}
                />
              </div>
            </div>
          ))}

          <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors flex flex-col h-full">
            <div className="text-center flex-1 flex flex-col">
              <div className="flex justify-center text-blue-600 mb-2">
                <Euro className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">
                {language === "el" ? "Προσαρμοσμένο" : "Custom"}
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                {language === "el" ? "Εισάγετε ποσό" : "Enter amount"}
              </p>
              <div className="flex items-center border border-gray-300 rounded-md mb-2 mx-auto w-full max-w-[140px] overflow-hidden">
                <span className="px-2 text-gray-500 text-sm bg-gray-50 border-r border-gray-300">€</span>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder={language === "el" ? "0,00" : "0.00"}
                  className="w-full py-1.5 px-2 text-sm text-center focus:outline-none"
                />
              </div>
              <PayPalButton amount="custom" customAmount={customAmount} currency="EUR" donationLabel="Δωρεά" />
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            {language === "el"
              ? "Οι δωρεές επεξεργάζονται με ασφάλεια μέσω PayPal • Η πλατφόρμα παραμένει πάντα δωρεάν για όλους τους χρήστες"
              : "Donations processed securely via PayPal • Platform remains always free for all users"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
