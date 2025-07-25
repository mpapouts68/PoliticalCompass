-- Add policy options for more scenarios (13-25)

INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
-- For scenario 13: Εκπαιδευτική Κρίση
(13, 'Άμεση συμφωνία με εκπαιδευτικούς και αυξήσεις', 'Immediate agreement with teachers and raises', 3, -3, 4, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Τα σχολεία ανοίγουν αλλά το δημοσιονομικό κόστος είναι μεγάλο.', 'Schools reopen but fiscal cost is high.'),
(13, 'Ψηφιακή εκπαίδευση και προσωρινές λύσεις', 'Digital education and temporary solutions', 6, -1, 1, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 3}', 'Συνέχεια μαθημάτων αλλά προβλήματα πρόσβασης και ποιότητας.', 'Continued lessons but access and quality problems.'),
(13, 'Μεταρρύθμιση εκπαιδευτικού συστήματος', 'Education system reform', 8, -2, 2, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 3, "ΚΚΕ": 1, "ΕΛ": 2}', 'Μακροπρόθεσμα οφέλη αλλά παρατεταμένη κρίση και αντιδράσεις.', 'Long-term benefits but prolonged crisis and reactions.'),

-- For scenario 14: Οικονομικό Σκάνδαλο
(14, 'Πλήρης διερεύνηση και παραδειγματική τιμωρία', 'Full investigation and exemplary punishment', 6, -1, 4, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Αποκατάσταση εμπιστοσύνης αλλά πολιτικές συγκρούσεις.', 'Trust restoration but political conflicts.'),
(14, 'Συγκάλυψη και προστασία εμπλεκομένων', 'Cover-up and protection of involved parties', 9, 1, -4, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 1, "ΚΚΕ": 1, "ΕΛ": 3}', 'Σοβαρή απώλεια αξιοπιστίας και λαϊκή οργή.', 'Serious credibility loss and popular anger.'),
(14, 'Μερική διερεύνηση και συμβολικές τιμωρίες', 'Partial investigation and symbolic punishments', 7, 0, 1, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 2}', 'Ελεγχόμενη διαχείριση αλλά μόνο μερική ικανοποίηση κοινής γνώμης.', 'Controlled management but only partial public satisfaction.'),

-- For scenario 15: Περιβαλλοντική Κρίση (River pollution)
(15, 'Άμεση απομάκρυνση μόλυνσης και καθαρισμός', 'Immediate pollution removal and cleanup', 4, -3, 4, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 4}', 'Γρήγορη αποκατάσταση περιβάλλοντος αλλά υψηλό κόστος.', 'Quick environmental restoration but high cost.'),
(15, 'Νομικές ενέργειες κατά των ρυπαντών', 'Legal action against polluters', 6, -1, 3, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 3, "ΕΛ": 2}', 'Δικαιοσύνη και αποζημιώσεις αλλά αργή διαδικασία.', 'Justice and compensation but slow process.'),
(15, 'Πρόληψη μελλοντικών περιστατικών', 'Prevention of future incidents', 5, -2, 2, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 3}', 'Μακροπρόθεσμη προστασία αλλά το τρέχον πρόβλημα παραμένει.', 'Long-term protection but current problem remains.'),

-- Add more scenarios (scenarios 16-30 covering various crisis types)
-- For scenario 16: Τουριστική Κρίση
(16, 'Επιδότηση τουριστικών επιχειρήσεων', 'Tourism business subsidies', 5, -3, 2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 3}', 'Διάσωση επιχειρήσεων αλλά βάρος στον προϋπολογισμό.', 'Business rescue but budget burden.'),
(16, 'Εναλλακτικός τουρισμός και νέες αγορές', 'Alternative tourism and new markets', 3, -1, 3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 3}', 'Διαφοροποίηση και ανάκαμψη αλλά αργή προσαρμογή.', 'Diversification and recovery but slow adaptation.'),
(16, 'Μείωση φόρων και απελευθέρωση αγοράς', 'Tax reduction and market liberalization', 6, 1, 1, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 3}', 'Ανταγωνιστικότητα αλλά μείωση δημοσίων εσόδων.', 'Competitiveness but reduced public revenue.'),

-- For scenario 17: Δικαστική Κρίση
(17, 'Μεταρρύθμιση δικαστικού συστήματος', 'Judicial system reform', 7, -2, 2, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 2, "ΕΛ": 2}', 'Μακροπρόθεσμη βελτίωση αλλά βραχυπρόθεσμη αστάθεια.', 'Long-term improvement but short-term instability.'),
(17, 'Αύξηση αμοιβών και βελτίωση συνθηκών', 'Salary increase and condition improvement', 4, -3, 3, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Αποκατάσταση λειτουργίας αλλά δημοσιονομικό κόστος.', 'Function restoration but fiscal cost.'),
(17, 'Ιδιωτικοποίηση τμημάτων δικαιοσύνης', 'Privatization of justice sectors', 9, 1, -3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 1, "ΚΚΕ": 1, "ΕΛ": 2}', 'Αποδοτικότητα αλλά υπονόμευση πρόσβασης στη δικαιοσύνη.', 'Efficiency but undermining access to justice.');
