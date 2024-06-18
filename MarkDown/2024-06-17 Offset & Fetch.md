___________
#tag 
#offset
#fetch
#top-klausel
#order-by 

___________


### Offset & Fetch

```sql
SELECT A.LNr , LName , LMenge FROM Lieferant a JOIN Lieferung b
ON A.LNr = b.LNr
ORDER By LMenge DESC
OFFSET 3 ROWS FETCH NEXT 5 ROWS only;

SELECT * FROM Lieferung;
```

- in der Spalte von  OrderBy kann man mit Offset Einträge überspringen
- die Fetch eingabe funktioniert nur in Verbindung mit OrderBy &Offset !!