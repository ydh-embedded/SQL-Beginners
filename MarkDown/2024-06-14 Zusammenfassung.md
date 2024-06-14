
-- 14.06.24

-- Einfügen von Daten
--INSERT INTO Befehl ohne nähere definition der Daten 
--muss Spaltenreihenfolge und der Datentyp übereinstimmen

-- in der Reihenfolge
INSERT INTO lieferant VALUES ('L07','Hustensaftschmuggler','40','Erfurt');

SELECT * FROM lieferant;

-- veränderte Reihenfolge
INSERT INTO lieferant (lstadt,lnr,lname,status)
VALUES ('Weimar','L08','Conny','30');

-- unbekannte Werte aufnehmen
INSERT INTO lieferant VALUES ('L10','Blanko','10',NULL);

-- oder
INSERT INTO lieferant (lnr,lname) VALUES ('L09','Okupenko');


-- Ändern von Daten
-- einfache UPDATE Anweisung

-- Lieferant L08 wohnt jetzt in Gotha
UPDATE lieferant SET lstadt = 'Gotha'
WHERE lnr= 'L09';

-- ändern des Status der Lieferanten, die nach dem 13.08.90 geliefert haben
UPDATE lieferant SET status= status * 0.2
FROM lieferant, lieferung
WHERE lieferant.lnr=lieferung.lnr
AND ldatum >= '13.08.1990';

-- ändern des Status in abhängigkeit mehrerer Faktoren
UPDATE lieferant
SET status= CASE WHEN status BETWEEN '0' AND '10' THEN status * 2.0
				WHEN status BETWEEN '11' AND '20' THEN status * 1.3
				WHEN status BETWEEN '21' AND '30' THEN status * 1.4
				ELSE status * 1.1
				END;

SELECT * FROM lieferant;

-- löschen von Daten

-- löschen des Fahrers Blanko
DELETE FROM lieferant
WHERE lname= 'Blanko';

-- löschen aller Lieferanten die in Gotha wohnen
DELETE FROM lieferant
WHERE lstadt= 'Gotha';

-- löschen aller lieferungen des Lieferanten Okupenko

-- damit wir sie löschen können geben wir ihm erst eine lieferung
INSERT INTO lieferung VALUES ('L09','A02','300','19.05.1990');

SELECT * FROM lieferung;

-- löschen seiner lieferungen
DELETE FROM lieferung
WHERE lnr= (SELECT lnr FROM lieferant
			WHERE lname= 'Okupenko');


-- kleine Übungsaufage
-- Schreibe zwei verschiedene Abfragen die alle Lieferantan ausgibt, deren
-- Namen mit S, C oder B beginnen und deren dritter Buchstabe ein a ist.
SELECT * FROM lieferant
WHERE lname LIKE '[SCB]_a%';

SELECT * FROM lieferant
WHERE lname LIKE 'S_a%' OR lname LIKE 'C_a%' OR lname LIKE 'B_a%';

SELECT * FROM lieferant
WHERE lname IN (SELECT lname FROM lieferant 
				WHERE lname LIKE 'S%' OR lname LIKE 'C%' OR lname LIKE 'B%')
AND lname LIKE '__a%';


-- große Übungsaufage
/*
1. Lieferantennummern und Namen, die alle Artikel geliefert haben
2. Nummern, Namen und Wohnort der Lieferanten, die bereits geliefert haben
   und deren status größer als der kleinste status aller lieferanten ist
3. Nummern und namen aller artikel,deren durchschnittliche Liefermenge kleiner als die
   von artikel A03 ist
4. Lieferantennamen und nummern, Artikelname und artikelnummern aller lieferungen
   die seit dem 05.05.1990 von Hamburger lieferanten durchgeführt wurden
*/
-- 1.
SELECT a.lnr, lname FROM lieferant a JOIN lieferung b
ON a.lnr = b.lnr 
GROUP BY a.lnr, a.lname
HAVING COUNT(b.anr)= (SELECT COUNT(anr) FROM artikel);

-- oder
SELECT lnr, lname FROM lieferant
WHERE lnr IN (SELECT lnr FROM lieferung
				GROUP BY lnr
				HAVING COUNT(anr) = (SELECT COUNT(anr) FROM artikel));


--2.
SELECT DISTINCT a.lnr, a.lname, a.lstadt FROM lieferant a JOIN lieferung b 
ON a.lnr = b.lnr 
WHERE a.status > (SELECT MIN(status) FROM lieferant);


-- oder
SELECT DISTINCT a.lnr, a.lname, a.lstadt FROM lieferant a JOIN lieferung b 
ON a.lnr = b.lnr 
AND status >ANY (SELECT status FROM lieferant);

-- oder
SELECT DISTINCT a.lnr, a.lname, a.lstadt FROM lieferant a, lieferung b
WHERE a.lnr=b.lnr 
AND EXISTS (SELECT * FROM lieferant c
			WHERE c.status < a.status);



--3.
SELECT anr, aname FROM artikel
WHERE anr IN (SELECT anr FROM lieferung
				GROUP BY anr
				HAVING AVG(lmenge) < (SELECT AVG(lmenge)
										FROM lieferung
										WHERE anr = 'A03'));

-- oder
SELECT DISTINCT a.anr, aname FROM artikel a
JOIN lieferung b ON a.anr = b.anr
GROUP BY a.anr, aname
HAVING AVG(lmenge) < (SELECT AVG(lmenge)
						FROM lieferung 
						WHERE anr = 'A03');

-- oder
SELECT anr, aname FROM artikel 
WHERE anr IN (SELECT anr FROM 
					(SELECT anr, AVG(lmenge) avglmenge FROM lieferung 
						GROUP BY anr) verweis
						WHERE avglmenge<(SELECT AVG(lmenge) FROM lieferung 
											WHERE anr ='A03'));




--4
SELECT a.lnr, a.lname, c.anr, c.aname FROM lieferant a JOIN lieferung b
ON a.lnr= b.lnr JOIN artikel c 
ON b.anr= c.anr 
WHERE b.ldatum >='05.05.1990'
AND a.lstadt='Hamburg';

-- oder
SELECT a.lname, a.lnr, c.aname, c.anr FROM lieferant a JOIN lieferung b
ON a.lnr=b.lnr JOIN artikel c ON b.anr=c.anr
WHERE a.lstadt ='Hamburg' AND b.ldatum BETWEEN '05.05.1990' AND '31.12.1990';


/*
5. Ortsnamen die Wohnort aber kein Lagerort sind
6. Ortsnahmen die sowohl Wohn- als auch Lagerort sind
7. Nummern aller Lieferanten, die mindestens einen Artikel geliefert haben
   den auch Lieferant L03 geliefert hat
*/

--5
SELECT DISTINCT lstadt FROM lieferant
WHERE lstadt NOT IN (SELECT astadt FROM artikel);

-- oder
SELECT DISTINCT lstadt FROM lieferant
WHERE  NOT EXISTS (SELECT * FROM artikel
					WHERE lstadt = astadt);


--6
SELECT DISTINCT lstadt FROM lieferant, artikel
WHERE lstadt = astadt;


-- oder
SELECT DISTINCT lstadt FROM lieferant
WHERE lstadt IN (SELECT astadt FROM artikel);
 
-- oder
SELECT DISTINCT a.lstadt AS 'Wohnort' FROM lieferant a JOIN lieferung b 
ON a.lnr = b.lnr JOIN artikel c ON b.anr = c.anr
WHERE a.lstadt = c.astadt;

-- oder
SELECT DISTINCT a.lstadt FROM lieferant a JOIN artikel b
ON a.lstadt = b.astadt;

--7
SELECT a.lnr FROM lieferung a, lieferung b
WHERE a.anr=b.anr
AND b.lnr= 'L03'
AND a.lnr<> 'L03';


--oder
SELECT lnr FROM lieferung
WHERE anr IN (SELECT anr FROM lieferung
				WHERE lnr='L03')
AND lnr <> 'L03';