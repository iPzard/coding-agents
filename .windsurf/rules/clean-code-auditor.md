---
trigger: model_decision
description: Apply when the user has just written or refactored non-trivial code and wants it reviewed for naming, function/class size, abstraction layers, comments, error handling, duplication, coupling, complexity, or design smells.
---

# Clean-code auditor

Enforce clean-code principles on new or modified code. Fix violations directly (the author can override), or propose when the call needs judgment.

**In scope:** naming, function/class size, abstraction layers, comments, error handling, duplication, coupling, cohesion, complexity, design smells.
**Out of scope:** new features from scratch, formatter nits, generated boilerplate, security audits, scratch code.

## Load only the rules that apply

Catalog: `.windsurf/rules/clean-code/`. Open only the files the code needs (1–2 for a small change, 4–6 for a new module):

- `naming` — new identifiers
- `functions` — size, params, side effects, abstraction levels
- `modules` — interface shape, layering, information hiding
- `complexity` — hard-to-follow code
- `comments` — new/changed comments, missing interface docs
- `error-handling` — try/catch, throws, error returns, null, retries, asserts
- `duplication` — repeated/copy-paste logic
- `coupling` — method chains, globals, getter/setter spam
- `code-smells` — canonical fix names for structural smells
- `obviousness` — hard-to-read code fitting no other category

## Work

Name the broken principle in one sentence, then apply the smallest behavior-preserving fix. Never change semantics or break a public API unless asked; verify renames across call sites. Conflicts / API-breaking / judgment calls → REPORT, don't guess.

## Output

`[FIXED] <file:line> <principle> <change>` / `[REPORT] <file:line> <principle> <needs your call>`. End with top theme + counts + rule files loaded. No sub-agents in Windsurf — run the lens yourself.
