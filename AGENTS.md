# AGENTS.md

Guidance for any AI coding agent working in this repo. This is the tool-neutral version of the three code-review lenses shipped here; it is read by Claude Code, Cursor, GitHub Copilot, Windsurf, Gemini CLI, and other agents that honor the AGENTS.md standard.

## What this project is

A catalog of small, citable software-engineering rules plus three review "lenses" that apply them to new or just-written code. Every rule is one Markdown file with a **Cite as** tag, a principle, red flags, and an "apply directly vs propose only" split.

## The three lenses

When you write, modify, refactor, or review non-trivial code, act as the relevant lens(es). Apply the smallest behavior-preserving fix directly; propose anything that needs judgment. The author can override any fix.

- **Clean code:** naming, function/class size, abstraction layers, comments, error handling, duplication, coupling, cohesion, complexity, design smells.
- **Architecture & scalability:** SOLID, dependency rule, layering, bounded contexts, aggregates, repositories; partition keys, replication semantics, fan-out, idempotency, hot spots, distributed-monolith smells.
- **Test-driven development:** red → green → refactor. A failing test first, then the smallest change to pass, then refactor. Match the project's existing framework and conventions. For a bug, write the reproducing test first.

## Rule catalogs (load only what applies)

The canonical rules live under `rules/`:

| Catalog | Path | Files |
|---|---|---|
| Clean code | `rules/clean-code/` | 10 |
| Architecture & scalability | `rules/architecture-scalability/` | 37 + `_index.md` |
| Test-driven development | `rules/test-driven-development/` | 10 |

Do **not** load the whole catalog. Skim the code, decide which rules plausibly apply, and read only those. For architecture, read `rules/architecture-scalability/_index.md` first; it maps code shapes to the rule files that cover them.

> `rules/` is the single source of truth. The same rules are mirrored, with tool-specific frontmatter, into `.claude/rules/`, `.cursor/rules/`, `.github/instructions/`, and `.windsurf/rules/` by `scripts/sync-ai-rules.mjs`. Edit rules in `rules/` only, then re-run the script.

## How to act

1. Identify which lens(es) the change touches.
2. Open only the relevant rule files from the catalog.
3. For each violation: name the cited rule (e.g. `[SRP]`, `[Repository]`, `[Naming]`), then apply the smallest fix or propose it. Verify renames across all call sites.
4. Cite the rule tag in your explanation so the reasoning is traceable.

## Limits

- Behavior-preserving fixes only, unless the user explicitly asked for a semantic change.
- Don't refactor wholesale, run destructive commands, or review pre-existing code unless asked. Focus on new, just-written, or about-to-be-committed code.
- TDD: never add functionality without a failing test first.
- **Sub-agents are a Claude Code feature.** Only Claude Code can fan out to parallel auditor sub-agents and run the orchestrated `/review`. On every other tool, run the lenses yourself sequentially; there is no fan-out.

## Per-tool entry points

- **Claude Code:** `.claude/agents/*` (proactive sub-agents) and `.claude/commands/review.md` (`/review`).
- **Cursor:** `.cursor/rules/*-auditor.mdc` and `.cursor/rules/review.mdc`.
- **GitHub Copilot:** `.github/copilot-instructions.md` and `.github/prompts/review.prompt.md`.
- **Windsurf:** `.windsurf/rules/*-auditor.md` and `.windsurf/workflows/review.md`.
