-- Continue with scenarios 6-20

-- Scenario 6: Εκλογική Απάτη (Electoral Fraud)
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(6, 'Άμεση διερεύνηση από Εισαγγελία και ακύρωση αμφίβολων αποτελεσμάτων', 'Immediate prosecutor investigation and annulment of dubious results', 8, -2, 3, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Αποκατάσταση δημοκρατικής νομιμότητας αλλά πολιτική κρίση.', 'Restoration of democratic legitimacy but political crisis.'),
(6, 'Διεθνή παρατηρητήρια και επανάληψη εκλογών', 'International observers and repeat elections', 6, -1, 4, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 2}', 'Διεθνής εγκυρότητα αλλά κόστος και καθυστέρηση.', 'International validity but cost and delay.'),
(6, 'Απόρριψη κατηγοριών και επικύρωση αποτελεσμάτων', 'Reject allegations and validate results', 9, 1, -3, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 4}', 'Σοβαρή απώλεια εμπιστοσύνης στο εκλογικό σύστημα.', 'Serious loss of confidence in electoral system.');

-- Scenario 7: Τροφική Κρίση (Food Crisis)
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(7, 'Κρατικός έλεγχος τιμών και επιδότηση βασικών αγαθών', 'State price controls and basic goods subsidies', 6, -3, 4, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Βραχυπρόθεσμη στήριξη αλλά δημιουργία μαύρης αγοράς.', 'Short-term support but black market creation.'),
(7, 'Εισαγωγές έκτακτης ανάγκης και διεθνής βοήθεια', 'Emergency imports and international aid', 4, -2, 3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 2}', 'Γρήγορη επίλυση αλλά εξάρτηση από εξωτερικές πηγές.', 'Quick solution but dependence on external sources.'),
(7, 'Στήριξη εγχώριας παραγωγής και ελεύθερη αγορά', 'Support domestic production and free market', 7, 2, -2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 3}', 'Μακροπρόθεσμη λύση αλλά βραχυπρόθεσμη ταλαιπωρία.', 'Long-term solution but short-term hardship.');

-- Scenario 8: Στρατιωτική Κρίση (Military Crisis)
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(8, 'Πλήρης στρατιωτική κινητοποίηση και αμυντική στάση', 'Full military mobilization and defensive stance', 8, -4, 2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 4}', 'Ισχυρή αποτροπή αλλά τεράστιο οικονομικό κόστος.', 'Strong deterrence but huge economic cost.'),
(8, 'Διπλωματική επίλυση με διεθνή διαμεσολάβηση', 'Diplomatic resolution with international mediation', 5, -1, 3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 2}', 'Ειρηνική επίλυση αλλά πιθανές εδαφικές παραχωρήσεις.', 'Peaceful resolution but possible territorial concessions.'),
(8, 'Στρατηγική αποχώρηση και επανεξοπλισμός', 'Strategic withdrawal and rearmament', 6, -2, 1, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 2, "ΚΚΕ": 3, "ΕΛ": 1}', 'Αποφυγή σύγκρουσης αλλά απώλεια κύρους.', 'Conflict avoidance but prestige loss.');

-- Scenario 9: Κυβερνοεπίθεση (Cyber Attack)
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(9, 'Άμεση αποσύνδεση συστημάτων και κήρυξη κυβερνοπολέμου', 'Immediate system disconnection and cyber war declaration', 7, -3, 1, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 2, "ΕΛ": 4}', 'Προστασία συστημάτων αλλά παράλυση υπηρεσιών.', 'System protection but service paralysis.'),
(9, 'Διεθνή συνεργασία και κοινή αντίδραση με συμμάχους', 'International cooperation and joint response with allies', 4, -1, 2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 3}', 'Αποτελεσματική αντιμετώπιση με διεθνή στήριξη.', 'Effective response with international support.'),
(9, 'Αθόρυβη αποκατάσταση και ενίσχυση κυβερνοάμυνας', 'Silent restoration and cyber defense strengthening', 3, -2, 3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 3, "ΕΛ": 2}', 'Αποφυγή πανικού αλλά κίνδυνος επανάληψης.', 'Panic avoidance but repetition risk.');

-- Scenario 10: Μεταναστευτική Κρίση (Migration Crisis)
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(10, 'Κλείσιμο συνόρων και επιστροφή μεταναστών', 'Border closure and migrant returns', 8, -1, -3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 2, "ΚΚΕ": 2, "ΕΛ": 4}', 'Μείωση εισροών αλλά διεθνής καταδίκη.', 'Reduced inflows but international condemnation.'),
(10, 'Ευρωπαϊκή λύση και αναδιανομή μεταναστών', 'European solution and migrant redistribution', 5, -2, 4, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 2}', 'Διεθνής στήριξη αλλά αργή υλοποίηση.', 'International support but slow implementation.'),
(10, 'Ενταξιακά προγράμματα και στήριξη νησιών', 'Integration programs and island support', 6, -3, 3, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 2}', 'Ανθρωπιστική προσέγγιση αλλά υψηλό κόστος.', 'Humanitarian approach but high cost.');
