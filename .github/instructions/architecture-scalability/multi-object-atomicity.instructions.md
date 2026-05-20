---
applyTo: "**"
---

# Multi-object atomicity

**Cite as:** `[Multi-object atomicity]`

## Principle
Single-object operations are atomic; multi-object are not. ACID is a single-database property. Across services, aggregates, or partitions, you do not get ACID for free. Use sagas / outbox / idempotent receivers, not "we'll wrap it in a transaction."

## Red flags in code
- A single transaction spanning two services or two databases.
- Assuming transaction semantics across an event publish + a database write.
- Code that "wraps" a cross-aggregate change in a database transaction.

## Apply directly (mechanical, unambiguous)
- None — fixing this requires saga / outbox design.

## Propose only (requires judgment)
- Introducing an outbox pattern for cross-aggregate consistency.
- Designing a saga for a multi-service workflow.
