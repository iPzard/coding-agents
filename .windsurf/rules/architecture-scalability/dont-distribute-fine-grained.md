---
trigger: model_decision
description: "Don't distribute fine-grained objects: An in-process call is orders of magnitude faster than a cross-process call. Distributing for \"performance\" by giving e…"
---

# Don't distribute fine-grained objects

**Cite as:** `[Don't distribute fine-grained]`

## Principle
An in-process call is orders of magnitude faster than a cross-process call. Distributing for "performance" by giving each domain unit its own service almost always cripples performance — chatty fine-grained calls cross the wire. If you must distribute, use a coarse-grained facade and plain data objects at the boundary; keep fine-grained objects inside the process.

## Red flags in code
- A "microservice" that exposes single-getter / single-setter RPCs.
- Service decomposition that splits a tightly-coupled domain across the network.
- "Performance" optimization that introduces an extra network hop.

## Apply directly (mechanical, unambiguous)
- None — restructuring distribution is design-level.

## Propose only (requires judgment)
- Collapsing fine-grained services into a coarser facade.
- Choosing service granularity for a new system.
