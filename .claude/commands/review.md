---
description: Orchestrated multi-lens code review. Fans out to the architecture-scalability, clean-code, and TDD auditors (read-only), dedupes overlapping findings, applies safe fixes centrally, and reports one unified summary.
argument-hint: [paths…] | "staged" | "all"   (default: files changed vs HEAD)
---

# /review — orchestrated code review

Run one review pass that combines all three auditors. **You (the main thread) orchestrate; the auditors only propose. You apply the fixes.** Subagents cannot spawn subagents, so the orchestration must live here — and running multiple edit-capable auditors on the same files at once causes write clobber, so the auditors run read-only and you apply centrally.

## 1. Resolve scope

Read `$ARGUMENTS`:
- explicit paths / globs → review exactly those.
- `staged` → files from `git diff --cached --name-only`.
- `all` → the tracked source tree (warn first if large; skip vendored / generated dirs).
- empty (default) → uncommitted changes: `git diff --name-only HEAD`, plus untracked source files from `git status --porcelain`.

If the resolved set is empty, say so and stop. Otherwise state the file list in one line before dispatching. Never review beyond the resolved set.

## 2. Fan out — read-only, in parallel

Send ONE message with three `Agent` calls so they run concurrently. Give each the resolved file list and this constraint verbatim:

> REVIEW-ONLY. Do NOT edit any file — two other auditors are reviewing the same files concurrently and edits would conflict. Propose fixes only, in your normal output format, tagging each `[Mechanical]` (safe to auto-apply) or `[Proposed]` (needs judgment). The orchestrator applies them.

Dispatch:
- `architecture-scalability-auditor` — architecture + scalability axes.
- `clean-code-auditor` — craftsmanship (naming, functions, duplication, coupling, complexity).
- `test-driven-development-auditor` — **REVIEW mode**: report missing tests and test-quality problems for the changed code. Do NOT write code or run the suite in this pass.

Wait for all three (foreground). Read every result.

## 3. Merge + dedupe

Build one finding list keyed by `file:line`.
- arch and clean-code overlap on the "clean axis." When both flag the same location, MERGE into one finding and assign ownership: structural framing (layer/dependency direction, aggregates, bounded contexts, SRP-at-module-level) → **arch**; local craft (naming, duplication, function size, readability) → **clean-code**.
- Drop exact duplicates. Keep two entries only when the proposed fixes genuinely differ.
- Severity: Blocker → Major → Minor. A missing-test finding defaults to Major.

## 4. Apply safe fixes — sequential, central

Apply only `[Mechanical]` findings. Order matters — structure first, since later fixes build on it:
1. **architecture** (changes the shape others sit on)
2. **clean-code** (names, extraction, dedup)
3. **TDD** test-writing — only if the user asked this run to also add tests; otherwise leave gaps as reported `[Proposed]`.

Rules while applying:
- One `Edit` at a time. Re-read a file before a second edit to it.
- Verify any rename across call sites with `Grep` before applying.
- `[Proposed]` / judgment calls / anything two auditors disagree on → do NOT apply. Surface it.

## 5. Verify + report

Re-read or `Grep` the changed regions to confirm edits landed and didn't collide. Then emit ONE unified report:

```
## Review — <scope>

**Files:** <list>    **Auditors:** arch · clean-code · tdd

### Blockers
- [<axis>][<rule/principle>] <file:line> — <problem>. Fix: <change>. [Applied | Proposed]
### Major
- ...
### Minor
- ...
### Test gaps
- <file> — <missing / weak test>. [Proposed]

### Applied changes
- <file:line> — <one-line summary>

### Verdict
<clear to commit | proposed fixes need actioning | fundamental restructure>
```

Write "None." under any empty section.

## Guardrails
- Auditors propose; you apply. Never give all three edit access to the same files simultaneously.
- One pass per invocation. For another round after fixes land, the user re-runs `/review`.
- Stay inside the resolved file list. Don't open-endedly explore.
