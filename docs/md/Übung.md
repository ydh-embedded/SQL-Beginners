_______________________________________________________________________________

	1. Gesucht sind alle Artikel die mehr als 13 gramm wiegen

	2. Gesucht sind alle Lieferanten die kein B in Ihrem Namen tragen
	3. Gesucht sind alle Lieferungen die zwischen dem 06.08.1990 und dem 21.08.1990 stattgefunden haben
	4. Gesucht sind alle Artikel die nicht rot oder blau sind
	5. Gesucht sind alle Artikel die mit dem Buchstaben e enden
	6. Gesucht sind alle Artikel die ein c an zweiter Stelle im Namen tragen
	7. Gesucht sind alle Artikel die mehr als 15 gramm wiegen oder deren Menge größer als 600 ist


		1.1 SELECT * FROM artikel


# Übung:
_______________________________________________________________________________

	1. Schreibe zwei Abfragen (BETWEEN & IN),die alle Lieferungen vom 05.08.24 bzw. 06.08.1990
	2. Schreibe eine Abfrage welche die Nummern und Namen aller roten bzw. blauen Artikel ausgibt (Stadtname: Hamburg) zudem ergänze Artikel wo der Bestand zwischen 900 & 1500 liegt
	3. Schreibe eine Abfrage die alle Lieferanten ausgibt, deren Namen mia A bzw. S beginnt
	4. Schreibe eine Abfrage die die Namen, Lieferantennummern und den Status aller Lieferanten 

### Lösungen:

	1.1.1   SELECT * FROM Lieferung WHERE LDatum BETWEEN '05.08.1990' AND '06.08.1990';
	1.1.2   SELECT * FROM Lieferung WHERE LDatum IN ('05.08.1990' , '06.08.1990');
		   
	1.2   
			
	
	2.1   SELECT ANr,AName FROM Artikel
	       WHERE Farbe IN ('rot','blau') AND AStadt = 'Hamburg' OR
	       AMenge BETWEEN '900' AND '1500';

	3.1   SELECT * FROM Lieferung WHERE LName LIKE 'A%' OR LName LIKE 'S%' ;

	4.1   SELECT LNr,LName,Status FROM Lieferant
	       WHERE LStadt= 'Ludwigshafen' AND LNr IN (SELECT LNr FROM Lieferung
	       WHERE LDatum BETWEEN '01.08.1990' AND  '31.08.1990' );