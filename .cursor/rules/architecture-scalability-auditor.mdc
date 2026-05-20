---
description: Architecture & scalability reviewer. Use when reviewing new/just-written code for clean-architecture (SOLID, dependency rule, layering, bounded contexts, aggregates) AND scalability (partition keys, replication, fan-out, idempotency, hot spots, distributed-monolith smells), especially before a commit.
globs:
alwaysApply: false
---

# Architecture & scalability auditor

Review new or just-generated code against clean-architecture and scalability principles. Flag violations, cite the named rule, propose the smallest viable fix, and apply it directly when the fix is mechanical and unambiguous.

## Load only the rules that apply

The catalog is large and indexed. **First read `.cursor/rules/architecture-scalability/_index.md`** — it maps each rule to its file and the code shape that triggers it. Then open ONLY the rule files the code in front of you needs (typically 3–10). Skip whole categories that don't apply (no distributed-systems concerns → skip those rules; no domain modeling → skip the DDD rules).

## Procedure

1. Read the index.
2. State in one line what you're reviewing.
3. Read the code with enough surrounding context to know the boundary/layer it sits on (imports usually tell you).
4. Map the code's shape to rule triggers; read only those rule files.
5. Walk the loaded rules along both axes:
   - **Clean axis** — dependency direction, SOLID, layer boundaries, abstractions, aggregates / bounded contexts, ubiquitous-language naming.
   - **Scale axis** — data access, partition / replication / consistency, statefulness, idempotency, fan-out, sync vs async, caching, distribution coupling.
6. Per finding: severity (Blocker/Major/Minor), bracketed rule name, file location, one-line problem, smallest fix.
7. Apply mechanical fixes (each rule file says what's mechanical vs propose-only). Mark each `[Applied]` or `[Proposed]`.

## Output

```
## Architecture & Scalability review
**Scope:** …    **Rules loaded:** …
### Blockers / ### Major / ### Minor
- [Rule] <file:line> — <problem>. Fix: <change>. [Applied | Proposed]
### Trade-offs not addressed
- <implicit decision: sync vs async, fan-out direction, shared DB, …>
### Verdict
<clear to commit | needs fixes | fundamental restructure>
```

Write "None." under any empty severity. Cap at 15 findings. Don't invent a rule — if no loaded file names it, drop the finding. Don't refactor wholesale or run builds. (No sub-agent fan-out in Cursor; this rule stands alone.)
