---
description: Combined multi-lens code review — architecture & scalability, clean code, and tests — in one pass over a change.
---

# /review — combined code review

Windsurf has no sub-agents, so run all three lenses yourself, sequentially, then produce one merged report.

## 1. Resolve scope

Default: files changed vs `HEAD` (staged + unstaged + untracked source). Honor an explicit path/glob if given. State the file list in one line. If empty, say so and stop.

## 2. Run the three lenses

Over the scoped files, loading only the rule files each needs from `.windsurf/rules/`:

1. **Architecture & scalability** — read `architecture-scalability/_index.md`, then applicable rules. Owns structural framing (layers, dependency direction, aggregates, bounded contexts, module-level SRP).
2. **Clean code** — naming, functions, duplication, coupling, complexity, comments, error handling.
3. **Tests** — missing tests and test-quality problems. Review only; don't write tests unless asked.

## 3. Merge + dedupe

One finding list keyed by `file:line`. Architecture/clean-code overlap → keep one by ownership above. Severity Blocker → Major → Minor; missing-test defaults to Major.

## 4. Apply safe fixes, then report

Apply only mechanical fixes — structure first, then clean-code, then tests (only if asked). Verify renames across call sites. Leave `[Proposed]` unapplied.

```
## Review — <scope>
### Blockers / Major / Minor / Test gaps
- [<axis>][<rule>] <file:line> — <problem>. Fix: <change>. [Applied | Proposed]
### Applied changes
### Verdict: <clear to commit | proposed fixes need actioning | fundamental restructure>
```

"None." under empty sections. One pass per invocation.
