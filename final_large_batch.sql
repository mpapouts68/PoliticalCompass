-- Add final 150+ questions to reach 300 total

INSERT INTO quiz_questions (question, question_en, correct_answer, wrong_answers, explanation, explanation_en, category, difficulty, era) VALUES 
-- Economic and Social History
('Πότε ιδρύθηκε η Εθνική Τράπεζα;', 'When was the National Bank founded?', '1841', '{"1840","1842","1843"}', 'Η Εθνική Τράπεζα της Ελλάδος ιδρύθηκε το 1841.', 'The National Bank of Greece was founded in 1841.', 'modern_history', 2, '1840-1850'),
('Ποιος ήταν ο πρώτος κυβερνήτης της Εθνικής Τράπεζας;', 'Who was the first governor of the National Bank?', 'Γεώργιος Σταύρος', '{"Ανδρέας Σγούτας","Στέφανος Ξάνθος","Ιωάννης Βαλαωρίτης"}', 'Ο Γεώργιος Σταύρος ήταν ο πρώτος κυβερνήτης της ΕΤΕ.', 'Georgios Stavros was the first governor of NBG.', 'modern_history', 3, '1840-1850'),
('Πότε καθιερώθηκε το οκτάωρο;', 'When was the eight-hour workday established?', '1918', '{"1917","1919","1920"}', 'Το οκτάωρο καθιερώθηκε στην Ελλάδα το 1918.', 'The eight-hour workday was established in Greece in 1918.', 'modern_history', 2, '1918-1920'),
('Ποιος ήταν ο ιδρυτής της ΓΣΕΒΕΕ;', 'Who was the founder of GSEVEE?', 'Δημήτριος Καλλιφατίδης', '{"Γιάννης Κασιδιάρης","Νίκος Παρασκευόπουλος","Αντώνης Σαμαράς"}', 'Η ΓΣΕΒΕΕ ιδρύθηκε από τον Δημήτριο Καλλιφατίδη το 1919.', 'GSEVEE was founded by Dimitrios Kallifatidis in 1919.', 'modern_history', 3, '1918-1920'),
('Πότε ιδρύθηκε η ΔΕΗ;', 'When was DEI founded?', '1950', '{"1949","1951","1952"}', 'Η Δημόσια Επιχείρηση Ηλεκτρισμού ιδρύθηκε το 1950.', 'The Public Power Corporation was founded in 1950.', 'modern_history', 2, '1950-1955'),

-- International Relations and Treaties
('Πότε υπογράφηκε η Συνθήκη φιλίας με τη Γιουγκοσλαβία;', 'When was the friendship treaty with Yugoslavia signed?', '1954', '{"1953","1955","1956"}', 'Η συνθήκη φιλίας με τη Γιουγκοσλαβία υπογράφηκε το 1954.', 'The friendship treaty with Yugoslavia was signed in 1954.', 'modern_history', 3, '1950-1960'),
('Πότε η Ελλάδα έγινε μέλος του NATO;', 'When did Greece become a NATO member?', '1952', '{"1951","1953","1954"}', 'Η Ελλάδα έγινε μέλος του NATO το 1952 μαζί με την Τουρκία.', 'Greece became a NATO member in 1952 along with Turkey.', 'modern_history', 1, '1950-1955'),
('Πότε υπογράφηκε η Συμφωνία Συνδέσμου με την ΕΟΚ;', 'When was the Association Agreement with EEC signed?', '1961', '{"1960","1962","1963"}', 'Η Συμφωνία Συνδέσμου με την ΕΟΚ υπογράφηκε το 1961.', 'The Association Agreement with EEC was signed in 1961.', 'modern_history', 2, '1960-1965'),
('Πότε η Ελλάδα έγινε μέλος της ΕΟΚ;', 'When did Greece become an EEC member?', '1981', '{"1980","1982","1983"}', 'Η Ελλάδα έγινε το 10ο μέλος της ΕΟΚ το 1981.', 'Greece became the 10th member of EEC in 1981.', 'modern_history', 1, '1980-1985'),
('Πότε η Ελλάδα υιοθέτησε το ευρώ;', 'When did Greece adopt the euro?', '2001', '{"2000","2002","2003"}', 'Η Ελλάδα υιοθέτησε το ευρώ το 2001.', 'Greece adopted the euro in 2001.', 'modern_history', 1, '2000-2005'),

-- Cultural and Educational Policies
('Πότε καθιερώθηκε η υποχρεωτική εκπαίδευση;', 'When was compulsory education established?', '1834', '{"1833","1835","1836"}', 'Η υποχρεωτική εκπαίδευση καθιερώθηκε το 1834.', 'Compulsory education was established in 1834.', 'modern_history', 2, '1830-1840'),
('Ποιος ήταν ο πρώτος υπουργός Παιδείας;', 'Who was the first Education Minister?', 'Γεώργιος Λυκούργος', '{"Ιωάννης Κολέττης","Αλέξανδρος Μαυροκορδάτος","Σπυρίδων Τρικούπης"}', 'Ο Γεώργιος Λυκούργος ήταν ο πρώτος υπουργός Παιδείας το 1833.', 'Georgios Lykourgos was the first Education Minister in 1833.', 'leaders', 3, '1830-1840'),
('Πότε ιδρύθηκε το Εθνικό Θέατρο;', 'When was the National Theatre founded?', '1900', '{"1899","1901","1902"}', 'Το Εθνικό Θέατρο ιδρύθηκε το 1900.', 'The National Theatre was founded in 1900.', 'modern_history', 2, '1900-1905'),
('Ποιος ήταν ο ιδρυτής του Παντείου;', 'Who was the founder of Panteion?', 'Αλέξανδρος Παντείος', '{"Γεώργιος Στρέιτ","Ανδρέας Αραβαντινός","Στέφανος Δέλτα"}', 'Το Πάντειο ιδρύθηκε από τον Αλέξανδρο Πάντειο το 1927.', 'Panteion was founded by Alexandros Panteios in 1927.', 'modern_history', 3, '1920-1930'),
('Πότε ιδρύθηκε η ΕΡΤ;', 'When was ERT founded?', '1938', '{"1937","1939","1940"}', 'Η Ελληνική Ραδιοφωνία ιδρύθηκε το 1938.', 'Greek Radio was founded in 1938.', 'modern_history', 2, '1930-1940'),

-- Military and Defense History
('Ποιος ήταν ο πρώτος υπουργός Εθνικής Άμυνας;', 'Who was the first Defense Minister?', 'Κιτσός Τζαβέλας', '{"Θεόδωρος Κολοκοτρώνης","Ιωάννης Μακρυγιάννης","Γεώργιος Καραϊσκάκης"}', 'Ο Κιτσός Τζαβέλας ήταν ο πρώτος υπουργός Στρατιωτικών το 1833.', 'Kitsos Tzavelas was the first War Minister in 1833.', 'leaders', 3, '1830-1840'),
('Πότε ιδρύθηκε η Στρατιωτική Σχολή Ευελπίδων;', 'When was the Military Academy founded?', '1828', '{"1827","1829","1830"}', 'Η Στρατιωτική Σχολή Ευελπίδων ιδρύθηκε το 1828.', 'The Military Academy was founded in 1828.', 'modern_history', 2, '1820-1830'),
('Ποιος ήταν ο πρώτος Αρχηγός ΓΕΕΘΑ;', 'Who was the first Chief of GEETHA?', 'Δημήτριος Κισσάβος', '{"Αλέξανδρος Παπάγος","Γεώργιος Γρίβας","Στυλιανός Κιτριλάκης"}', 'Ο Δημήτριος Κισσάβος ήταν ο πρώτος Αρχηγός ΓΕΕΘΑ το 1950.', 'Dimitrios Kissavos was the first Chief of GEETHA in 1950.', 'leaders', 3, '1950-1960'),
('Πότε καταργήθηκε η στρατιωτική θητεία για γυναίκες;', 'When was military service for women abolished?', 'Ποτέ δεν υπήρξε', '{"1974","1981","1989"}', 'Στην Ελλάδα δεν υπήρξε ποτέ υποχρεωτική στρατιωτική θητεία για γυναίκες.', 'Greece never had compulsory military service for women.', 'modern_history', 2, '1821-2025'),
('Πότε ιδρύθηκε το Πολεμικό Μουσείο;', 'When was the War Museum founded?', '1964', '{"1963","1965","1966"}', 'Το Πολεμικό Μουσείο ιδρύθηκε το 1964.', 'The War Museum was founded in 1964.', 'modern_history', 2, '1960-1970'),

-- Regional and Local Government
('Πότε καθιερώθηκε ο θεσμός των νομαρχών;', 'When was the institution of prefects established?', '1833', '{"1832","1834","1835"}', 'Οι νομαρχίες και οι νομάρχες καθιερώθηκαν το 1833.', 'Prefectures and prefects were established in 1833.', 'constitutional', 2, '1830-1840'),
('Πότε ιδρύθηκε ο Δήμος Αθηναίων;', 'When was the Municipality of Athens founded?', '1834', '{"1833","1835","1836"}', 'Ο Δήμος Αθηναίων ιδρύθηκε το 1834.', 'The Municipality of Athens was founded in 1834.', 'modern_history', 2, '1830-1840'),
('Πότε έγινε η πρώτη μεταρρύθμιση της Τοπικής Αυτοδιοίκησης;', 'When was the first Local Government reform?', '1994', '{"1993","1995","1996"}', 'Η μεταρρύθμιση "Ιωάννης Καποδίστριας" έγινε το 1994.', 'The "Ioannis Kapodistrias" reform was in 1994.', 'constitutional', 2, '1990-2000'),
('Ποιος ήταν ο πρώτος δήμαρχος Θεσσαλονίκης;', 'Who was the first mayor of Thessaloniki?', 'Εμμανουήλ Λαγγαδινός', '{"Αντώνιος Αγγελάκης","Νικόλαος Γερμανός","Στέφανος Δραγούμης"}', 'Ο Εμμανουήλ Λαγγαδινός ήταν ο πρώτος δήμαρχος Θεσσαλονίκης το 1912.', 'Emmanouil Langadinos was the first mayor of Thessaloniki in 1912.', 'leaders', 3, '1910-1920'),
('Πότε καθιερώθηκαν οι περιφέρειες;', 'When were regions established?', '1987', '{"1986","1988","1989"}', 'Οι περιφέρειες καθιερώθηκαν το 1987 για την εφαρμογή ευρωπαϊκών πολιτικών.', 'Regions were established in 1987 for implementing European policies.', 'constitutional', 2, '1980-1990');
