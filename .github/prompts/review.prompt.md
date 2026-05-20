---
mode: agent
description: Combined multi-lens code review — architecture & scalability, clean code, and tests — in one pass over a change.
---

# /review — combined code review

Run one review pass that combines all three lenses. Copilot has no sub-agents, so run each lens yourself, sequentially, then produce one merged report.

## 1. Resolve scope

Default to the files changed vs `HEAD` (staged + unstaged + untracked source). If the invocation names a path or glob, use exactly that. State the file list in one line. If empty, say so and stop.

## 2. Run the three lenses

Apply each over the scoped files, loading only the rule files each needs from `.github/instructions/`:

1. **Architecture & scalability** — read `architecture-scalability/_index.md`, then the rules that apply. Owns structural framing (layers, dependency direction, aggregates, bounded contexts, module-level SRP).
2. **Clean code** — naming, functions, duplication, coupling, complexity, comments, error handling.
3. **Tests** — missing tests and test-quality problems for the changed code. Review only; don't write tests unless the user asks.

## 3. Merge + dedupe

One finding list keyed by `file:line`. When architecture and clean-code overlap, keep one and assign by ownership above. Severity: Blocker → Major → Minor. A missing-test finding defaults to Major.

## 4. Apply safe fixes, then report

Apply only mechanical, unambiguous fixes — structure first (architecture), then clean-code, then tests (only if asked to write them). Verify any rename across call sites. Leave `[Proposed]` items unapplied.

```
## Review — <scope>
**Lenses:** architecture · clean-code · tdd

### Blockers
- [<axis>][<rule>] <file:line> — <problem>. Fix: <change>. [Applied | Proposed]
### Major
### Minor
### Test gaps
- <file> — <missing/weak test>. [Proposed]

### Applied changes
- <file:line> — <one-line summary>

### Verdict
<clear to commit | proposed fixes need actioning | fundamental restructure>
```

Write "None." under any empty section. One pass per invocation.
