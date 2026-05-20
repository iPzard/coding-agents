---
description: "Test layers — many fast, few slow: A healthy test suite is a pyramid, not a square or an inverted triangle. From wide and fast at the bottom to narrow and sl…"
globs:
alwaysApply: false
---

# Test layers — many fast, few slow

A healthy test suite is a pyramid, not a square or an inverted triangle. From wide and fast at the bottom to narrow and slow at the top.

## The layers

- **Unit tests** — fast (microseconds to a few milliseconds each), in-process, no external systems. Most tests live here. Test pure logic, single units, and units with their collaborators replaced by doubles.
- **Integration tests** — slower (tens to hundreds of milliseconds), exercise one adapter or boundary against a real or near-real external system (real database, in-memory message bus, local file system, fake network server). Far fewer than unit tests. Their job: verify the wire-protocol or driver behavior that unit tests with doubles cannot.
- **End-to-end tests** — slowest (seconds), exercise the whole system through its outermost interface against real or production-like infrastructure. Very few — single digits to low tens. Their job: prove the pieces wire together. Never use them to verify branches of business logic; that's what unit tests are for.

## Layer-choice rule

When deciding "what kind of test should I write here?" — pick the fastest layer that could plausibly fail for the bug you're trying to prevent. If a unit test can express the behavior, prefer it. Only climb to integration or end-to-end when the lower layer cannot exercise what you need.

## Diagnosing imbalance

- **Inverted pyramid** (mostly end-to-end, few unit tests) → slow suite, flaky failures, hard to localize bugs. Push behavior down: extract pure logic into units that can be tested directly without crossing boundaries.
- **Hourglass** (lots of unit, lots of end-to-end, nothing in the middle) → adapters are untested in isolation. Add integration tests for each adapter (database, message queue, third-party service wrapper).
- **Tower of doubles** (everything mocked, no integration tests) → unit tests pass but the system breaks in production because no test ever ran the real wiring. Add at least one integration test per adapter.

## Speed budgets

- A single unit test: under a fraction of a second.
- The full unit-test suite: under ten seconds locally. If it crosses thirty seconds, developers stop running it and feedback collapses.
- Integration tests: seconds each is acceptable, but isolate them into a separate suite that runs less often than the unit suite.
- End-to-end tests: live in their own suite that runs in continuous integration, not on every save.
