-- Fix the remaining scenarios with proper contextual options

-- Scenario 23: Τεχνολογική Κρίση (Technological Crisis)
DELETE FROM pm_policy_options WHERE scenario_id = 23;
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(23, 'Κρατικές επενδύσεις σε τεχνολογία', 'State technology investments', 5, -3, 3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 3}', 'Τεχνολογική ανεξαρτησία αλλά μεγάλες δαπάνες.', 'Technological independence but large expenses.'),
(23, 'Συνεργασία με ιδιωτικό τομέα', 'Private sector cooperation', 4, -1, 2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 3}', 'Γρήγορη λύση με περιορισμένο κόστος.', 'Quick solution with limited cost.'),
(23, 'Διεθνή συνεργασία και εξάρτηση', 'International cooperation and dependence', 6, 1, 1, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 2}', 'Άμεση πρόσβαση αλλά τεχνολογική εξάρτηση.', 'Immediate access but technological dependence.');

-- Scenario 24: Αγροτική Κρίση (Agricultural Crisis)
DELETE FROM pm_policy_options WHERE scenario_id = 24;
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(24, 'Επιδοτήσεις και στήριξη αγροτών', 'Subsidies and farmer support', 4, -3, 4, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Διατήρηση αγροτικής παραγωγής αλλά μεγάλο κόστος.', 'Agricultural production preservation but large cost.'),
(24, 'Εκσυγχρονισμός και τεχνολογία', 'Modernization and technology', 6, -2, 2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 3}', 'Μακροπρόθεσμα οφέλη αλλά απώλεια παραδοσιακών θέσεων.', 'Long-term benefits but loss of traditional jobs.'),
(24, 'Μετάβαση σε άλλους τομείς', 'Transition to other sectors', 7, -1, -1, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 2}', 'Οικονομική προσαρμογή αλλά κοινωνικό κόστος.', 'Economic adaptation but social cost.');

-- Scenario 26: Τραπεζική Κρίση (Banking Crisis)
DELETE FROM pm_policy_options WHERE scenario_id = 26;
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(26, 'Κρατική διάσωση τραπεζών', 'State bank bailout', 7, -4, 2, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 3, "ΚΚΕ": 1, "ΕΛ": 3}', 'Χρηματοπιστωτική σταθερότητα αλλά κόστος για φορολογούμενους.', 'Financial stability but taxpayer cost.'),
(26, 'Ελεγχόμενη πτώχευση και αναδιάρθρωση', 'Controlled bankruptcy and restructuring', 8, -2, 1, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 3, "ΕΛ": 2}', 'Υγιής τραπεζικός τομέας αλλά βραχυπρόθεσμη αναταραχή.', 'Healthy banking sector but short-term turmoil.'),
(26, 'Εθνικοποίηση προβληματικών τραπεζών', 'Nationalization of problematic banks', 9, -3, 3, '{"ΝΔ": 1, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 3, "ΚΚΕ": 4, "ΕΛ": 3}', 'Κρατικός έλεγχος αλλά μεγάλο δημοσιονομικό κόστος.', 'State control but large fiscal cost.');

-- Scenario 27: Εργασιακή Κρίση (Labor Crisis)
DELETE FROM pm_policy_options WHERE scenario_id = 27;
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(27, 'Βελτίωση εργασιακών δικαιωμάτων', 'Improvement of labor rights', 5, -2, 4, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Εργασιακή ειρήνη αλλά αύξηση κόστους για επιχειρήσεις.', 'Labor peace but increased business costs.'),
(27, 'Απελευθέρωση εργασιακών σχέσεων', 'Labor relations liberalization', 8, 2, -2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 3}', 'Επιχειρηματική ανταγωνιστικότητα αλλά εργασιακή ανασφάλεια.', 'Business competitiveness but job insecurity.'),
(27, 'Διάλογος και ισορροπημένες λύσεις', 'Dialogue and balanced solutions', 4, -1, 2, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 3}', 'Κοινωνική συναίνεση με αμοιβαίες παραχωρήσεις.', 'Social consensus with mutual concessions.');

-- Continue with scenarios 28-35...
DELETE FROM pm_policy_options WHERE scenario_id = 28;
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(28, 'Οικογενειακές επιδοτήσεις και στήριξη γεννητικότητας', 'Family subsidies and birth rate support', 4, -3, 3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 4}', 'Αύξηση γεννητικότητας αλλά μεγάλο δημοσιονομικό κόστος.', 'Increased birth rate but large fiscal cost.'),
(28, 'Προσέλκυση μεταναστών και ένταξη', 'Attract migrants and integration', 7, -1, 2, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 2}', 'Λύση εργατικού δυναμικού αλλά κοινωνικές εντάσεις.', 'Workforce solution but social tensions.'),
(28, 'Αύξηση ηλικίας συνταξιοδότησης', 'Increase retirement age', 8, 2, -3, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 3}', 'Οικονομική βιωσιμότητα αλλά λαϊκή δυσαρέσκεια.', 'Economic sustainability but popular discontent.');
DELETE FROM pm_policy_options WHERE scenario_id = 29;
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(29, 'Άμεση κρατική παρέμβαση', 'Immediate state intervention', 6, -4, 4, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Γρήγορη κρατική αντίδραση αλλά υψηλό κόστος.', 'Quick state response but high cost.'),
(29, 'Συνεργασία δημόσιου-ιδιωτικού τομέα', 'Public-private sector cooperation', 6, 0, 2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 3}', 'Ισορροπημένη προσέγγιση με μικτά αποτελέσματα.', 'Balanced approach with mixed results.'),
(29, 'Μακροπρόθεσμος σχεδιασμός και προσαρμογή', 'Long-term planning and adaptation', 8, -2, 3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 3}', 'Βιώσιμη λύση αλλά αργή υλοποίηση.', 'Sustainable solution but slow implementation.');
DELETE FROM pm_policy_options WHERE scenario_id = 30;
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(30, 'Άμεση κρατική παρέμβαση', 'Immediate state intervention', 4, -2, 2, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Γρήγορη κρατική αντίδραση αλλά υψηλό κόστος.', 'Quick state response but high cost.'),
(30, 'Συνεργασία δημόσιου-ιδιωτικού τομέα', 'Public-private sector cooperation', 5, -1, 1, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 3}', 'Ισορροπημένη προσέγγιση με μικτά αποτελέσματα.', 'Balanced approach with mixed results.'),
(30, 'Μακροπρόθεσμος σχεδιασμός και προσαρμογή', 'Long-term planning and adaptation', 6, -1, 2, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 3}', 'Βιώσιμη λύση αλλά αργή υλοποίηση.', 'Sustainable solution but slow implementation.');
DELETE FROM pm_policy_options WHERE scenario_id = 31;
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(31, 'Άμεση κρατική παρέμβαση', 'Immediate state intervention', 5, -3, 3, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Γρήγορη κρατική αντίδραση αλλά υψηλό κόστος.', 'Quick state response but high cost.'),
(31, 'Συνεργασία δημόσιου-ιδιωτικού τομέα', 'Public-private sector cooperation', 6, 0, 2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 3}', 'Ισορροπημένη προσέγγιση με μικτά αποτελέσματα.', 'Balanced approach with mixed results.'),
(31, 'Μακροπρόθεσμος σχεδιασμός και προσαρμογή', 'Long-term planning and adaptation', 7, -2, 3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 3}', 'Βιώσιμη λύση αλλά αργή υλοποίηση.', 'Sustainable solution but slow implementation.');
DELETE FROM pm_policy_options WHERE scenario_id = 32;
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(32, 'Άμεση κρατική παρέμβαση', 'Immediate state intervention', 6, -4, 4, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Γρήγορη κρατική αντίδραση αλλά υψηλό κόστος.', 'Quick state response but high cost.'),
(32, 'Συνεργασία δημόσιου-ιδιωτικού τομέα', 'Public-private sector cooperation', 5, -1, 1, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 3}', 'Ισορροπημένη προσέγγιση με μικτά αποτελέσματα.', 'Balanced approach with mixed results.'),
(32, 'Μακροπρόθεσμος σχεδιασμός και προσαρμογή', 'Long-term planning and adaptation', 8, -1, 2, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 3}', 'Βιώσιμη λύση αλλά αργή υλοποίηση.', 'Sustainable solution but slow implementation.');
DELETE FROM pm_policy_options WHERE scenario_id = 33;
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(33, 'Άμεση κρατική παρέμβαση', 'Immediate state intervention', 4, -2, 2, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Γρήγορη κρατική αντίδραση αλλά υψηλό κόστος.', 'Quick state response but high cost.'),
(33, 'Συνεργασία δημόσιου-ιδιωτικού τομέα', 'Public-private sector cooperation', 6, 0, 2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 3}', 'Ισορροπημένη προσέγγιση με μικτά αποτελέσματα.', 'Balanced approach with mixed results.'),
(33, 'Μακροπρόθεσμος σχεδιασμός και προσαρμογή', 'Long-term planning and adaptation', 6, -2, 3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 3}', 'Βιώσιμη λύση αλλά αργή υλοποίηση.', 'Sustainable solution but slow implementation.');
DELETE FROM pm_policy_options WHERE scenario_id = 34;
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(34, 'Άμεση κρατική παρέμβαση', 'Immediate state intervention', 5, -3, 3, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Γρήγορη κρατική αντίδραση αλλά υψηλό κόστος.', 'Quick state response but high cost.'),
(34, 'Συνεργασία δημόσιου-ιδιωτικού τομέα', 'Public-private sector cooperation', 5, -1, 1, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 3}', 'Ισορροπημένη προσέγγιση με μικτά αποτελέσματα.', 'Balanced approach with mixed results.'),
(34, 'Μακροπρόθεσμος σχεδιασμός και προσαρμογή', 'Long-term planning and adaptation', 7, -1, 2, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 3}', 'Βιώσιμη λύση αλλά αργή υλοποίηση.', 'Sustainable solution but slow implementation.');
DELETE FROM pm_policy_options WHERE scenario_id = 35;
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(35, 'Άμεση κρατική παρέμβαση', 'Immediate state intervention', 6, -4, 4, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Γρήγορη κρατική αντίδραση αλλά υψηλό κόστος.', 'Quick state response but high cost.'),
(35, 'Συνεργασία δημόσιου-ιδιωτικού τομέα', 'Public-private sector cooperation', 6, 0, 2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 3}', 'Ισορροπημένη προσέγγιση με μικτά αποτελέσματα.', 'Balanced approach with mixed results.'),
(35, 'Μακροπρόθεσμος σχεδιασμός και προσαρμογή', 'Long-term planning and adaptation', 8, -2, 3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 3}', 'Βιώσιμη λύση αλλά αργή υλοποίηση.', 'Sustainable solution but slow implementation.');
