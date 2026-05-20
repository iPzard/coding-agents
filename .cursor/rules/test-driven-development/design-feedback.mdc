---
description: "Listen to the tests — design feedback: A test that's hard to write is the code telling you the design is wrong. Don't work around it with tricks. Fix the des…"
globs:
alwaysApply: false
---

# Listen to the tests — design feedback

A test that's hard to write is the code telling you the design is wrong. Don't work around it with tricks. Fix the design.

## Tricks to refuse

- Monkey-patching imports.
- Byte-code rewriting of statics.
- Mocking the framework's clock module.
- Reflection or unsafe casts to reach private fields.
- Conditional-compilation flags that only exist for tests.
- Build-time link-substitution to swap symbols.

If you find yourself reaching for one of these, stop and look at the production code.

## Test pain → production-code problem

| When the test pain is… | The production-code problem is… |
|---|---|
| "I have to substitute a double for a static, global, singleton, or current-time call (`Date.now`, `datetime.now`, `time.Now`, `System.currentTimeMillis`, `Time.now`, `Instant::now`, `getCurrentTime`, `DateTime.utc_now`)." | Hidden dependency. Make it explicit: pass a clock or time function in as a parameter. |
| "The constructor / factory / initializer takes eight things and I have to fake seven of them." | Too many parameters. Either group related arguments into a single domain concept, or the unit has too many responsibilities — split it. |
| "I had to write 200 lines of setup to test one thing." | The unit is too coupled to its environment. Find a smaller seam. |
| "I have to reach into private state to test this." | The unit has multiple concerns; extract the part you actually want to test into something with a public surface. |
| "My tests need to substitute doubles for concrete types." | You don't have an abstraction where you need one. Extract one — whatever your language offers. Also a hint you don't own the type — wrap it. |
| "I have so many expectations the test is unreadable." | Too many collaborators, or you're over-specifying. Use stubs for the inputs you need to control; reserve mock expectations for the one or two outputs that actually matter. |
| "Logging clutters every function." | Support logging (for operations) is a feature; pass in a notifier or logger as a parameter. Diagnostic logging (for the programmer reading the code) doesn't need tests at all. |

## Stating the fix concretely

Don't say "improve the design." Say what to change. The advice is the same across languages; the spelling is local. Examples:

- In a class-based project: "Extract a `Clock` interface, accept it in the constructor, use a system clock in production and a stub in tests."
- In Rust: "Introduce a `Clock` trait, accept `impl Clock` or a generic parameter, and implement it twice."
- In Haskell: "Take an `IO UTCTime` action as an argument, or move to a `MonadTime` typeclass so tests can supply a pure replacement."
- In Go: "Accept a `func() time.Time` or a small `Clock` interface."

Match the project's idiom. Whatever the language offers for parameterizing a dependency, that's the right shape of the fix.
