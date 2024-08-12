___________
#zusammenfassung
#sql 
__________


-- 13.06.24

-- Verknüpfen von Tabellen - JOIN

-- Man unterscheidet in drei arten von Verknüpfungen
-- Innere Verknüpfung (INNER JOIN)
-- äußere Verknüfung (OUTER JOIN)
-- Kreutzverknüpfung (CROSS JOIN)

-- JOIN Typen
-- CROSS JOIN		-kennzeichnet das kartesische Produkt
-- (INNER) JOIN		-Kennzeichnet die natürliche Verknüpfung zweier Tabellen

-- LEFT (OUTER) JOIN - linke Außenverknüpfung
-- RIGHT (OUTER) JOIN - rechte Außenverknüpfung
-- FULL (OUTER) JOIN - eine kombination beider Außenverknüpfungen



-- CROSS JOIN

-- das kartesische Produkt zwischen den Tabellen lieferant und lieferung
SELECT * FROM lieferant CROSS JOIN lieferung;

SELECT * FROM lieferant, lieferung;

-- INNER JOIN

-- Beim INNER JOIN werden zwei oder mehrere Tabellen über zwei Spalten miteinander verknüpft
-- Der INNER JOIN ist die Standardvariante und wird oft nur mit JOIN abgekürzt

SELECT * FROM lieferung a JOIN lieferant b
ON a.lnr=b.lnr;

SELECT * FROM lieferant a JOIN lieferung b
ON a.lnr=b.lnr JOIN artikel c ON b.anr=c.anr;

-- gesucht sind die nummern und Namen der Lieferanten die geliefert haben
SELECT DISTINCT a.lnr, lname FROM lieferant a JOIN lieferung b
ON a.lnr=b.lnr;

-- ohne JOIN
SELECT lnr, lname FROM lieferant
WHERE EXISTS (SELECT * FROM lieferung
				WHERE lieferant.lnr=lieferung.lnr);
 

 -- gesucht sind die lieferanten und ihre lieferungen
 SELECT * FROM lieferant a JOIN lieferung b
 ON a.lnr=b.lnr;

 SELECT * FROM artikel a JOIN lieferant b
 ON a.astadt=b.lstadt;

 -- gesucht sind die Lieferanten, die in einer stadt wohnen, in welcher auch andere
 -- Lieferanten wohnen
 SELECT a.* FROM lieferant a JOIN lieferant b
 ON a.lstadt=b.lstadt
 AND a.lnr<>b.lnr;

 -- OUTER JOIN
 
 -- LEFT JOIN beinhaltet sämtliche Reihen der zuerst (linken) genannten Tabelle, 
 -- sowie die Reihen der zweiten (rechte) Tabelle die die Verknüpfung erfüllen

 -- gesucht sind alle lieferanten und die von ihnen ausgeführten Lieferungen 
 -- Es sollen aber auch die Lieferanten angezeigt werden, die noch nicht geliefert haben
SELECT a.*, anr, lmenge,ldatum FROM lieferant a LEFT JOIN lieferung b 
ON a.lnr=b.lnr;


-- RIGHT JOIN beinhaltet sämtliche Reihen der zuerst (rechts) genannten Tabelle, 
 -- sowie die Reihen der zweiten (linke) Tabelle die die Verknüpfung erfüllen

-- gesucht sind alle Lieferungen und Lieferanten, die diese Lieferung durchgeführt haben.
-- Weiterhin sollen alle Lieferungen angezeigt werden, für die kein Lieferant existiert
SELECT a.*,lname, lstadt ,status FROM lieferung a RIGHT JOIN lieferant b
ON a.lnr=b.lnr;

-- FULL JOIN

-- beinhaltet sämtliche Reihen der linken und rechten Tabelle
-- die die Bedingungen erfüllen aber auch die Reihen der linken und rechten Tabelle
-- die sie nicht erfüllen

-- gesucht sind alle Lieferanten und deren Lieferungen, außerdem sollen die Lieferanten
-- angezeigt werden, die noch nicht geliefert haben, aber auch die Lieferungen
-- für die es keine Lieferanten gibt
SELECT * FROM lieferant a FULL JOIN lieferung b
ON a.lnr=b.lnr;

-- Übungsaufgaben
/*
1. Nummern aller Lieferanten, die mindestens einen Artikel geliefert
	haben den auch Lieferant L03 geliefert hat.
2. Nummern aller Lieferanten, die mehr als eine Artikel geliefert haben
3. Nummern und Namen der Artikel, die am selben Ort wie Artikel A03 
	gelagert werden.
4. Durchschnittliche Liefermenge von Artikel A01
5. Gesamtliefermenge aller Lieferungen des Artikels A01 durch den
	Lieferanten L02
6. Lagerorte der Artikel, die von Lieferant L02 geliefert wurden
7. Nummern und Namen der Lieferanten, deren Status kleiner als der 
	von Lieferant L03 ist
8. Nummern und Namen aller Lieferanten, die den Artikel A05 nicht 
	geliefert haben.
*/


--1 Nummern aller Lieferanten, die mindestens einen Artikel geliefert
--	haben den auch Lieferant L03 geliefert hat.
SELECT DISTINCT a.lnr FROM lieferung a JOIN lieferung b
ON a.anr=b.anr
WHERE b.lnr= 'L03'
AND a.lnr <> 'L03';

-- oder
SELECT DISTINCT a.lnr FROM lieferant a JOIN lieferung b
ON a.lnr=b.lnr
WHERE anr IN (SELECT anr FROM lieferung 
				WHERE lnr= 'L03')
AND b.lnr <> 'L03';

-- oder
SELECT lnr FROM lieferung 
WHERE anr IN (SELECT anr FROM lieferung 
				WHERE lnr='L03')
AND lnr <> 'L03';

--oder
SELECT DISTINCT lnr FROM lieferung a
WHERE EXISTS (SELECT * FROM lieferung b
				WHERE a.anr=b.anr AND anr IN (SELECT anr FROM lieferung 
											WHERE lnr ='L03'))
AND lnr <> 'L03';

--2. Nummern aller Lieferanten, die mehr als eine Artikel geliefert haben
SELECT lnr FROM lieferung 
GROUP BY lnr
HAVING 2 <= COUNT(anr);

-- oder
SELECT lnr FROM lieferung
GROUP BY lnr 
HAVING COUNT(DISTINCT anr) >1;

-- oder
SELECT DISTINCT a.lnr, a.anr, b.lnr, b.anr FROM lieferung a JOIN lieferung b
ON a.lnr=b.lnr
AND a.anr <> b.anr; 

INSERT INTO lieferung VALUES ('L03','A02','200','06.08.1990');
DELETE FROM lieferung WHERE lnr= 'L03'

SELECT * FROM lieferung
-- oder
SELECT DISTINCT lnr FROM lieferung a
WHERE 1 < (SELECT COUNT(anr) FROM lieferung b
			WHERE a.lnr=b.lnr);

--3. Nummern und Namen der Artikel, die am selben Ort wie Artikel A03 
--   gelagert werden.
SELECT a.anr, a.aname FROM artikel a JOIN artikel b
ON a.astadt=b.astadt
AND b.anr = 'A03';

-- oder
SELECT anr, aname FROM artikel
WHERE astadt = (SELECT astadt FROM artikel 
					WHERE anr= 'A03');

-- 4. Durchschnittliche Liefermenge von Artikel A01
SELECT AVG(lmenge) FROM lieferung
WHERE anr= 'A01';

-- 5. Gesamtliefermenge aller Lieferungen des Artikels A01 durch den
--	  Lieferanten L02
SELECT SUM(lmenge) FROM lieferung
WHERE anr= 'A01' AND lnr= 'L02';

-- 6. Lagerorte der Artikel, die von Lieferant L02 geliefert wurden
SELECT astadt FROM lieferung a JOIN artikel b
ON a.anr=b.anr 
WHERE a.lnr= 'L02';

-- oder
SELECT astadt FROM artikel
WHERE anr IN (SELECT anr FROM lieferung 
				WHERE lnr= 'L02'); 


-- 7. Nummern und Namen der Lieferanten, deren Status kleiner als der 
--    von Lieferant L03 ist
SELECT lnr, lname FROM lieferant
WHERE status < (SELECT status FROM lieferant
				WHERE lnr= 'L03');

-- oder
SELECT a.lnr, a.lname FROM lieferant a JOIN lieferant b
ON a.status < b.status
WHERE b.lnr= 'L03';

-- 8. Nummern und Namen aller Lieferanten, die den Artikel A05 nicht geliefert haben.
SELECT DISTINCT a.lnr, a.lname FROM lieferant a JOIN lieferung b
ON a.lnr=b.lnr 
AND b.lnr NOT IN (SELECT lnr FROM lieferung 
					WHERE anr= 'A05');


-- oder
SELECT lnr, lname FROM lieferant
WHERE lnr NOT IN (SELECT lnr FROM lieferung 
					WHERE anr= 'A05' OR anr=NULL)


-- oder
SELECT lnr, lname FROM lieferant a
WHERE NOT EXISTS (SELECT lnr FROM lieferung b
					WHERE a.lnr = b.lnr
					AND anr = 'A05');

-- oder ohne die Lieferanten die noch nicht geliefert haben					
SELECT a.lnr, a.lname FROM lieferant AS a
WHERE EXISTS (SELECT b.lnr FROM lieferung AS b WHERE a.lnr=b.lnr)
AND a.lnr NOT IN (SELECT lnr FROM lieferung WHERE anr='A05');
