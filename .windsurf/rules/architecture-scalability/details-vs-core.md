---
trigger: model_decision
description: "Details vs core: Databases, web technology, and frameworks are implementation details. Business rules know nothing of them. If swapping one database vendor f…"
---

# Details vs core

**Cite as:** `[Details vs core]`

## Principle
Databases, web technology, and frameworks are implementation details. Business rules know nothing of them. If swapping one database vendor for another, or one transport for another, would touch the use-case layer, the boundary is wrong.

## Red flags in code
- Business logic written against a specific database's query dialect (would break on a different engine).
- Use cases that assume a specific HTTP framework's middleware behavior.
- Domain layer that knows about queue topics or message-broker mechanics.

## Apply directly (mechanical, unambiguous)
- Move framework-specific calls to an adapter; replace with an interface call from the domain.

## Propose only (requires judgment)
- Deciding the right abstraction granularity for a new external concern.
