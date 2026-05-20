# Replication semantics

**Cite as:** `[Replication semantics]`

## Principle
- **Single-leader** — simple, all writes through one node; lag means reads from followers may be stale (read-your-writes anomalies).
- **Multi-leader** — write conflicts that must be resolved.
- **Leaderless** — quorum reads/writes, no global ordering.

Code that reads a follower immediately after a leader write and assumes the data is there is wrong by default.

## Red flags in code
- Write to the leader, then immediately read from a replica and assert the value is present.
- Assuming all replicas have the same view of recent writes.
- Multi-leader writes with no conflict-resolution strategy.

## Apply directly (mechanical, unambiguous)
- Route the follow-up read after a write to the leader (or a session-pinned replica) when the API supports it.

## Propose only (requires judgment)
- Choosing a replication topology.
- Designing conflict resolution between multi-leader writes.
