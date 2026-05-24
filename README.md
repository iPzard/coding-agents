# 🤖 Code Quality Agents for AI Coding Tools

[![AOI](https://img.shields.io/badge/aio-AI_tools-704cb6?style=for-the-badge)](#-supported-tools)
[![Language](https://img.shields.io/badge/language-agnostic-704cb6?style=for-the-badge)](#-how-it-works)

> Three code-review lenses (clean code, scalable architecture, and test-driven development), each backed by a catalog of bite-sized, citable rules distilled from the canonical software-engineering books. Drop them into Claude Code, Cursor, GitHub Copilot, Windsurf, or any AGENTS.md aware tool.

The rules are language-agnostic and need no build step or dependencies, just Markdown the tools read.

<br>

## 🧰 Supported tools

Copy the folder that matches your tool into your project (for the neutral option, copy the `AGENTS.md` file). Each folder is self-contained.

| Tool | Folder | Entry points | Combined review |
|---|---|---|---|
| Claude Code | `.claude/` | proactive sub-agents in `agents/` | `/review` command |
| Cursor | `.cursor/` | `*-auditor.mdc` rules | `review.mdc` |
| GitHub Copilot | `.github/` | `copilot-instructions.md` | `prompts/review.prompt.md` |
| Windsurf | `.windsurf/` | `*-auditor.md` rules | `workflows/review.md` |
| Any (neutral) | `AGENTS.md` | single root file, read by every AGENTS.md-aware agent | run the lenses inline |

> ⚠️ **Sub-agents are a Claude Code feature.** Only Claude Code auto-routes work to the right lens and runs the orchestrated `/review` as a parallel fan-out. On every other tool the lenses run sequentially and are invoked explicitly: same rules, same findings, no fan-out. See each folder's `README` for the specifics.

<br>

## 🧠 What's inside

Each lens reviews newly written or about-to-be-committed code, flags violations against a named rule, **applies the mechanical fixes directly**, and proposes the ones that need your judgment.

| Lens | What it checks | Reach for it when |
|---|---|---|
| Clean code | Naming, function/class size, abstraction layers, comments, error handling, duplication, coupling, complexity, design smells. | You just wrote or refactored non-trivial code. |
| Architecture & scalability | SOLID, dependency rule, bounded contexts, aggregates, layering; partition keys, replication, fan-out, idempotency, hot spots, distributed-monolith smells. | New code lands, especially before a commit. |
| Test-driven development | Failing test first, then production code (red → green → refactor); reviews existing tests for the classic problems. | You implement, modify, or bug-fix production code. |

In Claude Code each lens ships as a proactive sub-agent (`clean-code-auditor`, `architecture-scalability-auditor`, `test-driven-development-auditor`) on the `opus` model, with `Read` `Edit` `Grep` `Glob` (plus `Bash` for TDD). Other tools deliver the same lenses as native rule sets. Every lens **loads only the rule files a task needs**, never the whole catalog.

<br>

## 📚 Rule catalogs

Every rule is one small Markdown file with a stable **cite-as** tag, a principle, red flags, and an "apply directly vs propose only" split. A lens pulls just the relevant files per review.

| Catalog | Source path | Files |
|---|---|---|
| Clean code | `rules/clean-code/` | 10 |
| Architecture & scalability | `rules/architecture-scalability/` | 37 rules + `_index.md` |
| Test-driven development | `rules/test-driven-development/` | 10 |

> ⚠️ The architecture catalog is large, so it ships an `_index.md` the lens reads first to pick which rules apply. The two smaller catalogs are listed inline in each tool's auditor file.

These paths are the single source of truth. The same rules are mirrored into every tool catalog (`.claude/rules/`, `.cursor/rules/`, `.github/instructions/`, `.windsurf/rules/`), with tool-specific frontmatter, by the sync script.

<br>

## 🗂️ Layout

```text
.
├── rules/                         # source of truth (58 rule files)
│   ├── clean-code/                       # 10 rules
│   ├── architecture-scalability/         # 37 rules + _index.md
│   └── test-driven-development/          # 10 rules
├── .claude/                       # Claude Code: sub-agents, /review command, generated rules mirror
│   ├── agents/
│   ├── commands/                  # review.md (the /review orchestrator)
│   └── rules/                     # generated from rules/
├── .cursor/rules/                 # Cursor: *-auditor.mdc + review.mdc + generated catalogs
├── .github/                       # GitHub Copilot: copilot-instructions.md + prompts/ + generated instructions/
├── .windsurf/                     # Windsurf: *-auditor.md + workflows/ + generated rule catalogs
├── AGENTS.md                      # neutral, any AGENTS.md-aware tool
└── scripts/
    └── sync-ai-rules.mjs          # regenerates every tool's catalog from rules/
```

<br>

## 🚀 Install & use

Copy your tool's folder into the target project, then use it as below.

### Claude Code

The agents are **proactive**: Claude Code routes to them on its own when it detects matching work. You can also call one explicitly.

```text
# proactive: Claude picks the right auditor
"Review the OrderService I just wrote before I commit."

# explicit: name the agent and the target
"Use the clean-code-auditor on src/payments/refund.ts"
```

`/review` runs **all three auditors in a single pass**, dedupes overlapping findings, applies the safe fixes centrally, and prints one unified report. (Sub-agents can't call sub-agents, so the command orchestrates from the main thread and runs the auditors read-only to avoid edit collisions.)

```text
/review                 # uncommitted changes vs HEAD (default)
/review staged          # only staged files
/review src/payments    # a specific path or glob
/review all             # the whole tracked source tree
```

### Cursor, Copilot, Windsurf

- **Cursor** (`.cursor/`): rules auto-pull by description. Ask for a review ("review this for clean-code issues") or run the combined `review.mdc` pass.
- **GitHub Copilot** (`.github/`): `copilot-instructions.md` applies automatically; run a full pass with the `/review` prompt file.
- **Windsurf** (`.windsurf/`): rules pull on model decision; run the `/review` workflow for a full pass.

### Any AGENTS.md-aware tool

Copy `AGENTS.md` to the repo root. Supporting agents (Claude Code, Cursor, Copilot, Windsurf, Gemini CLI, and others) read it automatically and apply the lenses on demand.

<br>

## 📜 Script for syncing

`rules/` is canonical. After editing any rule, regenerate every tool's catalog:

> ⚠️ Requires [Node.js](https://nodejs.org/en/download/current) to run

```bash
node scripts/sync-ai-rules.mjs
```

It rewrites every tool's rule catalog (Claude Code, Cursor, Copilot, Windsurf) from the source, applying each tool's frontmatter. The hand-authored auditor, command, prompt, and workflow files are never touched, and you should not hand-edit the generated catalog subdirs.

<br>

## ⚙️ How it works

- **Lazy rule loading.** A lens maps the code in front of it to rule triggers, then reads only those files: fast, cheap, focused. Description-driven in Claude Code, Cursor, and Windsurf; Copilot applies its instruction files by glob.
- **Fix vs propose.** Each rule file marks which fixes are *mechanical* (applied in place) and which *need judgment* (reported, not guessed). You can override any applied fix.
- **Cited findings.** Every finding names the rule it came from, so the reasoning is traceable to a source.
- **One-pass review.** The combined review runs all three lenses and merges findings (architecture owns structural calls, clean code owns local craft on overlaps). Claude Code fans out to parallel sub-agents; other tools run the lenses sequentially.

<br>

## 🧩 Extending

- **Add a rule:** drop a new `.md` into the matching catalog under `rules/`. For the architecture catalog, also add a row to `_index.md`. Then run `node scripts/sync-ai-rules.mjs` to propagate it to every tool.
- **Add a lens:** create the Claude sub-agent in `.claude/agents/<name>.md` (with `name` / `description` / `tools` / `model` front-matter and the shared section spine: rule-loading, workflow, `## Output format`, `## Stop conditions`, `## What you do NOT do`, `## Self-checklist before declaring done`), then mirror it into each tool folder and `AGENTS.md`.
- **Keep lenses single-purpose.** One responsibility each; let the combined review compose them.

<br>

## 📖 Source material

The rules distill principles from these books, grouped by the lens they feed.

**Clean code & software craftsmanship**
- *Clean Code*, Robert C. Martin: naming, functions, code smells
- *The Pragmatic Programmer*, Hunt & Thomas: broad principles every developer should know
- *Refactoring*, Martin Fowler: how to safely improve existing code
- *Code Complete*, Steve McConnell: comprehensive construction guide
- *A Philosophy of Software Design*, John Ousterhout: managing complexity (a thoughtful counterpoint to *Clean Code*)

**Architecture & scalability**
- *Clean Architecture*, Robert C. Martin: dependency rules and layering
- *Designing Data-Intensive Applications*, Martin Kleppmann: databases, distributed systems, scalability
- *Domain-Driven Design*, Eric Evans (with *Implementing DDD*, Vaughn Vernon, as a practical companion)
- *Software Architecture: The Hard Parts* and *Fundamentals of Software Architecture*, Mark Richards & Neal Ford
- *Patterns of Enterprise Application Architecture*, Martin Fowler

**Test-driven development**
- *Test-Driven Development by Example*, Kent Beck: the original TDD book
- *Growing Object-Oriented Software, Guided by Tests*, Freeman & Pryce: practical outside-in TDD
- *xUnit Test Patterns*, Gerard Meszaros: deep reference on test design
- *Working Effectively with Legacy Code*, Michael Feathers: adding tests to untested code

<br>

## 🦟 Bugs

Bugs reported on the project's [issues page](https://github.com/iPzard/coding-agents/issues) will be exterminated as quickly as possible, be sure to include steps to reproduce so they can be spotted easily.

<br>

## 🏷️ License
MIT © [iPzard](https://github.com/iPzard/coding-agents/blob/master/LICENSE)
