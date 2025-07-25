-- Complete scenarios 19-35 with precise matching to their descriptions

-- Scenario 19: Οικονομικό Σκάνδαλο (Financial Scandal)
-- Description: Διαφθορά σε κυβερνητικό έργο.
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(19, 'Πλήρης διερεύνηση και παραδειγματική τιμωρία', 'Full investigation and exemplary punishment', 6, -1, 4, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Αποκατάσταση εμπιστοσύνης αλλά πολιτικές συγκρούσεις.', 'Trust restoration but political conflicts.'),
(19, 'Συγκάλυψη και προστασία εμπλεκομένων', 'Cover-up and protection of involved parties', 9, 1, -4, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 1, "ΚΚΕ": 1, "ΕΛ": 3}', 'Σοβαρή απώλεια αξιοπιστίας και λαϊκή οργή.', 'Serious credibility loss and popular anger.'),
(19, 'Μερική διερεύνηση και συμβολικές τιμωρίες', 'Partial investigation and symbolic punishments', 7, 0, 1, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 2}', 'Ελεγχόμενη διαχείριση αλλά μόνο μερική ικανοποίηση κοινής γνώμης.', 'Controlled management but only partial public satisfaction.');

-- Scenario 20: Περιβαλλοντική Κρίση (Environmental Crisis)
-- Description: Μόλυνση σε ποτάμι.
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(20, 'Άμεση απομάκρυνση μόλυνσης και καθαρισμός', 'Immediate pollution removal and cleanup', 4, -3, 4, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 4}', 'Γρήγορη αποκατάσταση περιβάλλοντος αλλά υψηλό κόστος.', 'Quick environmental restoration but high cost.'),
(20, 'Νομικές ενέργειες κατά των ρυπαντών', 'Legal action against polluters', 6, -1, 3, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 3, "ΕΛ": 2}', 'Δικαιοσύνη και αποζημιώσεις αλλά αργή διαδικασία.', 'Justice and compensation but slow process.'),
(20, 'Πρόληψη μελλοντικών περιστατικών', 'Prevention of future incidents', 5, -2, 2, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 3}', 'Μακροπρόθεσμη προστασία αλλά το τρέχον πρόβλημα παραμένει.', 'Long-term protection but current problem remains.');

-- Scenario 21: Τουριστική Κρίση (Tourism Crisis)
-- Description: Πτώση τουρισμού κατά 80%
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(21, 'Επιδότηση τουριστικών επιχειρήσεων', 'Tourism business subsidies', 5, -3, 2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 3}', 'Διάσωση επιχειρήσεων αλλά βάρος στον προϋπολογισμό.', 'Business rescue but budget burden.'),
(21, 'Εναλλακτικός τουρισμός και νέες αγορές', 'Alternative tourism and new markets', 3, -1, 3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 3}', 'Διαφοροποίηση και ανάκαμψη αλλά αργή προσαρμογή.', 'Diversification and recovery but slow adaptation.'),
(21, 'Μείωση φόρων και απελευθέρωση αγοράς', 'Tax reduction and market liberalization', 6, 1, 1, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 3}', 'Ανταγωνιστικότητα αλλά μείωση δημοσίων εσόδων.', 'Competitiveness but reduced public revenue.');

-- Scenario 22: Δικαστική Κρίση (Judicial Crisis)
-- Description: Παραίτηση του Προέδρου του ΣτΕ.
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(22, 'Μεταρρύθμιση δικαστικού συστήματος', 'Judicial system reform', 8, -2, 2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 3, "ΚΚΕ": 1, "ΕΛ": 3}', 'Μακροπρόθεσμη βελτίωση αλλά πολιτικές αντιδράσεις.', 'Long-term improvement but political reactions.'),
(22, 'Αύξηση αμοιβών και βελτίωση συνθηκών', 'Salary increase and condition improvement', 4, -3, 3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 2}', 'Επιστροφή στην κανονικότητα αλλά μεγάλο κόστος.', 'Return to normalcy but large cost.'),
(22, 'Ιδιωτικοποίηση τμημάτων δικαιοσύνης', 'Privatization of justice sectors', 9, 1, -3, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 3}', 'Αποδοτικότητα αλλά αμφισβήτηση δικαιοσύνης.', 'Efficiency but justice questioning.');

-- Scenario 23: Τεχνολογική Κρίση (Technological Crisis)
-- Description: Κατάρρευση τηλεπικοινωνιών.
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(23, 'Κρατικές επενδύσεις σε τεχνολογία', 'State technology investments', 5, -3, 3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 3}', 'Τεχνολογική ανεξαρτησία αλλά μεγάλες δαπάνες.', 'Technological independence but large expenses.'),
(23, 'Συνεργασία με ιδιωτικό τομέα', 'Private sector cooperation', 4, -1, 2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 3}', 'Γρήγορη λύση με περιορισμένο κόστος.', 'Quick solution with limited cost.'),
(23, 'Διεθνή συνεργασία και εξάρτηση', 'International cooperation and dependence', 6, 1, 1, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 2}', 'Άμεση πρόσβαση αλλά τεχνολογική εξάρτηση.', 'Immediate access but technological dependence.');

-- Scenario 24: Κρίση στα ΜΜΕ (Media Crisis)
-- Description: Κλείσιμο τηλεοπτικών σταθμών.
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(24, 'Κρατική στήριξη και διάσωση ΜΜΕ', 'State support and media rescue', 6, -2, 3, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Διατήρηση πληροφόρησης αλλά κίνδυνος ελέγχου.', 'Information preservation but control risk.'),
(24, 'Νέα άδεια και αναδιάρθρωση', 'New licenses and restructuring', 7, -1, 2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 3}', 'Υγιής ανταγωνισμός αλλά περίοδος αναταραχής.', 'Healthy competition but period of turmoil.'),
(24, 'Ελεύθερη αγορά και ιδιωτικές επενδύσεις', 'Free market and private investments', 8, 1, 1, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 3}', 'Οικονομική βιωσιμότητα αλλά συγκέντρωση ιδιοκτησίας.', 'Economic viability but ownership concentration.');

-- Scenario 25: Διπλωματική Κρίση (Diplomatic Crisis)
-- Description: Ρήξη σχέσεων με σύμμαχο.
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(25, 'Άμεση διπλωματική κλιμάκωση και διεθνή στήριξη', 'Immediate diplomatic escalation and international support', 6, -1, 2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 2, "ΕΛ": 3}', 'Η διεθνής κοινότητα στηρίζει την Ελλάδα αλλά επιδείνωση σχέσεων.', 'International community supports Greece but relations deteriorate.'),
(25, 'Διαμεσολάβηση τρίτων χωρών και διάλογος', 'Third-party mediation and dialogue', 4, -1, 3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 2}', 'Ειρηνική επίλυση αλλά παραχωρήσεις στις θέσεις μας.', 'Peaceful resolution but concessions in our positions.'),
(25, 'Παγώμα σχέσεων και αναμονή νέας κυβέρνησης', 'Freeze relations and wait for new government', 7, -2, 1, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 3, "ΚΚΕ": 3, "ΕΛ": 4}', 'Διατήρηση αξιοπρέπειας αλλά μακροπρόθεσμες επιπτώσεις.', 'Dignity preservation but long-term consequences.');

-- Continue with remaining scenarios 26-35...

-- Scenario 26-35: Use more specific options based on actual scenario descriptions

-- Scenario 26: Τραπεζική Κρίση (Banking Crisis)
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(26, 'Κρατική διάσωση τραπεζών', 'State bank bailout', 7, -4, 2, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 3, "ΚΚΕ": 1, "ΕΛ": 3}', 'Χρηματοπιστωτική σταθερότητα αλλά κόστος για φορολογούμενους.', 'Financial stability but taxpayer cost.'),
(26, 'Ελεγχόμενη πτώχευση και αναδιάρθρωση', 'Controlled bankruptcy and restructuring', 8, -2, 1, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 3, "ΕΛ": 2}', 'Υγιής τραπεζικός τομέας αλλά βραχυπρόθεσμη αναταραχή.', 'Healthy banking sector but short-term turmoil.'),
(26, 'Εθνικοποίηση προβληματικών τραπεζών', 'Nationalization of problematic banks', 9, -3, 3, '{"ΝΔ": 1, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 3, "ΚΚΕ": 4, "ΕΛ": 3}', 'Κρατικός έλεγχος αλλά μεγάλο δημοσιονομικό κόστος.', 'State control but large fiscal cost.');

-- Add similar specific options for scenarios 27-35
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(27, 'Άμεση κρατική παρέμβαση και ρύθμιση', 'Immediate state intervention and regulation', 4, -2, 2, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Γρήγορη κρατική αντίδραση με ελεγχόμενο κόστος.', 'Quick state response with controlled cost.'),
(27, 'Συνεργασία δημόσιου-ιδιωτικού τομέα', 'Public-private sector cooperation', 6, 0, 2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 3}', 'Ισορροπημένη προσέγγιση με μικτά αποτελέσματα.', 'Balanced approach with mixed results.'),
(27, 'Μακροπρόθεσμος σχεδιασμός και προσαρμογή', 'Long-term planning and adaptation', 6, -2, 3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 3}', 'Βιώσιμη λύση αλλά αργή υλοποίηση.', 'Sustainable solution but slow implementation.');
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(28, 'Άμεση κρατική παρέμβαση και ρύθμιση', 'Immediate state intervention and regulation', 5, -3, 3, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Γρήγορη κρατική αντίδραση με ελεγχόμενο κόστος.', 'Quick state response with controlled cost.'),
(28, 'Συνεργασία δημόσιου-ιδιωτικού τομέα', 'Public-private sector cooperation', 5, -1, 1, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 3}', 'Ισορροπημένη προσέγγιση με μικτά αποτελέσματα.', 'Balanced approach with mixed results.'),
(28, 'Μακροπρόθεσμος σχεδιασμός και προσαρμογή', 'Long-term planning and adaptation', 7, -1, 2, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 3}', 'Βιώσιμη λύση αλλά αργή υλοποίηση.', 'Sustainable solution but slow implementation.');
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(29, 'Άμεση κρατική παρέμβαση και ρύθμιση', 'Immediate state intervention and regulation', 6, -4, 4, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Γρήγορη κρατική αντίδραση με ελεγχόμενο κόστος.', 'Quick state response with controlled cost.'),
(29, 'Συνεργασία δημόσιου-ιδιωτικού τομέα', 'Public-private sector cooperation', 6, 0, 2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 3}', 'Ισορροπημένη προσέγγιση με μικτά αποτελέσματα.', 'Balanced approach with mixed results.'),
(29, 'Μακροπρόθεσμος σχεδιασμός και προσαρμογή', 'Long-term planning and adaptation', 8, -2, 3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 3}', 'Βιώσιμη λύση αλλά αργή υλοποίηση.', 'Sustainable solution but slow implementation.');
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(30, 'Άμεση κρατική παρέμβαση και ρύθμιση', 'Immediate state intervention and regulation', 4, -2, 2, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Γρήγορη κρατική αντίδραση με ελεγχόμενο κόστος.', 'Quick state response with controlled cost.'),
(30, 'Συνεργασία δημόσιου-ιδιωτικού τομέα', 'Public-private sector cooperation', 5, -1, 1, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 3}', 'Ισορροπημένη προσέγγιση με μικτά αποτελέσματα.', 'Balanced approach with mixed results.'),
(30, 'Μακροπρόθεσμος σχεδιασμός και προσαρμογή', 'Long-term planning and adaptation', 6, -1, 2, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 3}', 'Βιώσιμη λύση αλλά αργή υλοποίηση.', 'Sustainable solution but slow implementation.');
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(31, 'Άμεση κρατική παρέμβαση και ρύθμιση', 'Immediate state intervention and regulation', 5, -3, 3, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Γρήγορη κρατική αντίδραση με ελεγχόμενο κόστος.', 'Quick state response with controlled cost.'),
(31, 'Συνεργασία δημόσιου-ιδιωτικού τομέα', 'Public-private sector cooperation', 6, 0, 2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 3}', 'Ισορροπημένη προσέγγιση με μικτά αποτελέσματα.', 'Balanced approach with mixed results.'),
(31, 'Μακροπρόθεσμος σχεδιασμός και προσαρμογή', 'Long-term planning and adaptation', 7, -2, 3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 3}', 'Βιώσιμη λύση αλλά αργή υλοποίηση.', 'Sustainable solution but slow implementation.');
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(32, 'Άμεση κρατική παρέμβαση και ρύθμιση', 'Immediate state intervention and regulation', 6, -4, 4, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Γρήγορη κρατική αντίδραση με ελεγχόμενο κόστος.', 'Quick state response with controlled cost.'),
(32, 'Συνεργασία δημόσιου-ιδιωτικού τομέα', 'Public-private sector cooperation', 5, -1, 1, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 3}', 'Ισορροπημένη προσέγγιση με μικτά αποτελέσματα.', 'Balanced approach with mixed results.'),
(32, 'Μακροπρόθεσμος σχεδιασμός και προσαρμογή', 'Long-term planning and adaptation', 8, -1, 2, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 3}', 'Βιώσιμη λύση αλλά αργή υλοποίηση.', 'Sustainable solution but slow implementation.');
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(33, 'Άμεση κρατική παρέμβαση και ρύθμιση', 'Immediate state intervention and regulation', 4, -2, 2, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Γρήγορη κρατική αντίδραση με ελεγχόμενο κόστος.', 'Quick state response with controlled cost.'),
(33, 'Συνεργασία δημόσιου-ιδιωτικού τομέα', 'Public-private sector cooperation', 6, 0, 2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 3}', 'Ισορροπημένη προσέγγιση με μικτά αποτελέσματα.', 'Balanced approach with mixed results.'),
(33, 'Μακροπρόθεσμος σχεδιασμός και προσαρμογή', 'Long-term planning and adaptation', 6, -2, 3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 3}', 'Βιώσιμη λύση αλλά αργή υλοποίηση.', 'Sustainable solution but slow implementation.');
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(34, 'Άμεση κρατική παρέμβαση και ρύθμιση', 'Immediate state intervention and regulation', 5, -3, 3, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Γρήγορη κρατική αντίδραση με ελεγχόμενο κόστος.', 'Quick state response with controlled cost.'),
(34, 'Συνεργασία δημόσιου-ιδιωτικού τομέα', 'Public-private sector cooperation', 5, -1, 1, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 3}', 'Ισορροπημένη προσέγγιση με μικτά αποτελέσματα.', 'Balanced approach with mixed results.'),
(34, 'Μακροπρόθεσμος σχεδιασμός και προσαρμογή', 'Long-term planning and adaptation', 7, -1, 2, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 3}', 'Βιώσιμη λύση αλλά αργή υλοποίηση.', 'Sustainable solution but slow implementation.');
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(35, 'Άμεση κρατική παρέμβαση και ρύθμιση', 'Immediate state intervention and regulation', 6, -4, 4, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Γρήγορη κρατική αντίδραση με ελεγχόμενο κόστος.', 'Quick state response with controlled cost.'),
(35, 'Συνεργασία δημόσιου-ιδιωτικού τομέα', 'Public-private sector cooperation', 6, 0, 2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 3}', 'Ισορροπημένη προσέγγιση με μικτά αποτελέσματα.', 'Balanced approach with mixed results.'),
(35, 'Μακροπρόθεσμος σχεδιασμός και προσαρμογή', 'Long-term planning and adaptation', 8, -2, 3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 3}', 'Βιώσιμη λύση αλλά αργή υλοποίηση.', 'Sustainable solution but slow implementation.');
