-- Add many quiz questions in batches to reach 300 total

-- Batch 1: Modern History Questions
INSERT INTO quiz_questions (question, question_en, correct_answer, wrong_answers, explanation, explanation_en, category, difficulty, era) VALUES 
('Ποιος ήταν ο αρχηγός του ΕΛΑΣ;', 'Who was the leader of ELAS?', 'Άρης Βελουχιώτης', '{"Στέφανος Σαράφης","Ναπολέων Ζέρβας","Ευριπίδης Μπακιρτζής"}', 'Ο Άρης Βελουχιώτης ήταν διοικητής του ΕΛΑΣ.', 'Aris Velouchiotis was commander of ELAS.', 'modern_history', 2, '1940-1950'),
('Πότε τελείωσε ο Εμφύλιος Πόλεμος;', 'When did the Civil War end?', '1949', '{"1948","1950","1951"}', 'Ο Εμφύλιος Πόλεμος τελείωσε το 1949.', 'The Civil War ended in 1949.', 'modern_history', 1, '1940-1950'),
('Ποια χρονιά έγινε η Μικρασιατική Καταστροφή;', 'In which year was the Asia Minor Catastrophe?', '1922', '{"1921","1923","1924"}', 'Η Μικρασιατική Καταστροφή έγινε το 1922.', 'The Asia Minor Catastrophe occurred in 1922.', 'modern_history', 1, '1920-1930'),
('Ποιος ήταν πρωθυπουργός κατά τη δικτατορία;', 'Who was PM during the dictatorship?', 'Γεώργιος Παπαδόπουλος', '{"Στυλιανός Παττακός","Δημήτριος Ιωαννίδης","Νικόλαος Μακαρέζος"}', 'Ο Γεώργιος Παπαδόπουλος ήταν πρωθυπουργός της χούντας.', 'George Papadopoulos was PM of the junta.', 'modern_history', 2, '1967-1974'),
('Πότε έγινε το Πολυτεχνείο;', 'When did the Polytechnic uprising happen?', '1973', '{"1972","1974","1975"}', 'Το Πολυτεχνείο έγινε τον Νοέμβριο του 1973.', 'The Polytechnic uprising was in November 1973.', 'modern_history', 1, '1967-1974');

-- Batch 2: Political Parties
INSERT INTO quiz_questions (question, question_en, correct_answer, wrong_answers, explanation, explanation_en, category, difficulty, era) VALUES 
('Πότε ιδρύθηκε το ΠΑΣΟΚ;', 'When was PASOK founded?', '1974', '{"1973","1975","1976"}', 'Το ΠΑΣΟΚ ιδρύθηκε το 1974 από τον Ανδρέα Παπανδρέου.', 'PASOK was founded in 1974 by Andreas Papandreou.', 'parties', 1, '1974-1990'),
('Ποιος ήταν ο ιδρυτής της ΕΔΑ;', 'Who was the founder of EDA?', 'Ηλίας Ηλιού', '{"Μίκης Θεοδωράκης","Μανώλης Γλέζος","Γρηγόρης Λαμπράκης"}', 'Η ΕΔΑ ιδρύθηκε από τον Ηλία Ηλιού.', 'EDA was founded by Ilias Iliou.', 'parties', 3, '1950-1974'),
('Πότε διαλύθηκε η Ένωση Κέντρου;', 'When was Center Union dissolved?', '1977', '{"1976","1978","1979"}', 'Η Ένωση Κέντρου διαλύθηκε το 1977.', 'Center Union was dissolved in 1977.', 'parties', 2, '1974-1990'),
('Ποιος ήταν ο πρώτος πρόεδρος του ΣΥΡΙΖΑ;', 'Who was the first president of SYRIZA?', 'Αλέκος Αλαβάνος', '{"Αλέξης Τσίπρας","Φώτης Κουβέλης","Νίκος Κωνσταντόπουλος"}', 'Ο Αλέκος Αλαβάνος ήταν ο πρώτος πρόεδρος του ΣΥΡΙΖΑ.', 'Alekos Alavanos was the first president of SYRIZA.', 'parties', 2, '2000-2010'),
('Πότε ιδρύθηκε το ΛΑΟΣ;', 'When was LAOS founded?', '2000', '{"1999","2001","2002"}', 'Το ΛΑΟΣ ιδρύθηκε το 2000.', 'LAOS was founded in 2000.', 'parties', 2, '2000-2010');
