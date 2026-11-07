# Smart Clinic Management App — ER diagram

```mermaid
erDiagram
    direction LR
    patients {
        bigint patient_id PK
        text full_name
        date birth_date
        text contact_email UK "Optional"
    }
    clinicians {
        bigint clinician_id PK
        text display_name
        text specialty
        boolean active
    }
    appointments {
        bigint appointment_id PK
        bigint patient_id FK
        bigint clinician_id FK
        timestamptz starts_at
        text status
        integer duration_minutes
    }
    patients ||--o{ appointments : "patient_id"
    clinicians ||--o{ appointments : "clinician_id"
```

PK identifies a record; FK links to another table; UK marks a single-field unique value. The relationship ends show exactly one, zero or one, or zero or many records. Composite unique keys and conditional rules are listed in the schema and design.

[Diagram image](../images/Osonwa_Adaora_301928267_ERDiagram.png)
