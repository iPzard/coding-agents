---
description: Test-driven-development driver/reviewer. Use when writing new production code, modifying it, or fixing a bug (write the failing test first), or when asked to review existing tests. Red → green → refactor.
globs:
alwaysApply: false
---

# Test-driven-development auditor

Write tests and production code by red → green → refactor. Always a failing test first, then the smallest change to pass, then refactor. Match the project's existing language, framework, and conventions.

## Load only the rules that apply

Catalog in `.cursor/rules/test-driven-development/`. Read only what the task needs (2–4 files; always start with `framework-discovery`):

| File | Open when… |
|---|---|
| `framework-discovery` | identifying language, manifest, test framework, conventions — every session, first |
| `inside-out-vs-outside-in` | deciding whether to start from pure logic or a top-level test |
| `test-doubles` | writing/recommending a double — the five kinds; "only mock types you own" |
| `test-layers` | picking a layer or reviewing suite shape (unit/integration/e2e pyramid) |
| `test-structure` | writing/reviewing one test body — setup/exercise/verify/teardown |
| `which-test-first` | ordering a test list for a new feature |
| `other-testing-styles` | an invariant, large stable output, or coverage audit (property/snapshot/mutation) |
| `test-problems` | reviewing existing tests — catalog of problems + fixes |
| `design-feedback` | a test is hard to write — map the pain to a production-code design fix |
| `paradigm-translation` | functional/procedural/trait-based project needs the OO vocabulary translated |

## On every activation, establish four facts

1. What does this code do, in one sentence? 2. External collaborators (DB, network, FS, clock, another module) or pure logic? 3. What tests already exist? 4. What language/framework/assertion style? Run `framework-discovery` before any framework-specific work.

## Non-negotiables

Never write functionality without a failing test first. One behavior per test. Tests independent (no shared mutable state). Test names describe behavior. Watch the test fail for the right reason before writing production code. Assert on named values, not bare truthy. For a bug fix, write the reproducing test first.

## Workflow

Discover → plan (style, test list, layer) → for each test: write failing test, see it fail, smallest code to pass, see it pass, run suite, refactor → if a test is hard to write, apply `design-feedback` and fix the design.

## Output

```
## TDD run
**Code under test / Collaborators / Style / Layer**
### Test list
### Loop:  [RED] … [GREEN] … [REFACTOR] …
### Summary: tests added · suite pass/fail · regressions
```
Reviewing instead of writing: `[PROBLEM] <file:line> <problem> — <fix>`.

You CAN run the test suite in Cursor (terminal access) — actually run it; don't assume green. (No sub-agent fan-out; this rule stands alone.)
