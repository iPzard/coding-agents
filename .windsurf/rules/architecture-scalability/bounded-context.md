---
trigger: model_decision
description: "Bounded Context: Each model lives inside an explicit context with its own dialect. The same word (Customer, Order, Account) can mean different things in diff…"
---

# Bounded Context

**Cite as:** `[Bounded Context]`

## Principle
Each model lives inside an explicit context with its own dialect. The same word (`Customer`, `Order`, `Account`) can mean different things in different contexts — but the contexts must be named and the boundary made explicit. Integration goes through an explicit translator (Anti-Corruption Layer).

## Red flags in code
- Same word used with different meanings in the same module or nearby files.
- A single `Customer` class used for billing, marketing, and support concerns simultaneously.
- Cross-context calls without an explicit translator (model bleed).

## Apply directly (mechanical, unambiguous)
- Rename one of two colliding types to disambiguate (e.g. `BillingCustomer` vs `SupportCustomer`) when ownership is clear.

## Propose only (requires judgment)
- Splitting a shared model into separate context-specific models.
- Designing the Anti-Corruption Layer between two contexts.
