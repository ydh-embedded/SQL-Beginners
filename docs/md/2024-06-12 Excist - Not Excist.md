- Die Bedingung für den Prüfsatz der äußeren Abfrage wird als Wahr ausgewertet
- wenn die innere Abfrage zumindest eine Ergebnisreihe liefert

- Die innere Abfrage ist immer von einer Variable(Spalte) abhängig,
- die in der äußeren Abfrage berechnet wird

___________

-  Die Tabellen können einmalig bezeichnet werden um lieferant.lnr nicht schreiben zu müssen

```sql
	SELECT * FROM Lieferant a
				WHERE EXISTS (SELECT * FROM Lieferung b
				WHERE a.lnr = b.lnr );
```
.
![[SQL - Exists .png]]
_________________________________________________________

- Gesucht sind Lieferanten, die bereits geliefert haben

```sql

	SELECT * FROM lieferant
				WHERE EXISTS (SELECT * FROM lieferung
				WHERE lieferant.lnr=lieferung.lnr);
```

.
![[Pasted image 20240612144743.png]]

____________
-  gesucht sind Ortsnamen, die Wohnort aber nicht Lagerort sind
```sql
	SELECT lstadt FROM lieferant
					WHERE NOT EXISTS (SELECT * FROM artikel
					WHERE lstadt=astadt);
```

.

![[SQL - NOT Exists .png]]
.

_____________________
