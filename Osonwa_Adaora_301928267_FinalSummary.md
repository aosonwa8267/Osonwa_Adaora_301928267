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

I used a temporary counter column on appointments to test COMMIT, ROLLBACK, and READ COMMITTED isolation. When one session made an uncommitted change, the other session couldn't see it, and ROLLBACK successfully put things back the way they were. Without locking, two simultaneous updates left the counter at 2 instead of 3 due to a race condition. Using SELECT FOR UPDATE made Session B wait for Session A, so the final count came out correct at 3. This test helper was kept separate so the real business logic stays untouched.

## Portfolio 4: NoSQL and Advanced Data Models

For the NoSQL part, I used a clinic_visit_events collection. MongoDB successfully stored 4 sample event documents and passed all 4 test queries. Validation stopped an incorrect date type and blocked a duplicate event ID. Embedding snapshots keeps relevant visit details right inside the event document. These are just test events; PostgreSQL remains the main database enforcing the strict relational rules.

## Repository and evidence

https://github.com/aosonwa8267/Osonwa_Adaora_301928267

The portfolio folders contain the SQL and JavaScript, explanations, query plans, result tables and screenshots.


<!-- PAGE BREAK -->

## Portfolio 5: Distributed and Cloud Database Exercise

I proposed a 3-member MongoDB replica set spread across different failure zones. The write-up explains primary elections, majority acknowledgements, replication lag, and sharding trade-offs for the event logs. Replication keeps things available, while backups handle recovery (PostgreSQL needs its own separate backup plan). This was a discussion-only task, so no live cluster or failover test was actually deployed.

## Individual reflection

I kept patients, clinicians, and appointments in separate tables, which made it easy to update details without repeating data everywhere. The partial unique index on clinician_id and starts_at worked well to prevent double-booking. The multi-session concurrency test showed why locking matters—otherwise, two sessions end up reading  the same stale data before either saves. Lastly, checking the query execution plan taught me that just getting the right answer isn't enough; you also want to make sure the database isn't doing unnecessary heavy lifting.

## AI-use declaration

I used GitHub Copilot and the portfolio generator to help draft the database model, scripts and explanations. The generator ran the PostgreSQL and MongoDB exercises, checked their outputs and captured the result images.  I checked everything and remain fully responsible for the submitted work.

## References

- [PostgreSQL: constraints](https://www.postgresql.org/docs/17/ddl-constraints.html)
- [PostgreSQL: EXPLAIN](https://www.postgresql.org/docs/17/using-explain.html)
- [PostgreSQL: isolation](https://www.postgresql.org/docs/17/transaction-iso.html)
- [PostgreSQL: row locks](https://www.postgresql.org/docs/17/explicit-locking.html)
- [MongoDB: data modelling](https://www.mongodb.com/docs/manual/data-modeling/)
- [MongoDB: replication](https://www.mongodb.com/docs/manual/replication/)
- [MongoDB: sharding](https://www.mongodb.com/docs/manual/sharding/)
- [Mermaid: ER diagrams](https://mermaid.js.org/syntax/entityRelationshipDiagram.html)

