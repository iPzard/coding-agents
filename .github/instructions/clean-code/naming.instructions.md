---
applyTo: "**"
---

# Naming

- **Reveal intent.** `int d` (elapsed time in days) → `int elapsedDays`. The name answers what, why, and how it's used. If a name needs a comment to explain, the name is wrong.
- **Precise, not vague.** "x", "y", "result", "data", "info", "manager", "processor", "handler", "do", "process", "thing" are red flags. Overloaded names that mean two different things at different scopes are a recipe for long debugging sessions.
- **Don't mislead.** Don't name something `accountList` if it isn't a list. Don't use identifiers that visually collide with digits (lowercase `l` vs `1`, uppercase `O` vs `0`).
- **Searchable.** Single-letter names are fine only as short-scope loop iterators. Magic numbers (`7`, `42`) should be named constants.
- **One term per concept.** `fetch`, `retrieve`, `get` — pick one and use it everywhere for that operation. Conversely, when two operations genuinely differ (`add` vs `insert` vs `append`), use distinct names — don't reuse the same word for different meanings.
- **Hard to pick a name is a design red flag.** If you can't name it cleanly, the underlying concept is probably wrong — fix the design before continuing.
- **Boolean names are predicates:** `isVisible`, `hasFinished`, not `visibilityStatus`, `flag`.
- **Long descriptive names beat short cryptic ones** for code outside small scopes. Pick the shortest name that still fully describes what the thing is or does — too short loses meaning, too long becomes noise.
- **Consistency:** if you call it `userId` here, don't call it `user_id` or `uid` ten lines down.
