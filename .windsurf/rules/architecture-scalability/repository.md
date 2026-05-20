---
trigger: model_decision
description: "Repository: Provides the illusion of an in-memory collection of aggregate roots. Interface lives in the domain; implementation lives in infrastructure. Retur…"
---

# Repository

**Cite as:** `[Repository]`

## Principle
Provides the illusion of an in-memory collection of aggregate roots. Interface lives in the domain; implementation lives in infrastructure. Returns aggregates — not query results, not DTOs, not raw persistence rows. Only roots have repositories.

## Red flags in code
- Repository returning ORM models or raw rows to the controller.
- Repository for a non-aggregate-root (e.g. `OrderLineRepository` where `OrderLine` is internal to `Order`).
- Repository interface defined in the infrastructure layer.

## Apply directly (mechanical, unambiguous)
- Move a repository interface from infrastructure to the domain layer.
- Change a repository return type from an ORM model to the domain aggregate when the mapping is direct.

## Propose only (requires judgment)
- Designing a new repository interface for a complex aggregate.
- Deciding the query surface (specific finders vs Specification pattern vs query objects).
