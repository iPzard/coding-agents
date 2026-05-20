---
applyTo: "**"
---

# Sync coupling

**Cite as:** `[Sync coupling]`

## Principle
Synchronous coupling kills availability. If Service A synchronously calls Service B to complete a request, A's availability ≤ B's availability. More synchronous hops = multiplicative failure. Asynchronous + idempotent restores fault tolerance.

## Red flags in code
- Synchronous HTTP call inside a request handler to a service owned by a different team — multiplicative-availability bug.
- A long chain of synchronous service-to-service calls in the request path.
- A request that succeeds only if all downstream services are up.

## Apply directly (mechanical, unambiguous)
- Push a non-critical external call out of the request path into a queued background job when the call is fire-and-forget.

## Propose only (requires judgment)
- Redesigning a multi-service flow to be async + idempotent.
- Identifying which sync hops are essential vs optional.
