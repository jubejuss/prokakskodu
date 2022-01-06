INSERT INTO users (apartmentNr, firstName, lastName, email, password, role)
    VALUES
    ('1', 'Aino', 'Maino', 'admin@admin.ee', 'administraator', 'User'),
    ('2', 'Tava', 'Tavakasutaja', 'tava@tavakasutaja', 'tava', 'User'),
    ('3', 'Constantia', 'Scourfield', 'cscourfield0@howstuffworks.com', 'A7N2caE15IVX', 'User'),
	('4', 'Jobi', 'Lawrenson', 'jlawrenson1@comsenz.com', 'HrxmWp7A8', 'User');

INSERT INTO users (apartmentNr, firstName, lastName, email, password, role)
    VALUES
    ('10', 'Maie', 'Paie', 'maie@paie.ee', '$2b$10$QPkywYQSrdFi8Yc2bdSmAuPalMLaiPwkCWfB1ivb4goaJOjJOjowy', 'Admin');

INSERT INTO gas (date, gasPrice)
    VALUES ('2021-01-01', '30'),
    ('2021-12-01', '35');

INSERT INTO water (date, waterPrice)
    VALUES
    ('2021-01-01', '20'),
    ('2021-12-01', '30');

INSERT INTO indicators (users_id, month, gasUsage, waterUsage)
    VALUES
    (1,'2021-10-01', '33', '40'),
    (2,'2021-10-01', '30', '45'),
    (3,'2021-10-01', '25', '41'),
    (4,'2021-10-01', '40', '39'),
    (5,'2021-10-01', '40', '39'),
    (1,'2021-11-01', '22', '22'),
    (2,'2021-11-01', '11', '33'),
    (3,'2021-11-01', '33', '44'),
    (4,'2021-11-01', '44', '34'),
    (5,'2021-11-01', '33', '45');
    
INSERT INTO extraUtilities (name, price, description, amount, dateFrom, DateTo)
    VALUES
    ('Hilisem matt', '22', 'Veel lahedam matt', '1', '2022-10-01', '2022-10-11');
    
SELECT name, price, description, amount, DATE_FORMAT(dateFrom, "%M %Y") as 'From', DATE_FORMAT(DateTo, "%M %Y") as 'To' FROM extraUtilities;

SELECT * FROM users;
SELECT * FROM indicators;

Select users.apartmentNr as 'Korteri nr', DATE_FORMAT(indicators.month, "%M %Y") AS Periood , concat(users.firstName, " ", users.lastName) AS Omanik, 
indicators.gasUsage as gaasikulu, gas.gasPrice AS 'Gaasi ühiku hind', indicators.gasUsage*gas.gasPrice AS 'Gaasihind kokku',
indicators.waterUsage as veekulu, water.waterPrice AS 'Vee ühiku hind', indicators.waterUsage*water.waterPrice AS 'Veehihind kokku',
(indicators.gasUsage*gas.gasPrice)+(indicators.waterUsage*water.waterPrice) AS kogukulu
	FROM indicators INNER JOIN users INNER JOIN gas INNER JOIN water
    on indicators.users_id = users.id
    WHERE gas.date = (select date FROM gas WHERE id = (select MAX(id) FROM gas)) AND water.date = (select date FROM water WHERE id = (select MAX(id) FROM water)) AND YEAR(indicators.month) = 2021 AND MONTH(indicators.month) = 10;
    ;
        


// allolev võtab extraUtilities tabeli ja paneb kõik ühte ritta//    
SELECT DISTINCT indicators.month, 
	(SELECT id FROM extraUtilities ORDER BY id asc LIMIT 0, 1) AS 'ID control', 
	(SELECT name FROM extraUtilities ORDER BY id asc LIMIT 0, 1) AS 'Name of ExtraUtl', 
	(SELECT description FROM extraUtilities ORDER BY id asc LIMIT 0, 1) AS 'Description', 
	(SELECT price FROM extraUtilities ORDER BY id asc LIMIT 0, 1) AS 'Price', 
	(SELECT amount FROM extraUtilities ORDER BY id asc LIMIT 0, 1) AS 'Amount', 
	(SELECT id FROM extraUtilities ORDER BY id asc LIMIT 1, 1) AS 'ID control', 
	(SELECT name FROM extraUtilities ORDER BY id asc LIMIT 1, 1) AS 'Name of ExtraUtl', 
	(SELECT description FROM extraUtilities ORDER BY id asc LIMIT 0, 1) AS 'Description', 
	(SELECT price FROM extraUtilities ORDER BY id asc LIMIT 1, 1) AS 'Price', 
	(SELECT amount FROM extraUtilities ORDER BY id asc LIMIT 1, 1) AS 'Amount', 
	(SELECT id FROM extraUtilities ORDER BY id asc LIMIT 2, 1) AS 'ID control', 
	(SELECT name FROM extraUtilities ORDER BY id asc LIMIT 2, 1) AS 'Name of ExtraUtl', 
	(SELECT description FROM extraUtilities ORDER BY id asc LIMIT 0, 1) AS 'Description', 
	(SELECT price FROM extraUtilities ORDER BY id asc LIMIT 2, 1) AS 'Price', 
	(SELECT amount FROM extraUtilities ORDER BY id asc LIMIT 2, 1) AS 'Amount'
FROM indicators INNER JOIN extraUtilities INNER JOIN users;

/* allolev paneb kokku kolm erinevat ybelit */
SELECT DISTINCT users.apartmentNr as 'Korteri nr', DATE_FORMAT(indicators.month, "%M %Y") AS Periood , concat(users.firstName, " ", users.lastName) AS Omanik, extraUtilities.name
	FROM indicators INNER JOIN users INNER JOIN extraUtilities
    on indicators.users_id = users.id
    WHERE indicators.month;
    
/* nüüd võtame kaks eelmist tabelit ja proovime nii kokku panna, et extraUtlities tabelist võetakse väärtused vaid juhul, kui indicators tabeli mont aeg jääb extraUtilities dateFrom ja dateTo vahele */

SELECT DISTINCT users.apartmentNr , DATE_FORMAT(indicators.month, "%M %Y"), users.lastName, 
(SELECT extraUtilities.name FROM extraUtilities 
WHERE indicators.month >= extraUtilities.dateFrom AND indicators.month <= extraUtilities.dateTo 
ORDER BY extraUtilities.id ASC LIMIT 3,1) 
	FROM indicators INNER JOIN users INNER JOIN extraUtilities
    on indicators.users_id = users.id
    WHERE indicators.month;
    
/* Sama betwweniga */

SELECT DISTINCT users.apartmentNr , DATE_FORMAT(indicators.month, "%M %Y"), users.lastName, 
(SELECT extraUtilities.name FROM extraUtilities 
WHERE indicators.month BETWEEN extraUtilities.dateFrom AND extraUtilities.dateTo 
ORDER BY extraUtilities.id ASC LIMIT 3,1) 
	FROM indicators INNER JOIN users INNER JOIN extraUtilities
    on indicators.users_id = users.id
    WHERE indicators.month;
    
/* Sama betwweniga ja kõige vajalikuga */

SELECT DISTINCT users.apartmentNr AS 'Korteri nr' , DATE_FORMAT(indicators.month, "%M %Y") AS Aeg, users.lastName AS 'Nimi',  
(SELECT extraUtilities.id FROM extraUtilities WHERE indicators.month BETWEEN extraUtilities.dateFrom AND extraUtilities.dateTo ORDER BY extraUtilities.id ASC LIMIT 0,1) as 'Teenuse 1 id', 
(SELECT extraUtilities.name FROM extraUtilities WHERE indicators.month BETWEEN extraUtilities.dateFrom AND extraUtilities.dateTo ORDER BY extraUtilities.id ASC LIMIT 0,1) as 'Teenuse 1 nimi',  
(SELECT extraUtilities.description FROM extraUtilities WHERE indicators.month BETWEEN extraUtilities.dateFrom AND extraUtilities.dateTo ORDER BY extraUtilities.id ASC LIMIT 0,1) as 'Teenuse 1 kirjeldus',  
(SELECT extraUtilities.price FROM extraUtilities WHERE indicators.month BETWEEN extraUtilities.dateFrom AND extraUtilities.dateTo ORDER BY extraUtilities.id ASC LIMIT 0,1) as 'Teenuse 1 hind',  
(SELECT extraUtilities.amount FROM extraUtilities WHERE indicators.month BETWEEN extraUtilities.dateFrom AND extraUtilities.dateTo ORDER BY extraUtilities.id ASC LIMIT 0,1) as 'Teenuse 1 kogus',
(SELECT extraUtilities.id FROM extraUtilities WHERE indicators.month BETWEEN extraUtilities.dateFrom AND extraUtilities.dateTo ORDER BY extraUtilities.id ASC LIMIT 1,1) as 'Teenuse 2 id', 
(SELECT extraUtilities.name FROM extraUtilities WHERE indicators.month BETWEEN extraUtilities.dateFrom AND extraUtilities.dateTo ORDER BY extraUtilities.id ASC LIMIT 1,1) as 'Teenuse 2 nimi',  
(SELECT extraUtilities.description FROM extraUtilities WHERE indicators.month BETWEEN extraUtilities.dateFrom AND extraUtilities.dateTo ORDER BY extraUtilities.id ASC LIMIT 1,1) as 'Teenuse 2 kirjeldus',  
(SELECT extraUtilities.price FROM extraUtilities WHERE indicators.month BETWEEN extraUtilities.dateFrom AND extraUtilities.dateTo ORDER BY extraUtilities.id ASC LIMIT 1,1) as 'Teenuse 2 hind',  
(SELECT extraUtilities.amount FROM extraUtilities WHERE indicators.month BETWEEN extraUtilities.dateFrom AND extraUtilities.dateTo ORDER BY extraUtilities.id ASC LIMIT 1,1) as 'Teenuse 2 kogus',
(SELECT extraUtilities.id FROM extraUtilities WHERE indicators.month BETWEEN extraUtilities.dateFrom AND extraUtilities.dateTo ORDER BY extraUtilities.id ASC LIMIT 2,1) as 'Teenuse 3 id', 
(SELECT extraUtilities.name FROM extraUtilities WHERE indicators.month BETWEEN extraUtilities.dateFrom AND extraUtilities.dateTo ORDER BY extraUtilities.id ASC LIMIT 2,1) as 'Teenuse 3 nimi',  
(SELECT extraUtilities.description FROM extraUtilities WHERE indicators.month BETWEEN extraUtilities.dateFrom AND extraUtilities.dateTo ORDER BY extraUtilities.id ASC LIMIT 2,1) as 'Teenuse 3 kirjeldus',  
(SELECT extraUtilities.price FROM extraUtilities WHERE indicators.month BETWEEN extraUtilities.dateFrom AND extraUtilities.dateTo ORDER BY extraUtilities.id ASC LIMIT 2,1) as 'Teenuse 3 hind',  
(SELECT extraUtilities.amount FROM extraUtilities WHERE indicators.month BETWEEN extraUtilities.dateFrom AND extraUtilities.dateTo ORDER BY extraUtilities.id ASC LIMIT 2,1) as 'Teenuse 3 kogus'
	FROM indicators INNER JOIN users INNER JOIN extraUtilities
    on indicators.users_id = users.id
    WHERE indicators.month;
    
/* nüüd lisame kogu esiosa ka */



Select users.apartmentNr as 'Korteri nr', DATE_FORMAT(indicators.month, "%M %Y") AS Periood , concat(users.firstName, " ", users.lastName) AS Omanik, 
indicators.gasUsage as gaasikulu, gas.gasPrice AS 'Gaasi ühiku hind', indicators.gasUsage*gas.gasPrice AS 'Gaasihind kokku',
indicators.waterUsage as veekulu, water.waterPrice AS 'Vee ühiku hind', indicators.waterUsage*water.waterPrice AS 'Veehihind kokku',
(indicators.gasUsage*gas.gasPrice)+(indicators.waterUsage*water.waterPrice) AS kogukulu,
(SELECT extraUtilities.id FROM extraUtilities WHERE indicators.month BETWEEN extraUtilities.dateFrom AND extraUtilities.dateTo ORDER BY extraUtilities.id ASC LIMIT 0,1) as 'Teenuse 1 id', 
(SELECT extraUtilities.name FROM extraUtilities WHERE indicators.month BETWEEN extraUtilities.dateFrom AND extraUtilities.dateTo ORDER BY extraUtilities.id ASC LIMIT 0,1) as 'Teenuse 1 nimi',  
(SELECT extraUtilities.description FROM extraUtilities WHERE indicators.month BETWEEN extraUtilities.dateFrom AND extraUtilities.dateTo ORDER BY extraUtilities.id ASC LIMIT 0,1) as 'Teenuse 1 kirjeldus',  
(SELECT extraUtilities.price FROM extraUtilities WHERE indicators.month BETWEEN extraUtilities.dateFrom AND extraUtilities.dateTo ORDER BY extraUtilities.id ASC LIMIT 0,1) as 'Teenuse 1 hind',  
(SELECT extraUtilities.amount FROM extraUtilities WHERE indicators.month BETWEEN extraUtilities.dateFrom AND extraUtilities.dateTo ORDER BY extraUtilities.id ASC LIMIT 0,1) as 'Teenuse 1 kogus',
(SELECT extraUtilities.id FROM extraUtilities WHERE indicators.month BETWEEN extraUtilities.dateFrom AND extraUtilities.dateTo ORDER BY extraUtilities.id ASC LIMIT 1,1) as 'Teenuse 2 id', 
(SELECT extraUtilities.name FROM extraUtilities WHERE indicators.month BETWEEN extraUtilities.dateFrom AND extraUtilities.dateTo ORDER BY extraUtilities.id ASC LIMIT 1,1) as 'Teenuse 2 nimi',  
(SELECT extraUtilities.description FROM extraUtilities WHERE indicators.month BETWEEN extraUtilities.dateFrom AND extraUtilities.dateTo ORDER BY extraUtilities.id ASC LIMIT 1,1) as 'Teenuse 2 kirjeldus',  
(SELECT extraUtilities.price FROM extraUtilities WHERE indicators.month BETWEEN extraUtilities.dateFrom AND extraUtilities.dateTo ORDER BY extraUtilities.id ASC LIMIT 1,1) as 'Teenuse 2 hind',  
(SELECT extraUtilities.amount FROM extraUtilities WHERE indicators.month BETWEEN extraUtilities.dateFrom AND extraUtilities.dateTo ORDER BY extraUtilities.id ASC LIMIT 1,1) as 'Teenuse 2 kogus',
(SELECT extraUtilities.id FROM extraUtilities WHERE indicators.month BETWEEN extraUtilities.dateFrom AND extraUtilities.dateTo ORDER BY extraUtilities.id ASC LIMIT 2,1) as 'Teenuse 3 id', 
(SELECT extraUtilities.name FROM extraUtilities WHERE indicators.month BETWEEN extraUtilities.dateFrom AND extraUtilities.dateTo ORDER BY extraUtilities.id ASC LIMIT 2,1) as 'Teenuse 3 nimi',  
(SELECT extraUtilities.description FROM extraUtilities WHERE indicators.month BETWEEN extraUtilities.dateFrom AND extraUtilities.dateTo ORDER BY extraUtilities.id ASC LIMIT 2,1) as 'Teenuse 3 kirjeldus',  
(SELECT extraUtilities.price FROM extraUtilities WHERE indicators.month BETWEEN extraUtilities.dateFrom AND extraUtilities.dateTo ORDER BY extraUtilities.id ASC LIMIT 2,1) as 'Teenuse 3 hind',  
(SELECT extraUtilities.amount FROM extraUtilities WHERE indicators.month BETWEEN extraUtilities.dateFrom AND extraUtilities.dateTo ORDER BY extraUtilities.id ASC LIMIT 2,1) as 'Teenuse 3 kogus'
	FROM indicators INNER JOIN users INNER JOIN gas INNER JOIN water
    on indicators.users_id = users.id
    WHERE gas.date = (select date FROM gas WHERE id = (select MAX(id) FROM gas)) AND water.date = (select date FROM water WHERE id = (select MAX(id) FROM water)) AND YEAR(indicators.month) = 2021 AND MONTH(indicators.month) = 10;
    ;










SELECT * FROM extraUtilities; 
UPDATE extraUtilities SET dateFrom = '2008-10-01 00:00:00' WHERE id = 2;
SELECT id, name, description FROM extraUtilities ORDER BY id asc LIMIT 0, 1;


WHERE indicators.month BETWEEN CAST('2021-02-01' AS DATE) AND CAST('2022-02-28' AS DATE);

SELECT id,name FROM extraUtilities e1 WHERE n-1 = (SELECT COUNT(DISTINCT id) FROM extraUtilities e2 WHERE e2.salary > e1.salary);


    
   
SELECT name FROM extraUtilities
	WHERE 2021-10-02 BETWEEN (select dateFrom extraUtilities) AND (select dateTo extraUtilities);
    
SELECT *
FROM extraUtilities
WHERE dateFrom BETWEEN CAST('2014-02-01' AS DATE) AND CAST('2028-02-28' AS DATE); // CAST konverdib kuupäevadeks


        
        
        
        
        
        
        
        
        
SELECT DATE_FORMAT(month, "%M %Y") AS Date, gasUsage FROM indicators;

SELECT * FROM water where id = ;
        
// viimati sisestatud id leidmine. Nende abil saab üles leida viimase kuupäeva hinna;
select date FROM water WHERE id = (select MAX(id) FROM water);
select date FROM gas WHERE id = (select MAX(id) FROM gas);

Leia midagi aasta ja kuu põhjal;
SELECT * FROM indicators WHERE YEAR(month) = 2021 AND MONTH(month) = 10;

INSERT INTO extraUtilities (name, price, description, amount)
    VALUES
    ('Korsten', '35', 'No see sai selleks, et oleks', '2');
SELECT * FROM extraUtilities;