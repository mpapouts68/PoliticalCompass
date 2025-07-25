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
    
    // Ideology Test
    ideologyTest: 'Ιδεολογικό Τεστ',
    ideologyTestDescription: 'Ανακαλύψτε την πολιτική σας θέση στο φάσμα αριστερά-κέντρο-δεξιά',
    ideologyResults: 'Αποτελέσματα Ιδεολογικού Τεστ',
    yourPoliticalPosition: 'Η πολιτική σας θέση στο φάσμα αριστερά-κέντρο-δεξιά',
    loadingQuestions: 'Φόρτωση ερωτήσεων...',
    calculatingResults: 'Υπολογισμός αποτελεσμάτων...',
    errorLoadingQuestions: 'Σφάλμα φόρτωσης ερωτήσεων',
    score: 'Βαθμολογία:',
    from: 'από',
    to: 'έως',
    left: 'Αριστερά',
    center: 'Κέντρο',
    right: 'Δεξιά',
    description: 'Περιγραφή',
    characteristics: 'Χαρακτηριστικά',
    homePage: 'Αρχική Σελίδα',
    partyAlignmentTest: 'Τεστ Κομματικής Ταύτισης',
    question: 'Ερώτηση',
    of: 'από',
    category: 'Κατηγορία:',
    progress: 'Πρόοδος',
    autoAdvanceMessage: 'Η επόμενη ερώτηση θα εμφανιστεί αυτόματα μετά την επιλογή σας',
    savingAnswer: 'Αποθήκευση απάντησης...',
    
    // Contact and Statistics
    contactInformation: 'Επικοινωνία',
    participants: 'συμμετοχές',
    updatingLive: 'Ενημερώνεται ζωντανά',
    resultsBasedOn: 'Τα αποτελέσματα βασίζονται σε',
    completedTests: 'ολοκληρωμένα τεστ',
    tests: 'τεστ',
    ideologyResultsBasedOn: 'Βασισμένο σε',
    completedIdeologyTests: 'ολοκληρωμένα ιδεολογικά τεστ',
    chooseQuestionCount: 'Επιλέξτε αριθμό ερωτήσεων',
    selectQuestionCount: 'Επιλέξτε τον αριθμό ερωτήσεων για να ξεκινήσει αυτόματα το τεστ',
    educationalDisclaimer: 'Αυτό το εργαλείο έχει εκπαιδευτικό χαρακτήρα και βοηθά στην κατανόηση των πολιτικών θέσεων. Δεν αντικαθιστά την προσωπική έρευνα και κρίση.',
    partyAlignmentDescription: 'Ανακαλύψτε ποιο κόμμα ταιριάζει περισσότερο στις απόψεις σας',
    
    // Contact Section
    socialMedia: 'Κοινωνικά Δίκτυα',
    privacyDataProtection: 'Προστασία Δεδομένων',
    aboutProject: 'Σχετικά με το Έργο',
    followForUpdates: 'Ακολουθήστε μας για ενημερώσεις, νέα χαρακτηριστικά και πολιτικές αναλύσεις.',
    noPersonalData: 'Δεν αποθηκεύουμε προσωπικά δεδομένα των χρηστών',
    anonymousResponses: 'Οι απαντήσεις στο τεστ είναι ανώνυμες',
    statisticalUseOnly: 'Χρησιμοποιούμε τα δεδομένα μόνο για στατιστικούς σκοπούς',
    gdprCompliance: 'Πλήρης συμμόρφωση με τον GDPR',
    privacyQuestions: 'Ερωτήσεις Απορρήτου',
    aboutProjectDescription: 'Το Ιδεολόγος είναι ένα ανεξάρτητο, μη-κερδοσκοπικό εργαλείο που στοχεύει στην πολιτική εκπαίδευση και ενημέρωση των πολιτών. Δημιουργήθηκε από ερευνητές και προγραμματιστές με σκοπό την ενίσχυση της δημοκρατικής συμμετοχής.',
    
    // Knowledge Challenge
    knowledgeChallenge: 'Κουίζ Γνώσεων',
    noQuestionsAvailable: 'Δεν υπάρχουν διαθέσιμες ερωτήσεις',
    difficulty: 'Δυσκολία',
    correct: 'Σωστό!',
    incorrect: 'Λάθος',
    submitAnswer: 'Υποβολή Απάντησης',
    nextQuestion: 'Επόμενη Ερώτηση',
    finishQuiz: 'Τέλος Κουίζ',
    
    // Prime Minister Scenario
    primeMinisterForADay: 'Πρωθυπουργός για μια Μέρα',
    loadingScenario: 'Φόρτωση σεναρίου...',
    noScenariosAvailable: 'Δεν υπάρχουν διαθέσιμα σενάρια',
    urgentScenario: 'ΕΠΕΙΓΟΝ ΣΕΝΑΡΙΟ',
    timeLimit2Minutes: 'Έχετε 2 λεπτά για να αποφασίσετε!',
    context: 'Πλαίσιο',
    yourOptions: 'Οι Επιλογές σας',
    political: 'Πολιτικό Κόστος',
    economic: 'Οικονομικός Αντίκτυπος',
    social: 'Κοινωνικός Αντίκτυπος',
    partySupport: 'Κομματική Στήριξη',
    makeDecision: 'Λήψη Απόφασης',
    submittingDecision: 'Υποβολή Απόφασης...',
    
    // Gamification - Additional translations
    newFeatures: 'Νέα Χαρακτηριστικά',
    testYourKnowledge: 'Δοκιμάστε τις γνώσεις σας στην ελληνική πολιτική ιστορία, το Σύνταγμα και τα κόμματα',
    takeOnDecisions: 'Αναλάβετε δύσκολες αποφάσεις διακυβέρνησης και δείτε τις συνέπειες των επιλογών σας',
    history: 'Ιστορία',
    constitution: 'Σύνταγμα',
    parties: 'Κόμματα',
    economy: 'Οικονομία',
    society: 'Κοινωνία',
    crises: 'Κρίσεις',
    
    // Difficulty levels
    easy: 'Εύκολο',
    medium: 'Μέτριο', 
    hard: 'Δύσκολο',
    basicPoliticalHistory: 'Βασικές γνώσεις πολιτικής ιστορίας',
    intermediateKnowledge: 'Ενδιάμεσες γνώσεις και λεπτομέρειες',
    specializedKnowledge: 'Εξειδικευμένες γνώσεις και ιστορικά γεγονότα',
    basicGovernance: 'Βασικά ζητήματα διακυβέρνησης',
    complexDilemmas: 'Σύνθετα πολιτικά διλήμματα',
    urgentCrises: 'Επείγουσες εθνικές κρίσεις',
    exampleEnvironmental: 'π.χ. περιβαλλοντικές κρίσεις',
    exampleEconomicSocial: 'π.χ. οικονομικές και κοινωνικές κρίσεις',
    exampleForeignPolicy: 'π.χ. εξωτερική πολιτική με χρονικό όριο',
    
    // Grades and feedback
    excellent: 'Άριστα',
    veryGood: 'Πολύ Καλά',
    good: 'Καλά',
    fair: 'Μέτρια',
    poor: 'Αδύναμα',
    outstandingKnowledge: 'Εξαιρετική γνώση της ελληνικής πολιτικής!',
    veryGoodKnowledge: 'Πολύ καλή γνώση, μπράβο!',
    goodFoundation: 'Καλή βάση, συνέχισε να μελετάς!',
    needsMoreStudy: 'Χρειάζεται περισσότερη μελέτη.',
    significantImprovement: 'Χρειάζεται σημαντική βελτίωση.',
    
    // Decision ratings
    excellentDecision: 'Εξαιρετική Απόφαση',
    goodDecision: 'Καλή Απόφαση',
    fairDecision: 'Μέτρια Απόφαση',
    difficultDecision: 'Δύσκολη Απόφαση',
    
    // Quiz and PM interface
    quizResults: 'Αποτελέσματα Κουίζ',
    decisionResults: 'Αποτελέσματα Απόφασης',
    correctAnswers: 'Σωστές',
    totalQuestions: 'Συνολικές', 
    accuracyPercent: 'Επιτυχία',
    tryAgain: 'Δοκίμασε Ξανά',
    newScenario: 'Νέο Σενάριο',
    startQuiz: 'Ξεκινήστε το Κουίζ',
    startScenario: 'Ξεκινήστε το Σενάριο',
    selectDifficultyLevel: 'Επιλέξτε Επίπεδο Δυσκολίας',
    selectNumberOfQuestions: 'Επιλέξτε Αριθμό Ερωτήσεων',
    minutesShort: 'λεπτά',
    minAbbrev: 'λεπτά',
    decisionTime: 'Χρόνος απόφασης:',
    secondsUnit: 'δευτερόλεπτα',
    yourDecision: 'Η Απόφασή σας:',
    consequencesLabel: 'Συνέπειες:',
    
    // PM Information sections
    politicalCostDescription: 'Πόσο δύσκολη είναι πολιτικά η απόφαση',
    economicImpactDescription: 'Θετικός ή αρνητικός αντίκτυπος στην οικονομία',
    socialImpactDescription: 'Επίδραση στην κοινωνία και τους πολίτες',
    
    // Donation section
    forTheCreator: 'Για τον δημιουργό',
    supportTheProject: 'Υποστήριξη του έργου',
    helpDevelopment: 'Βοήθεια στην ανάπτυξη',
    noHiddenCharges: 'Χωρίς κρυφές χρεώσεις',

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
    
    // Knowledge Challenge
    knowledgeChallenge: 'Knowledge Challenge',
    noQuestionsAvailable: 'No questions available',
    difficulty: 'Difficulty',
    correct: 'Correct!',
    incorrect: 'Incorrect',
    submitAnswer: 'Submit Answer',
    nextQuestion: 'Next Question',
    finishQuiz: 'Finish Quiz',
    
    // Prime Minister Scenario
    primeMinisterForADay: 'Prime Minister for a Day',
    loadingScenario: 'Loading scenario...',
    noScenariosAvailable: 'No scenarios available',
    urgentScenario: 'URGENT SCENARIO',
    timeLimit2Minutes: 'You have 2 minutes to decide!',
    context: 'Context',
    yourOptions: 'Your Options',
    political: 'Political Cost',
    economic: 'Economic Impact',
    social: 'Social Impact',
    partySupport: 'Party Support',
    makeDecision: 'Make Decision',
    submittingDecision: 'Submitting Decision...',
    questions: 'questions',
    
    // Gamification - Additional translations
    newFeatures: 'New Features',
    testYourKnowledge: 'Test your knowledge of Greek political history, Constitution and parties',
    takeOnDecisions: 'Take on difficult governance decisions and see the consequences of your choices',
    history: 'History',
    constitution: 'Constitution',
    parties: 'Parties',
    economy: 'Economy',
    society: 'Society',
    crises: 'Crises',
    
    // Difficulty levels
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    basicPoliticalHistory: 'Basic political history knowledge',
    intermediateKnowledge: 'Intermediate knowledge and details',
    specializedKnowledge: 'Specialized knowledge and historical events',
    basicGovernance: 'Basic governance issues',
    complexDilemmas: 'Complex political dilemmas',
    urgentCrises: 'Urgent national crises',
    exampleEnvironmental: 'e.g. environmental crises',
    exampleEconomicSocial: 'e.g. economic and social crises',
    exampleForeignPolicy: 'e.g. foreign policy with time limits',
    
    // Grades and feedback
    excellent: 'Excellent',
    veryGood: 'Very Good',
    good: 'Good',
    fair: 'Fair',
    poor: 'Poor',
    outstandingKnowledge: 'Outstanding knowledge of Greek politics!',
    veryGoodKnowledge: 'Very good knowledge, well done!',
    goodFoundation: 'Good foundation, keep studying!',
    needsMoreStudy: 'Needs more study.',
    significantImprovement: 'Significant improvement needed.',
    
    // Decision ratings
    excellentDecision: 'Excellent Decision',
    goodDecision: 'Good Decision',
    fairDecision: 'Fair Decision',
    difficultDecision: 'Difficult Decision',
    
    // Quiz and PM interface
    quizResults: 'Quiz Results',
    decisionResults: 'Decision Results',
    correctAnswers: 'Correct',
    totalQuestions: 'Total',
    accuracyPercent: 'Accuracy',
    tryAgain: 'Try Again',
    newScenario: 'New Scenario',
    startQuiz: 'Start Quiz',
    startScenario: 'Start Scenario',
    selectDifficultyLevel: 'Select Difficulty Level',
    selectNumberOfQuestions: 'Select Number of Questions',
    minutesShort: 'minutes',
    minAbbrev: 'min',
    decisionTime: 'Decision time:',
    secondsUnit: 'seconds',
    yourDecision: 'Your Decision:',
    consequencesLabel: 'Consequences:',
    
    // PM Information sections
    politicalCostDescription: 'How politically difficult the decision is',
    economicImpactDescription: 'Positive or negative impact on the economy',
    socialImpactDescription: 'Effect on society and citizens',
    
    // Donation section
    forTheCreator: 'For the creator',
    supportTheProject: 'Support the project',
    helpDevelopment: 'Help development',
    noHiddenCharges: 'No hidden charges',
    
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
    
    // Ideology Test
    ideologyTest: 'Ideology Test',
    ideologyTestDescription: 'Discover your political position on the left-center-right spectrum',
    ideologyResults: 'Ideology Test Results',
    yourPoliticalPosition: 'Your political position on the left-center-right spectrum',
    description: 'Description',
    characteristics: 'Characteristics',
    score: 'Score:',
    from: 'from',
    to: 'to',
    left: 'Left',
    center: 'Center',
    right: 'Right',
    homePage: 'Home Page',
    partyAlignmentTest: 'Party Alignment Test',
    calculatingResults: 'Calculating results...',
    loadingQuestions: 'Loading questions...',
    errorLoadingQuestions: 'Error loading questions',
    question: 'Question',
    of: 'of',
    category: 'Category:',
    progress: 'Progress',
    autoAdvanceMessage: 'Next question will appear automatically after your selection',
    savingAnswer: 'Saving answer...',
    
    // Contact and Statistics
    contactInformation: 'Contact Information',
    participants: 'participants',
    updatingLive: 'Updating live',
    resultsBasedOn: 'Results based on',
    completedTests: 'completed tests',
    tests: 'tests',
    ideologyResultsBasedOn: 'Based on',
    completedIdeologyTests: 'completed ideology tests',
    chooseQuestionCount: 'Choose question count',
    selectQuestionCount: 'Select the number of questions to automatically start the test',
    educationalDisclaimer: 'This tool is educational and helps understand political positions. It does not replace personal research and judgment.',
    partyAlignmentDescription: 'Discover which party best matches your views',
    
    // Contact Section
    socialMedia: 'Social Media & Updates',
    privacyDataProtection: 'Privacy & Data Protection',
    aboutProject: 'About the Project',
    followForUpdates: 'Follow us for updates, new features, and political analysis.',
    noPersonalData: 'We do not store users\' personal data',
    anonymousResponses: 'Survey responses are completely anonymous',
    statisticalUseOnly: 'Data is used only for statistical purposes',
    gdprCompliance: 'Full GDPR compliance',
    privacyQuestions: 'Privacy Questions',
    aboutProjectDescription: 'Ideologos is an independent, non-profit tool aimed at political education and citizen awareness. Created by researchers and developers to enhance democratic participation.',
    
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