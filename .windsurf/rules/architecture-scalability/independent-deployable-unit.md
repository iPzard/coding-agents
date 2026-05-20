---
trigger: model_decision
description: "Independent deployable unit: The smallest deployable unit with its own architectural characteristics — including its own data store. Two services sharing a d…"
---

# Independent deployable unit

**Cite as:** `[Independent deployable unit]`

## Principle
The smallest deployable unit with its own architectural characteristics — including its own data store. Two services sharing a database collapse into one such unit and cannot independently scale, deploy, or fail.

## Red flags in code
- Multiple services pointing at the same database schema.
- Service A doing a JOIN against Service B's tables.
- A "service" that can't be deployed without coordinating with another.

## Apply directly (mechanical, unambiguous)
- None — schema separation is structural.

## Propose only (requires judgment)
- Splitting a shared schema between services.
- Designing data ownership for a new service.
