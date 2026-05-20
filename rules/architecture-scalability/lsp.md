# Liskov Substitution Principle (LSP)

**Cite as:** `[LSP]`

## Principle
Any subtype must be usable wherever its parent type is used. A subtype that throws "not implemented" on a parent method, or strengthens preconditions, violates LSP.

## Red flags in code
- Subclass method body that throws `NotImplementedException` / `UnsupportedOperationException`.
- Subclass narrowing accepted inputs (parent took any string; child rejects empty).
- Subclass widening side effects unexpectedly (parent was pure; child writes to disk).

## Apply directly (mechanical, unambiguous)
- Rarely. Most LSP fixes need restructuring.

## Propose only (requires judgment)
- Breaking apart an inheritance hierarchy that doesn't satisfy LSP.
- Replacing inheritance with composition.
