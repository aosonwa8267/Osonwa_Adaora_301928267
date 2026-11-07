# MIT 8103 Advanced Database Systems

**Smart Clinic Management App** · Adaora Osonwa · Student ID 301928267

## Case study

The case study I chose is on a Smart Clinic Management App. I designed the database for clinic reception staff, doctors, nurses and the clinic administrators, using 3 separate tables named patients, clinicians and appointments. It handles the booking and managing of appointments; reviewing of patient appointment history; and summarizing the clinics appointment activity.

## Portfolio 1: Database Design and Modelling

I setup the relational design into 3 tables. The primary keys identify records, foreign keys preserve the links, and the checks make sure the business rules are met. I added a partial unique index on clinician_id and starts_at specifically for appointments that are booked or checked in, which stops a doctor from having two active appointments at the same time. The normalisation breakdown shows the sample data stepping from 1NF to 2NF and 3NF. All 21 test inserts with bad data were rejected without messing up the correct records.

![Smart Clinic Management App ER diagram](images/Osonwa_Adaora_301928267_ERDiagram.png)

Figure 1. Tables, keys and relationships. PK: primary key; FK: foreign key; UK: unique value.

<!-- PAGE BREAK -->

## Portfolio 2: Query Processing and Optimisation

I ran three SQL queries against the sample records. The join returned 2 rows and included Sample Patient One. For the index comparison, I used 25,000 separate performance rows. The median lookup time changed from 1.256 ms to 0.216 ms. Both phases returned the same records. The measured plan used the new index. These timings apply to this lookup and environment.

## Portfolio 3: Transactions and Concurrency

I used a temporary counter on appointments to test COMMIT, ROLLBACK and READ COMMITTED isolation. The uncommitted update remained hidden from the other session, and ROLLBACK restored the earlier committed value. Without locking, two increments left the counter at 2. With SELECT FOR UPDATE, Session B waited for Session A and the final value was 3. The helper is confined to this exercise; the case's original business fields stay unchanged.

## Portfolio 4: NoSQL and Advanced Data Models

I used clinic_visit_events for the case's event documents. MongoDB inserted 4 sample events and returned the expected results for 4 queries. Validation rejected an invalid date type and a duplicate event ID. Embedded snapshots keep related details with an event, while the details field can differ by event type. These are fictional events; PostgreSQL continues to enforce its relational rules.

## Repository and evidence

https://github.com/aosonwa8267/Osonwa_Adaora_301928267

The portfolio folders contain the SQL and JavaScript, explanations, query plans, result tables and screenshots.


<!-- PAGE BREAK -->

## Portfolio 5: Distributed and Cloud Database Exercise

I proposed three MongoDB replica members across separate failure zones. The discussion covers primary elections, majority acknowledgement, secondary lag and sharding trade-offs for clinic_visit_events. Replication supports availability, while backups address recovery. PostgreSQL needs its own availability plan. This is the permitted discussion option; no live replica set or failover test was deployed.

## Individual reflection

I kept patients, clinicians, appointments in separate tables so their details could be maintained without repeating them in every related record. A partial unique index on clinician_id and starts_at applies when status is booked or checked_in, preventing two active appointments for the same clinician and start time. The constraint tests check this alongside the required values and record links. One issue illustrated by the two-session exercise is that both sessions can read the same value before either update is committed. Locking the row before reading preserves both increments. The index comparison also shows why I need to check the execution plan as well as the final answer: the same result can require different amounts of database work.

## AI-use declaration

I used GitHub Copilot and the portfolio generator to help prepare the database model, scripts and explanations. The generator ran the PostgreSQL and MongoDB exercises, checked their outputs and captured the result images.  I remain responsible for checking and explaining the submitted work.

## References

- [PostgreSQL: constraints](https://www.postgresql.org/docs/17/ddl-constraints.html)
- [PostgreSQL: EXPLAIN](https://www.postgresql.org/docs/17/using-explain.html)
- [PostgreSQL: isolation](https://www.postgresql.org/docs/17/transaction-iso.html)
- [PostgreSQL: row locks](https://www.postgresql.org/docs/17/explicit-locking.html)
- [MongoDB: data modelling](https://www.mongodb.com/docs/manual/data-modeling/)
- [MongoDB: replication](https://www.mongodb.com/docs/manual/replication/)
- [MongoDB: sharding](https://www.mongodb.com/docs/manual/sharding/)
- [Mermaid: ER diagrams](https://mermaid.js.org/syntax/entityRelationshipDiagram.html)

