---
applyTo: "**"
---

# Thin hard-to-test edges

**Cite as:** `[Thin edges]`

## Principle
Views, controllers, and persistence adapters stay skinny; the testable policy is pulled inside the boundary where unit tests can exercise it.

## Red flags in code
- Controller / route handler with 50+ lines of business decisions.
- View / template containing conditional business calculations.
- ORM adapter / mapper containing business rules.

## Apply directly (mechanical, unambiguous)
- Move a business calculation from controller to a domain method.
- Pull a conditional from a view into a domain query method (a single boolean property on the entity).

## Propose only (requires judgment)
- Restructuring a fat controller into use cases + thin transport.
