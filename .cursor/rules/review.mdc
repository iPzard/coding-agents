---
description: Combined multi-lens code review. Use when the user asks to "review" a change across all three lenses — architecture & scalability, clean code, and tests — in one pass.
globs:
alwaysApply: false
---

# /review — combined code review (Cursor)

Cursor has no sub-agents, so this is not an orchestrator that fans out — **you run all three lenses yourself, sequentially, in one pass**, then produce one merged report.

## 1. Resolve scope

Default: files changed vs HEAD (`git diff --name-only HEAD` plus untracked source). Honor an explicit path/glob if the user gave one. State the file list in one line. If empty, say so and stop.

## 2. Run the three lenses over the scoped files

Apply each in turn, loading only the rule files each needs (see the per-auditor rules and the catalogs under `.cursor/rules/`):

1. **Architecture & scalability** — read `architecture-scalability/_index.md`, then the rules that apply. Structural axis.
2. **Clean code** — naming, functions, duplication, coupling, complexity.
3. **Tests** — missing tests and test-quality problems for the changed code (review mode; don't write tests unless asked).

## 3. Merge + dedupe

One finding list keyed by `file:line`. When architecture and clean-code flag the same spot, keep one: structural framing (layers, dependency direction, aggregates, module-level SRP) → architecture; local craft (naming, dup, size, readability) → clean code. Severity: Blocker → Major → Minor; a missing-test finding defaults to Major.

## 4. Apply safe fixes, then report

Apply only mechanical fixes, structure first (architecture), then clean-code, then tests (only if asked). Verify renames across call sites. Leave judgment calls as `[Proposed]`.

```
## Review — <scope>
### Blockers / ### Major / ### Minor / ### Test gaps
- [<axis>][<rule>] <file:line> — <problem>. Fix: <change>. [Applied | Proposed]
### Applied changes
### Verdict: <clear to commit | proposed fixes need actioning | fundamental restructure>
```

Write "None." under any empty section. One pass per invocation.
