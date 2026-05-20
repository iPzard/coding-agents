# Windsurf: clean-code / architecture / TDD rules

Windsurf port of the three review lenses. Grab this `.windsurf/` folder (plus keep `AGENTS.md` for the neutral fallback) and drop it into your project.

## Layout

```
.windsurf/
├── rules/
│   ├── clean-code-auditor.md                 # the three lenses (hand-authored)
│   ├── architecture-scalability-auditor.md
│   ├── test-driven-development-auditor.md
│   ├── clean-code/                           # rule catalog (generated)
│   ├── architecture-scalability/            # rule catalog (generated, incl. _index)
│   └── test-driven-development/              # rule catalog (generated)
└── workflows/
    └── review.md                             # /review: combined one-pass review
```

## How it works here

- The three auditor rules use `trigger: model_decision`. Cascade pulls one in when its description matches the task. The catalog files use the same trigger, so each lens reads only the rules relevant to the code.
- `workflows/review.md` is invoked as `/review` in Cascade and runs all three lenses sequentially, then reports once.

## What survives, what degrades

- **Survives:** all rules, all three lenses, citable fix-vs-propose, a combined `/review`.
- **Degrades:** Windsurf has **no sub-agents**: no proactive auto-routing, no parallel fan-out. Lenses run sequentially.
- **Char limits:** Windsurf caps rules at 6,000 chars/file and 12,000 chars across all *active* rules. Each rule here is well under the per-file cap, and `model_decision` keeps only relevant rules active, so the total cap is unlikely to bite, but if you switch many rules to `always_on`, you can blow the budget.

## Editing rules

Don't hand-edit the generated catalog subdirs. Edit `rules/**` at the repo root (the source of truth) and re-run `node scripts/sync-ai-rules.mjs`.
