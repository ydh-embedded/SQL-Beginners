
#Links https://docs.rockylinux.org/de/books/admin_guide/05-vi/


________________________

Befehle: 

- wir wechsel zum user ***postgres*** und
- öffnen die psql Console

```bash
	sudo -u postgres psql
```

.

- wir erstellen eine Datenbank ***northwind*** mit dem ***postgres*** Besitzer (user) 

```sql
	CREATE DATABASE northwind OWNER postgres ;
```

.

- wir erstellen einen neuen  Besitzer (user) : ***danny***

```sql
	CREATE User danny WITH PASSWORD 'r2d2c3po' ;
```

.

- wir erstellen einen alternativern Datenbank Nutzer für die Datenbank ***northwind*** 

```sql
	ALTER DATABASE northwind OWNER to danny ;
```

.

- wir stellen eine Verbindung zur Datenbank ***northwind*** her 

```sql
	\ CONNECT northwind
```

.

- wir rufen alle Werte der Tabelle ***categories*** der Datenbank ***northwind*** ab

```sql
	SELECT * FROM public.categories ;
```

.