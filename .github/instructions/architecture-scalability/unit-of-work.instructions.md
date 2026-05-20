---
applyTo: "**"
---

# Unit of Work

**Cite as:** `[Unit of Work]`

## Principle
Tracks new, modified, and removed entities within a business transaction and decides the write order. Ad-hoc save calls scattered across a handler bypass it and risk partial writes.

## Red flags in code
- Multiple `save()` / `commit()` calls scattered through a use case.
- A handler that commits inline at each step instead of at the end.
- Repository methods returning unwrapped persistence objects to be mutated by the caller, then expecting changes to flush — Unit of Work bypassed.

## Apply directly (mechanical, unambiguous)
- Consolidate scattered save calls to a single commit at the end of the use case when the path is straight-line.

## Propose only (requires judgment)
- Introducing UoW where none exists today.
- Choosing transaction boundaries for a complex use case with branching.
