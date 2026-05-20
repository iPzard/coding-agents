---
trigger: model_decision
description: "Domain-logic style: Pick one and stay with it:"
---

# Domain-logic style

**Cite as:** `[Domain-logic style]`

## Principle
Pick one and stay with it:
- **Transaction Script** — procedural, fine for simple CRUD.
- **Table Module** — record-set centric.
- **Domain Model** — rich object model, scales with domain complexity.

Picking Domain Model and writing transaction scripts inside it is the worst of both worlds.

## Red flags in code
- A codebase mixing rich entities with transaction-script-style service functions doing the same work.
- "Domain" classes that are just bags of getters / setters around procedural service functions.

## Apply directly (mechanical, unambiguous)
- None — style choice is project-wide.

## Propose only (requires judgment)
- Choosing the right style for this codebase.
- Migrating between styles incrementally.
