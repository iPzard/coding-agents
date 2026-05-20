---
trigger: model_decision
description: "Duplication (DRY): - Don't Repeat Yourself. Every piece of knowledge must have a single, unambiguous, authoritative representation in the system. Same code i…"
---

# Duplication (DRY)

- **Don't Repeat Yourself.** Every piece of knowledge must have a single, unambiguous, authoritative representation in the system. Same code in two places is one of the strongest smells.
- **Diagnose the kind of duplication before fixing:**
  - Forced by language or framework boilerplate — accept it, or use a generator/macro/template to derive it from one source.
  - Same knowledge stored in two places (e.g., a length field stored alongside `start`/`end` indices) — compute one from the other, don't store both.
  - Copy-pasted because typing the same logic fresh was faster — extract it into a shared function.
  - Different teams independently reinventing the same wheel — centralize the canonical version and make it discoverable.
- **Fix it:** Extract Method (same code in two methods of one class), Pull Up Method (sibling subclasses), Extract Class (unrelated classes), Substitute Algorithm (different algorithms doing the same thing).
- **Caveat:** when the duplicated chunk uses many surrounding local variables, extracting it produces a long, awkward parameter list. Confirm the extracted function's signature stays reasonable before committing to the refactor — sometimes the duplication is the lesser evil.
