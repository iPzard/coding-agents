# Cursor — clean-code / architecture / TDD rules

Cursor port of the three review lenses. Grab this `.cursor/` folder (plus keep `AGENTS.md` if you want the neutral fallback) and drop it into your project.

## Layout

```
.cursor/rules/
├── clean-code-auditor.mdc                 # the three lenses (hand-authored)
├── architecture-scalability-auditor.mdc
├── test-driven-development-auditor.mdc
├── review.mdc                             # combined one-pass review
├── clean-code/                            # rule catalog (generated)
├── architecture-scalability/             # rule catalog (generated, incl. _index)
└── test-driven-development/               # rule catalog (generated)
```

## How it works here

- The four top-level `*.mdc` files are **Agent Requested** rules (`alwaysApply: false`, description-driven). Cursor pulls one in when its description matches what you're doing — e.g. ask it to "review this for clean-code issues" or "do a full review".
- The catalog files are also Agent Requested: each auditor reads only the rule files relevant to the code in front of it, mirroring the original lazy-loading design.

## What survives, what degrades

- **Survives:** all rules, all three lenses, the citable fix-vs-propose workflow, a combined `review` pass.
- **Degrades:** Cursor has **no sub-agents**, so there is no proactive auto-routing and no parallel fan-out. You invoke a lens by asking for it; `review.mdc` runs the three lenses sequentially in one pass rather than orchestrating sub-agents.

## Editing rules

Don't hand-edit the generated catalog subdirs. Edit `.claude/rules/**` (the source of truth) and re-run `node scripts/sync-ai-rules.mjs`.
