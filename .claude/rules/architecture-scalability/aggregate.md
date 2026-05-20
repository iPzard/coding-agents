# Aggregate

**Cite as:** `[Aggregate]`

## Principle
A cluster of objects treated as one unit for data changes:
- Each aggregate has exactly one root. Only the root has a globally addressable identity.
- Nothing outside the aggregate boundary holds a reference to anything inside, except to the root. Transient references to internals may be passed out for one operation but not retained.
- Only aggregate roots can be obtained by database query. Internals come via traversal from the root.
- All invariants of the aggregate must hold at the end of every transaction.
- A single transaction modifies at most one aggregate. Cross-aggregate changes use domain events / sagas / eventual consistency.

## Red flags in code
- External code holding a long-lived reference to an aggregate's internal entity.
- A database query returning a non-root entity, then mutating those rows.
- A single transaction modifying two aggregates.
- Repository for a non-aggregate-root.

## Apply directly (mechanical, unambiguous)
- Remove a query method on the repository that returns a non-root child entity.
- Restrict access to an exposed internal entity so callers must traverse from the root.

## Propose only (requires judgment)
- Splitting or merging aggregates.
- Designing the eventual-consistency mechanism for a cross-aggregate rule.
