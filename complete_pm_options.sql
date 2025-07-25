-- Add comprehensive policy options for all remaining PM scenarios

INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
-- For scenario 8: Στρατιωτική Κρίση
(8, 'Πλήρης στρατιωτική κινητοποίηση και αμυντική στάση', 'Full military mobilization and defensive stance', 8, -4, 2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 4}', 'Ισχυρή αποτροπή αλλά τεράστιο οικονομικό κόστος και κίνδυνος κλιμάκωσης.', 'Strong deterrence but huge economic cost and escalation risk.'),
(8, 'Διπλωματική επίλυση με διεθνή διαμεσολάβηση', 'Diplomatic resolution with international mediation', 5, -1, 3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 2}', 'Ειρηνική επίλυση αλλά πιθανές εδαφικές παραχωρήσεις.', 'Peaceful resolution but possible territorial concessions.'),
(8, 'Στρατηγική αποχώρηση και επανεξοπλισμός', 'Strategic withdrawal and rearmament', 6, -2, 1, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 2, "ΚΚΕ": 3, "ΕΛ": 1}', 'Αποφυγή άμεσης σύγκρουσης αλλά απώλεια κύρους και εδάφους.', 'Avoidance of immediate conflict but loss of prestige and territory.'),

-- For scenario 9: Κυβερνοεπίθεση
(9, 'Άμεση αποσύνδεση συστημάτων και κήρυξη κυβερνοπολέμου', 'Immediate system disconnection and declaration of cyber war', 7, -3, 1, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 2, "ΕΛ": 4}', 'Προστασία συστημάτων αλλά παράλυση υπηρεσιών και κλιμάκωση.', 'System protection but service paralysis and escalation.'),
(9, 'Διεθνή συνεργασία και κοινή αντίδραση με συμμάχους', 'International cooperation and joint response with allies', 4, -1, 2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 3}', 'Αποτελεσματική αντιμετώπιση με διεθνή στήριξη.', 'Effective response with international support.'),
(9, 'Αθόρυβη αποκατάσταση και ενίσχυση κυβερνοάμυνας', 'Silent restoration and cyber defense strengthening', 3, -2, 3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 3, "ΕΛ": 2}', 'Αποφυγή πανικού αλλά κίνδυνος επανάληψης επιθέσεων.', 'Avoidance of panic but risk of repeat attacks.'),

-- For scenario 10: Μεταναστευτική Κρίση
(10, 'Κλείσιμο συνόρων και επιστροφή μεταναστών', 'Border closure and migrant returns', 8, -1, -3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 2, "ΚΚΕ": 2, "ΕΛ": 4}', 'Μείωση εισροών αλλά διεθνής καταδίκη και ανθρωπιστική κρίση.', 'Reduced inflows but international condemnation and humanitarian crisis.'),
(10, 'Ευρωπαϊκή λύση και αναδιανομή μεταναστών', 'European solution and migrant redistribution', 5, -2, 4, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 2}', 'Διεθνής στήριξη και μόνιμη λύση αλλά αργή υλοποίηση.', 'International support and permanent solution but slow implementation.'),
(10, 'Ενταξιακά προγράμματα και στήριξη νησιών', 'Integration programs and island support', 6, -3, 3, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 2}', 'Ανθρωπιστική προσέγγιση αλλά υψηλό κόστος και τοπικές αντιδράσεις.', 'Humanitarian approach but high cost and local reactions.'),

-- For scenario 11: Ενεργειακή Κρίση
(11, 'Κρατικοποίηση ενεργειακών εταιρειών', 'Nationalization of energy companies', 9, -3, 2, '{"ΝΔ": 1, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 3, "ΚΚΕ": 4, "ΕΛ": 3}', 'Κρατικός έλεγχος αλλά διεθνής καταδίκη και εξορθολογισμός.', 'State control but international condemnation and rationalization.'),
(11, 'Διαφοροποίηση προμηθευτών και ΑΠΕ', 'Supplier diversification and renewables', 5, -2, 3, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 3}', 'Μακροπρόθεσμη ενεργειακή ανεξαρτησία αλλά βραχυπρόθεσμη κρίση.', 'Long-term energy independence but short-term crisis.'),
(11, 'Συνεργασία με παραδοσιακούς προμηθευτές', 'Cooperation with traditional suppliers', 7, 1, -2, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 4}', 'Άμεση λύση αλλά εξάρτηση και πολιτικό κόστος.', 'Immediate solution but dependence and political cost.'),

-- For scenario 12: Νοσοκομειακή Κρίση
(12, 'Μαζικές προσλήψεις γιατρών και νοσηλευτών', 'Mass hiring of doctors and nurses', 4, -4, 4, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Βελτίωση υπηρεσιών αλλά τεράστιο δημοσιονομικό κόστος.', 'Service improvement but huge fiscal cost.'),
(12, 'Ιδιωτικοποίηση νοσοκομείων και συμπράξεις', 'Hospital privatization and partnerships', 8, 2, -3, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 3}', 'Αποδοτικότητα αλλά αύξηση κόστους υγείας για πολίτες.', 'Efficiency but increased healthcare costs for citizens.'),
(12, 'Στοχευμένη ενίσχυση και αναδιοργάνωση', 'Targeted reinforcement and reorganization', 5, -2, 2, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 3}', 'Σταδιακή βελτίωση με ισορροπημένο κόστος.', 'Gradual improvement with balanced cost.');
