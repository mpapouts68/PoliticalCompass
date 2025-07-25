-- Continue with scenarios 11-35, each precisely matched to its description

-- Scenario 11: Εκλογική Απάτη (Electoral Fraud)
-- Description: Κατηγορίες για νοθεία στις εκλογές.
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(11, 'Άμεση διερεύνηση και ακύρωση αμφίβολων αποτελεσμάτων', 'Immediate investigation and annulment of dubious results', 8, -2, 3, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Αποκατάσταση δημοκρατικής νομιμότητας αλλά πολιτική κρίση.', 'Restoration of democratic legitimacy but political crisis.'),
(11, 'Διεθνή παρατηρητήρια και επανάληψη εκλογών', 'International observers and repeat elections', 6, -1, 4, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 2}', 'Διεθνής εγκυρότητα αλλά κόστος και καθυστέρηση.', 'International validity but cost and delay.'),
(11, 'Απόρριψη κατηγοριών και επικύρωση αποτελεσμάτων', 'Reject allegations and validate results', 9, 1, -3, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 4}', 'Σοβαρή απώλεια εμπιστοσύνης στο εκλογικό σύστημα.', 'Serious loss of confidence in electoral system.');

-- Scenario 12: Τροφική Κρίση (Food Crisis)
-- Description: Έλλειψη βασικών αγαθών στα σούπερ μάρκετ.
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(12, 'Κρατικός έλεγχος τιμών και επιδότηση βασικών αγαθών', 'State price controls and basic goods subsidies', 6, -3, 4, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Βραχυπρόθεσμη στήριξη αλλά δημιουργία μαύρης αγοράς.', 'Short-term support but black market creation.'),
(12, 'Εισαγωγές έκτακτης ανάγκης και διεθνής βοήθεια', 'Emergency imports and international aid', 4, -2, 3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 2}', 'Γρήγορη επίλυση αλλά εξάρτηση από εξωτερικές πηγές.', 'Quick solution but dependence on external sources.'),
(12, 'Στήριξη εγχώριας παραγωγής και ελεύθερη αγορά', 'Support domestic production and free market', 7, 2, -2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 3}', 'Μακροπρόθεσμη λύση αλλά βραχυπρόθεσμη ταλαιπωρία.', 'Long-term solution but short-term hardship.');

-- Scenario 13: Στρατιωτική Κρίση (Military Crisis)
-- Description: Ένοπλη σύγκρουση στα σύνορα.
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(13, 'Πλήρης στρατιωτική κινητοποίηση και αμυντική στάση', 'Full military mobilization and defensive stance', 8, -4, 2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 4}', 'Ισχυρή αποτροπή αλλά τεράστιο οικονομικό κόστος.', 'Strong deterrence but huge economic cost.'),
(13, 'Διπλωματική επίλυση με διεθνή διαμεσολάβηση', 'Diplomatic resolution with international mediation', 5, -1, 3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 2}', 'Ειρηνική επίλυση αλλά πιθανές εδαφικές παραχωρήσεις.', 'Peaceful resolution but possible territorial concessions.'),
(13, 'Στρατηγική αποχώρηση και επανεξοπλισμός', 'Strategic withdrawal and rearmament', 6, -2, 1, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 2, "ΚΚΕ": 3, "ΕΛ": 1}', 'Αποφυγή σύγκρουσης αλλά απώλεια κύρους.', 'Conflict avoidance but prestige loss.');

-- Scenario 14: Κυβερνοεπίθεση (Cyber Attack)
-- Description: Χάκερς στοχεύουν κυβερνητικά συστήματα.
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(14, 'Άμεση αποσύνδεση συστημάτων και κήρυξη κυβερνοπολέμου', 'Immediate system disconnection and cyber war declaration', 7, -3, 1, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 2, "ΕΛ": 4}', 'Προστασία συστημάτων αλλά παράλυση υπηρεσιών.', 'System protection but service paralysis.'),
(14, 'Διεθνή συνεργασία και κοινή αντίδραση με συμμάχους', 'International cooperation and joint response with allies', 4, -1, 2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 3}', 'Αποτελεσματική αντιμετώπιση με διεθνή στήριξη.', 'Effective response with international support.'),
(14, 'Αθόρυβη αποκατάσταση και ενίσχυση κυβερνοάμυνας', 'Silent restoration and cyber defense strengthening', 3, -2, 3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 3, "ΕΛ": 2}', 'Αποφυγή πανικού αλλά κίνδυνος επανάληψης.', 'Panic avoidance but repetition risk.');

-- Scenario 15: Μεταναστευτική Κρίση (Migration Crisis)
-- Description: Χιλιάδες μετανάστες στα νησιά.
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(15, 'Κλείσιμο συνόρων και επιστροφή μεταναστών', 'Border closure and migrant returns', 8, -1, -3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 2, "ΚΚΕ": 2, "ΕΛ": 4}', 'Μείωση εισροών αλλά διεθνής καταδίκη.', 'Reduced inflows but international condemnation.'),
(15, 'Ευρωπαϊκή λύση και αναδιανομή μεταναστών', 'European solution and migrant redistribution', 5, -2, 4, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 2}', 'Διεθνής στήριξη αλλά αργή υλοποίηση.', 'International support but slow implementation.'),
(15, 'Ενταξιακά προγράμματα και στήριξη νησιών', 'Integration programs and island support', 6, -3, 3, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 2}', 'Ανθρωπιστική προσέγγιση αλλά υψηλό κόστος.', 'Humanitarian approach but high cost.');

-- Scenario 16: Ενεργειακή Κρίση (Energy Crisis)
-- Description: Διακοπή ενέργειας σε όλη τη χώρα.
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(16, 'Κρατικοποίηση ενεργειακών εταιρειών', 'Nationalization of energy companies', 9, -3, 2, '{"ΝΔ": 1, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 3, "ΚΚΕ": 4, "ΕΛ": 3}', 'Κρατικός έλεγχος αλλά διεθνής καταδίκη.', 'State control but international condemnation.'),
(16, 'Διαφοροποίηση προμηθευτών και ΑΠΕ', 'Supplier diversification and renewables', 5, -2, 3, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 3}', 'Μακροπρόθεσμη ενεργειακή ανεξαρτησία.', 'Long-term energy independence.'),
(16, 'Συνεργασία με παραδοσιακούς προμηθευτές', 'Cooperation with traditional suppliers', 7, 1, -2, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 4}', 'Άμεση λύση αλλά εξάρτηση.', 'Immediate solution but dependence.');

-- Scenario 17: Νοσοκομειακή Κρίση (Hospital Crisis)
-- Description: Κατάρρευση του ΕΣΥ.
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(17, 'Μαζικές προσλήψεις γιατρών και νοσηλευτών', 'Mass hiring of doctors and nurses', 4, -4, 4, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Βελτίωση υπηρεσιών υγείας αλλά μεγάλο κόστος.', 'Healthcare service improvement but large cost.'),
(17, 'Ιδιωτικοποίηση νοσοκομείων και συμπράξεις', 'Hospital privatization and partnerships', 8, 2, -3, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 3}', 'Αποδοτικότητα αλλά αύξηση κόστους για πολίτες.', 'Efficiency but increased costs for citizens.'),
(17, 'Στοχευμένη ενίσχυση και αναδιοργάνωση ΕΣΥ', 'Targeted reinforcement and NHS reorganization', 5, -2, 2, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 3}', 'Σταδιακή βελτίωση με ισορροπημένο κόστος.', 'Gradual improvement with balanced cost.');

-- Scenario 18: Εκπαιδευτική Κρίση (Educational Crisis)
-- Description: Κλείσιμο σχολείων λόγω απεργιών.
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(18, 'Άμεση συμφωνία με εκπαιδευτικούς και αυξήσεις', 'Immediate agreement with teachers and raises', 3, -3, 4, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Τα σχολεία ανοίγουν αλλά μεγάλο κόστος.', 'Schools reopen but large cost.'),
(18, 'Ψηφιακή εκπαίδευση και προσωρινές λύσεις', 'Digital education and temporary solutions', 6, -1, 1, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 3}', 'Συνέχεια μαθημάτων αλλά προβλήματα ποιότητας.', 'Continued lessons but quality problems.'),
(18, 'Μεταρρύθμιση εκπαιδευτικού συστήματος', 'Education system reform', 8, -2, 2, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 3, "ΚΚΕ": 1, "ΕΛ": 2}', 'Μακροπρόθεσμα οφέλη αλλά παρατεταμένη κρίση.', 'Long-term benefits but prolonged crisis.');
