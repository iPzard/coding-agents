---
applyTo: "**"
---

# Secondary index partitioning

**Cite as:** `[Secondary index partitioning]`

## Principle
A local secondary index (one per partition) requires scatter/gather across all partitions on read — every query becomes O(partitions). A global secondary index (spanning partitions) avoids scatter but makes writes affect multiple partitions. Either choice has a cost; pretending neither does is the bug.

## Red flags in code
- Query against a partitioned store without specifying the partition key, on the assumption it's "indexed."
- Lookups by a non-key attribute treated as if they're as cheap as primary-key lookups.

## Apply directly (mechanical, unambiguous)
- None — index strategy is design-level.

## Propose only (requires judgment)
- Choosing local vs global secondary index for a query pattern.
- Restructuring a query to use the partition key.
