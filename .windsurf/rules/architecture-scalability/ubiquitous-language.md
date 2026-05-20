---
trigger: model_decision
description: "Ubiquitous language: Code names match the names domain experts use. Vague verbs (process, handle, manage) and generic role nouns (Manager, Helper) are smells…"
---

# Ubiquitous language

**Cite as:** `[Ubiquitous language]`

## Principle
Code names match the names domain experts use. Vague verbs (`process`, `handle`, `manage`) and generic role nouns (`Manager`, `Helper`) are smells. If a domain expert would not recognize the term, it does not belong in the domain layer.

## Red flags in code
- `handleStuff`, `processData`, `doWork` methods in the domain.
- `Manager`, `Helper`, `Worker` suffixed classes in the domain.
- Domain type whose name a business stakeholder would not recognize.

## Apply directly (mechanical, unambiguous)
- Rename a clearly-domain method to the ubiquitous term when the term is known and stable.
- Rename a `*Helper` class to its actual responsibility when obvious from its methods.

## Propose only (requires judgment)
- Coining a new domain term — requires alignment with stakeholders.
- Wholesale renaming of types across a feature area.
