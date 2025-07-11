import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'el' | 'en';

interface LanguageStore {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguage = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'el' as Language,
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'ideologos-language',
    }
  )
);

export const translations = {
  el: {
    // App title and branding
    appTitle: 'Ιδεολόγος',
    appSubtitle: 'Μάθε ποιος είσαι πολιτικά',
    appDescription: 'Ανακάλυψε ποιο κόμμα ταιριάζει στις πολιτικές σου απόψεις',
    
    // Navigation and general
    home: 'Αρχική',
    results: 'Αποτελέσματα',
    dashboard: 'Dashboard',
    backToHome: 'Επιστροφή στην Αρχική',
    loading: 'Φόρτωση...',
    error: 'Σφάλμα',
    
    // Survey questions and interface
    surveyLength: 'με 15 έως 100 ερωτήσεις',
    quickTest: 'Γρήγορο Τεστ',
    standardTest: 'Κανονικό Τεστ',
    detailedTest: 'Αναλυτικό Τεστ',
    completeTest: 'Πλήρες Τεστ',
    questions: 'ερωτήσεις',
    
    // Answer options
    stronglyDisagree: 'Διαφωνώ Απόλυτα',
    disagree: 'Διαφωνώ',
    neutral: 'Ουδέτερος',
    agree: 'Συμφωνώ',
    stronglyAgree: 'Συμφωνώ Απόλυτα',
    
    // Results screen
    yourResults: 'Τα Αποτελέσματά σου',
    partyAlignment: 'Συμβατότητα με Κόμματα',
    politicalCompass: 'Πολιτικός Πυξίδα',
    showPercentages: 'Δείξε Ποσοστά',
    showCompass: 'Δείξε Πυξίδα',
    shareResults: 'Μοίρασε τα Αποτελέσματα',
    continueWithMore: 'Συνέχισε με περισσότερες ερωτήσεις',
    restartSurvey: 'Ξεκίνα από την Αρχή',
    calculateResults: 'Υπολογισμός αποτελεσμάτων...',
    errorLoadingResults: 'Σφάλμα κατά τη φόρτωση των αποτελεσμάτων',
    
    // Social sharing
    shareOnTwitter: 'Μοιράσου στο Twitter',
    shareOnFacebook: 'Μοιράσου στο Facebook',
    copyToClipboard: 'Αντιγραφή',
    shareNatively: 'Μοιράσου',
    shareText: 'Έκανα το τεστ στο Ιδεολόγος και το αποτέλεσμά μου είναι:',
    
    // Donations
    supportProject: 'Στηρίξτε το Έργο',
    donationDescription: 'Το Ιδεολόγος είναι δωρεάν για όλους τους χρήστες. Στηρίξτε την ανάπτυξη νέων χαρακτηριστικών.',
    buyMeCoffee: 'Ένα Καφέ',
    supportDevelopment: 'Στήριξη',
    boostDevelopment: 'Ενίσχυση Ανάπτυξης',
    freeForAll: 'Δωρεάν για όλους τους χρήστες',
    
    // Election dashboard
    electionDashboard: 'Dashboard Εκλογών',
    liveResults: 'Ζωντανά Αποτελέσματα',
    totalVotes: 'Συνολικές Ψήφοι',
    recentResults: 'Πρόσφατα Αποτελέσματα από Χρήστες',
    
    // Compass axes
    economicLeft: 'Οικονομική Αριστερά',
    economicRight: 'Οικονομική Δεξιά',
    authoritarian: 'Αυταρχικός',
    libertarian: 'Φιλελεύθερος',
    
    // Parties (keep Greek names but add descriptions)
    parties: {
      'ΝΔ': 'Νέα Δημοκρατία',
      'ΣΥΡΙΖΑ': 'ΣΥΡΙΖΑ - Προοδευτική Συμμαχία',
      'ΠΑΣΟΚ': 'ΠΑΣΟΚ - Κίνημα Αλλαγής',
      'ΚΚΕ': 'Κομμουνιστικό Κόμμα Ελλάδας',
      'ΕΛ': 'Ελληνική Λύση',
      'Πλεύση Ελευθερίας': 'Πλεύση Ελευθερίας',
      'Νίκη': 'Νίκη',
      'Σπαρτιάτες': 'Σπαρτιάτες',
      'ΝΑ': 'Νέα Αριστερά'
    }
  },
  en: {
    // App title and branding
    appTitle: 'Ideologos',
    appSubtitle: 'Discover Your Political Identity',
    appDescription: 'Find out which Greek political party matches your views',
    
    // Navigation and general
    home: 'Home',
    results: 'Results',
    dashboard: 'Dashboard',
    backToHome: 'Back to Home',
    loading: 'Loading...',
    error: 'Error',
    
    // Survey questions and interface
    surveyLength: 'with 15 to 100 questions',
    quickTest: 'Quick Test',
    standardTest: 'Standard Test',
    detailedTest: 'Detailed Test',
    completeTest: 'Complete Test',
    questions: 'questions',
    
    // Answer options
    stronglyDisagree: 'Strongly Disagree',
    disagree: 'Disagree',
    neutral: 'Neutral',
    agree: 'Agree',
    stronglyAgree: 'Strongly Agree',
    
    // Results screen
    yourResults: 'Your Results',
    partyAlignment: 'Party Alignment',
    politicalCompass: 'Political Compass',
    showPercentages: 'Show Percentages',
    showCompass: 'Show Compass',
    shareResults: 'Share Results',
    continueWithMore: 'Continue with More Questions',
    restartSurvey: 'Start Over',
    calculateResults: 'Calculating results...',
    errorLoadingResults: 'Error loading results',
    
    // Social sharing
    shareOnTwitter: 'Share on Twitter',
    shareOnFacebook: 'Share on Facebook',
    copyToClipboard: 'Copy to Clipboard',
    shareNatively: 'Share',
    shareText: 'I took the test on Ideologos and my result is:',
    
    // Donations
    supportProject: 'Support the Project',
    donationDescription: 'Ideologos is free for all users. Support the development of new features.',
    buyMeCoffee: 'Buy Me a Coffee',
    supportDevelopment: 'Support Development',
    boostDevelopment: 'Boost Development',
    freeForAll: 'Free for all users',
    
    // Election dashboard
    electionDashboard: 'Election Dashboard',
    liveResults: 'Live Results',
    totalVotes: 'Total Votes',
    recentResults: 'Recent User Results',
    
    // Compass axes
    economicLeft: 'Economic Left',
    economicRight: 'Economic Right',
    authoritarian: 'Authoritarian',
    libertarian: 'Libertarian',
    
    // Parties (English descriptions)
    parties: {
      'ΝΔ': 'New Democracy (ND)',
      'ΣΥΡΙΖΑ': 'SYRIZA - Progressive Alliance',
      'ΠΑΣΟΚ': 'PASOK - Movement for Change',
      'ΚΚΕ': 'Communist Party of Greece (KKE)',
      'ΕΛ': 'Greek Solution (EL)',
      'Πλεύση Ελευθερίας': 'Course of Freedom',
      'Νίκη': 'Victory (Niki)',
      'Σπαρτιάτες': 'Spartans',
      'ΝΑ': 'New Left (NA)'
    }
  }
};

export function useTranslation() {
  const language = useLanguage((state) => state.language);
  
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to Greek if key not found in English
        value = translations.el;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return key if not found
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };
  
  return { t, language };
}