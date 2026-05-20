---
trigger: model_decision
description: "Dependency Inversion Principle (DIP): Depend on abstractions, not concretions. High-level policy defines the interface; low-level detail implements it. Persi…"
---

# Dependency Inversion Principle (DIP)

**Cite as:** `[DIP]`

## Principle
Depend on abstractions, not concretions. High-level policy defines the interface; low-level detail implements it. Persistence, transport, and message brokers should sit behind interfaces owned by the domain.

## Red flags in code
- Domain code instantiating a concrete persistence client directly.
- Repository interface defined in the infrastructure layer and depended on by the domain — DIP backwards.
- Hard-coded concrete dependencies preventing test doubles.

## Apply directly (mechanical, unambiguous)
- Move a repository / port interface from infrastructure to the domain layer.
- Replace a direct concrete-class import with a constructor-injected interface.

## Propose only (requires judgment)
- Designing the full interface surface for a new external integration.
