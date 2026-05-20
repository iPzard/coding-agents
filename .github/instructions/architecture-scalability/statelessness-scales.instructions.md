---
applyTo: "**"
---

# Statelessness scales

**Cite as:** `[Statelessness scales]`

## Principle
Stateless servers scale by adding instances; stateful in-memory session state pins users to nodes and complicates failover. Cached data (re-derivable) ≠ session state (correctness-critical and must persist).

## Red flags in code
- Module-level mutable globals / singletons holding per-request or per-user data.
- Process-wide mutable maps acting as session state.
- Correctness-critical state held only in memory across requests.

## Apply directly (mechanical, unambiguous)
- Remove a module-level mutable global where the data clearly belongs in the request context.

## Propose only (requires judgment)
- Choosing a session store (centralized cache, sticky sessions, signed tokens).
- Migrating from stateful to stateless servers.
