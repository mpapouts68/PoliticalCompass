import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { sq, type SurveyQuestionSeed } from "./surveyProfiles";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const extra: SurveyQuestionSeed[] = [
  // Οικονομία (9)
  sq("Υποστηρίζετε την εισαγωγή ενιαίας flat tax 15% για εισοδήματα και εταιρικά κέρδη;", "Do you support a flat 15% tax on personal income and corporate profits?", "Οικονομία", "proMarket"),
  sq("Πρέπει να επιβληθεί έκτακτος φόρος στα υπερκέρδη τραπεζών και ενεργειακών εταιρειών;", "Should an extraordinary tax be imposed on bank and energy company windfall profits?", "Οικονομία", "proState"),
  sq("Θα πρέπει να απλοποιηθούν οι συντελεστές ΦΠΑ σε δύο βασικές κατηγορίες (13% και 24%);", "Should VAT rates be simplified to two main brackets (13% and 24%)?", "Οικονομία", "proReform"),
  sq("Υποστηρίζετε περαιτέρω μείωση του φόρου εισοδήματος νομικών προσώπων κάτω από 22%;", "Do you support further reducing the corporate income tax rate below 22%?", "Οικονομία", "proMarket"),
  sq("Πρέπει να καταβληθεί ετήσιο «μέρισμα πολίτη» από υπεραποδόσεις προϋπολογισμού σε όλους τους ενήλικες;", "Should an annual citizen dividend from budget surpluses be paid to all adults?", "Οικονομία", "proWelfare"),
  sq("Θα πρέπει να ιδιωτικοποιηθούν περαιτέρω δημόσιες υποδομές (λιμάνια, αεροδρόμια περιφέρειας);", "Should more public infrastructure (ports, regional airports) be privatized?", "Οικονομία", "proMarket"),
  sq("Πρέπει να επαναφερθεί η κρατική επιχορήγηση για δημόσια ΜΜΕ χωρίς διαφημιστικά κριτήρια;", "Should public media funding be restored without advertising-based criteria?", "Οικονομία", "proState"),
  sq("Υποστηρίζετε υποχρεωτική ηλεκτρονική τιμολόγηση για όλες τις επιχειρήσεις από 2027;", "Do you support mandatory e-invoicing for all businesses from 2027?", "Οικονομία", "proReform"),
  sq("Πρέπει να καταργηθεί ο εισφορά αλληλεγγύης για υψηλότερα εισοδήματα;", "Should the solidarity levy on higher incomes be abolished?", "Οικονομία", "proMarket"),

  // Κοινωνικά (9)
  sq("Υποστηρίζετε τη νομική αναγνώριση ταυτότητας φύλου χωρίς ιατρική παρέμβαση;", "Do you support legal gender recognition without medical intervention?", "Κοινωνικά", "proProgressive"),
  sq("Πρέπει να διατηρηθεί η απαγόρευση υιοθεσίας από ομόφυλα ζευγάρια;", "Should the ban on adoption by same-sex couples be maintained?", "Κοινωνικά", "proTraditional"),
  sq("Θα πρέπει να επιτρέπεται η ευθανασία σε ασθενείς με ανεπίστρεπτες παθήσεις μετά από ιατρική γνωμάτευση;", "Should euthanasia be allowed for patients with irreversible conditions after medical review?", "Κοινωνικά", "proProgressive"),
  sq("Πρέπει να αυξηθεί η κρατική χρηματοδότηση για δομές φροντίδας ηλικιωμένων;", "Should state funding for elder care facilities be increased?", "Κοινωνικά", "proWelfare"),
  sq("Υποστηρίζετε την κατάργηση της υποχρεωτικής στράτευσης μόνο για άνδρες;", "Do you support ending male-only mandatory military service?", "Κοινωνικά", "proProgressive"),
  sq("Πρέπει να ενισχυθεί η νομική προστασία της οικογένειας ως παραδοσιακού θεσμού στο Σύνταγμα;", "Should constitutional protection of the traditional family institution be strengthened?", "Κοινωνικά", "proTraditional"),
  sq("Θα πρέπει να επιτρέπεται η πώληση αλκοόλ σε σούπερ μάρκετ μετά τις 20:00;", "Should alcohol sales in supermarkets be allowed after 8 p.m.?", "Κοινωνικά", "proMarket"),
  sq("Υποστηρίζετε δημόσια χρηματοδότηση για κέντρα ψυχικής υγείας σε κάθε δήμο;", "Do you support public funding for mental health centers in every municipality?", "Κοινωνικά", "proWelfare"),
  sq("Πρέπει να απαγορευτεί η διαφήμιση τυχερών παιχνιδιών σε τηλεόραση και διαδίκτυο;", "Should gambling advertising be banned on television and the internet?", "Κοινωνικά", "proTraditional"),

  // Περιβάλλον (9)
  sq("Πρέπει να απαγορευτούν νέες άδειες εξόρυξης σε Natura 2000 περιοχές;", "Should new mining permits in Natura 2000 areas be banned?", "Περιβάλλον", "proEnvironment"),
  sq("Υποστηρίζετε την επιβολή τέλους πλαστικής σακούλας 0,15€ σε όλα τα καταστήματα;", "Do you support a €0.15 plastic bag fee in all stores?", "Περιβάλλον", "proEnvironment"),
  sq("Θα πρέπει να επιταχυνθεί η απόσυρση θερμοηλεκτρικών μονάδων λιγνίτη πριν το 2028;", "Should lignite power plant retirement be accelerated before 2028?", "Περιβάλλον", "proEnvironment"),
  sq("Πρέπει να επιτρέπονται υδρογοναμικές εγκαταστάσεις σε προστατευόμενες ακτές με αυστηρές προϋποθέσεις;", "Should offshore wind farms be allowed on protected coastlines under strict conditions?", "Περιβάλλον", "proReform"),
  sq("Υποστηρίζετε υποχρεωτική ανακύκλωση οργανικών αποβλήτων σε όλους τους δήμους έως το 2027;", "Do you support mandatory organic waste recycling in all municipalities by 2027?", "Περιβάλλον", "proEnvironment"),
  sq("Πρέπει να μειωθούν οι επιδοτήσεις καυσίμων για αγροτικά μηχανήματα;", "Should fuel subsidies for agricultural machinery be reduced?", "Περιβάλλον", "proEnvironment"),
  sq("Θα πρέπει να επιβληθεί φόρος κυκλοφορίας ανά εκπομπές CO2 αντί για κυβισμό;", "Should road tax be based on CO2 emissions instead of engine displacement?", "Περιβάλλον", "proEnvironment"),
  sq("Υποστηρίζετε την απαγόρευση μίας χρήσης πλαστικού σε εστιατόρια και delivery από 2026;", "Do you support banning single-use plastic in restaurants and delivery from 2026?", "Περιβάλλον", "proEnvironment"),
  sq("Πρέπει να χρηματοδοτηθεί η αποκατάσταση δασών που κάηκαν το 2023-2025 με εθνικό σχέδιο;", "Should burned forests from 2023–2025 be restored through a national plan?", "Περιβάλλον", "proEnvironment"),

  // Άμυνα (9)
  sq("Πρέπει να αυξηθεί ο προϋπολογισμός Άμυνας πάνω από 2% του ΑΕΠ μόνιμα;", "Should the defense budget be permanently raised above 2% of GDP?", "Άμυνα", "proSecurity"),
  sq("Υποστηρίζετε την αγορά επιπλέον F-35 μαχητικών αεροσκαφών;", "Do you support purchasing additional F-35 fighter jets?", "Άμυνα", "proSecurity"),
  sq("Θα πρέπει να ενισχυθεί η εγχώρια παραγωγή στρατιωτικού εξοπλισμού (διαύλους, drones);", "Should domestic military equipment production (naval, drones) be expanded?", "Άμυνα", "proSecurity"),
  sq("Πρέπει να μειωθεί η θητεία στους 9 μήνες για όλους τους στρατεύσιμους;", "Should military service be reduced to 9 months for all conscripts?", "Άμυνα", "proReform"),
  sq("Υποστηρίζετε τη δημιουργία ενός ενιαίου ευρωπαϊκού στρατού με ελληνική συμμετοχή;", "Do you support a unified European army with Greek participation?", "Άμυνα", "proEU"),
  sq("Πρέπει να αποσυρθούν παλαιότερα Leopard 1 από ενεργή υπηρεσία χωρίς άμεση αντικατάσταση;", "Should older Leopard 1 tanks be retired without immediate replacement?", "Άμυνα", "proWelfare"),
  sq("Θα πρέπει να επιτρέπεται η πρόσληψη μόνιμου προσωπικού ΕΔ από γυναίκες σε όλα τα σώματα;", "Should permanent armed forces recruitment be open to women in all branches?", "Άμυνα", "proProgressive"),
  sq("Υποστηρίζετε στρατιωτικές ασκήσεις κοντά στα νησιά του Αιγαίου με αυξημένη συχνότητα;", "Do you support more frequent military exercises near Aegean islands?", "Άμυνα", "proSecurity"),
  sq("Πρέπει να δημιουργηθεί πολιτικός έλεγχος εξαγορών εξοπλισμού από τη Βουλή;", "Should Parliament oversee major arms procurement decisions?", "Άμυνα", "proReform"),

  // Εξωτερική Πολιτική (9)
  sq("Πρέπει η Ελλάδα να αναγνωρίσει επίσημα την Παλαιστίνη ως κράτος;", "Should Greece officially recognize Palestine as a state?", "Εξωτερική Πολιτική", "proProgressive"),
  sq("Υποστηρίζετε την παράταση της Συμφωνίας των Πρεσπών αν η Β. Μακεδονία δεν τηρεί τις υποχρεώσεις;", "Do you support extending the Prespa Agreement only if North Macedonia meets its obligations?", "Εξωτερική Πολιτική", "proSecurity"),
  sq("Θα πρέπει να αυξηθεί η ελληνική βοήθεια στην Ουκρανία με αμυντικό εξοπλισμό;", "Should Greek military aid to Ukraine be increased?", "Εξωτερική Πολιτική", "proEU"),
  sq("Πρέπει να διεκδικηθεί επίσημα η επέκταση των χωρικών υδάτων στα 12 ν.μ. στο Αιγαίο;", "Should Greece officially pursue extending territorial waters to 12 nautical miles in the Aegean?", "Εξωτερική Πολιτική", "proSecurity"),
  sq("Υποστηρίζετε την ένταξη της Κύπρου στην ΕΕ ως ενιαίου κράτους χωρίς τουρκικό βέτο;", "Do you support Cyprus joining the EU as a unified state without a Turkish veto?", "Εξωτερική Πολιτική", "proEU"),
  sq("Πρέπει να μειωθεί η ελληνική στρατιωτική παρουσία στην Αφρική (Σαχέλ);", "Should Greece reduce its military presence in Africa (Sahel)?", "Εξωτερική Πολιτική", "proWelfare"),
  sq("Θα πρέπει να ανοίξουν νέα προξενεία σε χώρες της Ασίας για οικονομική διπλωματία;", "Should new consulates open in Asian countries for economic diplomacy?", "Εξωτερική Πολιτική", "proReform"),
  sq("Υποστηρίζετε εμπάργκο όπλων σε κράτη που παραβιάζουν ανθρώπινα δικαιώματα;", "Do you support arms embargoes on states violating human rights?", "Εξωτερική Πολιτική", "proProgressive"),
  sq("Πρέπει να επαναδιαπραγματευτεί η ελληνική οριοθέτηση ΑΟΖ με την Τουρκία μόνο μέσω Διεθνούς Δικαστηρίου;", "Should Greek–Turkish EEZ delimitation be renegotiated only via the International Court?", "Εξωτερική Πολιτική", "proSecurity"),

  // Εργασία (9)
  sq("Υποστηρίζετε την κατάργηση του υποκατώτατου μισθού (703€) και εφαρμογή μόνο του κατώτατου;", "Do you support abolishing the sub-minimum wage (€703) and applying only the minimum wage?", "Εργασία", "proLabor"),
  sq("Πρέπει να επιτρέπεται η 4ήμερη εργασία 32 ωρών με πλήρη μισθό σε μεγάλες επιχειρήσεις;", "Should a 32-hour four-day workweek with full pay be allowed in large firms?", "Εργασία", "proLabor"),
  sq("Θα πρέπει να ενισχυθεί ο έλεγχος της ERGANI II για αδήλωτη εργασία με πρόστιμα;", "Should ERGANI II undeclared work checks be strengthened with fines?", "Εργασία", "proLabor"),
  sq("Υποστηρίζετε την κατάργηση της δυνατότητας απολύσεων χωρίς αιτιολόγηση σε επιχειρήσεις άνω των 50 ατόμων;", "Do you support ending no-cause dismissals in firms with over 50 employees?", "Εργασία", "proLabor"),
  sq("Πρέπει να μειωθεί η ασφάλιση ελεύθερων επαγγελματιών κατά 20%;", "Should self-employed social security contributions be cut by 20%?", "Εργασία", "proMarket"),
  sq("Θα πρέπει να θεσμοθετηθεί δικαίωμα αποσύνδεσης (right to disconnect) εκτός ωραρίου;", "Should a legal right to disconnect outside working hours be established?", "Εργασία", "proLabor"),
  sq("Υποστηρίζετε κρατική επιδότηση πρόσληψης νέων κάτω των 30 ετών;", "Do you support state hiring subsidies for under-30 workers?", "Εργασία", "proWelfare"),
  sq("Πρέπει να επιτρέπεται η εργασία από απόσταση ως μόνιμη ρύθμιση στο δημόσιο τομέα;", "Should remote work be a permanent option in the public sector?", "Εργασία", "proReform"),
  sq("Θα πρέπει να αυξηθούν οι ποινές για εργατικά ατυχήματα σε οικοδομές;", "Should penalties for construction workplace accidents be increased?", "Εργασία", "proLabor"),

  // Δικαιοσύνη (9)
  sq("Πρέπει να επιλεγούν δικαστές και εισαγγελείς από ανεξάρτητη αρχή αντί για υπουργικό συμβούλιο;", "Should judges and prosecutors be appointed by an independent authority instead of the cabinet?", "Δικαιοσύνη", "proReform"),
  sq("Υποστηρίζετε την αποποινικοποίηση της κατοχής μικρών ποσοτήτων κάνναβης για προσωπική χρήση;", "Do you support decriminalizing possession of small amounts of cannabis for personal use?", "Δικαιοσύνη", "proProgressive"),
  sq("Θα πρέπει να επιβληθούν αυστηρότερες ποινές για διαφθορά δημοσίων λειτουργών;", "Should stricter penalties for public official corruption be imposed?", "Δικαιοσύνη", "proReform"),
  sq("Πρέπει να καταργηθεί ο νόμος περί καθυστέρησης δικαστικών υποθέσεων (ν. 4623/2019) ως προς παραγραφές;", "Should statute-of-limitation rules delaying trials (Law 4623/2019) be repealed?", "Δικαιοσύνη", "proReform"),
  sq("Υποστηρίζετε δημόσια τηλεδίκη για υποθέσεις διαφθοράς πολιτικών προσώπων;", "Do you support public live-streaming of corruption trials involving politicians?", "Δικαιοσύνη", "proProgressive"),
  sq("Πρέπει να ενισχυθεί η προστασία μαρτύρων δημοσίου συμφέροντος (whistleblowers);", "Should whistleblower protection be strengthened?", "Δικαιοσύνη", "proReform"),
  sq("Θα πρέπει να μειωθούν οι φυλακές για μη βίαια αδικήματα με εναλλακτικές ποινές;", "Should prison terms for non-violent offenses be reduced with alternative sentences?", "Δικαιοσύνη", "proProgressive"),
  sq("Υποστηρίζετε υποχρεωτική καταγραφή όλων των αστυνομικών συνεντεύξεων;", "Do you support mandatory recording of all police interrogations?", "Δικαιοσύνη", "proSecurity"),
  sq("Πρέπει να δημιουργηθεί ειδικό δικαστήριο για οικονομικά εγκλήματα με ταχείες διαδικασίες;", "Should a fast-track court for financial crimes be created?", "Δικαιοσύνη", "proReform"),

  // Διοίκηση (9)
  sq("Πρέπει να μειωθούν οι δήμοι από 332 σε λιγότερους από 200 με συγχωνεύσεις;", "Should municipalities be reduced from 332 to fewer than 200 through mergers?", "Διοίκηση", "proReform"),
  sq("Υποστηρίζετε την κατάργηση της επιλεκτικής επιδότησης φόρου (ΕΕΦ) για υψηλότερα εισοδήματα;", "Do you support abolishing the tax rebate (EEF) for higher incomes?", "Διοίκηση", "proWelfare"),
  sq("Θα πρέπει να εφαρμοστεί ψηφιακή ταυτότητα πολίτη (gov.gr wallet) ως υποχρεωτική για κρατικές υπηρεσίες;", "Should the gov.gr digital ID wallet be mandatory for public services?", "Διοίκηση", "proReform"),
  sq("Πρέπει να εκλεγόνται άμεσα οι περιφερειάρχες και δήμαρχοι με δεύτερο γύρο;", "Should regional governors and mayors be elected directly with a runoff?", "Διοίκηση", "proReform"),
  sq("Υποστηρίζετε μείωση του αριθμού των βουλευτών από 300 σε 250;", "Do you support reducing MPs from 300 to 250?", "Διοίκηση", "proReform"),
  sq("Πρέπει να καταργηθεί η ασυλία βουλευτών για ποινικά αδικήματα;", "Should parliamentary immunity for criminal offenses be abolished?", "Διοίκηση", "proReform"),
  sq("Θα πρέπει να ενισχυθεί η αποκέντρωση πόρων στους δήμους με block grant;", "Should municipal block grants be increased for decentralization?", "Διοίκηση", "proState"),
  sq("Υποστηρίζετε υποχρεωτική δημοσίευση περιουσιακών δηλώσεων πολιτικών σε αναζητήσιμη βάση;", "Do you support mandatory searchable publication of politicians' asset declarations?", "Διοίκηση", "proReform"),
  sq("Πρέπει να μειωθεί η γραφειοκρατία στις άδειες οικοδομής με ενιαίο ψηφιακό πόρισμα;", "Should building permit bureaucracy be cut with a unified digital approval?", "Διοίκηση", "proReform"),

  // Εκπαίδευση (9)
  sq("Πρέπει να καταργηθούν οι βαθμοί στο δημοτικό και να αντικατασταθούν με περιγραφική αξιολόγηση;", "Should primary school grades be replaced with descriptive assessment?", "Εκπαίδευση", "proProgressive"),
  sq("Υποστηρίζετε την ίδρυση μη κρατικών πανεπιστημίων στην Ελλάδα;", "Do you support establishing non-state universities in Greece?", "Εκπαίδευση", "proMarket"),
  sq("Θα πρέπει να επιβληθεί δίγλωσσο μάθημα σε όλα τα δημοτικά σχολεία από την Α' δημοτικού;", "Should bilingual instruction be required in all primary schools from grade 1?", "Εκπαίδευση", "proReform"),
  sq("Πρέπει να αυξηθεί η χρηματοδότηση δημόσιων νηπιαγωγείων για πλήρη δωρεάν φροντίδα;", "Should public nursery funding be increased for fully free childcare?", "Εκπαίδευση", "proWelfare"),
  sq("Υποστηρίζετε την κατάργηση της βαθμολογίας εισαγωγής (Βαθμολογία) και εισαγωγή μόνο με πανελλαδικές;", "Do you support abolishing school-leaving grades and using only national exams for admission?", "Εκπαίδευση", "proReform"),
  sq("Πρέπει να επιτρέπεται η προσευχή στα δημόσια σχολεία κατόπιν αιτήματος μαθητών;", "Should prayer be allowed in public schools upon student request?", "Εκπαίδευση", "proTraditional"),
  sq("Θα πρέπει να ενισχυθεί η τεχνική και επαγγελματική εκπαίδευση (ΕΠΑΛ) με σύνδεση εργοδοτών;", "Should vocational education (EPAL) be strengthened with employer partnerships?", "Εκπαίδευση", "proReform"),
  sq("Υποστηρίζετε δωρεάν σίτιση σε όλα τα δημόσια νηπιαγωγεία και δημοτικά;", "Do you support free meals in all public nurseries and primary schools?", "Εκπαίδευση", "proWelfare"),
  sq("Πρέπει να μειωθεί ο αριθμός μαθητών ανά τάξη σε 20 στο δημοτικό;", "Should class sizes be capped at 20 pupils in primary school?", "Εκπαίδευση", "proWelfare"),

  // Υγεία (9)
  sq("Πρέπει να εφαρμοστεί καθολικό σύστημα υγείας χωρίς συμμετοχή ασθενών (zero copay);", "Should a universal health system with zero patient copayments be implemented?", "Υγεία", "proWelfare"),
  sq("Υποστηρίζετε την επέκταση του ιδιωτικού ρόλου σε δημόσια νοσοκομεία μέσω PPP;", "Do you support expanding private roles in public hospitals via PPPs?", "Υγεία", "proMarket"),
  sq("Θα πρέπει να επιτρέπεται η πώληση φαρμάκων χωρίς συνταγή για βασικά αντιβιοτικά;", "Should basic antibiotics be sold without prescription?", "Υγεία", "proMarket"),
  sq("Πρέπει να ενισχυθεί η πρωτοβάθμια φροντίδα με οικογενειακούς γιατρούς ανά 1.500 κατοίκους;", "Should primary care be strengthened with one family doctor per 1,500 residents?", "Υγεία", "proWelfare"),
  sq("Υποστηρίζετε την υποχρεωτική εμβολιασμό για υγειονομικό προσωπικό σε δημόσιες δομές;", "Do you support mandatory vaccination for healthcare staff in public facilities?", "Υγεία", "proSecurity"),
  sq("Πρέπει να δημιουργηθεί εθνικό μητρώο ασθενών με ενιαίο ιατρικό ιστορικό;", "Should a national patient registry with unified medical history be created?", "Υγεία", "proReform"),
  sq("Θα πρέπει να καλύπτονται από ΕΟΠΥΥ όλες οι θεραπείες υπογονιμότητας χωρίς όριο προσπαθειών;", "Should EOPYY cover all fertility treatments without attempt limits?", "Υγεία", "proProgressive"),
  sq("Υποστηρίζετε την αποποινικοποίηση της κάνναβης για ιατρική χρήση σε ιδιωτικά φαρμακεία;", "Do you support medical cannabis dispensed through private pharmacies?", "Υγεία", "proProgressive"),
  sq("Πρέπει να μειωθεί η φαρμακευτική δαπάνη με generic-only συνταγογράφηση όπου υπάρχει;", "Should drug spending be cut with generic-only prescribing where available?", "Υγεία", "proReform"),

  // Μετανάστευση (9)
  sq("Πρέπει να επαναφερθούν συνοριακοί έλεγχοι στα εσωτερικά σύνορα Schengen για μετανάστες;", "Should internal Schengen border checks for migrants be restored?", "Μετανάστευση", "proImmigrationRestrict"),
  sq("Υποστηρίζετε την έκδοση ανθρωπιστικών βίζας σε αιτούντες άσυλο από ελληνικά προξενεία;", "Do you support humanitarian visas for asylum seekers at Greek consulates?", "Μετανάστευση", "proProgressive"),
  sq("Θα πρέπει να μειωθούν οι δομές φιλοξενίας και να ενισχυθεί η επιστροφή σε χώρες προέλευσης;", "Should reception centers be reduced and returns to countries of origin increased?", "Μετανάστευση", "proImmigrationRestrict"),
  sq("Πρέπει να παραχωρηθεί δικαίωμα ψήφου σε νόμιμους μακροχρόνιους μετανάστες σε δημοτικές εκλογές;", "Should long-term legal migrants be granted voting rights in local elections?", "Μετανάστευση", "proProgressive"),
  sq("Υποστηρίζετε την κατάργηση της Golden Visa για αγορά ακινήτων άνω των 250.000€;", "Do you support abolishing the Golden Visa for property purchases above €250,000?", "Μετανάστευση", "proImmigrationRestrict"),
  sq("Πρέπει να ενισχυθεί η FRONTEX με ελληνικό προσωπικό στα νησιά;", "Should FRONTEX be strengthened with Greek personnel on the islands?", "Μετανάστευση", "proSecurity"),
  sq("Θα πρέπει να παρέχεται αυτόματη άδεια εργασίας σε αιτούντες άσυλο μετά από 6 μήνες αναμονής;", "Should asylum seekers receive automatic work permits after 6 months waiting?", "Μετανάστευση", "proProgressive"),
  sq("Υποστηρίζετε τη δημιουργία hotspots μόνο σε ηπειρωτική Ελλάδα, όχι σε νησιά;", "Do you support locating reception hotspots only on mainland Greece, not islands?", "Μετανάστευση", "proImmigrationRestrict"),
  sq("Πρέπει να αυξηθούν οι επιστροφές (pushbacks) σε παράνομους διασώστες στη θάλασσα;", "Should pushbacks of illegal sea rescues be increased?", "Μετανάστευση", "proImmigrationRestrict"),

  // Τεχνολογία (9)
  sq("Πρέπει να επιβληθεί φόρος 3% στις ψηφιακές υπηρεσίες (streaming, διαφήμιση) όπως στην ΕΕ;", "Should a 3% digital services tax (streaming, ads) be imposed as in the EU?", "Τεχνολογία", "proState"),
  sq("Υποστηρίζετε την απαγόρευση της χρήσης TikTok σε κρατικούς υπαλλήλους σε κυβερνητικά κινητά;", "Do you support banning TikTok on government phones for civil servants?", "Τεχνολογία", "proSecurity"),
  sq("Θα πρέπει να ενισχυθεί η ελληνική cloud υποδομή (G-Cloud) αντί για ξένους παρόχους;", "Should Greek cloud infrastructure (G-Cloud) be expanded instead of foreign providers?", "Τεχνολογία", "proState"),
  sq("Πρέπει να θεσμοθετηθεί δικαίωμα επισκευής (right to repair) για ηλεκτρονικές συσκευές;", "Should a right to repair for electronic devices be legally established?", "Τεχνολογία", "proProgressive"),
  sq("Υποστηρίζετε την εισαγωγή ψηφιακού νομίσματος από την ΕΚΤ (digital euro) στην Ελλάδα;", "Do you support adopting the ECB digital euro in Greece?", "Τεχνολογία", "proEU"),
  sq("Πρέπει να απαγορευτεί η αναγνώριση προσώπου (facial recognition) από την αστυνομία;", "Should police use of facial recognition be banned?", "Τεχνολογία", "proProgressive"),
  sq("Θα πρέπει να επιδοτηθούν ελληνικές startups AI με εθνικό ταμείο 500 εκατ. €;", "Should Greek AI startups be funded with a €500M national fund?", "Τεχνολογία", "proReform"),
  sq("Υποστηρίζετε υποχρεωτική δήλωση αλγορίθμων από πλατφόρμες που λειτουργούν στην Ελλάδα;", "Do you support mandatory algorithm disclosure by platforms operating in Greece?", "Τεχνολογία", "proReform"),
  sq("Πρέπει να επιταχυνθεί η 5G κάλυψη σε απομακρυσμένες περιοχές με κρατική επένδυση;", "Should 5G coverage in remote areas be accelerated with state investment?", "Τεχνολογία", "proState"),

  // Ενέργεια (9)
  sq("Πρέπει να σταματήσει η εξόρυξη υδρογονανθράκων (Ιόνιο, Κρήτη) οριστικά;", "Should hydrocarbon drilling (Ionian, Crete) be permanently halted?", "Ενέργεια", "proEnvironment"),
  sq("Υποστηρίζετε την επανεθνικοποίηση της ΔΕΗ;", "Do you support re-nationalizing PPC (DEI)?", "Ενέργεια", "proState"),
  sq("Θα πρέπει να επιδοτηθούν φωτοβολταϊκά σε κάθε νοικοκυριό με κρατικό δάνειο 0% τόκο;", "Should rooftop solar be subsidized for every household with 0% state loans?", "Ενέργεια", "proEnvironment"),
  sq("Πρέπει να αυξηθεί ο ειδικός φόρος κατανάλωσης στον ηλεκτρισμό για χρηματοδότηση ανανεώσιμων;", "Should electricity excise tax be raised to fund renewables?", "Ενέργεια", "proEnvironment"),
  sq("Υποστηρίζετε την κατασκευή πυρηνικού ερευνητικού αντιδραστήρα για ιατρικούς σκοπούς;", "Do you support building a nuclear research reactor for medical use?", "Ενέργεια", "proReform"),
  sq("Πρέπει να μειωθούν οι επιδοτήσεις λιγνίτη και να μεταφερθούν σε πράσινη αποθήκευση ενέργειας;", "Should lignite subsidies be cut and redirected to green energy storage?", "Ενέργεια", "proEnvironment"),
  sq("Θα πρέπει να επιτραπεί η ιδιωτική εισαγωγή φθηνού ρωσικού LNG μέσω τρίτων;", "Should private import of cheap Russian LNG via third parties be allowed?", "Ενέργεια", "proMarket"),
  sq("Υποστηρίζετε δυναμικό τιμολόγηση ρεύματος (time-of-use) ως υποχρεωτική για νοικοκυριά;", "Do you support mandatory time-of-use electricity pricing for households?", "Ενέργεια", "proReform"),
  sq("Πρέπει να χρηματοδοτηθεί αγωγός φυσικού αερίου Ανατολικής Μεσογείου (EastMed) με ελληνικό μερίδιο;", "Should the EastMed gas pipeline be funded with a Greek stake?", "Ενέργεια", "proSecurity"),

  // Στέγαση (9)
  sq("Πρέπει να επιβληθεί πλαφόν ενοικίου σε αστικές ζώνες για 3 χρόνια;", "Should rent caps be imposed in urban zones for 3 years?", "Στέγαση", "proWelfare"),
  sq("Υποστηρίζετε φόρο 20% σε βραχυχρόνιες μισθώσεις (Airbnb) σε κέντρα πόλεων;", "Do you support a 20% tax on short-term rentals (Airbnb) in city centers?", "Στέγαση", "proWelfare"),
  sq("Θα πρέπει να επιδοτηθεί η αγορά πρώτης κατοικίας για ζευγάρια κάτω των 35 με 0% ΦΠΑ;", "Should first-home purchases for under-35 couples be subsidized with 0% VAT?", "Στέγαση", "proWelfare"),
  sq("Πρέπει να αυξηθεί ο ΕΝΦΙΑ για δεύτερες και τρίτες κατοικίες;", "Should ENFIA be increased on second and third homes?", "Στέγαση", "proWelfare"),
  sq("Υποστηρίζετε την κατεδάφιση αυθαίρετων κτισμάτων χωρίς περαιτέρω νομιμοποίηση;", "Do you support demolishing illegal buildings without further legalization?", "Στέγαση", "proReform"),
  sq("Πρέπει να δημιουργηθεί δημόσιο ταμείο κοινωνικής στέγασης με 1 δισ. € ετησίως;", "Should a €1B annual public social housing fund be created?", "Στέγαση", "proWelfare"),
  sq("Θα πρέπει να επιτρέπεται η μετατροπή εμπορικών χώρων σε κατοικίες χωρίς τέλος αλλαγής χρήσης;", "Should commercial-to-residential conversions be allowed without use-change fees?", "Στέγαση", "proMarket"),
  sq("Υποστηρίζετε την κατάργηση του golden visa για ακίνητα σε Αθήνα και Θεσσαλονίκη;", "Do you support abolishing the golden visa for property in Athens and Thessaloniki?", "Στέγαση", "proImmigrationRestrict"),
  sq("Πρέπει να ενισχυθεί το στεγαστικό δάνειο «Σπίτι μου II» με εγγύηση κράτους;", "Should the My Home II mortgage scheme be expanded with state guarantees?", "Στέγαση", "proWelfare"),

  // Ασφάλεια (9)
  sq("Πρέπει να εγκατασταθούν κάμερες ασφαλείας με AI αναγνώριση σε κεντρικά σημεία Αθήνας;", "Should AI security cameras be installed at central Athens locations?", "Ασφάλεια", "proSecurity"),
  sq("Υποστηρίζετε την οπλοφορία πολιτών με άδεια για αυτοάμυνα σε αστικές περιοχές;", "Do you support licensed civilian firearm carry for self-defense in urban areas?", "Ασφάλεια", "proTraditional"),
  sq("Θα πρέπει να αυξηθούν οι περιπολίες της ΟΠΚΕ σε μετρό και σταθμούς;", "Should OPKE police patrols in metro and stations be increased?", "Ασφάλεια", "proSecurity"),
  sq("Πρέπει να μειωθεί η ποινή για κατοχή μικρής ποσότητας ναρκωτικών;", "Should penalties for possessing small amounts of drugs be reduced?", "Ασφάλεια", "proProgressive"),
  sq("Υποστηρίζετε την ενίσχυση της αντιτρομοκρατικής νομοθεσίας με επιτήρηση κινητών;", "Do you support strengthening anti-terror laws with mobile surveillance?", "Ασφάλεια", "proSecurity"),
  sq("Πρέπει να δημιουργηθούν κοινότητες γειτονιάς με κρατική χρηματοδότηση για πρόληψη εγκληματικότητας;", "Should neighborhood watch programs receive state funding for crime prevention?", "Ασφάλεια", "proTraditional"),
  sq("Θα πρέπει να επιβληθεί κ dusk-to-dawn curfew για ανηλίκους κάτω των 16 σε εμπορικές ζώνες;", "Should a dusk-to-dawn curfew for under-16s apply in commercial zones?", "Ασφάλεια", "proTraditional"),
  sq("Υποστηρίζετε την αποποινικοποίηση της χρήσης ναρκωτικών και θεραπεία αντί για φυλακή;", "Do you support decriminalizing drug use with treatment instead of prison?", "Ασφάλεια", "proProgressive"),
  sq("Πρέπει να ενισχυθεί η Cybercrime Unit με πρόσληψη 500 ειδικών;", "Should the Cybercrime Unit be expanded with 500 new specialists?", "Ασφάλεια", "proSecurity"),

  // Μεταφορές (9)
  sq("Πρέπει να επεκταθεί το μετρό Θεσσαλονίκης πριν τους Ολυμπιακούς Αγώνες 2030;", "Should Thessaloniki metro be extended before the 2030 Olympics?", "Μεταφορές", "proState"),
  sq("Υποστηρίζετε δωρεάν δημόσια συγκοινωνία για μαθητές, φοιτητές και ανέργους;", "Do you support free public transport for students, pupils, and unemployed?", "Μεταφορές", "proWelfare"),
  sq("Θα πρέπει να επιβληθεί τέλος κυκλοφορίας στα κέντρα Αθήνας και Θεσσαλονίκης (congestion charge);", "Should congestion charges apply in Athens and Thessaloniki centers?", "Μεταφορές", "proEnvironment"),
  sq("Πρέπει να ιδιωτικοποιηθεί περαιτέρω ο ΟΣΕ (τρένα περιφέρειας);", "Should regional rail (OSE) be further privatized?", "Μεταφορές", "proMarket"),
  sq("Υποστηρίζετε την κατασκευή υποθαλάσσιου σταθμού στον Πειραιά για κρουαζιέρες;", "Do you support building an underground cruise terminal in Piraeus?", "Μεταφορές", "proReform"),
  sq("Πρέπει να απαγορευτούν πετρελαιοκίνητα αυτοκίνητα στο κέντρο της Αθήνας από 2030;", "Should diesel cars be banned in central Athens from 2030?", "Μεταφορές", "proEnvironment"),
  sq("Θα πρέπει να επιδοτηθούν ηλεκτρικά ποδήλατα και scooters για μετακινήσεις «τελευταίου μιλίου»;", "Should e-bikes and scooters be subsidized for last-mile travel?", "Μεταφορές", "proEnvironment"),
  sq("Υποστηρίζετε την κατάργηση των τελών διοδίων σε εθνικές οδούς για κατοίκους νομών;", "Do you support abolishing highway tolls for residents of border prefectures?", "Μεταφορές", "proWelfare"),
  sq("Πρέπει να ενισχυθεί η ακτοπλοϊκή σύνδεση νησιών με κρατικές επιδοτήσεις γραμμών;", "Should island ferry routes be strengthened with state line subsidies?", "Μεταφορές", "proState"),

  // Πολιτισμός (9)
  sq("Πρέπει να επιστραφούν τα γλυπτά του Παρθενώνα από το Βρετανικό Μουσείο με νομική πίεση;", "Should Parthenon sculptures be returned from the British Museum through legal pressure?", "Πολιτισμός", "proTraditional"),
  sq("Υποστηρίζετε την αποδέσμευση πόρων υπουργείου Πολιτισμού για ιδιωτικές χορηγίες μουσείων;", "Do you support redirecting Culture Ministry funds to private museum sponsorships?", "Πολιτισμός", "proMarket"),
  sq("Θα πρέπει να μειωθεί ο ΦΠΑ σε θεατρικά εισιτήρια και συναυλίες στο 6%;", "Should VAT on theater tickets and concerts be cut to 6%?", "Πολιτισμός", "proWelfare"),
  sq("Πρέπει να προστατευθεί η ελληνική γλώσσα με υποχρεωτική χρήση σε δημόσιες υπηρεσίες χωρίς εξαίρεση;", "Should Greek be mandatory in public services without exception?", "Πολιτισμός", "proTraditional"),
  sq("Υποστηρίζετε την ψηφιοποίηση αρχείων Εθνικής Βιβλιοθήκης με ανοιχτή πρόσβαση;", "Do you support digitizing National Library archives with open access?", "Πολιτισμός", "proReform"),
  sq("Πρέπει να χρηματοδοτηθούν περιφερειακά φεστιβάλ με εθνικό πρόγραμμα 50 εκατ. €;", "Should regional festivals be funded with a €50M national program?", "Πολιτισμός", "proWelfare"),
  sq("Θα πρέπει να επιτρέπεται η εμπορική εκμετάλλευση αρχαιολογικών χώρων για events;", "Should archaeological sites be used for commercial events?", "Πολιτισμός", "proMarket"),
  sq("Υποστηρίζετε την ενίσχυση της ελληνικής σειράς στην ΕΡΤ έναντι ξένων παραγωγών;", "Do you support boosting Greek ERT programming over foreign productions?", "Πολιτισμός", "proTraditional"),
  sq("Πρέπει να διδάσκεται υποχρεωτικά αρχαία ελληνικά στο λύκειο;", "Should Ancient Greek be mandatory in high school?", "Πολιτισμός", "proTraditional"),

  // Σύνταγμα (9)
  sq("Πρέπει να αναθεωρηθεί το άρθρο 16 για ίδρυση μη κρατικών πανεπιστημίων;", "Should Article 16 be revised to allow non-state universities?", "Σύνταγμα", "proMarket"),
  sq("Υποστηρίζετε την εκλογή Προέδρου Δημοκρατίας απευθείας από τον λαό;", "Do you support direct popular election of the President of the Republic?", "Σύνταγμα", "proReform"),
  sq("Θα πρέπει να κατοχυρωθεί δημοψήφισμα για διεθνείς συμφωνίες που αφορούν κυριαρχικά δικαιώματα;", "Should referendums be required for international agreements affecting sovereignty?", "Σύνταγμα", "proTraditional"),
  sq("Πρέπει να προστεθεί ρητή αναφορά στο δικαίωμα στο περιβάλλον στο Σύνταγμα;", "Should an explicit constitutional right to the environment be added?", "Σύνταγμα", "proEnvironment"),
  sq("Υποστηρίζετε την κατάργηση της βουλευτικής ασυλίας μέσω συνταγματικής αναθέωρησης;", "Do you support abolishing parliamentary immunity via constitutional revision?", "Σύνταγμα", "proReform"),
  sq("Πρέπει να οριστεί όριο δύο θητειών για πρωθυπουργό στο Σύνταγμα;", "Should the constitution limit a prime minister to two terms?", "Σύνταγμα", "proReform"),
  sq("Θα πρέπει να αναγνωριστεί συνταγματικά η θρησκευτική ουδετερότητα του κράτους;", "Should state religious neutrality be constitutionally recognized?", "Σύνταγμα", "proProgressive"),
  sq("Υποστηρίζετε την απλή αναλογική εκπροσώπηση χωρίς bonus 50 εδρών;", "Do you support pure proportional representation without the 50-seat bonus?", "Σύνταγμα", "proProgressive"),
  sq("Πρέπει να προστατευτεί συνταγματικά το δικαίωμα στέγασης ως κοινωνικό αγαθό;", "Should housing be constitutionally protected as a social good?", "Σύνταγμα", "proWelfare"),

  // Ευρωπαϊκή Πολιτική (9)
  sq("Πρέπει η Ελλάδα να αποχωρήσει από το ευρώ αν δεν μειωθεί το ελληνικό χρέος ουσιαστικά;", "Should Greece leave the euro if its debt is not substantially reduced?", "Ευρωπαϊκή Πολιτική", "proState"),
  sq("Υποστηρίζετε την ένταξη της Ελλάδας στο σχέδιο REPowerEU με πλήρη εφαρμογή στόχων 2030;", "Do you support Greece fully meeting REPowerEU 2030 targets?", "Ευρωπαϊκή Πολιτική", "proEU"),
  sq("Θα πρέπει να μπλοκαριστούν ευρωπαϊκές πληρωμές αν δεν τηρούνται κανόνες κράτους δικαίου;", "Should EU payments be blocked when rule-of-law standards are not met?", "Ευρωπαϊκή Πολιτική", "proEU"),
  sq("Πρέπει να απορριφθεί η τροποποίηση Συνθήκης για κοινό ευρωπαϊκό χρέος (corona bonds μονιμοποίηση);", "Should treaty changes for common European debt be rejected?", "Ευρωπαϊκή Πολιτική", "proMarket"),
  sq("Υποστηρίζετε την ενίσχυση Frontex και κοινής πολιτικής ασύλου στην ΕΕ;", "Do you support strengthening Frontex and a common EU asylum policy?", "Ευρωπαϊκή Πολιτική", "proEU"),
  sq("Πρέπει να ασκηθεί βέτο στην ένταξη Τουρκίας στην ΕΕ μέχρι νέας αξιολόγησης;", "Should Turkey's EU accession be vetoed pending reassessment?", "Ευρωπαϊκή Πολιτική", "proSecurity"),
  sq("Θα πρέπει να υιοθετηθεί ελάχιστος ευρωπαϊκός μισθός ως ποσοστό του εθνικού;", "Should a minimum EU wage as a percentage of the national wage be adopted?", "Ευρωπαϊκή Πολιτική", "proEU"),
  sq("Υποστηρίζετε την εξαίρεση της Ελλάδας από τους στόχους δημοσιονομικής πειθαρχίας λόγω καταστροφών;", "Do you support exempting Greece from fiscal discipline targets due to disasters?", "Ευρωπαϊκή Πολιτική", "proWelfare"),
  sq("Πρέπει να προωθηθεί η ένταξη Δυτικών Βαλκανίων στην ΕΕ με ελληνική στήριξη;", "Should Western Balkans EU accession be advanced with Greek support?", "Ευρωπαϊκή Πολιτική", "proEU"),

  // Αγροτική Πολιτική (9)
  sq("Πρέπει να αυξηθούν οι επιδοτήσεις CAP για μικρούς αγρότες κάτω των 10 εκταρίων;", "Should CAP subsidies be increased for small farmers under 10 hectares?", "Αγροτική Πολιτική", "proWelfare"),
  sq("Υποστηρίζετε την απελευθέρωση τιμών γάλακτος και κρέατος από κρατικούς ελέγχους;", "Do you support freeing milk and meat prices from state controls?", "Αγροτική Πολιτική", "proMarket"),
  sq("Θα πρέπει να απαγορευτούν γεωργικά φάρμακα που απαγορεύονται στην ΕΕ αλλά εισάγονται ακόμα;", "Should EU-banned agricultural pesticides still imported be prohibited?", "Αγροτική Πολιτική", "proEnvironment"),
  sq("Πρέπει να επιδοτηθεί η βιολογική καλλιέργεια με 500€ ανά στρέμμα ετησίως;", "Should organic farming receive €500 per stremma annually?", "Αγροτική Πολιτική", "proEnvironment"),
  sq("Υποστηρίζετε την κατάργηση του μνημονίου συνεργασίας με Τουρκία για αγροτικά προϊόντα;", "Do you support ending the agricultural cooperation memorandum with Turkey?", "Αγροτική Πολιτική", "proSecurity"),
  sq("Πρέπει να ενισχυθεί η ασφάλιση εισοδήματος αγροτών έναντι κλιματικών καταστροφών;", "Should farmers' income insurance against climate disasters be expanded?", "Αγροτική Πολιτική", "proWelfare"),
  sq("Θα πρέπει να επιτρέπεται η καλλιέργεια γενετικά τροποποιημένων σπόρων σε πιλοτική κλίμακα;", "Should genetically modified seed cultivation be allowed on a pilot scale?", "Αγροτική Πολιτική", "proMarket"),
  sq("Υποστηρίζετε την προστασία ονομασίας προέλευσης (ΠΟΠ) με αυστηρότερες ποινές για παρανομία;", "Do you support stricter penalties for violating Protected Designation of Origin (PDO)?", "Αγροτική Πολιτική", "proTraditional"),
  sq("Πρέπει να δημιουργηθεί δημόσιο ταμείο εγγύησης τιμών για ελαιόλαδο και σταφύλι;", "Should a public price guarantee fund be created for olive oil and grapes?", "Αγροτική Πολιτική", "proState"),
];

function dedupeByText(questions: SurveyQuestionSeed[]): SurveyQuestionSeed[] {
  const seen = new Set<string>();
  return questions.filter((q) => {
    if (seen.has(q.text)) return false;
    seen.add(q.text);
    return true;
  });
}

function generateExtraSurvey(): void {
  const normalized = dedupeByText(extra);
  const outPath = path.join(__dirname, "data", "extraSurveyQuestions.json");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(normalized, null, 2));
  console.log(`Generated ${normalized.length} extra survey questions`);
}

if (process.argv[1]?.includes("generateExtraSurvey")) {
  generateExtraSurvey();
}
