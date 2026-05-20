# Test structure — four phases

Every test follows this structure. Comment the phases when the structure isn't obvious from spacing.

```
1. Setup     — build the data the test needs; create dependencies; install doubles.
2. Exercise  — invoke the code under test (call the function or method, or
                process the input).
3. Verify    — assert on the outcome (return value, captured calls, or
                observable state change).
4. Teardown  — release any external resources. Often automatic via garbage
                collection, scope-based cleanup (Rust `Drop`, C++ destructors,
                Python `with`-statements), or the framework's teardown hook
                (`pytest` fixtures, `@AfterEach`, `afterEach`, `t.Cleanup`,
                `after`, `on_exit`, etc.).
```

## Warning signs

- If a test has setup-exercise-verify-exercise-verify-exercise-verify, it is checking multiple behaviors disguised as one test. Split it.
- If you can't tell where setup ends and exercise begins, the test is unclear. Extract setup into a helper function named for what it produces — match the project's casing convention (`aValidCustomer()`, `a_valid_customer()`, `given_an_empty_cart()`, `givenAnEmptyCart()`, etc.).
- If verify has more than a handful of assertions, the test is checking too much. Each test should have a small number of assertions that together describe one coherent behavior.

## Setup style

Prefer setup that is visible inside the test method ("inline setup") for one-off tests. Extract to a helper when the same setup recurs across tests in the file. Avoid shared mutable fixtures that persist across tests — they create order dependencies and erratic failures.

## Verify style

- Name the values: prefer `assertEquals(expected, actual)` / `assert_eq!(actual, expected)` / `expect(actual).toEqual(expected)` over `assertTrue(result)`.
- For collections, use a structural assertion (`assertEqual(list, [1, 2, 3])`, `assert_eq!(vec, vec![1, 2, 3])`) rather than asserting length and elements separately.
- For interaction-style tests, the spy or mock's recorded calls *are* the assertion. Make sure the verification step is explicit.
