---
applyTo: "**"
---

# Partition key

**Cite as:** `[Partition key]` (or `[Hot key]` when flagging a concentrated key)

## Principle
Spread data and load evenly. A bad partition key creates hot spots — a single celebrity user, a timestamp prefix, a sequential id. Hashing avoids range hot spots but cannot rescue a workload concentrated on one logical key. Concentrated keys must be sharded with an application-level technique (e.g. random suffix) and reads merged.

## Red flags in code
- Partition / shard key chosen as user-id for a workload where one user (admin, system, celebrity, batch process) generates >5% of traffic — hot key.
- Partition key is a monotonically increasing timestamp or sequential id — every write hits the newest partition.
- No partitioning strategy declared for a large table.

## Apply directly (mechanical, unambiguous)
- Add a random-suffix sub-partitioning scheme when the hot-key target is unambiguous and the read path can merge.

## Propose only (requires judgment)
- Choosing a new partition key for an existing table.
- Designing the read-side merge logic for a sharded hot key.
