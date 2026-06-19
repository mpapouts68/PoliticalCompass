import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle, Github, Twitter, Globe, Users, Shield, Info } from 'lucide-react';
import { CONTACT_EMAILS } from "@/config/site";
import { useTranslation, useLanguage } from '@/lib/i18n';

export function ContactSection() {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const contactMethods = [
    {
      icon: Mail,
      label: language === 'el' ? 'Email' : 'Email',
      value: CONTACT_EMAILS.info,
      href: `mailto:${CONTACT_EMAILS.info}`,
      description: language === 'el' 
        ? 'Για γενικές ερωτήσεις και υποστήριξη'
        : 'For general inquiries and support'
    },
    {
      icon: MessageCircle,
      label: language === 'el' ? 'Τεχνική Υποστήριξη' : 'Technical Support',
      value: CONTACT_EMAILS.support,
      href: `mailto:${CONTACT_EMAILS.support}`,
      description: language === 'el'
        ? 'Για τεχνικά προβλήματα και σφάλματα'
        : 'For technical issues and bug reports'
    },
    {
      icon: Users,
      label: language === 'el' ? 'Συνεργασίες' : 'Partnerships',
      value: CONTACT_EMAILS.partnerships,
      href: `mailto:${CONTACT_EMAILS.partnerships}`, 
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
            {t('socialMedia')}
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
            {t('followForUpdates')}
          </p>
        </CardContent>
      </Card>

      {/* Privacy & Data */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Shield className="w-5 h-5" />
            {t('privacyDataProtection')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <p>• {t('noPersonalData')}</p>
            <p>• {t('anonymousResponses')}</p>
            <p>• {t('statisticalUseOnly')}</p>
            <p>• {t('gdprCompliance')}</p>
          </div>
          <div className="pt-2">
            <Button variant="outline" size="sm" asChild>
              <a href={`mailto:${CONTACT_EMAILS.privacy}`}>
                {t('privacyQuestions')}
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* About the Project */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
            {t('aboutProject')}
          </h3>
          <p className="text-sm text-blue-800 dark:text-blue-300">
            {t('aboutProjectDescription')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}