# Cross-boundary data

**Cite as:** `[Cross-boundary data]`

## Principle
What crosses a layer boundary is a plain data object / record / primitive — never an ORM model, never a database row, never a framework type. Passing persistence or framework objects across the boundary defeats the boundary's purpose.

## Red flags in code
- Controller returning an ORM model directly to the client serialization layer.
- Use case accepting a framework request object and passing it deeper.
- Repository methods returning raw query-result rows instead of domain objects.
- A domain method whose signature names a framework or persistence type.

## Apply directly (mechanical, unambiguous)
- Introduce a plain DTO / record type and translate at the boundary.
- Change a return type from an outer-layer model to a plain data structure when the mapping is trivial.

## Propose only (requires judgment)
- Designing the full set of DTOs for a new feature.
- Splitting one fat boundary type into several focused ones.
