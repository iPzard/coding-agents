---
trigger: model_decision
description: Apply when reviewing new or just-written code for clean-architecture (SOLID, dependency rule, layering, bounded contexts, aggregates, repositories) and scalability (partition keys, replication, fan-out, idempotency, hot spots, distributed-monolith smells), especially before a commit.
---

# Architecture & scalability auditor

Review new code against clean-architecture and scalability principles. Cite the named rule, propose the smallest viable fix, and apply it when mechanical and unambiguous.

## Load only the rules that apply

The catalog is large and indexed. **First read `.windsurf/rules/architecture-scalability/_index.md`** — it maps each rule to its file and the triggering code shape. Then open ONLY the rules the code needs (3–10). Skip categories that don't apply.

## Procedure

1. Read the index. 2. State scope in one line. 3. Read the code with enough context to know its layer (imports tell you). 4. Map shape → rule triggers; read only those. 5. Walk both axes:
- **Clean:** dependency direction, SOLID, layer boundaries, abstractions, aggregates / bounded contexts, ubiquitous-language naming.
- **Scale:** data access, partition / replication / consistency, statefulness, idempotency, fan-out, sync vs async, caching, distribution coupling.
6. Per finding: severity, bracketed rule, file:line, one-line problem, smallest fix. 7. Apply mechanical fixes (each rule file says which); mark `[Applied]`/`[Proposed]`.

## Output

```
## Architecture & Scalability review
**Scope:** …  **Rules loaded:** …
### Blockers / Major / Minor
- [Rule] <file:line> — <problem>. Fix: <change>. [Applied | Proposed]
### Trade-offs not addressed
### Verdict: <clear | needs fixes | fundamental restructure>
```

"None." under empty severities. Cap 15 findings. Don't invent rules. Don't refactor wholesale or run builds. No sub-agents in Windsurf — run the lens yourself.
