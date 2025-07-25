-- Fix other specific scenarios that need proper contextual options

-- Scenario 19: Οικονομικό Σκάνδαλο (Financial Scandal)
DELETE FROM pm_policy_options WHERE scenario_id = 19;
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(19, 'Πλήρης διερεύνηση και παραδειγματική τιμωρία', 'Full investigation and exemplary punishment', 6, -1, 4, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Αποκατάσταση εμπιστοσύνης αλλά πολιτικές συγκρούσεις.', 'Trust restoration but political conflicts.'),
(19, 'Συγκάλυψη και προστασία εμπλεκομένων', 'Cover-up and protection of involved parties', 9, 1, -4, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 1, "ΚΚΕ": 1, "ΕΛ": 3}', 'Σοβαρή απώλεια αξιοπιστίας και λαϊκή οργή.', 'Serious credibility loss and popular anger.'),
(19, 'Μερική διερεύνηση και συμβολικές τιμωρίες', 'Partial investigation and symbolic punishments', 7, 0, 1, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 2}', 'Ελεγχόμενη διαχείριση αλλά μόνο μερική ικανοποίηση κοινής γνώμης.', 'Controlled management but only partial public satisfaction.');

-- Scenario 20: Περιβαλλοντική Κρίση (Environmental Crisis)
DELETE FROM pm_policy_options WHERE scenario_id = 20;
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(20, 'Άμεση απομάκρυνση μόλυνσης και καθαρισμός', 'Immediate pollution removal and cleanup', 4, -3, 4, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 4}', 'Γρήγορη αποκατάσταση περιβάλλοντος αλλά υψηλό κόστος.', 'Quick environmental restoration but high cost.'),
(20, 'Νομικές ενέργειες κατά των ρυπαντών', 'Legal action against polluters', 6, -1, 3, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 3, "ΕΛ": 2}', 'Δικαιοσύνη και αποζημιώσεις αλλά αργή διαδικασία.', 'Justice and compensation but slow process.'),
(20, 'Πρόληψη μελλοντικών περιστατικών', 'Prevention of future incidents', 5, -2, 2, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 3}', 'Μακροπρόθεσμη προστασία αλλά το τρέχον πρόβλημα παραμένει.', 'Long-term protection but current problem remains.');

-- Scenario 21: Τουριστική Κρίση (Tourism Crisis)
DELETE FROM pm_policy_options WHERE scenario_id = 21;
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(21, 'Επιδότηση τουριστικών επιχειρήσεων', 'Tourism business subsidies', 5, -3, 2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 3}', 'Διάσωση επιχειρήσεων αλλά βάρος στον προϋπολογισμό.', 'Business rescue but budget burden.'),
(21, 'Εναλλακτικός τουρισμός και νέες αγορές', 'Alternative tourism and new markets', 3, -1, 3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 3}', 'Διαφοροποίηση και ανάκαμψη αλλά αργή προσαρμογή.', 'Diversification and recovery but slow adaptation.'),
(21, 'Μείωση φόρων και απελευθέρωση αγοράς', 'Tax reduction and market liberalization', 6, 1, 1, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 3}', 'Ανταγωνιστικότητα αλλά μείωση δημοσίων εσόδων.', 'Competitiveness but reduced public revenue.');

-- Scenario 22: Δικαστική Κρίση (Judicial Crisis)
DELETE FROM pm_policy_options WHERE scenario_id = 22;
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(22, 'Μεταρρύθμιση δικαστικού συστήματος', 'Judicial system reform', 8, -2, 2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 3, "ΚΚΕ": 1, "ΕΛ": 3}', 'Μακροπρόθεσμη βελτίωση αλλά πολιτικές αντιδράσεις.', 'Long-term improvement but political reactions.'),
(22, 'Αύξηση αμοιβών και βελτίωση συνθηκών', 'Salary increase and condition improvement', 4, -3, 3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 2}', 'Επιστροφή στην κανονικότητα αλλά μεγάλο κόστος.', 'Return to normalcy but large cost.'),
(22, 'Διάλογος και σταδιακές παραχωρήσεις', 'Dialogue and gradual concessions', 5, -1, 2, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 3}', 'Ισορροπημένη λύση χωρίς ακραίες θέσεις.', 'Balanced solution without extreme positions.');
