---
applyTo: "**"
---

# Open/Closed Principle (OCP)

**Cite as:** `[OCP]`

## Principle
Extend behavior without modifying existing code. New variants should not force edits to the core.

## Red flags in code
- Growing if/else or switch trees keyed on a type tag.
- Each new "kind" requires edits to a central function.
- Conditional logic that fans out as features are added.

## Apply directly (mechanical, unambiguous)
- Replace a small type-tag switch with polymorphism / strategy when the variants are clearly enumerated and stable.

## Propose only (requires judgment)
- Designing the extension surface (strategy interface, plugin protocol, registry) for a domain.
- Deciding when "open for extension" is worth the indirection cost.
