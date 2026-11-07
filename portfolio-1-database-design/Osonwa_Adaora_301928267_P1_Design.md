# Smart Clinic Management App — database design

My case study records patients, clinicians, appointments.

## Users

- Clinic reception staff
- Clinicians
- Clinic administrators

## Main operations

- Book and manage appointments
- Review patient appointment history
- Summarize clinician appointment activity

## Entities

| Entity | Information stored |
| --- | --- |
| patients | Stores synthetic patient records used by the clinic. |
| clinicians | Stores synthetic clinician records. |
| appointments | Stores appointments and links each one to a patient and clinician. |

## patients

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| patient_id | BIGINT | PK | Yes |
| full_name | TEXT |  | Yes |
| birth_date | DATE |  | Yes |
| contact_email | TEXT | Unique | No |
- Unique key: (contact_email).

## clinicians

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| clinician_id | BIGINT | PK | Yes |
| display_name | TEXT |  | Yes |
| specialty | TEXT |  | Yes |
| active | BOOLEAN |  | Yes |


## appointments

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| appointment_id | BIGINT | PK | Yes |
| patient_id | BIGINT | FK | Yes |
| clinician_id | BIGINT | FK | Yes |
| starts_at | TIMESTAMPTZ |  | Yes |
| status | TEXT |  | Yes |
| duration_minutes | INTEGER |  | Yes |
- patient_id → patients.patient_id
- clinician_id → clinicians.clinician_id

## Relationships and business rules

- A supplied patient contact email must be unique; multiple patients may omit it.
- Every appointment must reference an existing patient through patient_id.
- Every appointment must reference an existing clinician through clinician_id.
- Appointment duration must be between 10 and 240 minutes inclusive.
- A partial unique index on clinician_id and starts_at applies when status is booked or checked_in, preventing two active appointments for the same clinician and start time.

## Assumptions

- Each appointment refers to one patient and one clinician.
- Appointment start times use a consistent clinic-local time zone.
- A clinician may have at most one booked or checked-in appointment at a given start time; cancelled appointments do not reserve a slot.
- Normalization example: appointments has patient_id and clinician_id foreign keys, while patient and clinician attributes remain in their respective tables, avoiding repeated patient or clinician details in appointment rows.
- Separate benchmark plan: generate 25000 synthetic appointment rows, run the appointment date-range filter before and after adding a B-tree index on starts_at, and compare elapsed time and query plans using the same query and data.

