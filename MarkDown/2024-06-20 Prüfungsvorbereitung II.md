# db - standard.xls
## Übungen

#### standard.xls
![[SQL -db standard.xls Tabelle.png]]


###  Vergleichsoperatoren  

#### Aufgabe 1.

-   alle lieferungen mit einer liefermege von mindestens 230 Stück  

```sql
	select * from lieferung
	where lmenge >= 230;
```
.

#### Aufgabe 2.

-   gesucht sind alle Lieferanten deren Status kleiner als 12 ist  

```sql
SELECT LNr AS 'Lieferanten-Nummer' , LName AS 'Lieferanten-Name' FROM Lieferant  
	WHERE status < '12';
```
.

#### Aufgabe 3.

-   Gesucht sind alle Artikel deren Gewicht kleiner als 15 gramm ist  

```sql
SELECT AName AS 'Artikelname' , Gewicht AS 'Gewicht' FROM Artikel
	WHERE Gewicht < '15' ;
```
.

#### Aufgabe 4.

-   alle lieferungen mit einer liefermenge von maximal 300 Stück  

```sql
SELECT LNr AS 'Liefernummer' , ANr AS 'Artikelnummer' , LMenge AS 'Liefermenge' , LDatum AS 'Lieferdatum' FROM Lieferung
	WHERE LMenge <= '300'
	ORDER BY LMenge DESC;
```
.

#### Aufgabe 5.

-   Alle Artikel mit einer Lagermenge von mindestens 800 Stück

```sql
SELECT AName AS 'Artikel' , AMenge AS 'Lagermenge' FROM Artikel
	WHERE AMenge >= '800' 
	ORDER BY AMenge DESC;
	
```
.


###  Schlüsselwort IN  

#### Aufgabe 1.

-   gesucht sind die Namen der Hamburger und Aachener Lieferanten  

```sql
SELECT  LNr AS 'Lieferanten-Nr' ,
		ANr AS 'Artikelnummer' ,
		
		DATENAME(dd,LDatum) + '. ' +
		DATENAME(mm,LDatum) + ' ' +
		DATENAME(yy,LDatum) + '' AS 'Lieferdatum' FROM lieferung  
	WHERE LNr IN (SELECT LNr FROM lieferant  
		       WHERE lstadt = 'Hamburg')
	ORDER BY LDatum ASC ;
        
```
.

#### Aufgabe 2.

-   gesucht sind alle Lieferungen von 100,300 oder 400 Stück  

```sql
SELECT LNr AS 'Lieferung' FROM Lieferung 
	WHERE LNr IN ( SELECT LNr FROM Lieferung
					WHERE LMenge = '100 'OR
					 LMenge = '300' OR 
					 LMenge = '400' ) ;
```
.

#### Aufgabe 3.

-   gesucht sind alle roten und blauen Artikel  

```sql
SELECT  AName AS 'rote und blaue Artikel',
		Farbe AS 'Farbe' FROM Artikel 
	WHERE AName IN ( SELECT AName FROM Artikel
					WHERE Farbe = 'rot' OR
						  Farbe = 'blau' ) 
	ORDER BY Farbe ASC ;
```
.

#### Aufgabe 4.

-   gesucht sind alle Lieferungen die ***nicht***
	zwischen dem 01.08.90 und dem 31.08.90 durchgeführt wurden  

```sql
SELECT DISTINCT ANr AS 'Lieferungen' FROM Lieferung 
WHERE Anr  IN (SELECT Anr FROM Artikel
				WHERE LDatum <= '01.08.1990' AND
					  LDatum >= '31.08.1990' ) 
	ORDER BY ANr ASC ;
```
.

#### Aufgabe 5.

-   Die Daten aller Lieferungen von Lieferanten aus Ludwigshafen  

```sql

```
.

#### Aufgabe 6.

-   gesucht sind alle Artikel die nicht rot oder blau sind

```sql

```
.


###  Schlüsselwort LIKE  

#### Aufgabe 1.

-   gesucht sind alle Lieferanten deren Namen mit den Buchstaben A bis J beginnen  

```sql

```
.

#### Aufgabe 2.

-   gesucht sind alle Lieferanten in deren Namen kein a vorkommt  

```sql

```
.

#### Aufgabe 3.

-   gesucht sind alle roten Artikel die mit dem Buchstaben S beginnen  

```sql

```
.

#### Aufgabe 4.

-   gesucht sind alle Artikel die mit dem Buchstabe e enden  

```sql

```
.

#### Aufgabe 5.

-   Schreibe eine Abfrage die alle Lieferanten ausgibt, deren Namen mit A oder S beginnen

```sql

```
.


###  Sortieren mit Aggregatfunktionen  

#### Aufgabe 1.

-   Die durchschnittsmenge aller gelagerten artikel  

```sql

```
.

#### Aufgabe 2.

-   Gesucht sind alle Lieferanten mit dem höchsten Status.  

```sql

```
.

#### Aufgabe 3.

-   gesucht sind die Lieferanten, deren Status über dem durchschnittlichen   
   Status aller Lieferanten liegt   

```sql

```
.

#### Aufgabe 4.

-   gesucht sind die Lieferanten, die mindestens dreimal geliefert haben  

```sql

```
.

#### Aufgabe 5.

-   Gesucht sind die Nummern, Namen, Gewicht und das durchschnittsgewicht aller Artikel  
   sowie die Differenz des Gewichtes jedes einzelnen Artikels zum   
   Durchschnittsgewicht aller Artikel

```sql

```
.


###  EXISTS / NOT EXISTS  

#### Aufgabe 1.

-   gesucht sind Lieferanten, die bereits geliefert haben   

```sql

```
.

#### Aufgabe 2.

-   gesucht sind Ortsnamen, die Wohnort aber nicht Lagerort sind   

```sql

```
.

#### Aufgabe 3.

-   Nummern aller Lieferanten, die mindestetns einen Artikel auslieferten, den auch der  
   Lieferant L02 ausgeliefert hat   

```sql

```
.

#### Aufgabe 4.

-   gesucht sind die nummern und Namen der Lieferanten die geliefert haben   

```sql

```
.

#### Aufgabe 5.

-   Lagerorte der Artikel, die von Lieferant L02 geliefert wurden   

```sql

```
.

#### Aufgabe 6.

-   Ortsnamen die Wohnort aber kein Lagerort sind 

```sql

```
.


###  auflisten TOP   

#### Aufgabe 1.

-   gesucht sind die drei Lieferungen mit den höchsten Liefermengen  

```sql

```
.

#### Aufgabe 2.

-   gesucht sind alle Werte der vier Lieferanten mit dem höchsten status  

```sql

```
.

#### Aufgabe 3.

-   gesucht sind die fünf Lieferanten mit dem niedrigsten status 

```sql

```
.


###  gruppieren  ORDER BY / GROUP BY / HAVING  

#### Aufgabe 1.

-   gesucht sind die kleinste Liefermenge eines jeden Lieferanten  

```sql

```
.

#### Aufgabe 2.

-   gesucht ist die größte Lieferung eines jeden Lieferanten nach dem 01.08.90  

```sql

```
.

#### Aufgabe 3.

-   Nummern aller Lieferanten, die mehr als eine Artikel geliefert haben  

```sql

```
.

#### Aufgabe 4.

-   Lieferantennummern und Namen, die alle Artikel geliefert haben  

```sql

```
.

#### Aufgabe 5.

-   Nummern und namen aller artikel,deren durchschnittliche Liefermenge kleiner als die  
   von artikel A03 ist

```sql

```
.

###  INNER JOIN  

#### Aufgabe 1.

-   gesucht sind die lieferanten und ihre lieferungen   

```sql

```
.

#### Aufgabe 2.

-   gesucht sind die Lieferanten, die in einer stadt wohnen, in welcher auch andere  
   Lieferanten wohnen   

```sql

```
.

#### Aufgabe 3.

-   Artikelnummer, Artikelname und Lieferantennummer sowie die Lieferantennamen der   
   Lieferanten mit Übereinstimmenden Wohn und Lagerort   

```sql

```
.

#### Aufgabe 4.

-   Nummern aller Lieferanten, die mindestens einen Artikel geliefert  
   haben den auch Lieferant L03 geliefert hat.   

```sql

```
.

#### Aufgabe 5.

-   Nummern aller Lieferanten, die mehr als eine Artikel geliefert haben 

```sql

```
.


###  OUTER JOIN  

#### Aufgabe 1.

-   gesucht sind alle Lieferungen und Lieferanten, die diese Lieferung durchgeführt haben.  
   Weiterhin sollen alle Lieferungen angezeigt werden, für die kein Lieferant existiert   

```sql

```
.

#### Aufgabe 2.

-   gesucht sind alle lieferanten und die von ihnen ausgeführten Lieferungen   
   Es sollen aber auch die Lieferanten angezeigt werden, die noch nicht geliefert haben   

```sql

```
.

#### Aufgabe 3.

-   gesucht sind alle Lieferanten und deren Lieferungen, außerdem sollen die Lieferanten  
   angezeigt werden, die noch nicht geliefert haben, aber auch die Lieferungen  
   für die es keine Lieferanten gibt 

```sql

```
.


###  CASE / Sätze  

#### Aufgabe 1.

-   Die Menge der gelagerten Artikel soll in einer Tabelle „Bestand“ ausgegeben werden.   
   Sollte die Menge eines Artikels 200 oder weniger betragen muss nachbestellt werden,   
   bis 800 Stück sind ausreichend viele Artikel im Lager. Alle Artikel deren Lagerbestand   
   über 1000 Stück liegen, sollen ins Angebot genommen werden.    

```sql

```
.

#### Aufgabe 2.

-   Die Menge der gelieferten Artikel soll in einer Tabelle „auslieferung“ ausgegeben werden.   
   Sollte die Menge eines Artikels 200 oder weniger betragen muss mehr aufgeladen werden,   
   bis 300 Stück sind ausreichend viele Artikel im LKW. Alle Artikel deren Liefermenge  
   über 400 Stück liegen, sollen die Fahrer direkt angezeigt werden.    

```sql

```
.

#### Aufgabe 3.

-   Schreibe eine Abfrage die folgenden Satz ausgibt:  
   Die Schraube mit der Artikelnummer A03 ist blau und wird in Mannheim gelagert   

```sql

```
.

#### Aufgabe 4.

-   Schreibe eine Abfrage die folgenden Satz ausgibt:  
   Der Lieferant Jonas mit der Lieferantennummer L02 wohnt in Ludwigshafen und   
   sein status liegt bei 10.   

```sql

```
.

#### Aufgabe 5.

-   Schreibe eine Abfrage die folgenden Satz ausgibt:  
   In Mannheim müssten noch 400 Artikel mit der farbe blau lagern 

```sql

```
.
