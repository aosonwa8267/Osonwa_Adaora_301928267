// Run once in mongosh against a fresh exercise database.
// These records are fictional events for the case study.
(async function () {
  db = db.getSiblingDB('portfolio_nosql');
  if ((await db.getCollectionNames()).includes("clinic_visit_events")) {
    throw new Error('The exercise collection already exists. Use a fresh database.');
  }

  // The validator checks the stable event fields while details can vary.
  await db.createCollection("clinic_visit_events", {
    validator: {
    "$jsonSchema": {
        "bsonType": "object",
        "required": [
            "_id",
            "schemaVersion",
            "simulation",
            "eventType",
            "occurredAt",
            "source",
            "embedded",
            "references",
            "details"
        ],
        "properties": {
            "_id": {
                "bsonType": "string",
                "minLength": 1
            },
            "schemaVersion": {
                "enum": [
                    1
                ]
            },
            "simulation": {
                "enum": [
                    true
                ]
            },
            "eventType": {
                "bsonType": "string",
                "enum": [
                    "appointment_booked",
                    "patient_checked_in"
                ]
            },
            "occurredAt": {
                "bsonType": "date"
            },
            "source": {
                "bsonType": "object",
                "required": [
                    "entity",
                    "key",
                    "snapshot"
                ],
                "properties": {
                    "entity": {
                        "enum": [
                            "appointments"
                        ]
                    },
                    "key": {
                        "bsonType": "object",
                        "required": [
                            "appointment_id"
                        ]
                    },
                    "snapshot": {
                        "bsonType": "object"
                    }
                }
            },
            "embedded": {
                "bsonType": "object"
            },
            "references": {
                "bsonType": "object"
            },
            "details": {
                "bsonType": "object"
            }
        }
    }
},
    validationLevel: 'strict', validationAction: 'error'
  });

  // Insert the four example events and show their IDs.
  printjson(await db.getCollection("clinic_visit_events").insertMany([
    {
        "_id": "event_000001",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "appointment_booked",
        "occurredAt": ISODate("2030-01-01T10:00:00Z"),
        "source": {
            "entity": "appointments",
            "key": {
                "appointment_id": 5
            },
            "snapshot": {
                "appointment_id": 5,
                "patient_id": 1,
                "clinician_id": 3,
                "starts_at": "2026-11-10T09:00:00-05:00",
                "status": "booked",
                "duration_minutes": 30
            }
        },
        "embedded": {
            "patients": [
                {
                    "key": {
                        "patient_id": 1
                    },
                    "snapshot": {
                        "patient_id": 1,
                        "full_name": "Sample Patient One",
                        "birth_date": "1980-04-12",
                        "contact_email": "patient.one@example.test"
                    },
                    "via": [
                        "appointments.patient_id → patients"
                    ]
                }
            ],
            "clinicians": [
                {
                    "key": {
                        "clinician_id": 3
                    },
                    "snapshot": {
                        "clinician_id": 3,
                        "display_name": "Sample Clinician One",
                        "specialty": "Family Medicine",
                        "active": true
                    },
                    "via": [
                        "appointments.clinician_id → clinicians"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000002",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "patient_checked_in",
        "occurredAt": ISODate("2030-01-01T10:01:00Z"),
        "source": {
            "entity": "appointments",
            "key": {
                "appointment_id": 5
            },
            "snapshot": {
                "appointment_id": 5,
                "patient_id": 1,
                "clinician_id": 3,
                "starts_at": "2026-11-10T09:00:00-05:00",
                "status": "booked",
                "duration_minutes": 30
            }
        },
        "embedded": {
            "patients": [
                {
                    "key": {
                        "patient_id": 1
                    },
                    "snapshot": {
                        "patient_id": 1,
                        "full_name": "Sample Patient One",
                        "birth_date": "1980-04-12",
                        "contact_email": "patient.one@example.test"
                    },
                    "via": [
                        "appointments.patient_id → patients"
                    ]
                }
            ],
            "clinicians": [
                {
                    "key": {
                        "clinician_id": 3
                    },
                    "snapshot": {
                        "clinician_id": 3,
                        "display_name": "Sample Clinician One",
                        "specialty": "Family Medicine",
                        "active": true
                    },
                    "via": [
                        "appointments.clinician_id → clinicians"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "symptoms_summary": "illustrative symptoms_summary",
                "vitals": "illustrative vitals",
                "follow_up_note": "illustrative follow_up_note"
            }
        }
    },
    {
        "_id": "event_000003",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "appointment_booked",
        "occurredAt": ISODate("2030-01-01T10:02:00Z"),
        "source": {
            "entity": "appointments",
            "key": {
                "appointment_id": 6
            },
            "snapshot": {
                "appointment_id": 6,
                "patient_id": 2,
                "clinician_id": 4,
                "starts_at": "2026-11-10T10:00:00-05:00",
                "status": "cancelled",
                "duration_minutes": 45
            }
        },
        "embedded": {
            "patients": [
                {
                    "key": {
                        "patient_id": 2
                    },
                    "snapshot": {
                        "patient_id": 2,
                        "full_name": "Sample Patient Two",
                        "birth_date": "1992-09-23",
                        "contact_email": null
                    },
                    "via": [
                        "appointments.patient_id → patients"
                    ]
                }
            ],
            "clinicians": [
                {
                    "key": {
                        "clinician_id": 4
                    },
                    "snapshot": {
                        "clinician_id": 4,
                        "display_name": "Sample Clinician Two",
                        "specialty": "Cardiology",
                        "active": true
                    },
                    "via": [
                        "appointments.clinician_id → clinicians"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000004",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "patient_checked_in",
        "occurredAt": ISODate("2030-01-01T10:03:00Z"),
        "source": {
            "entity": "appointments",
            "key": {
                "appointment_id": 6
            },
            "snapshot": {
                "appointment_id": 6,
                "patient_id": 2,
                "clinician_id": 4,
                "starts_at": "2026-11-10T10:00:00-05:00",
                "status": "cancelled",
                "duration_minutes": 45
            }
        },
        "embedded": {
            "patients": [
                {
                    "key": {
                        "patient_id": 2
                    },
                    "snapshot": {
                        "patient_id": 2,
                        "full_name": "Sample Patient Two",
                        "birth_date": "1992-09-23",
                        "contact_email": null
                    },
                    "via": [
                        "appointments.patient_id → patients"
                    ]
                }
            ],
            "clinicians": [
                {
                    "key": {
                        "clinician_id": 4
                    },
                    "snapshot": {
                        "clinician_id": 4,
                        "display_name": "Sample Clinician Two",
                        "specialty": "Cardiology",
                        "active": true
                    },
                    "via": [
                        "appointments.clinician_id → clinicians"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "symptoms_summary": "illustrative symptoms_summary",
                "vitals": "illustrative vitals",
                "follow_up_note": "illustrative follow_up_note"
            }
        }
    }
]));
  await db.getCollection("clinic_visit_events").createIndex({eventType: 1, occurredAt: -1}, {name: 'event_type_time'});

  // 1. Find the first sample event type (up to five documents).
  printjson(await db.getCollection("clinic_visit_events").find({"eventType":"appointment_booked"}).sort({_id:1}).limit(5).toArray());

  // 2. Find events for the first source record using nested key fields (up to five).
  printjson(await db.getCollection("clinic_visit_events").find({"source.key.appointment_id":5}).sort({_id:1}).limit(5).toArray());

  // 3. Find events in the sample time range using a MongoDB Date filter (up to five).
  printjson(await db.getCollection("clinic_visit_events").find({"occurredAt":{"$gte":ISODate("2030-01-01T10:00:00Z"), "$lt":ISODate("2030-01-01T11:00:00Z")}}).sort({_id:1}).limit(5).toArray());

  // 4. Count documents for each event type.
  printjson(await db.getCollection("clinic_visit_events").aggregate([{"$group":{"_id":"$eventType", "documentCount":{"$sum":1}}}, {"$sort":{"_id":1}}]).toArray());

  // A date stored as text should be rejected by the validator.
  try {
    await db.getCollection("clinic_visit_events").insertOne({...{
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "appointment_booked",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "appointments",
        "key": {
            "appointment_id": 5
        },
        "snapshot": {
            "appointment_id": 5,
            "patient_id": 1,
            "clinician_id": 3,
            "starts_at": "2026-11-10T09:00:00-05:00",
            "status": "booked",
            "duration_minutes": 30
        }
    },
    "embedded": {
        "patients": [
            {
                "key": {
                    "patient_id": 1
                },
                "snapshot": {
                    "patient_id": 1,
                    "full_name": "Sample Patient One",
                    "birth_date": "1980-04-12",
                    "contact_email": "patient.one@example.test"
                },
                "via": [
                    "appointments.patient_id → patients"
                ]
            }
        ],
        "clinicians": [
            {
                "key": {
                    "clinician_id": 3
                },
                "snapshot": {
                    "clinician_id": 3,
                    "display_name": "Sample Clinician One",
                    "specialty": "Family Medicine",
                    "active": true
                },
                "via": [
                    "appointments.clinician_id → clinicians"
                ]
            }
        ]
    },
    "references": {},
    "details": {
        "channel": "web"
    }
}, _id: 'invalid_date_example', occurredAt: 'not-a-date'});
  } catch (error) { print('Invalid date error: ' + error.code); }

  // Reusing an event ID should be rejected by the unique _id index.
  try { await db.getCollection("clinic_visit_events").insertOne({
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "appointment_booked",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "appointments",
        "key": {
            "appointment_id": 5
        },
        "snapshot": {
            "appointment_id": 5,
            "patient_id": 1,
            "clinician_id": 3,
            "starts_at": "2026-11-10T09:00:00-05:00",
            "status": "booked",
            "duration_minutes": 30
        }
    },
    "embedded": {
        "patients": [
            {
                "key": {
                    "patient_id": 1
                },
                "snapshot": {
                    "patient_id": 1,
                    "full_name": "Sample Patient One",
                    "birth_date": "1980-04-12",
                    "contact_email": "patient.one@example.test"
                },
                "via": [
                    "appointments.patient_id → patients"
                ]
            }
        ],
        "clinicians": [
            {
                "key": {
                    "clinician_id": 3
                },
                "snapshot": {
                    "clinician_id": 3,
                    "display_name": "Sample Clinician One",
                    "specialty": "Family Medicine",
                    "active": true
                },
                "via": [
                    "appointments.clinician_id → clinicians"
                ]
            }
        ]
    },
    "references": {},
    "details": {
        "channel": "web"
    }
}); }
  catch (error) { print('Duplicate ID error: ' + error.code); }

  print('Document count: ' + await db.getCollection("clinic_visit_events").countDocuments());
})().catch(error => { print(error.stack || String(error)); quit(1); });
