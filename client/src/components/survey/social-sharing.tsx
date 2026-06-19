import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Share2, Twitter, Facebook, Copy, Check } from 'lucide-react';
import { SurveyResult, Party } from '@shared/schema';
import { useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { SITE_URL } from '@/config/site';

interface SocialSharingProps {
  result: SurveyResult;
  parties: Party[];
  topParty: Party;
  questionCount: string;
}

export function SocialSharing({ result, parties, topParty, questionCount }: SocialSharingProps) {
  const [copied, setCopied] = useState(false);
  const { t, language } = useTranslation();

  // Find the top party percentage from the result
  const topPartyResult = result.partyAlignments[topParty.shortName];
  const topPercentage = Math.round(topPartyResult || 0);
  
  // Generate sharing text
  const shareText = language === 'el'
    ? `Ολοκλήρωσα το πολιτικό τεστ στο Ιδεολόγος! Η κορυφαία μου συμφωνία είναι με ${topParty.name} (${topPercentage}%). Δες και εσύ ποιος είσαι πολιτικά!`
    : `I completed the political test on Ideologos! My top alignment is with ${t(`parties.${topParty.shortName}`)} (${topPercentage}%). Discover your political identity too!`;
  
  const shareUrl = SITE_URL;
  const hashtags = language === 'el' 
    ? '#Ιδεολόγος #ΠολιτικόΤεστ #ΕλληνικήΠολιτική'
    : '#Ideologos #PoliticalTest #GreekPolitics';

  // Social media URLs
  const hashtagsEncoded = language === 'el' 
    ? 'Ιδεολόγος,ΠολιτικόΤεστ,ΕλληνικήΠολιτική'
    : 'Ideologos,PoliticalTest,GreekPolitics';
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent(hashtagsEncoded)}`;
  
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  const handleCopyLink = async () => {
    const fullShareText = `${shareText}\n\n${shareUrl}\n\n${hashtags}`;
    
    try {
      await navigator.clipboard.writeText(fullShareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = fullShareText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Ιδεολόγος - Πολιτικό Τεστ',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled sharing or share failed
        console.log('Share cancelled');
      }
    }
  };

  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Share2 className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">{t('shareResults')}</h3>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          {language === 'el' 
            ? 'Δες τι λένε οι φίλοι σου για τα πολιτικά τους πιστεύω!'
            : 'See what your friends say about their political beliefs!'}
        </p>

        <div className="space-y-3">
          {/* Native sharing (mobile) */}
          {navigator.share && (
            <Button
              onClick={handleNativeShare}
              variant="outline"
              className="w-full justify-start gap-3"
            >
              <Share2 className="w-4 h-4" />
              {language === 'el' ? 'Μοιράσου' : 'Share'}
            </Button>
          )}

          {/* Twitter */}
          <Button
            onClick={() => {
              console.log("Opening Twitter:", twitterUrl);
              const popup = window.open(twitterUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
              if (!popup) {
                alert('Popup blocked! Please allow popups and try again.');
              }
            }}
            variant="outline"
            className="w-full justify-start gap-3 hover:bg-blue-50 hover:border-blue-200"
          >
            <Twitter className="w-4 h-4 text-blue-500" />
            {language === 'el' ? 'Μοιράσου στο Twitter' : 'Share on Twitter'}
          </Button>

          {/* Facebook */}
          <Button
            onClick={() => {
              console.log("Opening Facebook:", facebookUrl);
              const popup = window.open(facebookUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
              if (!popup) {
                alert('Popup blocked! Please allow popups and try again.');
              } else {
                // Copy text to clipboard
                const tempText = `${shareText}\n\n${shareUrl}\n\n${hashtags}`;
                navigator.clipboard.writeText(tempText).then(() => {
                  setTimeout(() => {
                    alert('Facebook opened! Text copied to clipboard - paste it in your Facebook post.');
                  }, 1000);
                }).catch(() => {
                  setTimeout(() => {
                    alert('Facebook opened! Copy this text:\n\n' + tempText);
                  }, 1000);
                });
              }
            }}
            variant="outline"
            className="w-full justify-start gap-3 hover:bg-blue-50 hover:border-blue-200"
          >
            <Facebook className="w-4 h-4 text-blue-600" />
            {language === 'el' ? 'Μοιράσου στο Facebook' : 'Share on Facebook'}
          </Button>

          {/* Copy Link */}
          <Button
            onClick={handleCopyLink}
            variant="outline"
            className="w-full justify-start gap-3"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                {language === 'el' ? 'Αντιγράφηκε!' : 'Copied!'}
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                {language === 'el' ? 'Αντιγραφή κειμένου' : 'Copy text'}
              </>
            )}
          </Button>
        </div>

        {/* Preview of share text */}
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">
            {language === 'el' ? 'Προεπισκόπηση κειμένου:' : 'Text preview:'}
          </p>
          <p className="text-sm font-medium">{shareText}</p>
          <p className="text-xs text-muted-foreground mt-1">{hashtags}</p>
        </div>
      </CardContent>
    </Card>
  );
}