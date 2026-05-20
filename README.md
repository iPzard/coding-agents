# 🤖 Clean-Code Agents for Claude Code

[![Claude Code](https://img.shields.io/badge/Claude_Code-subagents-704cb6?style=for-the-badge)](https://docs.claude.com/en/docs/claude-code/sub-agents)
[![Agents](https://img.shields.io/badge/agents-3-704cb6?style=for-the-badge)](#-whats-inside)
[![Rules](https://img.shields.io/badge/rule_files-57-704cb6?style=for-the-badge)](#-rule-catalogs)
[![Language](https://img.shields.io/badge/language-agnostic-704cb6?style=for-the-badge)](#-how-it-works)

> Three proactive Claude Code review agents — **clean code**, **scalable architecture**, and **test-driven development** — each backed by a catalog of bite-sized, citable rules distilled from the canonical software-engineering books.

They are language-agnostic and drop into the `.claude/` folder of any project. No build step, no dependencies — just Markdown that Claude Code reads.

<br>

## 🧠 What's inside

Each agent reviews newly written or about-to-be-committed code, flags violations against a named rule, **applies the mechanical fixes directly**, and proposes the ones that need your judgment.

| Agent | What it does | Fires when… | Tools |
|---|---|---|---|
| `clean-code-auditor` | Naming, function/class size, abstraction layers, comments, error handling, duplication, coupling, complexity, design smells. | You just wrote or refactored non-trivial code. | `Read` `Edit` `Grep` `Glob` |
| `architecture-scalability-auditor` | Clean-architecture **and** scalability: SOLID, dependency rule, bounded contexts, aggregates, layering, partition keys, replication, fan-out, idempotency, distributed-monolith smells. | New code lands, especially before a commit. | `Read` `Edit` `Grep` `Glob` |
| `test-driven-development-auditor` | Writes failing tests first, then production code (red → green → refactor). Reviews existing tests for the classic problems. | You implement, modify, or bug-fix production code. | `Read` `Write` `Edit` `Grep` `Glob` `Bash` |

> All three run on the `opus` model and **load only the rule files a given task needs** — never the whole catalog.

<br>

## 📚 Rule catalogs

Every rule is one small Markdown file with a stable **cite-as** tag, a principle, red flags, and an "apply directly vs propose only" split. Agents pull just the relevant files per review.

| Catalog | Path | Files |
|---|---|---|
| Clean code | `.claude/rules/clean-code/` | 10 |
| Architecture & scalability | `.claude/rules/architecture-scalability/` | 37 rules + `_index.md` |
| Test-driven development | `.claude/rules/test-driven-development/` | 10 |

> ⚠️ The architecture catalog is large, so it ships an `_index.md` the agent reads first to pick which rules apply. The two smaller catalogs are listed inline in their agent's prompt.

<br>

## 🗂️ Layout

```text
.claude/
├── agents/
│   ├── architecture-scalability-auditor.md
│   ├── clean-code-auditor.md
│   └── test-driven-development-auditor.md
├── commands/
│   └── review.md                       # the /review orchestrator
└── rules/
    ├── architecture-scalability/       # 37 rules + _index.md
    ├── clean-code/                     # 10 rules
    └── test-driven-development/         # 10 rules
```

<br>

## 🚀 Usage

### Drop into a project

Copy the three folders into the target project's `.claude/` (create it if absent):

```bash
cp -r .claude/agents .claude/rules .claude/commands /path/to/your-project/.claude/
```

That's it — Claude Code discovers agents, rules, and commands automatically on its next run.

### Let the agents trigger themselves

The agents are **proactive**: Claude Code routes to them on its own when it detects matching work. You can also call one explicitly.

```text
# proactive — Claude picks the right auditor
"Review the OrderService I just wrote before I commit."

# explicit — name the agent and the target
"Use the clean-code-auditor on src/payments/refund.ts"
```

### One-shot, all-lens review — `/review`

`/review` runs **all three auditors in a single pass**, dedupes overlapping findings, applies the safe fixes centrally, and prints one unified report. (Subagents can't call subagents, so the command orchestrates from the main thread and runs the auditors read-only to avoid edit collisions.)

```text
/review                 # uncommitted changes vs HEAD (default)
/review staged          # only staged files
/review src/payments    # a specific path or glob
/review all             # the whole tracked source tree
```

<br>

## 🧰 Use with other AI tools

The rules are tool-agnostic, so the same catalog is mirrored into the native format of other AI coding tools. Grab whichever folder fits your tool — each is self-contained.

| Tool | Folder | Entry points |
|---|---|---|
| Claude Code | `.claude/` | sub-agents in `agents/`, `/review` in `commands/` |
| Cursor | `.cursor/` | `*-auditor.mdc` + `review.mdc` |
| GitHub Copilot | `.github/` | `copilot-instructions.md` + `prompts/review.prompt.md` |
| Windsurf | `.windsurf/` | `*-auditor.md` + `workflows/review.md` |
| Any (neutral) | `AGENTS.md` | single root file, read by all AGENTS.md-aware agents |

**`.claude/rules/` is the single source of truth.** The per-tool rule catalogs are generated from it:

```bash
node scripts/sync-ai-rules.mjs   # regenerate .cursor, .github, .windsurf rule catalogs
```

Edit a rule in `.claude/rules/**`, re-run the script, and every tool folder updates. The hand-authored auditor/command files in each folder are not touched by the script.

> ⚠️ **Sub-agents are Claude-Code-only.** Proactive auto-routing and the parallel, orchestrated `/review` fan-out exist only under `.claude/`. On every other tool the lenses run sequentially and are invoked explicitly — same rules and findings, no fan-out. See each folder's `README` for specifics.

<br>

## ⚙️ How it works

- **Lazy rule loading.** An agent maps the code in front of it to rule triggers, then reads only those files — fast, cheap, focused.
- **Fix vs propose.** Each rule file marks which fixes are *mechanical* (applied in place via `Edit`) and which *need judgment* (reported, not guessed). You can override any applied fix.
- **Cited findings.** Every finding names the rule it came from, so the reasoning is traceable to a source.
- **Safe orchestration.** `/review` fans out read-only, merges findings (architecture owns structural calls, clean-code owns local craft on overlaps), then applies fixes one at a time.

<br>

## 🧩 Extending

- **Add a rule:** drop a new `.md` into the matching catalog. For the architecture catalog, also add a row to `_index.md` so the agent can find it.
- **Add an agent:** create `.claude/agents/<name>.md` with `name` / `description` / `tools` / `model` front-matter, then mirror the shared section spine: `## Rule files — load only what applies` → workflow → `## Output format` → `## Stop conditions` → `## What you do NOT do` → `## Self-checklist before declaring done`.
- **Keep agents single-purpose.** One responsibility per agent; let `/review` compose them.

<br>

## 📖 Source material

The rules distill principles from these books, grouped by the agent they feed.

**`clean-code-auditor` — Clean Code & Software Craftsmanship**
- *Clean Code* — Robert C. Martin — naming, functions, code smells
- *The Pragmatic Programmer* — Hunt & Thomas — broad principles every developer should know
- *Refactoring* — Martin Fowler — how to safely improve existing code
- *Code Complete* — Steve McConnell — comprehensive construction guide
- *A Philosophy of Software Design* — John Ousterhout — managing complexity (a thoughtful counterpoint to *Clean Code*)

**`architecture-scalability-auditor` — Architecture & Scalability**
- *Clean Architecture* — Robert C. Martin — dependency rules and layering
- *Designing Data-Intensive Applications* — Martin Kleppmann — databases, distributed systems, scalability
- *Domain-Driven Design* — Eric Evans (with *Implementing DDD* — Vaughn Vernon — as a practical companion)
- *Software Architecture: The Hard Parts* and *Fundamentals of Software Architecture* — Mark Richards & Neal Ford
- *Patterns of Enterprise Application Architecture* — Martin Fowler

**`test-driven-development-auditor` — Test-Driven Development**
- *Test-Driven Development by Example* — Kent Beck — the original TDD book
- *Growing Object-Oriented Software, Guided by Tests* — Freeman & Pryce — practical outside-in TDD
- *xUnit Test Patterns* — Gerard Meszaros — deep reference on test design
- *Working Effectively with Legacy Code* — Michael Feathers — adding tests to untested code

<br>

## 🦟 Bugs

Spot an agent misfiring; a wrong fix, a missed violation, a rule that cites the wrong thing? Bugs reported on the project's [issues page](https://github.com/iPzard/coding-agents/issues) will be exterminated as quickly as possible, be sure to include steps to reproduce so they can be spotted easily.
