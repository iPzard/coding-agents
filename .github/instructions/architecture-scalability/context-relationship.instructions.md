---
applyTo: "**"
---

# Context relationship

**Cite as:** `[Context relationship]`

## Principle
When two contexts integrate, pick one and name it: Shared Kernel, Customer/Supplier, Conformist, Anti-Corruption Layer, Open Host Service, Published Language, Separate Ways. Unnamed integration causes model bleed.

## Red flags in code
- Two contexts importing each other's domain types directly.
- Integration code mixing vocabulary from both contexts without translation.
- No documented integration pattern between subsystems that clearly depend on each other.

## Apply directly (mechanical, unambiguous)
- Add a translator class at the boundary that converts between context vocabularies when the cut is obvious.

## Propose only (requires judgment)
- Choosing which context-relationship pattern fits two integrating subsystems.
