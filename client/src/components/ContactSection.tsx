import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle, Github, Twitter, Globe, Users, Shield, Info } from 'lucide-react';
import { useTranslation, useLanguage } from '@/lib/i18n';

export function ContactSection() {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const contactMethods = [
    {
      icon: Mail,
      label: language === 'el' ? 'Email' : 'Email',
      value: 'info@ideologos.online',
      href: 'mailto:info@ideologos.online',
      description: language === 'el' 
        ? 'Για γενικές ερωτήσεις και υποστήριξη'
        : 'For general inquiries and support'
    },
    {
      icon: MessageCircle,
      label: language === 'el' ? 'Τεχνική Υποστήριξη' : 'Technical Support',
      value: 'support@ideologos.online', 
      href: 'mailto:support@ideologos.online',
      description: language === 'el'
        ? 'Για τεχνικά προβλήματα και σφάλματα'
        : 'For technical issues and bug reports'
    },
    {
      icon: Users,
      label: language === 'el' ? 'Συνεργασίες' : 'Partnerships',
      value: 'partnerships@ideologos.online',
      href: 'mailto:partnerships@ideologos.online', 
      description: language === 'el'
        ? 'Για ακαδημαϊκές συνεργασίες και ερευνητικά έργα'
        : 'For academic collaborations and research projects'
    }
  ];

  const socialLinks = [
    {
      icon: Twitter,
      label: 'Twitter',
      href: 'https://twitter.com/ideologos_gr',
      color: 'text-blue-500 hover:text-blue-600'
    },
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/ideologos-project',
      color: 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Info className="w-5 h-5" />
            {t('contactInformation')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {contactMethods.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Icon className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900 dark:text-white">{contact.label}</span>
                  </div>
                  <a 
                    href={contact.href}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  >
                    {contact.value}
                  </a>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {contact.description}
                  </p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Social Media & Updates */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Globe className="w-5 h-5" />
            {t('language') === 'el' ? 'Κοινωνικά Δίκτυα' : 'Social Media & Updates'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  asChild
                  className="flex items-center gap-2"
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    <Icon className={`w-4 h-4 ${social.color}`} />
                    {social.label}
                  </a>
                </Button>
              );
            })}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('language') === 'el'
              ? 'Ακολουθήστε μας για ενημερώσεις, νέα χαρακτηριστικά και πολιτικές αναλύσεις.'
              : 'Follow us for updates, new features, and political analysis.'}
          </p>
        </CardContent>
      </Card>

      {/* Privacy & Data */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Shield className="w-5 h-5" />
            {t('language') === 'el' ? 'Προστασία Δεδομένων' : 'Privacy & Data Protection'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <p>
              {t('language') === 'el'
                ? '• Δεν αποθηκεύουμε προσωπικά δεδομένα των χρηστών'
                : '• We do not store users\' personal data'}
            </p>
            <p>
              {t('language') === 'el'
                ? '• Οι απαντήσεις στο τεστ είναι ανώνυμες'
                : '• Survey responses are completely anonymous'}
            </p>
            <p>
              {t('language') === 'el'
                ? '• Χρησιμοποιούμε τα δεδομένα μόνο για στατιστικούς σκοπούς'
                : '• Data is used only for statistical purposes'}
            </p>
            <p>
              {t('language') === 'el'
                ? '• Πλήρης συμμόρφωση με τον GDPR'
                : '• Full GDPR compliance'}
            </p>
          </div>
          <div className="pt-2">
            <Button variant="outline" size="sm" asChild>
              <a href="mailto:privacy@ideologos.online">
                {t('language') === 'el' ? 'Ερωτήσεις Απορρήτου' : 'Privacy Questions'}
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* About the Project */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
            {t('language') === 'el' ? 'Σχετικά με το Έργο' : 'About the Project'}
          </h3>
          <p className="text-sm text-blue-800 dark:text-blue-300">
            {t('language') === 'el'
              ? 'Το Ιδεολόγος είναι ένα ανεξάρτητο, μη-κερδοσκοπικό εργαλείο που στοχεύει στην πολιτική εκπαίδευση και ενημέρωση των πολιτών. Δημιουργήθηκε από ερευνητές και προγραμματιστές με σκοπό την ενίσχυση της δημοκρατικής συμμετοχής.'
              : 'Ideologos is an independent, non-profit tool aimed at political education and citizen awareness. Created by researchers and developers to enhance democratic participation.'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}