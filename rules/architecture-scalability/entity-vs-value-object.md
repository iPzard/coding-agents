# Entity vs Value Object

**Cite as:** `[Entity vs Value Object]`

## Principle
Entities have identity that persists through state change; value objects are defined entirely by their attributes and are immutable. A value object with a mutable setter or with an id field is a design smell.

## Red flags in code
- A class that looks like a value object but has setters and an `id`.
- An "immutable" type with mutable nested fields.
- Equality based on object identity for what should be a value.

## Apply directly (mechanical, unambiguous)
- Remove setters from a value object (mark fields final / readonly).
- Drop an `id` field from a value object that is not an entity.
- Change equality to attribute-based comparison on a value type.

## Propose only (requires judgment)
- Deciding which existing types should be entities vs values.
