-- Smart Clinic Management App: tables, keys and business constraints.
-- Run once in a fresh PostgreSQL database.
BEGIN;
SET LOCAL standard_conforming_strings = on;
CREATE SCHEMA portfolio;
CREATE TABLE portfolio."patients" (
  "patient_id" bigint NOT NULL,
  "full_name" text NOT NULL,
  "birth_date" date NOT NULL,
  "contact_email" text,
  CONSTRAINT "pk_patients" PRIMARY KEY ("patient_id"),
  CONSTRAINT "uq_patients_0" UNIQUE ("contact_email")
);
CREATE TABLE portfolio."clinicians" (
  "clinician_id" bigint NOT NULL,
  "display_name" text NOT NULL,
  "specialty" text NOT NULL,
  "active" boolean NOT NULL,
  CONSTRAINT "pk_clinicians" PRIMARY KEY ("clinician_id")
);
CREATE TABLE portfolio."appointments" (
  "appointment_id" bigint NOT NULL,
  "patient_id" bigint NOT NULL,
  "clinician_id" bigint NOT NULL,
  "starts_at" timestamptz NOT NULL,
  "status" text NOT NULL,
  "duration_minutes" bigint NOT NULL,
  CONSTRAINT "pk_appointments" PRIMARY KEY ("appointment_id")
);
ALTER TABLE portfolio."appointments" ADD CONSTRAINT "fk_appointments_0" FOREIGN KEY ("patient_id") REFERENCES portfolio."patients" ("patient_id");
ALTER TABLE portfolio."appointments" ADD CONSTRAINT "fk_appointments_1" FOREIGN KEY ("clinician_id") REFERENCES portfolio."clinicians" ("clinician_id");
ALTER TABLE portfolio."appointments" ADD CONSTRAINT "appointment_duration_check" CHECK (("duration_minutes" >= 10) AND ("duration_minutes" <= 240));
CREATE UNIQUE INDEX "active_slot_unique" ON portfolio."appointments" ("clinician_id", "starts_at") WHERE (("status" = 'booked') OR ("status" = 'checked_in'));
COMMIT;
