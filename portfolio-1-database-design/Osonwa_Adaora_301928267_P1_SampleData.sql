-- Fictional sample records for Smart Clinic Management App.
BEGIN;
SET LOCAL standard_conforming_strings = on;
INSERT INTO portfolio."patients" ("patient_id", "full_name", "birth_date", "contact_email") VALUES (1, 'Sample Patient One', '1980-04-12', 'patient.one@example.test');
INSERT INTO portfolio."patients" ("patient_id", "full_name", "birth_date", "contact_email") VALUES (2, 'Sample Patient Two', '1992-09-23', NULL);
INSERT INTO portfolio."clinicians" ("clinician_id", "display_name", "specialty", "active") VALUES (3, 'Sample Clinician One', 'Family Medicine', TRUE);
INSERT INTO portfolio."clinicians" ("clinician_id", "display_name", "specialty", "active") VALUES (4, 'Sample Clinician Two', 'Cardiology', TRUE);
INSERT INTO portfolio."appointments" ("appointment_id", "patient_id", "clinician_id", "starts_at", "status", "duration_minutes") VALUES (5, 1, 3, '2026-11-10T09:00:00-05:00', 'booked', 30);
INSERT INTO portfolio."appointments" ("appointment_id", "patient_id", "clinician_id", "starts_at", "status", "duration_minutes") VALUES (6, 2, 4, '2026-11-10T10:00:00-05:00', 'cancelled', 45);
COMMIT;
