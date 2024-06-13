

____________________________________________________________________________
### Tags

#SELECT
#sql
#getdate
#between
#vergleichsoperator
#LIKE
#NOTLIKE
#FROM



____________________________________________________________________________

## SELECT Abfragen in SQL Manager 2018

____________________________________________________________________________


### SELECT TOP ...

Was will man haben

woher soll es bekommen


____________________________________________________________________________

### -- Auskommentiert


##### -- Select Befehle
```sql
		SELECT getdate();
```



##### Select mit Objektangaben
### Vergleichsoperatoren

- alle Lieferungen mit einer Liefermenge von mindestens 200 Stück

```sql
SELECT * FROM lieferung
WHERE lmenge >= '200';
```


- gesucht sind alle Lieferanten deren Status kleiner als 30 ist

```sql
SELECT * FROM lieferant
WHERE status < '30';
```

### BETWEEN

- Schlüsselwort BETWEEN
- wird mit dem Operator AND benutzt

- Gesucht sind alle Lieferungen die zwischen dem 01.08.90 und dem 31.08.90 durchgeführt wurden

```sql
SELECT * FROM lieferung
WHERE ldatum BETWEEN '01.08.1990' AND '31.08.1990';
```


- Gesucht sind alle Artikelnamen der Artikel mit einem Gewicht von 14 bis 17 gramm

```sql
SELECT aname, gewicht FROM artikel
WHERE gewicht BETWEEN '14' AND '17';
```


- alle Namen und Wohnorte der Lieferanten, die an einem Ort dessen Namen mit H bis L beginnen

```sql
SELECT lname, lstadt FROM lieferant
WHERE lstadt BETWEEN 'H' AND 'Lz';
```


- Schlüsselwort IN
- ermittelt, ob ein bestimmter Spaltenwert mit einem Wert aus der Unterabfrage oder Liste Übereinstimmt

- gesucht sind die Namen der Hamburger und Aachner Lieferanten

- ohne IN

```sql
SELECT lname, lstadt FROM lieferant
WHERE lstadt = 'Hamburg' OR lstadt= 'Aachen';
```

______________
#### IN 
- Operator

```sql
SELECT lname, lstadt FROM lieferant
WHERE lstadt IN ('Hamburg', 'Aachen')
```


- Gesucht sind alle Lieferungen von 100, 300 oder 400 Stück

```sql
SELECT * FROM lieferung
WHERE lmenge IN ('100','300','400');
```


- gesucht sind alle Roten und grünen Artikel

```sql
SELECT * FROM artikel
WHERE farbe IN ('rot', 'grün');
```


### =
- Vergleichsoperator

```sql
SELECT * FROM artikel
WHERE farbe='rot' OR farbe='grün';
```

```sql
SELECT * FROM lieferant
```

```sql
WHERE lstadt ='Ludwigshafen' AND status='30';
```


- gesucht sind alle Artikel die nicht rot oder grün sind

```sql
SELECT * FROM artikel
WHERE farbe NOT IN ('rot', 'grün');
```


- gesucht sind alle Lieferungen die nicht zwischen dem 01.08.90 und dem 31.08.90 durchgeführt wurden

```sql
SELECT * FROM lieferung
WHERE ldatum NOT BETWEEN '01.08.1990' AND '31.08.1990';
```




------------------------------------------------------------------------------------
###  LIKE

- Schlüsselwert LIKE

##### 'S%'

```sql
SELECT * FROM artikel
WHERE aname LIKE 'S%';
```

##### '_O%'
- Gesucht sind alle artikel deren an zweiter stelle ein o haben
```sql
SELECT * FROM artikel
WHERE aname LIKE '_o%';
```

##### '%l_'

- gesucht sind alle Artikel deren Namen Vorletzer Stelle ein l haben
```sql
SELECT * FROM artikel
WHERE aname LIKE '%l_';
```

##### '[B-J]%'

- gesucht sind alle Lieferanten deren Namen mit dem Bzchenstaben B bis J beginnen
```sql
SELECT * FROM lieferant
WHERE lname LIKE '[B-J]%';
```

##### '[BJ]%'
- gescuht sind alle Lieferanten deren Namen mit dem Buchenstaben B oder J beginnen
```sql
SELECT * FROM lieferant
WHERE lname LIKE '[BJ]%';
```
-- oder

##### '[B,J]%'

```sql
SELECT * FROM lieferant
WHERE lname LIKE '[B,J]%';
```

##### '%a%'
- gesucht sind alle Lieferanten in deren Namen kein a vorkommt
```sql
SELECT * FROM lieferant
WHERE lname NOT LIKE '%a%';
```

____________________________________________________________________________

### -- Übungsaufgaben

##### -- Gesucht sind die Nummern, die Namen und der Status aller Lieferanten die in Ludwigshafen leben
SELECT lnr, lname status FROM lieferant
WHERE lstadt ='Ludwigshafen';

##### -- Gesucht sind alle Lieferungen zwischen dem 13.07.90 und dem 25.07.90
SELECT * FROM lieferung
WHERE ldatum BETWEEN '18.07.1990' AND '25.07.1990';

##### -- Gesucht sind alle roten Artikel die mit dem Bucstaben S beginnen.
SELECT * FROM Artikel
WHERE AName LIKE 's%' AND farbe= 'rot';

------------------------------------------------------------------------------------------





