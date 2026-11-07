# Smart Clinic Management App — normalisation

The example uses the saved sample records. The full set of fields is in the design and schema.

## Starting grouped records

| patient_id | appointments records (list) |
| --- | --- |
| 1 | [5] |
| 2 | [6] |


The record IDs are grouped in a list. In 1NF, each record has its own row and each cell holds one value.

## 1NF: one value per cell

| appointments.appointment_id | appointments.patient_id | appointments.clinician_id | appointments.status | patients.patient_id | patients.full_name | clinicians.clinician_id | clinicians.display_name |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 5 | 1 | 3 | booked | 1 | Sample Patient One | 3 | Sample Clinician One |
| 6 | 2 | 4 | cancelled | 2 | Sample Patient Two | 4 | Sample Clinician Two |

Key: appointment_id.

## 2NF: depend on the whole key

The declared candidate keys do not introduce a partial dependency here, so the 1NF rows stay unchanged at this step.

## appointments_example

| appointments.appointment_id | appointments.patient_id | appointments.clinician_id | appointments.status | patients.patient_id | patients.full_name | clinicians.clinician_id | clinicians.display_name |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 5 | 1 | 3 | booked | 1 | Sample Patient One | 3 | Sample Clinician One |
| 6 | 2 | 4 | cancelled | 2 | Sample Patient Two | 4 | Sample Clinician Two |

## 3NF: store each entity’s details once

The entity keys determine their own descriptions. Related records keep foreign keys rather than repeating those descriptions.

## patients

| patient_id | full_name | birth_date | contact_email |
| --- | --- | --- | --- |
| 1 | Sample Patient One | 1980-04-12 | patient.one@example.test |
| 2 | Sample Patient Two | 1992-09-23 | NULL |

## clinicians

| clinician_id | display_name | specialty | active |
| --- | --- | --- | --- |
| 3 | Sample Clinician One | Family Medicine | true |
| 4 | Sample Clinician Two | Cardiology | true |

## appointments

| appointment_id | patient_id | clinician_id | starts_at | status | duration_minutes |
| --- | --- | --- | --- | --- | --- |
| 5 | 1 | 3 | 2026-11-10T14:00:00+00:00 | booked | 30 |
| 6 | 2 | 4 | 2026-11-10T15:00:00+00:00 | cancelled | 45 |

## Dependencies

- patients: (patient_id) → full_name, birth_date, contact_email
- clinicians: (clinician_id) → display_name, specialty, active
- appointments: (appointment_id) → patient_id, clinician_id, starts_at, status, duration_minutes

Joining the decomposed sample tables reproduces the original 2 example rows. The design assumes the declared keys describe the relevant business dependencies.
