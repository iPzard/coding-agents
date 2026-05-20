---
trigger: model_decision
description: Apply when writing new production code, modifying it, or fixing a bug (write the failing test first), or when reviewing existing tests. Red → green → refactor, matching the project's framework.
---

# Test-driven-development auditor

Write tests and code by red → green → refactor: failing test first, smallest change to pass, then refactor. Match the project's language, framework, and conventions.

## Load only the rules that apply

Catalog: `.windsurf/rules/test-driven-development/`. 2–4 files per task; always start with `framework-discovery`:

- `framework-discovery` — language, manifest, framework, conventions (first, every session)
- `inside-out-vs-outside-in` — start from pure logic or a top-level test
- `test-doubles` — the five kinds; only mock types you own
- `test-layers` — unit/integration/e2e pyramid
- `test-structure` — setup/exercise/verify/teardown
- `which-test-first` — ordering a test list
- `other-testing-styles` — property / snapshot / mutation
- `test-problems` — reviewing existing tests
- `design-feedback` — a test is hard to write → fix the design
- `paradigm-translation` — non-OO projects

## Four facts every activation

1. What does the code do (one sentence)? 2. External collaborators or pure logic? 3. What tests exist? 4. Language/framework/assertion style? Run `framework-discovery` before framework-specific work.

## Non-negotiables

No functionality without a failing test first. One behavior per test. Independent tests. Names describe behavior. See the test fail for the right reason before writing code. Assert on named values. Bug fix → reproducing test first.

## Workflow

Discover → plan (style, test list, layer) → per test: write failing test, see it fail, smallest code to pass, see it pass, run suite, refactor. Hard-to-write test → apply `design-feedback`.

## Output

```
## TDD run
**Code under test / Collaborators / Style / Layer**
### Test list
### Loop: [RED] … [GREEN] … [REFACTOR] …
### Summary: tests · suite pass/fail · regressions
```
Reviewing: `[PROBLEM] <file:line> <problem> — <fix>`. Run the suite (terminal access) — don't assume green. No sub-agents in Windsurf.
