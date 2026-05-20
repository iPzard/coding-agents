---
description: "Distributed monolith: Services that must be deployed together, in a fixed order, share a database, and have synchronous chatty calls — operational pain of di…"
globs:
alwaysApply: false
---

# Distributed monolith

**Cite as:** `[Distributed monolith]`

## Principle
Services that must be deployed together, in a fixed order, share a database, and have synchronous chatty calls — operational pain of distribution with none of the benefit. If services must ship together as a set, they should be one process.

## Red flags in code
- Deploy scripts that ship multiple "services" together in a specified order.
- Multiple services sharing one database.
- Services that synchronously call each other on every request.
- Microservices claimed for a team / cadence that doesn't justify them (e.g. 2 people, monthly deploys) — characteristic mismatch.

## Apply directly (mechanical, unambiguous)
- None — collapsing or properly decomposing services is structural.

## Propose only (requires judgment)
- Collapsing distributed-monolith services back into one process.
- Re-decomposing along proper boundaries with separate data stores.
