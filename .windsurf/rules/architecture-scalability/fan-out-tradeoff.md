---
trigger: model_decision
description: "Fan-out tradeoff: Write-time fan-out (precompute feeds for every follower at post time) makes reads cheap but writes expensive — one post by a high-follower…"
---

# Fan-out tradeoff

**Cite as:** `[Fan-out tradeoff]` (or `[Unbounded fan-out]` when flagging missing chunking/queue)

## Principle
Write-time fan-out (precompute feeds for every follower at post time) makes reads cheap but writes expensive — one post by a high-follower account becomes millions of writes. Read-time fan-out (gather followee posts on read) does the reverse. Choosing without knowing your read:write ratio is the bug.

## Red flags in code
- Unbounded fan-out: "for each recipient, send a message" with no chunking, backpressure, or queue.
- A naive write-time fan-out that doesn't consider high-volume accounts.
- A naive read-time fan-out that doesn't consider read load.

## Apply directly (mechanical, unambiguous)
- Chunk an unbounded loop into batches with a queue between.
- Push a synchronous fan-out into a queued background job.

## Propose only (requires judgment)
- Choosing write-time vs read-time fan-out for a feed system.
- Hybrid strategies (e.g. fan-out for most accounts, on-demand for high-fanout ones).
