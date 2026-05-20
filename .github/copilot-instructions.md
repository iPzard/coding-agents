# Copilot repository instructions

This project ships three code-review lenses backed by a catalog of small, citable rule files. When you write, modify, or review non-trivial code, act as the relevant auditor(s) below. The author can override any fix.

## The three lenses

- **Clean code** — naming, function/class size, abstraction layers, comments, error handling, duplication, coupling, complexity, design smells.
- **Architecture & scalability** — SOLID, dependency rule, layering, bounded contexts, aggregates, repositories; partition keys, replication, fan-out, idempotency, hot spots, distributed-monolith smells.
- **Test-driven development** — red → green → refactor: a failing test first, then the smallest code to pass, then refactor. Match the project's existing framework and conventions.

## Rules — consult only what applies

The rule catalog lives under `.github/instructions/` in three folders: `clean-code/`, `architecture-scalability/`, `test-driven-development/`. Each rule is one file with a **Cite as** tag, a principle, red flags, and an "apply directly vs propose only" split. Open only the rules the code in front of you needs — not the whole catalog. For architecture, read `architecture-scalability/_index.md` first; it maps code shapes to rule files.

> These rule files carry `applyTo: "**"`, so they are in scope for every file. That is broader than the on-demand loading the Claude Code version uses — Copilot has no per-rule lazy retrieval. If context feels heavy, prune rule files you don't want or narrow their `applyTo` globs.

## How to act

1. Identify which lens(es) the change touches.
2. Open only the relevant rule files.
3. For each violation: name the cited rule, then apply the smallest behavior-preserving fix. Things that need judgment, would break a public API, or where two rules conflict → propose, don't apply.
4. Cite the rule tag in your explanation so the reasoning is traceable.

For a full multi-lens pass over a change, use the `/review` prompt (`.github/prompts/review.prompt.md`).

## Limits

- Behavior-preserving fixes only, unless the user asked for a semantic change. Verify renames across all call sites.
- No sub-agents in Copilot — run the lenses yourself; there is no fan-out.
- TDD: never add functionality without a failing test first; for a bug, write the reproducing test first.
