---
description: "Code obviousness: - Code is obvious if a reader can guess what it does quickly and be correct without having to study it. Whether code is obvious is decided…"
globs:
alwaysApply: false
---

# Code obviousness

- Code is obvious if a reader can guess what it does quickly and be correct without having to study it. Whether code is obvious is decided by the reader trying to understand it, not by the author's confidence that it's clear.
- **Hostile to obviousness:** event-driven indirection without comments; generic containers (`Pair<Integer,Boolean>` whose `getKey`/`getValue` mean nothing at the call site); declared type narrower than allocated type when behavior differs; code that violates reader expectations silently (e.g., `main` returns but background threads keep running).
- **Friendly to obviousness:** good names, consistency, judicious whitespace, comments where indirection is unavoidable, types that match allocation, conventions where the appearance of code matches its behavior (something named like an Iterator behaves like one; a class in the controllers package handles HTTP, etc.).
