# CAP

**Cite as:** `[CAP]`

## Principle
During a network partition, you choose. Linearizability ("read sees latest committed write") is expensive and global. Most operations don't need it. Code that assumes linearizability across a distributed system (e.g. "we just wrote X, immediately read it back from any replica and expect X") is broken under partition.

## Red flags in code
- Distributed read-after-write logic that assumes immediate visibility.
- Cross-region or cross-replica consistency assumed without explicit coordination.
- Code that breaks badly during a partition because it doesn't tolerate stale or unavailable data.

## Apply directly (mechanical, unambiguous)
- None — CAP-level concerns require design adjustments.

## Propose only (requires judgment)
- Choosing CP vs AP behavior for an operation.
- Designing a fallback for partition tolerance.
