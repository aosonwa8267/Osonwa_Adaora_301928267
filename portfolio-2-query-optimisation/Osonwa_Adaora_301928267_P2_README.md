# Smart Clinic Management App — SQL queries

## 1. Show related appointments, patients records (up to 20).

```sql
SELECT t0."appointment_id" AS "appointments_appointment_id",
       t0."starts_at" AS "appointments_starts_at",
       t1."patient_id" AS "patients_patient_id",
       t1."full_name" AS "patients_full_name"
FROM portfolio."appointments" t0
JOIN portfolio."patients" t1 ON t0."patient_id" = t1."patient_id"
ORDER BY t0."appointment_id", t1."patient_id"
LIMIT 20;
```

| appointments_appointment_id | appointments_starts_at | patients_patient_id | patients_full_name |
| --- | --- | --- | --- |
| 5 | 2026-11-10T14:00:00+00:00 | 1 | Sample Patient One |
| 6 | 2026-11-10T15:00:00+00:00 | 2 | Sample Patient Two |

## 2. Find appointments records where starts_at matches "2026-11-10T09:00:00-05:00" (up to 20).

```sql
SELECT * FROM portfolio."appointments"
WHERE "starts_at" IS NOT DISTINCT FROM '2026-11-10T09:00:00-05:00'
ORDER BY "appointment_id"
LIMIT 20;
```

| appointment_id | patient_id | clinician_id | starts_at | status | duration_minutes |
| --- | --- | --- | --- | --- | --- |
| 5 | 1 | 3 | 2026-11-10T14:00:00+00:00 | booked | 30 |

## 3. Count appointments records for each patient_id (up to 20 groups).

```sql
SELECT "patient_id", count(*) AS record_count
FROM portfolio."appointments"
GROUP BY "patient_id"
ORDER BY record_count DESC, "patient_id" NULLS LAST
LIMIT 20;
```

| patient_id | record_count |
| --- | --- |
| 1 | 1 |
| 2 | 1 |


## Index comparison

| Phase | Median (ms) | Three runs (ms) | Plan nodes | Buffer hits |
| --- | --- | --- | --- | --- |
| Before index | 1.256 | 1.251, 1.257, 1.256 | Sort → Seq Scan | 139 |
| After index | 0.216 | 0.216, 0.19, 0.279 | Sort → Bitmap Heap Scan → Bitmap Index Scan | 30 |

The median execution time changed from 1.256 ms to 0.216 ms. The measured plan used p2_filter_idx. The results matched in both phases. An index adds storage and write-maintenance costs; timings depend on the selected lookup and environment.

## Execution plans

### Before index, run 1

```text
Sort (actual time=1.218..1.219 rows=25 loops=1)
  Seq Scan on appointments (actual time=0.014..1.183 rows=25 loops=1)
Planning Time: 0.333 ms
Execution Time: 1.251 ms
```

### Before index, run 2

```text
Sort (actual time=1.224..1.226 rows=25 loops=1)
  Seq Scan on appointments (actual time=0.015..1.188 rows=25 loops=1)
Planning Time: 0.364 ms
Execution Time: 1.257 ms
```

### Before index, run 3

```text
Sort (actual time=1.219..1.221 rows=25 loops=1)
  Seq Scan on appointments (actual time=0.014..1.183 rows=25 loops=1)
Planning Time: 0.361 ms
Execution Time: 1.256 ms
```

### After index, run 1

```text
Sort (actual time=0.162..0.163 rows=25 loops=1)
  Bitmap Heap Scan on appointments (actual time=0.026..0.127 rows=25 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.013..0.014 rows=25 loops=1)
Planning Time: 0.54 ms
Execution Time: 0.216 ms
```

### After index, run 2

```text
Sort (actual time=0.135..0.137 rows=25 loops=1)
  Bitmap Heap Scan on appointments (actual time=0.026..0.101 rows=25 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.013..0.013 rows=25 loops=1)
Planning Time: 0.559 ms
Execution Time: 0.19 ms
```

### After index, run 3

```text
Sort (actual time=0.2..0.202 rows=25 loops=1)
  Bitmap Heap Scan on appointments (actual time=0.039..0.147 rows=25 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.02..0.02 rows=25 loops=1)
Planning Time: 0.806 ms
Execution Time: 0.279 ms
```

## Reproduce

Use a fresh database with the Portfolio 1 schema and sample data. Run Osonwa_Adaora_301928267_P2_Queries.sql, then Osonwa_Adaora_301928267_P2_Optimisation.sql. The optimisation script creates a separate performance table and runs EXPLAIN (ANALYZE, BUFFERS).

[Query screenshot](screenshots/Osonwa_Adaora_301928267_P2_QueryResults.png) · [Index comparison](screenshots/Osonwa_Adaora_301928267_P2_IndexComparison.png)

## References

- [PostgreSQL — EXPLAIN](https://www.postgresql.org/docs/17/using-explain.html)

