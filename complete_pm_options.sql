-- Continue adding properly matched options for all scenarios

-- Scenario 7: Πανδημία COVID-19 (COVID-19 Pandemic)
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(7, 'Πλήρες lockdown για 2 μήνες και κρατική στήριξη', 'Full lockdown for 2 months with state support', 6, -4, 3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 2}', 'Έλεγχος της πανδημίας αλλά οικονομική καταστροφή.', 'Pandemic control but economic disaster.'),
(7, 'Στοχευμένα μέτρα και προστασία ευπαθών ομάδων', 'Targeted measures and vulnerable group protection', 4, -2, 2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 3, "ΕΛ": 3}', 'Ισορροπία υγείας και οικονομίας αλλά αργή αντίδραση.', 'Health-economy balance but slow response.'),
(7, 'Ανοσία της αγέλης και ελάχιστα μέτρα', 'Herd immunity and minimal measures', 8, 1, -3, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 1, "ΚΚΕ": 1, "ΕΛ": 4}', 'Διατήρηση οικονομίας αλλά τεράστιες απώλειες ζωών.', 'Economy preservation but huge loss of life.');

-- Scenario 8: Κατάρρευση Τράπεζας (Bank Collapse)
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(8, 'Κρατική διάσωση της τράπεζας', 'State bank bailout', 7, -3, 2, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 3, "ΚΚΕ": 1, "ΕΛ": 3}', 'Σταθερότητα χρηματοπιστωτικού συστήματος αλλά κοστίζει στους φορολογούμενους.', 'Financial system stability but costs taxpayers.'),
(8, 'Ελεγχόμενη πτώχευση και προστασία καταθέσεων', 'Controlled bankruptcy and deposit protection', 5, -2, 3, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 2}', 'Προστασία πολιτών αλλά αναταραχή στην αγορά.', 'Citizen protection but market turmoil.'),
(8, 'Εθνικοποίηση της τράπεζας', 'Bank nationalization', 8, -4, 4, '{"ΝΔ": 1, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 3, "ΚΚΕ": 4, "ΕΛ": 3}', 'Κρατικός έλεγχος αλλά μεγάλο δημοσιονομικό κόστος.', 'State control but large fiscal cost.');

-- Scenario 9: Φυσική Καταστροφή (Natural Disaster)
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(9, 'Άμεση κήρυξη κατάστασης έκτακτης ανάγκης', 'Immediate emergency state declaration', 3, -3, 4, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 4}', 'Γρήγορη διάσωση ζωών και περιουσιών.', 'Quick rescue of lives and property.'),
(9, 'Συντονισμένη επιχείρηση με τοπικές αρχές', 'Coordinated operation with local authorities', 4, -2, 3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 3}', 'Οργανωμένη αντίδραση αλλά αργότερη απόκριση.', 'Organized response but slower reaction.'),
(9, 'Κλήση διεθνούς βοήθειας από ΕΕ', 'Call for international EU aid', 5, -1, 3, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 2, "ΕΛ": 2}', 'Επαρκή μέσα αλλά εξάρτηση από εξωτερικούς φορείς.', 'Adequate means but dependence on external actors.');

-- Scenario 10: Απεργία ΜΜΜ (Public Transport Strike)
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(10, 'Άμεση συμφωνία με τα συνδικάτα και αυξήσεις', 'Immediate agreement with unions and raises', 4, -3, 4, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Αποκατάσταση μεταφορών αλλά αύξηση δημοσίου χρέους.', 'Transport restoration but increased public debt.'),
(10, 'Επίταξη και χρήση στρατιωτικών μέσων', 'Requisition and use of military means', 8, -1, -2, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 4}', 'Διατήρηση μεταφορών αλλά κλιμάκωση εντάσεων.', 'Transport maintenance but tension escalation.'),
(10, 'Προσωρινές λύσεις και διαπραγμάτευση', 'Temporary solutions and negotiation', 5, -2, 2, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 2}', 'Σταδιακή επίλυση με κοινωνική συναίνεση.', 'Gradual resolution with social consensus.');

-- Scenario 11: Εκλογική Απάτη (Electoral Fraud)
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(11, 'Άμεση διερεύνηση και ακύρωση αμφίβολων αποτελεσμάτων', 'Immediate investigation and annulment of dubious results', 8, -2, 3, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Αποκατάσταση δημοκρατικής νομιμότητας αλλά πολιτική κρίση.', 'Restoration of democratic legitimacy but political crisis.'),
(11, 'Διεθνή παρατηρητήρια και επανάληψη εκλογών', 'International observers and repeat elections', 6, -1, 4, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 2}', 'Διεθνής εγκυρότητα αλλά κόστος και καθυστέρηση.', 'International validity but cost and delay.'),
(11, 'Απόρριψη κατηγοριών και επικύρωση αποτελεσμάτων', 'Reject allegations and validate results', 9, 1, -3, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 4}', 'Σοβαρή απώλεια εμπιστοσύνης στο εκλογικό σύστημα.', 'Serious loss of confidence in electoral system.');

-- Scenario 12: Τροφική Κρίση (Food Crisis)
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(12, 'Κρατικός έλεγχος τιμών και επιδότηση βασικών αγαθών', 'State price controls and basic goods subsidies', 6, -3, 4, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Βραχυπρόθεσμη στήριξη αλλά δημιουργία μαύρης αγοράς.', 'Short-term support but black market creation.'),
(12, 'Εισαγωγές έκτακτης ανάγκης και διεθνής βοήθεια', 'Emergency imports and international aid', 4, -2, 3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 2}', 'Γρήγορη επίλυση αλλά εξάρτηση από εξωτερικές πηγές.', 'Quick solution but dependence on external sources.'),
(12, 'Στήριξη εγχώριας παραγωγής και ελεύθερη αγορά', 'Support domestic production and free market', 7, 2, -2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 3}', 'Μακροπρόθεσμη λύση αλλά βραχυπρόθεσμη ταλαιπωρία.', 'Long-term solution but short-term hardship.');

-- Continue with scenarios 13-35 in the next batch...
