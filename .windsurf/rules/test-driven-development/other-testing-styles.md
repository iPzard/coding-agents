---
trigger: model_decision
description: "Other testing styles worth recognizing: Example-based tests (one input → one expected output) are the default and cover most needs. Recognize three other sty…"
---

# Other testing styles worth recognizing

Example-based tests (one input → one expected output) are the default and cover most needs. Recognize three other styles and recommend them only when the situation actually fits.

## Property-based tests

The framework generates many random inputs and checks an invariant that should hold for all of them. Examples of invariants:

- Sorting twice gives the same result as sorting once.
- Encoding then decoding round-trips to the original value.
- For any non-empty list, the maximum is at least the average.
- For any two non-negative numbers, addition is commutative.

**When to recommend:** the caller can state a rule that must hold across an entire input space — parsers, serializers, codecs, math, data-structure operations, business rules with clear invariants.

**Don't shoehorn** property-based tests into a problem with no real invariant. If the only "property" you can think of is restating the implementation, write an example-based test instead.

**Frameworks:** QuickCheck (Haskell, ports for many languages), Hypothesis (Python), proptest / quickcheck (Rust), fast-check (JavaScript / TypeScript), jqwik (Java), ScalaCheck (Scala), Hedgehog (Haskell / F# / Scala), gopter (Go).

## Snapshot tests

The framework records the output of a function on first run and asserts equality with the recorded snapshot on subsequent runs.

**When to recommend:** stable serialized outputs — rendered markup, error messages, generated code, schema documents, formatter output, complex configuration objects.

**Risk:** snapshots regenerate mechanically. Reviewers must read the diff each time one changes. Use sparingly, only for high-value stable outputs.

**Don't reach for** snapshot tests when a direct equality assertion would do. They are not a shortcut around naming what you're verifying.

**Frameworks:** Jest, Vitest, insta (Rust), Swift Testing, ApprovalTests (multiple languages).

## Mutation tests

A separate tool deliberately mutates the production code (changes `+` to `-`, drops a branch, replaces a constant) and reports which mutations the test suite failed to catch. Surviving mutants reveal weak coverage.

**When to recommend:** as an occasional suite-quality audit, not on every commit. The signal is "where is my coverage thin?" — not "did this change break the build?"

**Tools:** Stryker (JavaScript / TypeScript / C#), mutmut / cosmic-ray (Python), PIT (Java), cargo-mutants (Rust), Pitest (Java/Scala/Kotlin), go-mutesting (Go).
