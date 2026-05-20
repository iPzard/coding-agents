# Test problems to watch for

When reviewing tests, scan for these. Describe the problem plainly, explain why it matters, propose a specific fix.

## Problems visible reading the test

- **Unclear intent** — you can't tell at a glance what behavior is being verified. Usually a symptom of one of the next four problems.
- **Hidden inputs** — the test depends on data from an external file, database, or shared fixture that isn't visible in the test body. Cause and effect are hidden. Fix: inline the relevant fixture data, or use evocatively-named helper functions that make the input visible.
- **Too many behaviors per test** — verifies several distinct behaviors in one test. Fix: split into one test per behavior.
- **Over-built fixture** — setup builds more than the test needs. Reader can't tell which fixture pieces matter. Fix: build only what this test needs, or use helpers that take only the relevant parameters.
- **Irrelevant values** — the test passes specific values for things that don't affect the outcome. Reader can't tell signal from noise. Fix: use defaulted helpers and pass only the values that drive this test's behavior.
- **Unexplained literals** — literal values scattered through the test with no explanation. Fix: named constants, or derived values (`expected = principal * (1 + rate)`).
- **Testing through too many layers** — the test exercises the unit through another layer or wrapper (testing business logic via the user interface or the network layer, for example). Fix: extract the testable logic into its own pure unit the test can hit directly.
- **`if` / `for` / `while` inside a test** — the test now has multiple execution paths and isn't deterministic. Fix: split into multiple tests, or use the framework's parameterized-test feature if you really have the same logic over a data set.
- **Repeated setup across tests** — same setup duplicated across tests. Fix: extract helper functions (not by sharing fixture state across tests).
- **Many bare assertions with no way to tell which failed** — Fix: use per-assertion messages, split the test, or write a single combined assertion (or custom matcher) with a meaningful name.

## Problems visible when tests run

- **Tests break for unrelated reasons.** Sub-causes: tests coupled to function or method signatures, over-specified mocks, dependence on specific data values in a shared database, dependence on time / environment / hostname / locale / randomness.
- **Flaky tests.** Fail intermittently. Sub-causes: one test leaves state another reads; parallel runs collide on shared state; the test uses a non-deterministic value such as the current time or a random number directly (instead of receiving a clock or seeded random source as a parameter); the test assumes a file, port, or service is available.
- **Slow tests.** When the whole unit-test suite takes more than about ten seconds — or any single unit test takes more than a fraction of a second — developers stop running tests locally and feedback collapses. Fix: replace expensive collaborators with fakes; move tests that genuinely need an external system into a separate integration suite.

## Project-level problems (manager-visible)

- **Bugs in production despite a green test suite** → missing tests, untested branches, or tests that don't test what they claim. Treat each one as a missing test; write the reproducing test first.
- **High test maintenance cost** → tests too coupled to implementation. Refactoring production code requires rewriting tests every time.
- **Developers stopped writing tests** → the discipline has broken. Usually because the tests have grown unclear or slow.
