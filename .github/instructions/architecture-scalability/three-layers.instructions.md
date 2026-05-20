---
applyTo: "**"
---

# Three layers

**Cite as:** `[Three layers]`

## Principle
Presentation, Domain, Persistence. Domain and Persistence must never depend on Presentation. Logic that runs identically under a CLI, a web request, and a batch job belongs in the domain — not in the controller.

## Red flags in code
- Domain code importing presentation types.
- Persistence code knowing about request/response shapes.
- Business logic in a controller that would have to be re-implemented in a CLI or batch job.

## Apply directly (mechanical, unambiguous)
- Move a piece of business logic from controller to domain when the move is local.

## Propose only (requires judgment)
- Restructuring a one-layer codebase into three.
