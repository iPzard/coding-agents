# Domain Service

**Cite as:** `[Domain Service]`

## Principle
When behavior belongs to no single entity, it is a stateless service named in the ubiquitous language and side-effect-free where possible.

## Red flags in code
- A domain service holding instance state.
- A domain service named in technical / implementation terms rather than the ubiquitous language.
- Behavior that genuinely belongs on an entity placed in a service instead.

## Apply directly (mechanical, unambiguous)
- Strip state fields from a domain service that should be stateless.
- Rename a domain service to its ubiquitous-language term when known.

## Propose only (requires judgment)
- Choosing whether behavior belongs on an entity vs in a service.
