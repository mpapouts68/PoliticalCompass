-- Sample Prime Minister Scenarios and Policy Options

-- Economic Crisis Scenario
INSERT INTO pm_scenarios (title, title_en, description, description_en, context, context_en, category, difficulty, time_pressure) VALUES 
('Οικονομική Κρίση: Αύξηση Ανεργίας', 'Economic Crisis: Rising Unemployment', 'Η ανεργία έχει φτάσει στο 15% και αυξάνεται ραγδαία. Οι πολίτες διαδηλώνουν και ζητούν άμεσα μέτρα. Τι θα κάνετε;', 'Unemployment has reached 15% and is rising rapidly. Citizens are protesting and demanding immediate action. What will you do?', 'Η χώρα βρίσκεται σε οικονομική ύφεση 18 μηνών. Οι επιχειρήσεις κλείνουν, οι τράπεζες είναι επιφυλακτικές στα δάνεια, και η καταναλωτική εμπιστοσύνη έχει καταρρεύσει.', 'The country is in an 18-month economic recession. Businesses are closing, banks are reluctant to lend, and consumer confidence has collapsed.', 'economic', 2, 0);

INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
-- Scenario 1 options
(1, 'Μαζικό πρόγραμμα δημοσίων έργων και επιδότησης επιχειρήσεων για δημιουργία θέσεων εργασίας', 'Massive public works program and business subsidies to create jobs', 7, 3, 4, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 1}', 'Το έλλειμμα αυξάνεται κατά 3% του ΑΕΠ αλλά δημιουργούνται 200.000 θέσεις εργασίας. Η ΕΕ εκφράζει ανησυχίες για την οικονομική πειθαρχία.', 'The deficit increases by 3% of GDP but 200,000 jobs are created. The EU expresses concerns about fiscal discipline.'),

(1, 'Μείωση φόρων για επιχειρήσεις και απελευθέρωση εργασιακών σχέσεων', 'Tax cuts for businesses and labor market deregulation', 6, 2, -2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 3}', 'Μερικές επιχειρήσεις επιστρέφουν αλλά οι μισθοί μειώνονται. Διαδηλώσεις από συνδικάτα. Η ανεργία μειώνεται αργά.', 'Some businesses return but wages decrease. Union protests occur. Unemployment drops slowly.'),

(1, 'Ενίσχυση του επιδόματος ανεργίας και προγράμματα κατάρτισης', 'Strengthen unemployment benefits and training programs', 4, -1, 3, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 2}', 'Οι άνεργοι στηρίζονται βραχυπρόθεσμα αλλά δεν δημιουργούνται νέες θέσεις εργασίας. Το κόστος είναι υψηλό.', 'The unemployed are supported short-term but no new jobs are created. The cost is high.');

-- Social Issue Scenario
INSERT INTO pm_scenarios (title, title_en, description, description_en, context, context_en, category, difficulty, time_pressure) VALUES 
('Κοινωνικό Ζήτημα: Αύξηση Εγκληματικότητας', 'Social Issue: Rising Crime', 'Η εγκληματικότητα έχει αυξηθεί κατά 25% τον τελευταίο χρόνο. Οι πολίτες ζητούν δράση. Οι αστυνομικοί είναι υποστελεχωμένοι.', 'Crime has increased by 25% in the last year. Citizens demand action. Police are understaffed.', 'Η οικονομική κρίση έχει οδηγήσει σε αύξηση της φτώχειας και της απόγνωσης. Ναρκωτικά και βία αυξάνονται στα αστικά κέντρα.', 'The economic crisis has led to increased poverty and desperation. Drugs and violence are rising in urban centers.', 'social', 2, 0);

INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(2, 'Πρόσληψη 5.000 νέων αστυνομικών και αύξηση ποινών', 'Hire 5,000 new police officers and increase penalties', 5, -2, 2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 3, "ΚΚΕ": 1, "ΕΛ": 4}', 'Η εγκληματικότητα μειώνεται 15% αλλά οι φυλακές γεμίζουν. Κριτικές για "αστυνομοκρατία".', 'Crime drops 15% but prisons fill up. Criticism of "police state" approach.'),

(2, 'Επένδυση σε κοινωνικά προγράμματα και εκπαίδευση νεολαίας', 'Invest in social programs and youth education', 3, -1, 4, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 2}', 'Μακροπρόθεσμα αποτελέσματα αλλά η εγκληματικότητα συνεχίζεται βραχυπρόθεσμα. Κριτικές για αργές λύσεις.', 'Long-term results but crime continues short-term. Criticism for slow solutions.'),

(2, 'Συνδυασμός περισσότερων αστυνομικών και κοινωνικών προγραμμάτων', 'Combination of more police and social programs', 6, -3, 3, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 2, "ΕΛ": 3}', 'Ισορροπημένη προσέγγιση που φέρνει σταδιακά αποτελέσματα αλλά είναι ακριβή και δύσκολη πολιτικά.', 'Balanced approach that brings gradual results but is expensive and politically difficult.');

-- Foreign Policy Crisis
INSERT INTO pm_scenarios (title, title_en, description, description_en, context, context_en, category, difficulty, time_pressure) VALUES 
('Εξωτερική Πολιτική: Ένταση με Τουρκία', 'Foreign Policy: Tension with Turkey', 'Τουρκικά πλοία παραβιάζουν την ΑΟΖ. Οι σύμμαχοι ζητούν αυτοσυγκράτηση. Η κοινή γνώμη ζητά δράση.', 'Turkish ships violate the EEZ. Allies call for restraint. Public opinion demands action.', 'Οι διαπραγματεύσεις για την ΑΟΖ έχουν παγώσει. Η Τουρκία κλιμακώνει τις προκλήσεις ενώ παράλληλα συμμετέχει σε διάλογο.', 'EEZ negotiations have stalled. Turkey escalates provocations while participating in dialogue.', 'foreign_policy', 3, 1);

INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(3, 'Στρατιωτική απάντηση - αποστολή πολεμικών πλοίων', 'Military response - send warships', 9, -4, 1, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 4}', 'Κίνδυνος στρατιωτικής σύρραξης. Οι σύμμαχοι εκφράζουν έντονη ανησυχία. Εσωτερικά κερδίζετε πόντους εθνικισμού.', 'Risk of military conflict. Allies express serious concern. Domestically you gain nationalism points.'),

(3, 'Διπλωματική κλιμάκωση - διεθνής καταδίκη και κυρώσεις', 'Diplomatic escalation - international condemnation and sanctions', 5, -1, 2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 2, "ΕΛ": 3}', 'Η ΕΕ στηρίζει την Ελλάδα αλλά οι κυρώσεις είναι ήπιες. Η Τουρκία συνεχίζει τις παραβιάσεις σε μικρότερο βαθμό.', 'EU supports Greece but sanctions are mild. Turkey continues violations to a lesser degree.'),

(3, 'Επιστροφή στον διάλογο και παραχωρήσεις', 'Return to dialogue and concessions', 8, 1, -2, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 3, "ΚΚΕ": 4, "ΕΛ": 1}', 'Η ένταση μειώνεται αλλά σας κατηγορούν για αδυναμία. Η αντιπολίτευση οργανώνει διαδηλώσεις.', 'Tension decreases but you are accused of weakness. Opposition organizes protests.');

-- Environmental Crisis  
INSERT INTO pm_scenarios (title, title_en, description, description_en, context, context_en, category, difficulty, time_pressure) VALUES 
('Περιβαλλοντική Κρίση: Μεγάλη Φωτιά', 'Environmental Crisis: Major Wildfire', 'Μεγάλη φωτιά απειλεί τουριστικές περιοχές. Χρειάζονται άμεσα ευρωπαϊκά μέσα πυρόσβεσης. Εκκενώσεις σε εξέλιξη.', 'Major wildfire threatens tourist areas. European firefighting means needed immediately. Evacuations underway.', 'Ο Αύγουστος είναι ξηρότερος από ποτέ. Οι πυροσβεστικές δυνάμεις είναι εξαντλημένες από προηγούμενες πυρκαγιές.', 'August is drier than ever. Fire forces are exhausted from previous fires.', 'crisis', 1, 1);

INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(4, 'Άμεση κήρυξη κατάστασης έκτακτης ανάγκης και διεθνής βοήθεια', 'Immediate state of emergency and international aid', 3, -2, 4, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 3}', 'Η φωτιά σβήνει γρήγορα με ελάχιστες ζημιές. Όλα τα κόμματα στηρίζουν την απόφαση.', 'Fire is extinguished quickly with minimal damage. All parties support the decision.'),

(4, 'Χρήση μόνο εθνικών μέσων για να δείξετε αυτάρκεια', 'Use only national means to show self-reliance', 7, -3, -3, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 1, "ΚΚΕ": 2, "ΕΛ": 4}', 'Η φωτιά εξαπλώνεται, καίγονται 10.000 στρέμματα και 50 σπίτια. Δριμεία κριτική για εθνικιστική προσέγγιση.', 'Fire spreads, burning 10,000 acres and 50 houses. Sharp criticism for nationalistic approach.'),

(4, 'Μερική βοήθεια και εστίαση στην αποζημίωση θυμάτων', 'Partial aid and focus on victim compensation', 4, -2, 2, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 3, "ΕΛ": 2}', 'Η φωτιά ελέγχεται με μέτριες ζημιές. Οι πολίτες εκτιμούν την αποζημίωση αλλά κριτική για καθυστέρηση.', 'Fire is controlled with moderate damage. Citizens appreciate compensation but criticism for delay.');

-- Healthcare Crisis
INSERT INTO pm_scenarios (title, title_en, description, description_en, context, context_en, category, difficulty, time_pressure) VALUES 
('Υγειονομική Κρίση: Έλλειψη Προσωπικού', 'Healthcare Crisis: Staff Shortage', 'Οι γιατροί απεργούν για μισθούς και συνθήκες εργασίας. Τα νοσοκομεία δυσκολεύονται να λειτουργήσουν.', 'Doctors strike over wages and working conditions. Hospitals struggle to operate.', 'Χρόνια υποχρηματοδότηση του ΕΣΥ. Πολλοί γιατροί έχουν μεταναστεύσει. Η πανδημία έχει εξαντλήσει το προσωπικό.', 'Chronic underfunding of NHS. Many doctors have emigrated. The pandemic has exhausted staff.', 'social', 2, 1);

INSERT INTO pm_policy_options (scenario_id, option_text, option_text_en, political_cost, economic_impact, social_impact, party_alignment, consequences, consequences_en) VALUES 
(5, 'Άμεση αύξηση μισθών κατά 25% και πρόσληψη 2.000 γιατρών', 'Immediate 25% salary increase and hire 2,000 doctors', 6, -3, 4, '{"ΝΔ": 2, "ΣΥΡΙΖΑ": 4, "ΠΑΣΟΚ": 4, "ΚΚΕ": 4, "ΕΛ": 2}', 'Η απεργία τελειώνει, η υγεία βελτιώνεται αλλά το έλλειμμα αυξάνεται. Κριτικές για δημοσιονομική αλόγιστη πολιτική.', 'Strike ends, healthcare improves but deficit increases. Criticism for fiscal irresponsibility.'),

(5, 'Διαπραγμάτευση σταδιακής βελτίωσης και μεταρρυθμίσεων', 'Negotiate gradual improvement and reforms', 4, -1, 2, '{"ΝΔ": 4, "ΣΥΡΙΖΑ": 3, "ΠΑΣΟΚ": 4, "ΚΚΕ": 2, "ΕΛ": 3}', 'Η απεργία συνεχίζεται 2 εβδομάδες αλλά τελικά υπογράφεται λογική συμφωνία. Μερική ικανοποίηση όλων.', 'Strike continues 2 weeks but reasonable agreement is finally signed. Partial satisfaction for all.'),

(5, 'Επίταξη γιατρών και απειλή κυρώσεων', 'Requisition doctors and threaten sanctions', 9, 0, -4, '{"ΝΔ": 3, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 1, "ΚΚΕ": 1, "ΕΛ": 2}', 'Οι γιατροί επιστρέφουν αναγκαστικά αλλά η ποιότητα υπηρεσιών πέφτει. Διεθνής κριτική για αυταρχισμό.', 'Doctors return by force but service quality drops. International criticism for authoritarianism.');