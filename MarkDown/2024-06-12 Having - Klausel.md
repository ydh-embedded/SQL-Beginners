
### Having - Klausel

-  Having selektiert Gruppen, die durch Group By definiert werden
-  In der Having Klausel dürfen keine Aggregatfunktionen stehen
-  in den Unterabfragen dürfen wiederum nicht nur Konstanten sondern auch Aggregatfunktionen enthalten sein

- Gesucht ist, des jeweiligen Wohnortes von Lieferanten die nicht aus Aachen kommen, wenn der durchschnittliche Statuswert am jeweiligen Ort
- 
```sql
	SELECT MAX(Status),
```

### 