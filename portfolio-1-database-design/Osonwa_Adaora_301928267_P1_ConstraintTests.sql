-- Run these deliberately invalid statements one at a time, outside a transaction.
-- Each should fail at the named constraint; the sample rows should remain unchanged.

-- 1. patients primary duplicate. Expected: pk_patients, SQLSTATE 23505.
INSERT INTO portfolio."patients" ("patient_id", "full_name", "birth_date", "contact_email")
VALUES (1, 'Duplicate Key Patient', '1985-01-15', 'duplicate.primary@example.test');

-- 2. patients email duplicate. Expected: uq_patients_0, SQLSTATE 23505.
INSERT INTO portfolio."patients" ("patient_id", "full_name", "birth_date", "contact_email")
VALUES (101, 'Duplicate Email Patient', '1985-02-16', 'patient.one@example.test');

-- 3. patients missing patient id. Expected: patient_id, SQLSTATE 23502.
INSERT INTO portfolio."patients" ("patient_id", "full_name", "birth_date", "contact_email")
VALUES (NULL, 'Missing Identifier Patient', '1985-03-17', 'missing.id@example.test');

-- 4. patients missing full name. Expected: full_name, SQLSTATE 23502.
INSERT INTO portfolio."patients" ("patient_id", "full_name", "birth_date", "contact_email")
VALUES (102, NULL, '1985-04-18', 'missing.name@example.test');

-- 5. patients missing birth date. Expected: birth_date, SQLSTATE 23502.
INSERT INTO portfolio."patients" ("patient_id", "full_name", "birth_date", "contact_email")
VALUES (103, 'Missing Birth Date Patient', NULL, 'missing.birth@example.test');

-- 6. clinicians primary duplicate. Expected: pk_clinicians, SQLSTATE 23505.
INSERT INTO portfolio."clinicians" ("clinician_id", "display_name", "specialty", "active")
VALUES (3, 'Duplicate Key Clinician', 'Dermatology', TRUE);

-- 7. clinicians missing clinician id. Expected: clinician_id, SQLSTATE 23502.
INSERT INTO portfolio."clinicians" ("clinician_id", "display_name", "specialty", "active")
VALUES (NULL, 'Missing Identifier Clinician', 'Dermatology', TRUE);

-- 8. clinicians missing display name. Expected: display_name, SQLSTATE 23502.
INSERT INTO portfolio."clinicians" ("clinician_id", "display_name", "specialty", "active")
VALUES (201, NULL, 'Dermatology', TRUE);

-- 9. clinicians missing specialty. Expected: specialty, SQLSTATE 23502.
INSERT INTO portfolio."clinicians" ("clinician_id", "display_name", "specialty", "active")
VALUES (202, 'Missing Specialty Clinician', NULL, TRUE);

-- 10. clinicians missing active. Expected: active, SQLSTATE 23502.
INSERT INTO portfolio."clinicians" ("clinician_id", "display_name", "specialty", "active")
VALUES (203, 'Missing Active Clinician', 'Dermatology', NULL);

-- 11. appointments primary duplicate. Expected: pk_appointments, SQLSTATE 23505.
INSERT INTO portfolio."appointments" ("appointment_id", "patient_id", "clinician_id", "starts_at", "status", "duration_minutes")
VALUES (5, 1, 3, '2026-11-11T09:00:00-05:00', 'booked', 30);

-- 12. appointments missing patient fk. Expected: fk_appointments_0, SQLSTATE 23503.
INSERT INTO portfolio."appointments" ("appointment_id", "patient_id", "clinician_id", "starts_at", "status", "duration_minutes")
VALUES (301, 999001, 3, '2026-11-11T09:00:00-05:00', 'booked', 30);

-- 13. appointments missing clinician fk. Expected: fk_appointments_1, SQLSTATE 23503.
INSERT INTO portfolio."appointments" ("appointment_id", "patient_id", "clinician_id", "starts_at", "status", "duration_minutes")
VALUES (302, 1, 999002, '2026-11-11T09:30:00-05:00', 'booked', 30);

-- 14. appointments missing appointment id. Expected: appointment_id, SQLSTATE 23502.
INSERT INTO portfolio."appointments" ("appointment_id", "patient_id", "clinician_id", "starts_at", "status", "duration_minutes")
VALUES (NULL, 1, 3, '2026-11-11T10:00:00-05:00', 'booked', 30);

-- 15. appointments missing patient id. Expected: patient_id, SQLSTATE 23502.
INSERT INTO portfolio."appointments" ("appointment_id", "patient_id", "clinician_id", "starts_at", "status", "duration_minutes")
VALUES (303, NULL, 3, '2026-11-11T10:30:00-05:00', 'booked', 30);

-- 16. appointments missing clinician id. Expected: clinician_id, SQLSTATE 23502.
INSERT INTO portfolio."appointments" ("appointment_id", "patient_id", "clinician_id", "starts_at", "status", "duration_minutes")
VALUES (304, 1, NULL, '2026-11-11T11:00:00-05:00', 'booked', 30);

-- 17. appointments missing starts at. Expected: starts_at, SQLSTATE 23502.
INSERT INTO portfolio."appointments" ("appointment_id", "patient_id", "clinician_id", "starts_at", "status", "duration_minutes")
VALUES (305, 1, 3, NULL, 'booked', 30);

-- 18. appointments missing status. Expected: status, SQLSTATE 23502.
INSERT INTO portfolio."appointments" ("appointment_id", "patient_id", "clinician_id", "starts_at", "status", "duration_minutes")
VALUES (306, 1, 3, '2026-11-11T12:00:00-05:00', NULL, 30);

-- 19. appointments missing duration. Expected: duration_minutes, SQLSTATE 23502.
INSERT INTO portfolio."appointments" ("appointment_id", "patient_id", "clinician_id", "starts_at", "status", "duration_minutes")
VALUES (307, 1, 3, '2026-11-11T12:30:00-05:00', 'booked', NULL);

-- 20. appointments invalid duration. Expected: appointment_duration_check, SQLSTATE 23514.
INSERT INTO portfolio."appointments" ("appointment_id", "patient_id", "clinician_id", "starts_at", "status", "duration_minutes")
VALUES (308, 1, 3, '2026-11-11T13:00:00-05:00', 'booked', 9);

-- 21. appointments duplicate active slot. Expected: active_slot_unique, SQLSTATE 23505.
INSERT INTO portfolio."appointments" ("appointment_id", "patient_id", "clinician_id", "starts_at", "status", "duration_minutes")
VALUES (309, 2, 3, '2026-11-10T09:00:00-05:00', 'checked_in', 30);
