---
trigger: model_decision
description: "Framework discovery: Run this discovery once per session before writing any framework-specific code. Goal: identify the language, the test framework, the ass…"
---

# Framework discovery

Run this discovery once per session before writing any framework-specific code. Goal: identify the language, the test framework, the assertion style, the test-double library, and the file-layout convention. Match what exists; do not impose anything new.

## Step 1 — identify the language and manifest

Look for a project manifest in the repo root. The presence of one of these files identifies the language:

| Manifest | Language | Common test frameworks |
|---|---|---|
| `package.json` (`devDependencies`) | JavaScript / TypeScript | Jest, Vitest, Mocha, AVA, Tap, Playwright |
| `pyproject.toml`, `setup.py`, `setup.cfg`, `requirements*.txt`, `Pipfile`, `pytest.ini`, `tox.ini` | Python | pytest, unittest, nose2 |
| `go.mod` | Go | standard `testing`, testify, gomock, ginkgo |
| `Cargo.toml` (`[dev-dependencies]`) | Rust | built-in `#[test]`, proptest, mockall, insta |
| `pom.xml`, `build.gradle`, `build.gradle.kts` | Java / Kotlin | JUnit 4/5, TestNG, Mockito, AssertJ, Kotest, MockK |
| `Gemfile`, `Gemfile.lock` | Ruby | RSpec, Minitest |
| `composer.json` | PHP | PHPUnit, Pest |
| `*.csproj`, `*.fsproj`, `*.sln` | C# / F# / VB.NET | xUnit, NUnit, MSTest |
| `mix.exs` | Elixir | ExUnit |
| `rebar.config` | Erlang | EUnit, Common Test |
| `*.cabal`, `package.yaml`, `stack.yaml` | Haskell | HSpec, Tasty, HUnit, QuickCheck |
| `dune-project`, `*.opam` | OCaml | Alcotest, OUnit |
| `build.sbt`, `build.mill` | Scala | ScalaTest, MUnit, Specs2, ScalaCheck |
| `deps.edn`, `project.clj` | Clojure | `clojure.test`, Kaocha |
| `Package.swift`, `*.xcodeproj` | Swift | XCTest, Swift Testing |
| `CMakeLists.txt`, `Makefile`, `meson.build`, `conanfile.txt` | C / C++ | GoogleTest, Catch2, Boost.Test, Unity, doctest |
| `pubspec.yaml` | Dart / Flutter | `test`, `flutter_test` |
| `*.rockspec` | Lua | busted |
| `bats/`, `*.bats` | Shell | bats |

If the manifest is missing, ask the caller.

## Step 2 — find the test directory and layout

Look for tests in these locations:

- `test/`, `tests/`, `spec/`, `Tests/`, `t/`
- `__tests__/` (JavaScript / TypeScript convention)
- Alongside sources, named `*_test.*`, `*.test.*`, `*.spec.*`
- `src/` with `#[cfg(test)]` modules (Rust)
- Doctests inside source comments (Rust, Python)

Note the location and naming pattern. New tests must match.

## Step 3 — read at least two existing tests

Open two real test files and learn:

- Naming convention (camelCase, snake_case, descriptive strings, behavior-driven `describe`/`it` blocks, etc.)
- Assertion library and matcher style
- Fixture / setup style (constructor, `beforeEach`, fixtures, helper functions, builders)
- Test-double library and the project's loose-or-strict mocking style
- File layout (one file per production source, one file per behavior, grouped by feature, etc.)

If there are no existing tests, ask the caller which conventions to follow, or pick the most common ones for the framework and call out the choice.

## Step 4 — confirm before proceeding

State briefly what you found: "Project is X with framework Y, tests live in Z, conventions are ABC." Only then begin work.
