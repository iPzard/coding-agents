---
applyTo: "**"
---

# Complexity

Complexity is anything about a system's structure that makes it hard to understand or modify. It builds up gradually as couplings multiply and meanings get fuzzier. Three symptoms to watch for:

- **Change amplification** — a future small change will require edits in many places. Red flag: the same string literal, magic number, or piece of knowledge appears in multiple spots.
- **Cognitive load** — a developer must hold a lot in their head to use this code correctly. Red flag: many parameters, surprising side effects, dependencies on global state, non-obvious ordering requirements.
- **Unknown unknowns** — it's unclear what else has to change when this changes. Red flag: information is implicitly shared without being named (information leakage).

**Standard:** Code that merely runs is not the bar. Prefer the design that minimizes long-term complexity over the one that finishes fastest.
