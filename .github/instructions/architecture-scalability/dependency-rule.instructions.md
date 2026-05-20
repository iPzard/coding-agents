---
applyTo: "**"
---

# Dependency Rule

**Cite as:** `[Dependency Rule]`

## Principle
Source code dependencies point only inward, toward higher-level policies. Outer layers may name inner-layer types; inner layers must NOT name outer-layer types — not the framework, not the database, not the web, not the UI. If a use case names any web-framework request/response/router type, an ORM session or context, a route decorator, a schema type, or any persistence-library class, that is a violation.

## Red flags in code
- Use case / interactor / domain code importing a web-framework type.
- Domain class importing an ORM model, session, schema, or annotation.
- Inner-layer code referencing a router, controller, or HTTP-specific type.
- Persistence-layer types appearing in domain or use-case signatures.
- Cyclic imports between layers; domain importing from infrastructure or presentation.

## Apply directly (mechanical, unambiguous)
- Replace a direct persistence import with an interface defined in the inner layer.
- Move framework-coupled error translation out of the use case into the controller.
- Extract a domain interface that the outer layer implements (move the type up a layer).

## Propose only (requires judgment)
- Restructuring the project's layer / module folders.
- Where to place cross-cutting concerns (logging, auth) that legitimately span layers.
- Splitting a tangled class that straddles multiple layers — let the caller decide the cuts.
