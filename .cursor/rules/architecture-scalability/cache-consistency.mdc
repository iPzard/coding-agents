---
description: "Cache consistency: Every cache layer is another consistency model. Invalidation strategy must be explicit. Cache-aside + write-through, cache-aside + invalid…"
globs:
alwaysApply: false
---

# Cache consistency

**Cite as:** `[Cache consistency]`

## Principle
Every cache layer is another consistency model. Invalidation strategy must be explicit. Cache-aside + write-through, cache-aside + invalidation, write-behind — each has different failure modes.

## Red flags in code
- Cache populated without an invalidation strategy.
- Cache TTL longer than the data's actual half-life with no source-of-truth fallback.
- A write path that doesn't update or invalidate the cache it just bypassed.

## Apply directly (mechanical, unambiguous)
- Add a cache-invalidation call after a write to the source of truth when the cache key is obvious.

## Propose only (requires judgment)
- Choosing the cache strategy (aside vs through vs behind).
- Designing TTL and invalidation policy for a new cache.
