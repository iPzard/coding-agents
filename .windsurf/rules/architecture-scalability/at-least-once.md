---
trigger: model_decision
description: "At-least-once: At-least-once delivery is the default network reality. A retry, a timeout, a duplicate webhook, a leader failover during a write — any can del…"
---

# At-least-once

**Cite as:** `[At-least-once]` (or `[Idempotency]` when flagging missing dedup)

## Principle
At-least-once delivery is the default network reality. A retry, a timeout, a duplicate webhook, a leader failover during a write — any can deliver the same message twice. Mutations that are not naturally idempotent (counter increments, inserts without uniqueness constraints, send-email side effects) must carry a deduplication key or be made naturally idempotent.

## Red flags in code
- Webhook handler with no idempotency-key check.
- Queue consumer that processes messages without dedup.
- Retry-on-timeout HTTP client with no idempotency hint on the request.
- A mutation that would have visible side effects if applied twice (`counter += 1`, send-email, insert without uniqueness).

## Apply directly (mechanical, unambiguous)
- Add an idempotency-key parameter / header to a mutation handler when the key source is obvious.
- Change an audit insert to an upsert / insert-if-not-exists keyed on the dedup tuple.
- Add a uniqueness constraint to a new table whose dedup tuple is clear.

## Propose only (requires judgment)
- Designing the dedup-key strategy for a complex flow.
- Backfilling idempotency over an existing API surface.
