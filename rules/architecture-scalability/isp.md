# Interface Segregation Principle (ISP)

**Cite as:** `[ISP]`

## Principle
Clients depend only on the methods they use. Fat interfaces force conceptual coupling on every consumer.

## Red flags in code
- A consumer implementing an interface and leaving most methods empty or throwing.
- One large interface used by clients that need only a slice of it.

## Apply directly (mechanical, unambiguous)
- Split a wide interface into focused ones when the consumer groups are clearly disjoint.

## Propose only (requires judgment)
- Where to cut a wide interface whose consumers overlap.
