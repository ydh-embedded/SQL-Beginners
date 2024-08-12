## SQL Abfragen

### Aufgabe 1.

- Ortsnamen , die Wohnort aber keine Lagerorte sind

```sql
	SELECT AStadt FROM Artikel
	 EXCEPT
	SELECT LStadt FROM Lieferant ;
```
.

### Aufgabe 2.

- Nummern und Bezeichnungen aller Artikel, deren durchschnittliche Liefermenge größer als die von A02 ist

```sql
	SELECT ANr AS 'Artikel-Nummer', AName AS 'Artikel-Bezeichnung' FROM Artikel
		WHERE ANr IN (SELECT ANr AS 'Durchschnittliche Liefermenge' FROM Lieferung
		GROUP BY ANr 
		HAVING AVG(LMenge) > (SELECT AVG(LMenge)
								FROM Lieferung
								WHERE ANr = 'A02'));
```
.

### Aufgabe 3.

- Nummern , Namen und Wohnorte der Lieferanten, die bereits mindestens einmal geliefert haben und deren Status größer als der kleinste Lieferstatus aller Lieferanten ist 

```sql
SELECT DISTINCT a.LNr, a.LName, a.LStadt FROM Lieferant a JOIN Lieferung b 
ON a.LNr = b.LNr 
WHERE a.Status > (SELECT MIN(Status) FROM Lieferant);
```
.

### Aufgabe 4.

- Namen und Nummern der Lieferanten, die mindestens 3 verschiedene Artikel geliefert haben

```sql
   SELECT LName , LNr FROM Lieferant
	WHERE LNr IN (SELECT LNr FROM Lieferung
				GROUP BY LNr
				HAVING COUNT (DISTINCT ANr) >= '3' ) ;
```
.

### Aufgabe 5.

- Lagerorte der Artikel die von Lieferant L04 ausgeliefert wurden

```sql
   SELECT a.ANr, a.AStadt FROM Artikel a JOIN Lieferung b 
	ON a.ANr = b.ANr 
	WHERE b.LNr = 'L04' ;
```
.

### Aufgabe 6.

- Schreibe eine Abfrage die folgenden Satz ausgibt: 
		1. Das Zahnrad mit der Artikelnummer A06 ist rot und wird in Hamburg gelagert

```sql
	SELECT  'Das ' +aname+ 
			' mit der Artikelnummer ' +anr+
			' ist ' +farbe+
			'und wird in ' +astadt+
			' gelagert.'
			AS 'String'
	 FROM Artikel
	 WHERE ANr = 'A06' ;
	
```
.
