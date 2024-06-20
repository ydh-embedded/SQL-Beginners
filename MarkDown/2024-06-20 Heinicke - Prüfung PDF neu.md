  

# db standard.xls

  

_____________________________________________________________________________________

  

  

## Leistungsfeststellung 

  

- Es dürfen die eigenen Unterlagen sowie, der aufgesetzte SQL-Server mit der Datenbank „Standard“ verwendet werden. Alle ### Aufgaben sollen in einer einzelnen Abfrage gelöst werden. Alle benötigten Informationen sollen innerhalb dieser Abfrage ausgegeben werden. 

  

- Das Internet sowie Gruppenarbeit sind nicht gestattet. 

  

_____________________________________________________________________________________

  

 ***Durch welche Abfrage erhält man aus der Datenbank „Standard“:***  

  

### Aufgabe 1.

  

- Die Daten aller Lieferanten aus Aachen. (3P) 

  

```sql

  SELECT * FROM Lieferant

      WHERE LStadt = 'Aachen' ;

```

  

.

  

### Aufgabe 2.

  

- Namen, Lagerorte und Gewicht aller Artikel in kg. (3P) 

  

```sql

    SELECT AName AS 'Namen' ,

           AStadt AS 'Lagerorte' ,

           Gewicht * 0.001 as [Gewicht in kg]

    FROM Artikel

    ORDER BY Gewicht ASC ;

```

  

.

  

### Aufgabe 3.

  

 - Die Daten aller Lieferungen von in Ludwigshafen gelagerten Artikeln. (3P) 

  

```sql        

     SELECT LNr AS 'Lieferungen' FROM Lieferant

         WHERE LStadt = 'Ludwigshafen'

```

  

    .

  

### Aufgabe 4.

  

 - Namen und Nummern aller Lieferanten mit einem Status zwischen 8 und 20. (3P) 

  

```sql        

SELECT LName , LNr FROM lieferant

WHERE status < (SELECT status FROM lieferant

                WHERE LNr  BETWEEN '8' AND '20' );

```

  

    .

  

  

### Aufgabe 5.

  

 - Das Datum Aller Lieferungen, bei denen der Artikel A01 ausgeliefert wurde. (3P) 

  

```sql        

    SELECT

        DATENAME(dd,LDatum) + '. ' +

        DATENAME(mm,LDatum) + ' ' +

        DATENAME(yy,LDatum) + '' AS 'Lieferdatum'

        FROM Lieferung

        WHERE ANr = 'A01' ;

```

  

    .

### Aufgabe 6.

  

 - Artikelnummer, Artikelname sowie die Daten der Lieferanten mit übereinstimmendem Lager und Wohnort. (4P) 

```sql        

        select DISTINCT anr,aname,lnr,lname FROM artikel

        join lieferant on astadt = lstadt

        ORDER BY ANr ASC ;

```

  

    .

  

### Aufgabe 7.

  

 - Nummern aller Lieferanten die mindestens einen Artikel geliefert haben, den auch Lieferant L04 geliefert hat. (4P) 

  

```sql        

    SELECT LNr AS 'Liefernummer die abgeliefert haben' FROM lieferant  

        WHERE LNr IN( SELECT LNr FROM lieferant  

        WHERE LNr= 'L05');

```

  

    .

  

### Aufgabe 8.

  

 - Nummern und Namen aller Lieferanten, die mindestens 2 verschiedene Artikel geliefert haben. (3P) 

  

```sql        

   SELECT LNr AS 'Liefernummer' , LName AS 'Liefername' FROM Lieferant

    WHERE LNr IN (SELECT LNr FROM Lieferung

                GROUP BY LNr

                HAVING COUNT (DISTINCT ANr) >= '2' ) ;

```

  

    .

  

### Aufgabe 9.

  

 - Alle Lieferanten die in Hamburg wohnen und in deren Namen kein „h“ vorkommt. (3P) 

```sql        

    SELECT LName , LStadt FROM Lieferant

        WHERE LStadt IN ('Hamburg')

        AND NOT LName = '[H,h]%';

```

  

    .

  

  

### Aufgabe 10.

  

 - Die Menge der gelagerten Artikel soll in einer Tabelle „Bestand“ ausgegeben werden.

    Sollte die Menge eines Artikels 400 oder weniger betragen muss nachbestellt werden,

   bis 1000 Stück sind ausreichend viele Artikel im Lager.

   Alle Artikel deren Lagerbestand über 1000 Stück liegen,

    sollen ins Angebot genommen werden. (4P) 

  

```sql        

    SELECT AMenge AS 'Bestand' FROM Artikel

        WHERE AMenge < '400' AND

              AMenge > '1000' ;

    -- ins Angebot nehmen hat leider nicht funktioniert !

```

  

    .

  

### Aufgabe 11.

  

 - Gesamtliefermenge aller Lieferungen des Artikels A01 durch den Lieferanten L04. (4P) 

  

```sql        

    SELECT sum(LMenge) AS 'Gesamtliefermenge' FROM lieferung

        WHERE ANr = 'A01';

```

  

    .

  

  

### Aufgabe 12.

  

 - Nummern und Namen der Lieferanten, deren Statuswert größer als der von Lieferant L05 ist. (4P) 

  

```sql        

    SELECT LNr AS 'Lieferanten-Nummer' ,

         LName AS 'Lieferanten-Name' FROM Lieferant  

        WHERE status > '30';

```

  

    .

  

  

### Aufgabe 13.

  

 - Nummern, Namen und Status aller Lieferanten die nicht den Artikel A04 geliefert haben. (4P) 

  

```sql    

   SELECT DISTINCT

                   a.ANr AS 'Artikel-Nummer' ,

                   a.AName AS 'Artikel-Namen' FROM Artikel a

                   JOIN Lieferung b ON a.ANr = b.ANr

            WHERE a.ANr != 'A04'

        ORDER BY a.ANr ASC ;

```

  

    .

  

  

### Aufgabe 14.

  

 - Durchschnittliche liefermenge des Artikels A01. (3P) 

```sql        

    SELECT AVG(LMenge) AS 'Durchschnittliche Liefermnege in Stück' FROM lieferung

        WHERE ANr= 'A01';

```

    .

  

  

### Aufgabe 15.

  

 - Lagerorte aller Artikel die von Lieferant L01 geliefert wurden. (5P) 

  

```sql        

SELECT a.LStadt AS 'Lagerort' ,

        a.LNr AS 'Liefernummer' ,

        b.LMenge AS 'Liefernummer' ,

        c.AName AS 'Artikel-Name' ,

        c.ANr AS 'Lieferstatus' FROM Lieferant a

    JOIN Lieferung b ON a.LNr=b.LNr

    JOIN Artikel c   ON b.ANr=c.ANr

    WHERE a.LNr = 'L01'

    ORDER BY  a.LNr DESC ;

```

  

    .

  

  

### Aufgabe 16.

  

 - Die Daten aller Lieferanten die alle Artikel mindestens einmal ausgeliefert haben. (5P) 

  

```sql        

SELECT DISTINCT a.LName AS 'Lieferant' ,

                a.LNr AS 'Liefernummer' ,

                a.LStadt AS 'Lagerort' ,

                a.Status AS 'Status'  FROM Lieferant a

    JOIN Lieferung b ON a.LNr = b.LNr

 WHERE a.Status > (SELECT MIN(Status) FROM Lieferant);

```

  

    .

  

  

### Aufgabe 17.

  

 - Anzahl der Lieferungen die seit dem 01.08.1990 von Lieferanten aus Ludwigshafen ausgeführt wurden. (5P)

  

```sql        

SELECT b.LMenge , a.LStadt , c.AName , c.ANr AS 'Lieferstatus' FROM Lieferant a

    JOIN Lieferung b ON a.LNr=b.LNr

    JOIN Artikel c   ON b.ANr=c.ANr

    WHERE LStadt = 'Ludwigshafen' AND  b.LDatum

BETWEEN '01.08.1990' AND getdate();

```

    .

  
  

### Aufgabe 18.

  

 - Nummern und Bezeichnung aller Artikel, deren durchschnittliche Liefermenge kleiner als die durchschnittliche Menge von Artikel A03 ist. (5P) 

  

```sql        

SELECT DISTINCT a.ANr AS 'Artikel-Nummern' ,

                AName AS 'Artikel-Bezeichnung'  FROM Artikel a

    JOIN lieferung b ON a.ANr = b.ANr

    GROUP BY a.ANr, AName

    HAVING AVG(lmenge) < (SELECT AVG(lmenge)

                        FROM lieferung

                        WHERE ANr = 'A03');

```

    .

  
  

  

### Aufgabe 19.

  

 - Nummern, Namen und Wohnort der Lieferanten,

    die mindestens 2 Lieferungen durchgeführt haben und

   deren Status größer als der kleinste Status aller Lieferanten ist. (5P) 

  

  

```sql

    SELECT DISTINCT a.lnr, a.lname, a.lstadt FROM lieferant a

        JOIN lieferung b ON a.lnr = b.lnr

        AND status >ANY (SELECT status FROM lieferant);

```

  

    .

  

  

### Aufgabe 20.

  

 - Schreibe eine Abfrage die folgenden Satz zum Artikel A06 ausgibt(3P) 

    Die Nockenwelle mit der Artikelnummer A05 ist blau und wiegt 12 Gramm,

   sie wird in Ludwigshafen gelagert. 

  

  

```sql        

    SELECT  'Die '        +aname+

            ' mit der Artikelnummer ' +anr+

            ' ist '       +farbe+

            'und wiegt '  ++

            '12 Gramm'    ++

            ', sie wird in ' +astadt+

            ' gelagert.'

            AS 'String' ,

            Gewicht AS 'Gewicht in Gramm' FROM Artikel

     WHERE ANr = 'A05' ;

```

  

    .

  

  

### Aufgabe 21.

  

 - Ein neuer Artikel mit der Nummer A38 soll ins Sortiment hinzugefügt werden.

   Es handelt sich um einen blauen Passierschein.

   Der 10 gram leichte Schein soll in Erfurt gelagert werden,

   noch ist die Menge der Scheine unbekannt. (4P) 

  

  

```sql        

    INSERT INTO Artikel

    VALUES ( 'A38' , 'Passierschein' , 'blau' , '10' , 'Erfurt' , NULL ) ;

```

  

    .

  

  

_____________________________________________________________________________________

  

Gesamtpunkte = 80 P 

  

Notenschlüssel 

  

0P – 23P = 6 

24P – 39P = 5 

40P – 53P = 4 

54P – 63P = 3 

64P – 72P = 2 

71P – 80P = 1

  

_____________________________________________________________________________________