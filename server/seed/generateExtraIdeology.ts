import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { leftStatement, rightStatement, iq, type IdeologyQuestionSeed } from "./ideologyHelpers";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const S = "Κράτος & Οικονομία";
const J = "Κοινωνική Δικαιοσύνη";
const F = "Ελευθερία & Εξουσία";
const T = "Παράδοση & Κοινωνία";
const I = "Διεθνισμός & Κόσμος";
const H = "Ιδεολογία & Ιστορία";

const extra: IdeologyQuestionSeed[] = [
  // Κράτος & Οικονομία (22)
  leftStatement(
    "Οι μέσοι παραγωγής πρέπει να κοινωνικοποιούνται για να τερματιστεί η εκμετάλλευση της εργασίας.",
    "The means of production should be socialized to end the exploitation of labor.",
    S,
  ),
  rightStatement(
    "Ο ελεύθερος ανταγωνισμός είναι ο αξιόπιστος μηχανισμός κατανομής πόρων σε σύγχρονες κοινωνίες.",
    "Free competition is the reliable mechanism for allocating resources in modern societies.",
    S,
  ),
  leftStatement(
    "Η κρατική ιδιοκτησία στους βασικούς τομείς είναι προϋπόθεση για κοινωνική ισότητα.",
    "State ownership in key sectors is a precondition for social equality.",
    S,
  ),
  rightStatement(
    "Η απορρύθμιση των αγορών απελευθερώνει την καινοτομία περισσότερο από οποιοσδήποτε κεντρικό σχεδιασμό.",
    "Deregulating markets unleashes innovation more than any central planning.",
    S,
  ),
  leftStatement(
    "Ο μαρξιστικός αναλυτικός πλαίσιο εξηγεί καλύτερα τις κρίσεις του καπιταλισμού από τη νεοκλασική οικονομία.",
    "The Marxist analytical framework explains capitalist crises better than neoclassical economics.",
    S,
  ),
  rightStatement(
    "Η ιδιωτική πρωτοβουλία αντιδρά γρηγορότερα και αποτελεσματικότερα από τη γραφειοκρατία.",
    "Private initiative responds faster and more effectively than bureaucracy.",
    S,
  ),
  leftStatement(
    "Οι δημόσιες επενδύσεις πρέπει να καθοδηγούν την οικονομική ανάπτυξη, όχι το κέρδος των μετόχων.",
    "Public investment should guide economic development, not shareholder profit.",
    S,
  ),
  rightStatement(
    "Οι φόροι πρέπει να παραμείνουν χαμηλοί ώστε να ενισχύεται η ατομική επιχειρηματικότητα.",
    "Taxes should remain low to strengthen individual entrepreneurship.",
    S,
  ),
  leftStatement(
    "Η ταξική πάλη είναι κεντρική δυναμική της σύγχρονης οικονομίας.",
    "Class struggle is a central dynamic of the modern economy.",
    S,
  ),
  rightStatement(
    "Η ατομική ιδιοκτησία είναι θεμέλιο της ελευθερίας και της ευημερίας.",
    "Individual property ownership is the foundation of freedom and prosperity.",
    S,
  ),
  leftStatement(
    "Το κράτος πρέπει να εγγυάται δημόσιες υπηρεσίες πλήρους απασχόλησης σε περιόδους ύφεσης.",
    "The state should guarantee public works programs during recessions.",
    S,
  ),
  rightStatement(
    "Οι αγορές εργασίας λειτουργούν καλύτερα όταν οι μισθοί καθορίζονται από προσφορά και ζήτηση, όχι από κράτος.",
    "Labor markets work best when wages are set by supply and demand, not the state.",
    S,
  ),
  iq(
    "Οι κρατικοί μηχανισμοί σταθεροποίησης είναι απαραίτητοι, αλλά δεν πρέπει να αντικαθιστούν μόνιμα την αγορά.",
    "State stabilization mechanisms are necessary but should not permanently replace the market.",
    S,
    1,
    1,
  ),
  leftStatement(
    "Η κοινωνικοποίηση των τραπεζών είναι απαραίτητη για δημοκρατικό έλεγχο του πιστωτικού συστήματος.",
    "Bank nationalization is necessary for democratic control of the credit system.",
    S,
  ),
  rightStatement(
    "Οι ελεύθερες αγορές κεφαλαίου ενισχύουν την ανάπτυξη περισσότερο από τον κρατικό προστατευτισμό.",
    "Free capital markets drive growth more than state protectionism.",
    S,
  ),
  leftStatement(
    "Οι εργαζόμενοι πρέπει να ελέγχουν συλλογικά τους χώρους εργασίας μέσω συνεταιρισμών.",
    "Workers should collectively control workplaces through cooperatives.",
    S,
  ),
  rightStatement(
    "Η οικονομική ελευθερία προηγείται της κοινωνικής ισότητας ως πολιτικής προτεραιότητας.",
    "Economic freedom precedes social equality as a political priority.",
    S,
  ),
  leftStatement(
    "Ο κρατικός προγραμματισμός μπορεί να κατευθύνει την οικονομία προς κοινωνικούς στόχους.",
    "State planning can steer the economy toward social goals.",
    S,
  ),
  rightStatement(
    "Οι κρατικές επιχειρήσεις τείνουν να είναι λιγότερο καινοτόμες από τις ιδιωτικές.",
    "State enterprises tend to be less innovative than private ones.",
    S,
  ),
  iq(
    "Η μικτή οικονομία με ισχυρό κοινωνικό κράτος είναι ρεαλιστικότερο μοντέλο από τον καθαρό καπιταλισμό ή τον σοσιαλισμό.",
    "A mixed economy with a strong welfare state is more realistic than pure capitalism or socialism.",
    S,
    2,
    -1,
  ),
  leftStatement(
    "Η συγκέντρωση πλούτου στα χέρια λίγων απειλεί τη δημοκρατία.",
    "The concentration of wealth in few hands threatens democracy.",
    S,
  ),
  rightStatement(
    "Η αναδιανομή πλούτου μέσω φόρων υποσκάπτει τα κίνητρα παραγωγής.",
    "Redistributing wealth through taxes undermines production incentives.",
    S,
  ),
  leftStatement(
    "Οι βασικές ανάγκες — στέγαση, τροφή, υγεία — δεν πρέπει να υπόκεινται στην αγορά.",
    "Basic needs — housing, food, health — should not be subject to the market.",
    S,
  ),

  // Κοινωνική Δικαιοσύνη (22)
  leftStatement(
    "Η οικονομική ισότητα είναι αξία που πρέπει να επιδιώκεται ενεργά από το κράτος.",
    "Economic equality is a value the state should actively pursue.",
    J,
  ),
  rightStatement(
    "Η ανισότητα αποτελεσμάτων είναι αποδεκτή όταν προκύπτει από διαφορετική προσπάθεια και ταλέντο.",
    "Inequality of outcomes is acceptable when it stems from different effort and talent.",
    J,
  ),
  leftStatement(
    "Το κοινωνικό κράτος πρέπει να εγγυάται καθολική πρόσβαση σε υγεία και εκπαίδευση.",
    "The welfare state should guarantee universal access to health and education.",
    J,
  ),
  rightStatement(
    "Η φιλανθρωπία και η ιδιωτική αλληλεγγύη είναι προτιμότερες από τα κεντρικά κοινωνικά επιδόματα.",
    "Charity and private solidarity are preferable to centralized social benefits.",
    J,
  ),
  leftStatement(
    "Η φτώχεια είναι δομικό πρόβλημα του συστήματος, όχι αποτέλεσμα τεμπελιάς.",
    "Poverty is a structural problem of the system, not a result of laziness.",
    J,
  ),
  rightStatement(
    "Η κοινωνική κινητικότητα εξαρτάται κυρίως από ατομική ευθύνη και εργατικό ήθος.",
    "Social mobility depends mainly on individual responsibility and work ethic.",
    J,
  ),
  leftStatement(
    "Το βασικό εισόδημα είναι δικαίωμα, όχι ελεημοσύνη.",
    "Basic income is a right, not charity.",
    J,
  ),
  rightStatement(
    "Τα γενναιόδωρα επιδόματα δημιουργούν εξάρτηση από το κράτος.",
    "Generous benefits create dependence on the state.",
    J,
  ),
  leftStatement(
    "Οι κοινωνικές ανισότητες φύλου και φυλής απαιτούν ενεργές πολιτικές ισότητας.",
    "Gender and racial inequalities require active equality policies.",
    J,
  ),
  rightStatement(
    "Οι ποσοστώσεις και οι θετικές διακρίσεις αδικούν άτομα με βάση ομαδική ταυτότητα.",
    "Quotas and affirmative action wrong individuals based on group identity.",
    J,
  ),
  leftStatement(
    "Η αλληλεγγύη μεταξύ τάξεων και γενεών είναι ηθική υποχρέωση του κράτους.",
    "Solidarity across classes and generations is a moral duty of the state.",
    J,
  ),
  rightStatement(
    "Η οικογένεια, όχι το κράτος, είναι ο πρωταρχικός φορέας κοινωνικής πρόνοιας.",
    "The family, not the state, is the primary provider of social care.",
    J,
  ),
  iq(
    "Η ισότητα ευκαιριών αρκεί μόνο αν συνοδεύεται από ισχυρό κοινωνικό δίχτυ ασφαλείας.",
    "Equality of opportunity suffices only when paired with a strong social safety net.",
    J,
    2,
    -1,
  ),
  leftStatement(
    "Οι πλούσιοι οφείλουν να συνεισφέρουν περισσότερο στη χρηματοδότηση δημόσιων αγαθών.",
    "The wealthy owe a greater contribution to funding public goods.",
    J,
  ),
  rightStatement(
    "Η ιδιωτική περιουσία είναι δικαίωμα που δεν πρέπει να αμφισβητείται για λόγους ισότητας.",
    "Private wealth is a right that should not be challenged for equality's sake.",
    J,
  ),
  leftStatement(
    "Η κοινωνική δικαιοσύνη απαιτεί μείωση του χάσματος μεταξύ πλούσιων και φτωχών.",
    "Social justice requires narrowing the gap between rich and poor.",
    J,
  ),
  rightStatement(
    "Η εστίαση στην ισότητα αποτελεσμάτων οδηγεί σε στασιμότητα και λιγότερη ευημερία για όλους.",
    "Focusing on equality of outcomes leads to stagnation and less prosperity for all.",
    J,
  ),
  leftStatement(
    "Οι εργασιακά δικαιώματα πρέπει να υπερισχύουν της ευελιξίας της αγοράς.",
    "Labor rights should prevail over labor market flexibility.",
    J,
  ),
  rightStatement(
    "Η ευελιξία στην απασχόληση ωφελεί τους εργαζόμενους μακροπρόθεσμα περισσότερο από την αυστηρή ρύθμιση.",
    "Labor flexibility benefits workers long-term more than strict regulation.",
    J,
  ),
  iq(
    "Η κοινωνική δικαιοσύνη εξισορροπείται καλύτερα με στοχευμένη πρόνοια παρά με καθολική ισοποίηση.",
    "Social justice is best balanced through targeted welfare rather than universal leveling.",
    J,
    1,
    1,
  ),
  leftStatement(
    "Η πρόσβαση στην ποιοτική εκπαίδευση δεν πρέπει να εξαρτάται από την οικογενειακή περιουσία.",
    "Access to quality education should not depend on family wealth.",
    J,
  ),
  rightStatement(
    "Η ιδιωτική εκπαίδευση ενισχύει τον ανταγωνισμό και βελτιώνει τα δημόσια σχολεία.",
    "Private education strengthens competition and improves public schools.",
    J,
  ),
  leftStatement(
    "Οι κοινωνικές κατακτήσεις του 20ού αιώνα — συντάξεις, εργατικά δικαιώματα — πρέπει να υπερασπίζονται.",
    "20th-century social gains — pensions, labor rights — must be defended.",
    J,
  ),

  // Ελευθερία & Εξουσία (22)
  leftStatement(
    "Η εξουσία πρέπει να ασκείται με συμμετοχή των πολιτών, όχι μόνο μέσω αντιπροσώπευσης.",
    "Power should be exercised with citizen participation, not only through representation.",
    F,
  ),
  rightStatement(
    "Ο περιορισμός της κρατικής εξουσίας είναι προτεραιότητα για την προστασία της ελευθερίας.",
    "Limiting state power is a priority for protecting freedom.",
    F,
  ),
  leftStatement(
    "Η δημοκρατία απαιτεί οικονομική ισότητα, όχι μόνο πολιτικά δικαιώματα.",
    "Democracy requires economic equality, not only political rights.",
    F,
  ),
  rightStatement(
    "Η ατομική ελευθερία πρέπει να προστατεύεται ακόμη κι όταν δημιουργεί κοινωνική αναστάτωση.",
    "Individual freedom should be protected even when it causes social disruption.",
    F,
  ),
  leftStatement(
    "Οι μαζικές κινητοποιήσεις είναι νόμιμο μέσο πίεσης σε μη αντιπροσωπευτικές κυβερνήσεις.",
    "Mass mobilization is a legitimate means of pressure on unrepresentative governments.",
    F,
  ),
  rightStatement(
    "Η τάξη και ο νόμος πρέπει να υπερισχύουν των κοινωνικών διαμαρτυριών όταν παραβιάζουν δικαιώματα άλλων.",
    "Order and law should prevail over protests when they violate others' rights.",
    F,
  ),
  iq(
    "Η ελευθερία του λόγου περιορίζεται δικαίως όταν ενθαρρύνει βία ή μίσος.",
    "Freedom of speech is justly limited when it incites violence or hatred.",
    F,
    1,
    -1,
  ),
  leftStatement(
    "Οι θεσμοί πρέπει να λογοδοτούν άμεσα στον λαό, όχι μόνο στις εκλογές.",
    "Institutions should be directly accountable to the people, not only at elections.",
    F,
  ),
  rightStatement(
    "Οι ανεξάρτητοι θεσμοί — δικαστές, κεντρικές τράπεζες — προστατεύουν την ελευθερία από την πλειοψηφία.",
    "Independent institutions — judges, central banks — protect freedom from the majority.",
    F,
  ),
  leftStatement(
    "Η επανάσταση μπορεί να είναι δικαιολογημένη όταν οι θεσμοί αποτυγχάνουν να εκπροσωπούν τον λαό.",
    "Revolution can be justified when institutions fail to represent the people.",
    F,
  ),
  rightStatement(
    "Η επαναστατική βία οδηγεί σχεδόν πάντα σε αυταρχισμό και πρέπει να απορρίπτεται.",
    "Revolutionary violence almost always leads to authoritarianism and should be rejected.",
    F,
  ),
  leftStatement(
    "Η παρακολούθηση πολιτών από το κράτος πρέπει να περιορίζεται αυστηρά.",
    "State surveillance of citizens should be strictly limited.",
    F,
  ),
  rightStatement(
    "Ενισχυμένα μέτρα ασφαλείας είναι αποδεκτά όταν προστατεύουν τη δημοκρατία από εξτρεμισμό.",
    "Enhanced security measures are acceptable when they protect democracy from extremism.",
    F,
  ),
  iq(
    "Ο κράτος δικαίου προστατεύει ελευθερίες καλύτερα από την άμεση λαϊκή κυριαρχία χωρίς εγγυήσεις.",
    "The rule of law protects liberties better than direct popular rule without safeguards.",
    F,
    -1,
    2,
  ),
  leftStatement(
    "Η εξουσία των ελίτ πρέπει να αμφισβητείται συνεχώς για να παραμείνει η δημοκρατία ζωντανή.",
    "Elite power must be constantly challenged for democracy to remain alive.",
    F,
  ),
  rightStatement(
    "Η σταθερότητα των θεσμών είναι πιο σημαντική από τη συνεχή ανατροπή της πολιτικής τάξης.",
    "Institutional stability matters more than constantly overturning the political order.",
    F,
  ),
  leftStatement(
    "Τα ανθρώπινα δικαιώματα είναι καθολικά και ανώτερα των εθνικών νόμων.",
    "Human rights are universal and superior to national laws.",
    F,
  ),
  rightStatement(
    "Η εθνική κυριαρχία πρέπει να μπορεί να περιορίζει δικαιώματα όταν απαιτείται για την κοινωνική συνοχή.",
    "National sovereignty should be able to limit rights when required for social cohesion.",
    F,
  ),
  leftStatement(
    "Η ελευθερία της συνείδησης δεν πρέπει να υπόκειται σε θρησκευτική ή ιδεολογική λογοκρισία.",
    "Freedom of conscience should not be subject to religious or ideological censorship.",
    F,
  ),
  rightStatement(
    "Οι παραδοσιακές αρχές μπορούν να θέτουν όρια στην ατομική συμπεριφορά για το κοινό καλό.",
    "Traditional norms may set limits on individual behavior for the common good.",
    F,
  ),
  iq(
    "Η δημοκρατία χρειάζεται τόσο ελευθερία έκφρασης όσο και θεσμούς που αποτρέπουν τον λαϊκισμό.",
    "Democracy needs both freedom of expression and institutions that curb populism.",
    F,
    1,
    1,
  ),
  leftStatement(
    "Οι εργαζόμενοι πρέπει να έχουν δημοκρατικό λόγο στις αποφάσεις που τους αφορούν.",
    "Workers should have democratic say in decisions that affect them.",
    F,
  ),

  // Παράδοση & Κοινωνία (21)
  rightStatement(
    "Οι παραδοσιακές αξίες παρέχουν κοινωνική συνοχή που η ριζική αλλαγή διαλύει.",
    "Traditional values provide social cohesion that radical change dissolves.",
    T,
  ),
  leftStatement(
    "Οι κοινωνικοί θεσμοί πρέπει να εκσυγχρονίζονται ακόμη κι αν προσβάλλουν παραδοσιακές πεποιθήσεις.",
    "Social institutions should modernize even when they offend traditional beliefs.",
    T,
  ),
  rightStatement(
    "Η οικογένεια ως παραδοσιακός θεσμός αξίζει ιδιαίτερη προστασία από το κράτος.",
    "The family as a traditional institution deserves special protection by the state.",
    T,
  ),
  leftStatement(
    "Η κοινωνία προοδεύει όταν αμφισβητεί συνήθειες και τελετουργίες που διατηρούν ανισότητες.",
    "Society progresses when it challenges customs and rituals that preserve inequality.",
    T,
  ),
  rightStatement(
    "Η σεβαστή σχέση προς την ιστορία και τους προγόνους ενισχύει την εθνική ταυτότητα.",
    "Respectful regard for history and ancestors strengthens national identity.",
    T,
  ),
  leftStatement(
    "Οι θρησκευτικές αρχές δεν πρέπει να καθορίζουν τη δημόσια πολιτική σε κοσμικό κράτος.",
    "Religious principles should not determine public policy in a secular state.",
    T,
  ),
  iq(
    "Η παράδοση μπορεί να εμπνέει χωρίς να δεσμεύει τις σύγχρονες κοινωνίες σε παλιές μορφές.",
    "Tradition can inspire without binding modern societies to old forms.",
    T,
    1,
    1,
  ),
  rightStatement(
    "Ο συντηρισμός προσφέρει σταθερότητα σε εποχές ραγδαίας αλλαγής.",
    "Conservatism offers stability in times of rapid change.",
    T,
  ),
  leftStatement(
    "Ο φεμινισμός και τα κινήματα για τα δικαιώματα LGBTQ+ εμπλουτίζουν την κοινωνία.",
    "Feminism and LGBTQ+ rights movements enrich society.",
    T,
  ),
  rightStatement(
    "Οι βαθιές κοινωνικές αλλαγές πρέπει να προέρχονται σταδιακά, όχι από βίαιες ανατροπές.",
    "Deep social change should come gradually, not through violent upheaval.",
    T,
  ),
  leftStatement(
    "Οι πολιτισμικές μειονότητες πρέπει να αναγνωρίζονται ισότιμα στην εθνική αφήγηση.",
    "Cultural minorities should be recognized equally in the national narrative.",
    T,
  ),
  rightStatement(
    "Η εθνική γλώσσα και ο πολιτισμός πρέπει να προστατεύονται από την ομογενοποίηση.",
    "National language and culture should be protected from homogenization.",
    T,
  ),
  leftStatement(
    "Η εκκοσμίκευση ενισχύει την ισότητα των πολιτών.",
    "Secularization strengthens equality among citizens.",
    T,
  ),
  rightStatement(
    "Οι θρησκευτικές κοινότητες συμβάλλουν ουσιαστικά στη δημόσια ηθική.",
    "Religious communities contribute substantively to public morality.",
    T,
  ),
  iq(
    "Η κοινωνία χρειάζεται και συνέχεια παράδοσης και καινοτομία στους θεσμούς.",
    "Society needs both continuity of tradition and institutional innovation.",
    T,
    1,
    1,
  ),
  leftStatement(
    "Οι πατριαρχικές δομές πρέπει να αμφισβητούνται ως εμπόδιο στην ισότητα.",
    "Patriarchal structures should be challenged as obstacles to equality.",
    T,
  ),
  rightStatement(
    "Οι θεσμοί που επιβίωσαν αιώνες αξίζουν προσοχή πριν από ριζική κατάργηση.",
    "Institutions that survived centuries deserve caution before radical abolition.",
    T,
  ),
  leftStatement(
    "Η τέχνη και η λογοτεχνία πρέπει να ελευθερώνονται από ηθικούς ή θρησκευτικούς περιορισμούς.",
    "Art and literature should be freed from moral or religious restrictions.",
    T,
  ),
  rightStatement(
    "Οι κοινωνικές νόρμες που ρυθμίζουν τη συμπεριφορά ενισχύουν την κοινωνική ειρήνη.",
    "Social norms regulating behavior strengthen social peace.",
    T,
  ),
  leftStatement(
    "Η αμφισβήτηση της παράδοσης είναι απαραίτητη για κοινωνική πρόοδο.",
    "Challenging tradition is necessary for social progress.",
    T,
  ),
  rightStatement(
    "Ο Edmund Burke είχε δίκιο ότι η κοινωνία είναι σύμβαση μεταξύ ζώντων, νεκρών και αγεννημένων.",
    "Edmund Burke was right that society is a contract between the living, the dead, and the unborn.",
    T,
  ),

  // Διεθνισμός & Κόσμος (21)
  leftStatement(
    "Ο διεθνισμός των εργαζομένων υπερισχύει του εθνικού εγωισμού.",
    "Workers' internationalism prevails over national selfishness.",
    I,
  ),
  rightStatement(
    "Το έθνος-κράτος παραμένει η κύρια μονάδα πολιτικής ταυτότητας και αλληλεγγύης.",
    "The nation-state remains the primary unit of political identity and solidarity.",
    I,
  ),
  leftStatement(
    "Τα ανθρώπινα δικαιώματα των προσφύγων υπερισχύουν των εθνικών συνόρων.",
    "Refugees' human rights prevail over national borders.",
    I,
  ),
  rightStatement(
    "Ο εθνικισμός ενισχύει τη δημοκρατική συμμετοχή όταν συνδέεται με κοινή ιστορία.",
    "Nationalism strengthens democratic participation when tied to shared history.",
    I,
  ),
  leftStatement(
    "Οι υπερεθνικοί οργανισμοί — ΟΗΕ, ΕΕ — πρέπει να ενισχύονται για την παγκόσμια ειρήνη.",
    "Supranational bodies — UN, EU — should be strengthened for global peace.",
    I,
  ),
  rightStatement(
    "Η εθνική κυριαρχία δεν πρέπει να υποχωρεί σε διεθνείς οργανισμούς χωρίς δημοκρατική εντολή.",
    "National sovereignty should not yield to international bodies without democratic mandate.",
    I,
  ),
  leftStatement(
    "Ο ιμπεριαλισμός και ο νεοαποικιοκρατισμός παραμένουν κεντρικά παγκόσμια προβλήματα.",
    "Imperialism and neocolonialism remain central global problems.",
    I,
  ),
  rightStatement(
    "Η Δύση έχει εξαγάγει δημοκρατία και ευημερία σε πολλές περιοχές του κόσμου.",
    "The West has exported democracy and prosperity to many parts of the world.",
    I,
  ),
  iq(
    "Η παγκοσμιοποίηση ωφελεί και βλάπτει· χρειάζεται δημοκρατικός έλεγχος, όχι πλήρη απόρριψη.",
    "Globalization both helps and harms; it needs democratic control, not total rejection.",
    I,
    2,
    -1,
  ),
  leftStatement(
    "Η αλληλεγγύη μεταξύ λαών απαιτεί μείωση στρατιωτικών εξόδων και αύξηση αναπτυξιακής βοήθειας.",
    "Solidarity among peoples requires cutting military spending and increasing development aid.",
    I,
  ),
  rightStatement(
    "Κάθε έθνος πρέπει πρώτα να φροντίζει τους δικούς του πολίτες πριν αναλάβει παγκόσμια υποχρέωση.",
    "Each nation should first care for its own citizens before taking on global obligations.",
    I,
  ),
  leftStatement(
    "Ο πολυπολιτισμικός πλουραλισμός ενισχύει τη δημοκρατία.",
    "Multicultural pluralism strengthens democracy.",
    I,
  ),
  rightStatement(
    "Η ενσωμάτωση μεταναστών απαιτεί αποδοχή των βασικών αξιών της χώρας υποδοχής.",
    "Immigrant integration requires acceptance of the host country's core values.",
    I,
  ),
  leftStatement(
    "Οι πόλεμοι για πετρέλαιο και πόρους είναι αποτέλεσμα του καπιταλιστικού συστήματος.",
    "Wars for oil and resources are a product of the capitalist system.",
    I,
  ),
  rightStatement(
    "Η στρατιωτική ισχύς είναι απαραίτητη για την προστασία εθνικών συμφερόντων.",
    "Military strength is necessary to protect national interests.",
    I,
  ),
  iq(
    "Η ευρωπαϊκή ενοποίηση προωθεί ειρήνη, αλλά δεν πρέπει να αντικαθιστά την εθνική δημοκρατία.",
    "European integration promotes peace but should not replace national democracy.",
    I,
    1,
    1,
  ),
  leftStatement(
    "Το κλίμα και το περιβάλλον απαιτούν διεθνή συνεργασία, όχι εθνικό εγωισμό.",
    "Climate and the environment require international cooperation, not national selfishness.",
    I,
  ),
  rightStatement(
    "Οι εθνικές πολιτικές δεν πρέπει να υποτάσσονται σε ξένες περιβαλλοντικές δεσμεύσεις.",
    "National policies should not be subordinated to foreign environmental commitments.",
    I,
  ),
  leftStatement(
    "Ο αποικιοκρατικός παρελθόν πρέπει να αναγνωρίζεται και να αποζημιώνεται όπου είναι δυνατόν.",
    "The colonial past should be acknowledged and compensated where possible.",
    I,
  ),
  rightStatement(
    "Η ιστορία των εθνών δεν πρέπει να κρίνεται μόνο από το πρίσμα του αποικιοκρατισμού.",
    "Nations' history should not be judged solely through the lens of colonialism.",
    I,
  ),
  leftStatement(
    "Η διεθνής αλληλεγγύη απαιτεί άνοιγμα συνόρων σε όσους φεύγουν από πολέμους.",
    "International solidarity requires opening borders to those fleeing wars.",
    I,
  ),
  rightStatement(
    "Τα κλειστά σύνορα προστατεύουν κοινωνικές δομές από αλυσιδωτές πιέσεις.",
    "Closed borders protect social structures from cascading pressures.",
    I,
  ),

  // Ιδεολογία & Ιστορία (22)
  leftStatement(
    "Ο Μαρξ εντόπισε σωστά ότι η ιστορία είναι ιστορία ταξικών αγώνων.",
    "Marx correctly identified that history is the history of class struggles.",
    H,
  ),
  rightStatement(
    "Ο John Locke θεμελίωσε σωστά τα φυσικά δικαιώματα ιδιοκτησίας και ελευθερίας.",
    "John Locke correctly grounded natural rights to property and liberty.",
    H,
  ),
  leftStatement(
    "Η Γαλλική Επανάσταση σήμανε πρόοδο προς ισότητα και λαϊκή κυριαρχία.",
    "The French Revolution marked progress toward equality and popular sovereignty.",
    H,
  ),
  rightStatement(
    "Η Αμερικανική Επανάσταση ενσωμάτωσε καλύτερα τους περιορισμούς της εξουσίας από τις ριζικές ευρωπαϊκές επαναστάσεις.",
    "The American Revolution better incorporated limits on power than radical European revolutions.",
    H,
  ),
  leftStatement(
    "Ο σοσιαλισμός του 19ου και 20ού αιώνα άνοιξε τον δρόμο για κοινωνικά δικαιώματα.",
    "19th- and 20th-century socialism paved the way for social rights.",
    H,
  ),
  rightStatement(
    "Ο φιλελευθερισμός του Διαφωτισμού απελευθέρωσε την επιστήμη, το εμπόριο και την πολιτική σκέψη.",
    "Enlightenment liberalism liberated science, trade, and political thought.",
    H,
  ),
  leftStatement(
    "Η Οκτωβριανή Επανάσταση ενέπνευσε κινήματα για κοινωνική δικαιοσύνη παγκοσμίως.",
    "The October Revolution inspired movements for social justice worldwide.",
    H,
  ),
  rightStatement(
    "Το σοβιετικό πείραμα απέτυχε λόγω συγκέντρωσης εξουσίας, όχι παρά τις ιδεολογικές του στόχους.",
    "The Soviet experiment failed due to power concentration, not despite its ideological goals.",
    H,
  ),
  iq(
    "Η ιστορία διδάσκει ότι καμία ιδεολογία δεν κατέχει απόλυτη αλήθεια.",
    "History teaches that no ideology holds absolute truth.",
    H,
    1,
    1,
  ),
  leftStatement(
    "Ο φασισμός και ο ναζισμός αποτελούν ακραία έκφραση του καπιταλισμού και του εθνικισμού.",
    "Fascism and Nazism are extreme expressions of capitalism and nationalism.",
    H,
  ),
  rightStatement(
    "Ο ολοκληρωτισμός και ο κομμουνισμός οδήγησαν σε περισσότερους θανάτους από τον φασισμό τον 20ό αιώνα.",
    "Totalitarianism and communism caused more deaths than fascism in the 20th century.",
    H,
  ),
  leftStatement(
    "Η Διαφώτιση ενίσχυσε τον ορθολογισμό έναντι της θρησκευτικής δογματικής.",
    "The Enlightenment strengthened rationalism over religious dogma.",
    H,
  ),
  rightStatement(
    "Ο συντηρισμός του Burke προειδοποίησε σωστά για τους κινδύνους της αβλεψίας απέναντι στην παράδοση.",
    "Burke's conservatism correctly warned of the dangers of recklessness toward tradition.",
    H,
  ),
  leftStatement(
    "Η αποικιοκρατία και η δουλεία είναι βασικά εγκλήματα της δυτικής ιστορίας.",
    "Colonialism and slavery are foundational crimes of Western history.",
    H,
  ),
  rightStatement(
    "Η δυτική παράδοση — δημοκρατία, επιστήμη, δικαιώματα — αξίζει να υπερασπίζεται.",
    "The Western tradition — democracy, science, rights — deserves defense.",
    H,
  ),
  leftStatement(
    "Οι επαναστάσεις του 1848 άνοιξαν τον δρόμο για εκλογική δημοκρατία και κοινωνικά δικαιώματα.",
    "The revolutions of 1848 opened the path to electoral democracy and social rights.",
    H,
  ),
  rightStatement(
    "Η σταθερότητα της Βρετανικής Συνταγματικής Μοναρχίας απέδειξε ότι η μεταρρύθμιση υπερισχύει της επανάστασης.",
    "The stability of the British constitutional monarchy proved reform prevails over revolution.",
    H,
  ),
  iq(
    "Ο καπιταλισμός και ο σοσιαλισμός αντλούν και οι δύο από ιδέες του Διαφωτισμού.",
    "Both capitalism and socialism draw from Enlightenment ideas.",
    H,
    1,
    1,
  ),
  leftStatement(
    "Η ιστορία της εργασίας και των συνδικάτων είναι κεντρική για την κατανόηση της σύγχρονης πολιτικής.",
    "The history of labor and unions is central to understanding modern politics.",
    H,
  ),
  rightStatement(
    "Η ιδιωτική πρωτοβουλία και το εμπόριο οδήγησαν την ανθρώπινη πρόοδο περισσότερο από κρατικές εντολές.",
    "Private initiative and trade drove human progress more than state commands.",
    H,
  ),
  leftStatement(
    "Ο λαϊκός πολιτισμός και οι μαζικές κινήσεις διαμόρφωσαν την ιστορία όσο και οι ηγέτες.",
    "Popular culture and mass movements shaped history as much as leaders.",
    H,
  ),
  rightStatement(
    "Οι μεγάλοι άνδρες και οι θεσμοί διαμόρφωσαν την ιστορία περισσότερο από ανώνυμες μάζες.",
    "Great men and institutions shaped history more than anonymous masses.",
    H,
  ),
  leftStatement(
    "Η ισότητα ενώπιον του νόμου είναι κενή χωρίς οικονομική και κοινωνική ισότητα.",
    "Equality before the law is empty without economic and social equality.",
    H,
  ),
  rightStatement(
    "Η ελευθερία του ατόμου προηγείται της ισότητας ως πολιτικής αρχής.",
    "Individual liberty precedes equality as a political principle.",
    H,
  ),
];

function dedupeIdeologyQuestions(questions: IdeologyQuestionSeed[]): IdeologyQuestionSeed[] {
  const seen = new Set<string>();
  const result: IdeologyQuestionSeed[] = [];

  for (const question of questions) {
    const key = question.text.trim().toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(question);
  }

  return result;
}

function generateExtraIdeology(): void {
  const normalized = dedupeIdeologyQuestions(extra);
  const outPath = path.join(__dirname, "data", "extraIdeologyQuestions.json");
  fs.writeFileSync(outPath, JSON.stringify(normalized, null, 2));
  console.log(`Generated ${normalized.length} extra ideology questions`);
}

if (process.argv[1]?.includes("generateExtraIdeology")) {
  generateExtraIdeology();
  process.exit(0);
}

export { generateExtraIdeology, extra };
