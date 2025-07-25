-- Systematically rebuild ALL PM scenario options to match their actual scenarios

-- Scenario 1: Οικονομική Κρίση: Αύξηση Ανεργίας (Economic Crisis: Rising Unemployment)
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(1, 'Μαζικό πρόγραμμα δημοσίων έργων για δημιουργία θέσεων εργασίας', 'Massive public works program to create jobs', 7, -3, 4, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Δημιουργία 200.000 θέσεων εργασίας αλλά αύξηση ελλείμματος κατά 3% του ΑΕΠ.', 'Creation of 200,000 jobs but deficit increase by 3% of GDP.'),
(1, 'Μείωση φόρων για επιχειρήσεις και απελευθέρωση εργασιακών σχέσεων', 'Business tax cuts and labor market deregulation', 6, 2, -2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 3}', 'Επιστροφή επιχειρήσεων αλλά μείωση μισθών και εργασιακών δικαιωμάτων.', 'Business return but wage cuts and reduced labor rights.'),
(1, 'Ενίσχυση επιδόματος ανεργίας και προγράμματα κατάρτισης', 'Enhanced unemployment benefits and training programs', 4, -1, 3, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 2}', 'Στήριξη ανέργων αλλά δεν δημιουργούνται νέες θέσεις εργασίας.', 'Support for unemployed but no new jobs created.');

-- Scenario 2: Κοινωνικό Ζήτημα: Αύξηση Εγκληματικότητας (Social Issue: Rising Crime)
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(2, 'Πρόσληψη 5.000 νέων αστυνομικών και αύξηση ποινών', 'Hire 5,000 new police officers and increase penalties', 5, -2, 2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 3, "ΚΚΕ": 1, "ΕΛ": 4}', 'Η εγκληματικότητα μειώνεται 15% αλλά οι φυλακές γεμίζουν.', 'Crime drops 15% but prisons fill up.'),
(2, 'Επένδυση σε κοινωνικά προγράμματα και εκπαίδευση νεολαίας', 'Invest in social programs and youth education', 3, -1, 4, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 2}', 'Μακροπρόθεσμα αποτελέσματα αλλά η εγκληματικότητα συνεχίζεται βραχυπρόθεσμα.', 'Long-term results but crime continues short-term.'),
(2, 'Συνδυασμός περισσότερων αστυνομικών και κοινωνικών προγραμμάτων', 'Combination of more police and social programs', 6, -3, 3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 2, "ΕΛ": 3}', 'Ισορροπημένη προσέγγιση με σταδιακά αποτελέσματα.', 'Balanced approach with gradual results.');

-- Scenario 3: Εξωτερική Πολιτική: Ένταση με Τουρκία (Foreign Policy: Tension with Turkey)
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(3, 'Στρατιωτική απάντηση - αποστολή πολεμικών πλοίων', 'Military response - send warships', 9, -4, 1, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 4}', 'Κίνδυνος στρατιωτικής σύρραξης αλλά εσωτερική στήριξη.', 'Risk of military conflict but domestic support.'),
(3, 'Διπλωματική κλιμάκωση - διεθνής καταδίκη και κυρώσεις', 'Diplomatic escalation - international condemnation', 5, -1, 2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 2, "ΕΛ": 3}', 'Η ΕΕ στηρίζει την Ελλάδα αλλά οι κυρώσεις είναι ήπιες.', 'EU supports Greece but sanctions are mild.'),
(3, 'Επιστροφή στον διάλογο και παραχωρήσεις', 'Return to dialogue and concessions', 8, 1, -2, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 4, "ΕΛ": 1}', 'Η ένταση μειώνεται αλλά σας κατηγορούν για αδυναμία.', 'Tension decreases but you are accused of weakness.');

-- Scenario 4: Περιβαλλοντική Κρίση: Μεγάλη Φωτιά (Environmental Crisis: Major Wildfire)
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(4, 'Άμεση κήρυξη κατάστασης έκτακτης ανάγκης και διεθνής βοήθεια', 'Emergency state declaration and international aid', 3, -2, 4, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Η φωτιά σβήνει γρήγορα με ελάχιστες ζημιές.', 'Fire extinguished quickly with minimal damage.'),
(4, 'Χρήση μόνο εγχώριων μέσων και στρατού', 'Use only domestic means and military', 6, -1, 2, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 3, "ΕΛ": 4}', 'Αργή κατάσβεση με μεγάλες ζημιές αλλά εθνική αυτάρκεια.', 'Slow extinguishing with major damage but national self-reliance.'),
(4, 'Εκκένωση περιοχών και άμεση αποζημίωση', 'Area evacuation and immediate compensation', 4, -3, 3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 2}', 'Σώζονται ζωές αλλά μεγάλες περιουσιακές ζημιές.', 'Lives saved but major property damage.');

-- Scenario 5: Υγειονομική Κρίση: Έλλειψη Προσωπικού (Healthcare Crisis: Staff Shortage)
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(5, 'Άμεση αύξηση μισθών και βελτίωση συνθηκών εργασίας', 'Immediate salary increase and work condition improvement', 4, -4, 4, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Οι γιατροί επιστρέφουν στη δουλειά αλλά μεγάλο δημοσιονομικό κόστος.', 'Doctors return to work but large fiscal cost.'),
(5, 'Επίταξη ιδιωτικών κλινικών και γιατρών', 'Requisition of private clinics and doctors', 8, -1, 2, '{"ΝΔ": 1, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 2, "ΚΚΕ": 4, "ΕΛ": 3}', 'Άμεση κάλυψη αναγκών αλλά σοβαρές πολιτικές συγκρούσεις.', 'Immediate coverage of needs but serious political conflicts.'),
(5, 'Συμβάσεις με ξένους γιατρούς και νοσηλευτές', 'Contracts with foreign doctors and nurses', 5, -2, 3, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 2, "ΕΛ": 2}', 'Γρήγορη λύση αλλά αντιδράσεις για ξένο προσωπικό.', 'Quick solution but reactions to foreign staff.');

-- Scenario 6: Κρίση στα Ίμια (Imia Crisis)
INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(6, 'Άμεση αποστολή πολεμικού ναυτικού στα Ίμια', 'Immediate dispatch of naval forces to Imia', 9, -3, 2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 4}', 'Κίνδυνος στρατιωτικής κλιμάκωσης αλλά ισχυρό εθνικό μήνυμα.', 'Risk of military escalation but strong national message.'),
(6, 'Διπλωματικές διαβουλεύσεις με ΗΠΑ και ΝΑΤΟ', 'Diplomatic consultations with USA and NATO', 5, -1, 3, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 2, "ΕΛ": 3}', 'Διεθνής στήριξη και ειρηνική επίλυση.', 'International support and peaceful resolution.'),
(6, 'Αναμονή και παρακολούθηση χωρίς κλιμάκωση', 'Wait and monitor without escalation', 7, 0, -1, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 3, "ΚΚΕ": 4, "ΕΛ": 1}', 'Αποφυγή σύγκρουσης αλλά κριτικές για αδυναμία.', 'Conflict avoidance but criticism for weakness.');
