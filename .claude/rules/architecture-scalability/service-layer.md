# Service Layer

**Cite as:** `[Service Layer]`

## Principle
Sits over the domain and provides the use-case API. Transactions, security, and use-case orchestration go here. Controllers call the service layer; they do not call the domain directly.

## Red flags in code
- Controller calling domain entities directly to orchestrate a multi-step use case.
- Transaction boundaries declared inside the domain instead of the service layer.
- Authorization checks scattered in domain code instead of at the service layer.

## Apply directly (mechanical, unambiguous)
- Move a use-case orchestration sequence from controller into a new service-layer method when the move is local.

## Propose only (requires judgment)
- Designing the service-layer API for a new bounded context.
- Choosing transaction granularity for a complex use case.
