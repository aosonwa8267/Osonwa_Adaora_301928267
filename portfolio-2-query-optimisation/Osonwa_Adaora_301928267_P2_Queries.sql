-- Show related appointments, patients records (up to 20).
SELECT t0."appointment_id" AS "appointments_appointment_id",
       t0."starts_at" AS "appointments_starts_at",
       t1."patient_id" AS "patients_patient_id",
       t1."full_name" AS "patients_full_name"
FROM portfolio."appointments" t0
JOIN portfolio."patients" t1 ON t0."patient_id" = t1."patient_id"
ORDER BY t0."appointment_id", t1."patient_id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT t0."appointment_id" AS "appointments_appointment_id",
       t0."starts_at" AS "appointments_starts_at",
       t1."patient_id" AS "patients_patient_id",
       t1."full_name" AS "patients_full_name"
FROM portfolio."appointments" t0
JOIN portfolio."patients" t1 ON t0."patient_id" = t1."patient_id"
ORDER BY t0."appointment_id", t1."patient_id"
LIMIT 20;

-- Find appointments records where starts_at matches "2026-11-10T09:00:00-05:00" (up to 20).
SELECT * FROM portfolio."appointments"
WHERE "starts_at" IS NOT DISTINCT FROM '2026-11-10T09:00:00-05:00'
ORDER BY "appointment_id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT * FROM portfolio."appointments"
WHERE "starts_at" IS NOT DISTINCT FROM '2026-11-10T09:00:00-05:00'
ORDER BY "appointment_id"
LIMIT 20;

-- Count appointments records for each patient_id (up to 20 groups).
SELECT "patient_id", count(*) AS record_count
FROM portfolio."appointments"
GROUP BY "patient_id"
ORDER BY record_count DESC, "patient_id" NULLS LAST
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT "patient_id", count(*) AS record_count
FROM portfolio."appointments"
GROUP BY "patient_id"
ORDER BY record_count DESC, "patient_id" NULLS LAST
LIMIT 20;
