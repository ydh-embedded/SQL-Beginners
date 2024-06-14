#### 2.
- Artikelnummer, Name und Lagerort aller Artikel die am 23.7.90 versendet wurden
	-- Wir brauchen folgende Tabellen :artikel Tabelle, lieferung-Tabelle  
	-- Die Spalte die beiden gemeinsam ist : anr   
	-- Nun teilen wir die Abfrage in einzelne Unterabfragen auf

- Artikelnummer Name und Lagerort aller Artikel  
```sql
SELECT anr,aname,astadt FROM artikel ;
```


-  am 23.07.1990 geliefert  
```sql
SELECT anr FROM lieferung  
	WHERE ldatum = '23.07.1990' ;
```


- Nun müssen die beiden Abfragen durch die Spalte die verglichen werden kann, verbunden werden (anr)
```sql
SELECT anr,aname,astadt FROM artikel  
	WHERE anr = (SELECT anr FROM lieferung  
    WHERE ldatum = '23.07.1990');
```


          
#### 3.
- Nummern und Namen der Lieferanten, deren Status kleiner als der von Lieferant L03 ist.  
-- Lieferanten  
```sql
SELECT LNr, lname FROM lieferant  
	WHERE status < (SELECT status FROM lieferant  
	WHERE LNr = 'L03');
```


#### 4.
- die Liefermenge und das Lieferdatum an dem rote Muttern versendet wurden  
-- lieferung, artikel
```sql
SELECT anr, lmenge, ldatum FROM lieferung  
WHERE anr = (SELECT anr FROM artikel  
        WHERE farbe = 'rot' AND aname = 'Mutter');
```


#### 5.
- Die Daten aller lieferungen von Lieferanten aus Hamburg  
-- lieferungen Lieferanten  
-- LNr
```sql
SELECT * FROM lieferung  
WHERE LNr IN (SELECT LNr FROM lieferant  
        WHERE lstadt = 'Hamburg');
```


#### 6.
- nummern und namen aller lieferanten, die nicht den artikel A05 geliefert haben  
-- lieferant lieferung  
-- LNr
```sql
SELECT LNr, LName FROM lieferant  
WHERE LNr NOT IN( SELECT LNr FROM lieferung  
        WHERE ANr= 'A05');
```



#### 7. 
- Die daten aller Lieferungen von Lieferanten mit einem Status von 20  
```sql
SELECT * FROM lieferung  
WHERE LNr IN (SELECT LNr FROM lieferant   
        WHERE status = '20');
```


#### 8.
- Nummern aller lieferanten die mindestens einen artikel geliefert haben den auch L03 geliefert hat  
```sql
SELECT LNr FROM lieferung  
WHERE anr IN (SELECT LNr FROM lieferung  
        WHERE LNr= 'L03') AND LNr <> 'L03';
```


#### 9.
- Namen und nummern aller artikel, die am selben ort wie A03 gelagert werden  
```sql
SELECT aname, anr FROM artikel   
WHERE astadt IN (SELECT astadt FROM artikel  
      WHERE anr = 'A03') AND anr <> 'A03';
```

```sql
INSERT INTO artikel VALUES ('A07','Verbinder','blau','11','Mannheim','200');  
DELETE FROM artikel WHere anr= 'A07';
```

```sql
SELECT * FROM artikel;
```
