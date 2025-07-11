import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage, type Language } from '@/lib/i18n';
import { Globe } from 'lucide-react';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-gray-600" />
      <div className="flex rounded-lg border bg-white dark:bg-gray-800">
        <Button
          variant={language === 'el' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => handleLanguageChange('el')}
          className="text-xs px-3 py-1 rounded-l-lg rounded-r-none"
        >
          ΕΛ
        </Button>
        <Button
          variant={language === 'en' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => handleLanguageChange('en')}
          className="text-xs px-3 py-1 rounded-r-lg rounded-l-none border-l"
        >
          EN
        </Button>
      </div>
    </div>
  );
}