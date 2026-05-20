---
trigger: model_decision
description: "Single Responsibility Principle (SRP): A unit has one reason to change. When a single unit serves the simultaneous needs of multiple distinct stakeholders (e…"
---

# Single Responsibility Principle (SRP)

**Cite as:** `[SRP]`

## Principle
A unit has one reason to change. When a single unit serves the simultaneous needs of multiple distinct stakeholders (each driving its own change cycle), it violates SRP.

## Red flags in code
- A class / module suffixed `Manager`, `Helper`, `Util`, or `Service` with 15+ unrelated methods.
- One unit doing calculation, formatting, and persistence together.
- Methods on one class clearly serving different actors (finance + operations + database admin).

## Apply directly (mechanical, unambiguous)
- Extract a clearly-separable group of methods into its own unit when the cut is obvious and the methods don't share private state.

## Propose only (requires judgment)
- Where to cut a tangled class with overlapping responsibilities.
- Naming the new units that come out of the split.
