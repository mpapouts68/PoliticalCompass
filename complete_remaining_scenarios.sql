-- Continue with scenarios 6-35, being very specific to each scenario's actual description

-- Scenario 6: Κρίση στα Ίμια (Imia Crisis)
-- Description: Τουρκικά σκάφη πλησιάζουν τα Ίμια. Τι κάνετε;
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(6, 'Άμεση αποστολή πολεμικού ναυτικού στα Ίμια', 'Immediate dispatch of naval forces to Imia', 9, -3, 2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 4}', 'Κίνδυνος στρατιωτικής κλιμάκωσης αλλά ισχυρό εθνικό μήνυμα.', 'Risk of military escalation but strong national message.'),
(6, 'Διπλωματικές διαβουλεύσεις με ΗΠΑ και ΝΑΤΟ', 'Diplomatic consultations with USA and NATO', 5, -1, 3, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 2, "ΕΛ": 3}', 'Διεθνής στήριξη και ειρηνική επίλυση.', 'International support and peaceful resolution.'),
(6, 'Αναμονή και παρακολούθηση χωρίς κλιμάκωση', 'Wait and monitor without escalation', 7, 0, -1, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 3, "ΚΚΕ": 4, "ΕΛ": 1}', 'Αποφυγή σύγκρουσης αλλά κριτικές για αδυναμία.', 'Conflict avoidance but criticism for weakness.');

-- Scenario 7: Πανδημία COVID-19 (COVID-19 Pandemic)
-- Description: Πρώτα κρούσματα στην Ελλάδα. Αποφασίστε μέτρα.
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(7, 'Πλήρες lockdown για 2 μήνες και κρατική στήριξη', 'Full lockdown for 2 months with state support', 6, -4, 3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 2}', 'Έλεγχος της πανδημίας αλλά οικονομική καταστροφή.', 'Pandemic control but economic disaster.'),
(7, 'Στοχευμένα μέτρα και προστασία ευπαθών ομάδων', 'Targeted measures and vulnerable group protection', 4, -2, 2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 3, "ΕΛ": 3}', 'Ισορροπία υγείας και οικονομίας αλλά αργή αντίδραση.', 'Health-economy balance but slow response.'),
(7, 'Ανοσία της αγέλης και ελάχιστα μέτρα', 'Herd immunity and minimal measures', 8, 1, -3, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 1, "ΚΚΕ": 1, "ΕΛ": 4}', 'Διατήρηση οικονομίας αλλά τεράστιες απώλειες ζωών.', 'Economy preservation but huge loss of life.');

-- Scenario 8: Κατάρρευση Τράπεζας (Bank Collapse)
-- Description: Μεγάλη τράπεζα κινδυνεύει. Διάσωση ή όχι;
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(8, 'Κρατική διάσωση της τράπεζας', 'State bank bailout', 7, -3, 2, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 3, "ΚΚΕ": 1, "ΕΛ": 3}', 'Σταθερότητα χρηματοπιστωτικού συστήματος αλλά κοστίζει στους φορολογούμενους.', 'Financial system stability but costs taxpayers.'),
(8, 'Ελεγχόμενη πτώχευση και προστασία καταθέσεων', 'Controlled bankruptcy and deposit protection', 5, -2, 3, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 2}', 'Προστασία πολιτών αλλά αναταραχή στην αγορά.', 'Citizen protection but market turmoil.'),
(8, 'Εθνικοποίηση της τράπεζας', 'Bank nationalization', 8, -4, 4, '{"ΝΔ": 1, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 3, "ΚΚΕ": 4, "ΕΛ": 3}', 'Κρατικός έλεγχος αλλά μεγάλο δημοσιονομικό κόστος.', 'State control but large fiscal cost.');

-- Scenario 9: Φυσική Καταστροφή (Natural Disaster)
-- Description: Μεγάλη φωτιά απειλεί την Αττική.
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(9, 'Άμεση κήρυξη κατάστασης έκτακτης ανάγκης', 'Immediate emergency state declaration', 3, -3, 4, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 4}', 'Γρήγορη διάσωση ζωών και περιουσιών.', 'Quick rescue of lives and property.'),
(9, 'Συντονισμένη επιχείρηση με τοπικές αρχές', 'Coordinated operation with local authorities', 4, -2, 3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 3}', 'Οργανωμένη αντίδραση αλλά αργότερη απόκριση.', 'Organized response but slower reaction.'),
(9, 'Κλήση διεθνούς βοήθειας από ΕΕ', 'Call for international EU aid', 5, -1, 3, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 2, "ΕΛ": 2}', 'Επαρκή μέσα αλλά εξάρτηση από εξωτερικούς φορείς.', 'Adequate means but dependence on external actors.');

-- Scenario 10: Απεργία ΜΜΜ (Public Transport Strike)
-- Description: Γενική απεργία στα ΜΜΜ. Πώς αντιδράτε;
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(10, 'Άμεση συμφωνία με τα συνδικάτα και αυξήσεις', 'Immediate agreement with unions and raises', 4, -3, 4, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Αποκατάσταση μεταφορών αλλά αύξηση δημοσίου χρέους.', 'Transport restoration but increased public debt.'),
(10, 'Επίταξη και χρήση στρατιωτικών μέσων', 'Requisition and use of military means', 8, -1, -2, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 4}', 'Διατήρηση μεταφορών αλλά κλιμάκωση εντάσεων.', 'Transport maintenance but tension escalation.'),
(10, 'Προσωρινές λύσεις και διαπραγμάτευση', 'Temporary solutions and negotiation', 5, -2, 2, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 2}', 'Σταδιακή επίλυση με κοινωνική συναίνεση.', 'Gradual resolution with social consensus.');
