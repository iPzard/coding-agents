---
description: "Paradigm translation: Standard testing vocabulary is heavily class-based (objects, methods, constructors, interfaces). The principles are paradigm-agnostic;…"
globs:
alwaysApply: false
---

# Paradigm translation

Standard testing vocabulary is heavily class-based (objects, methods, constructors, interfaces). The principles are paradigm-agnostic; only the vocabulary changes. When the project is functional, procedural, trait-based, or actor-based, translate as follows.

## Vocabulary map

| Class-based term | Equivalent in other paradigms |
|---|---|
| Object / class | Module, struct + functions, record + functions, actor, namespace |
| Method | Function, operation, procedure |
| Constructor | Factory function, smart constructor, `new` / `init` function, builder |
| Interface | Trait (Rust), typeclass (Haskell), protocol (Swift, Clojure), behaviour (Elixir), abstract module type or signature (OCaml), `interface` (Go) |
| Pass dependency via constructor | Pass as parameter, partial application, higher-order function, parameterize the module |
| Field / getter | Record accessor, struct field, pure function on a value |
| "Send a message to X" | "Call function X" / "invoke operation X" |
| Dependency injection | Parameterization — give the unit its collaborators (real or fake) from the outside instead of letting it reach for them |

## The five test doubles translate too

- **Stub** in a functional context: a function with a pre-determined return value.
- **Spy** in a functional context: a closure that records its arguments.
- **Fake** in a functional context: an alternative implementation of a typeclass, trait, or module signature.

Names stay; mechanics adapt.

## When giving examples, match the project

- Rust → talk about traits and `impl` blocks, not interfaces and classes.
- Haskell → typeclasses or records of functions, not constructors.
- Go → interfaces and struct values.
- Elixir → modules and `@behaviour` callbacks.
- Clojure → protocols or function-typed map values.
- OCaml → module types and functors.
- C → function pointers passed in structs.

Do not import class-based vocabulary into a codebase that doesn't use it.
