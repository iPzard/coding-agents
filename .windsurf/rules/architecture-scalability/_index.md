---
trigger: model_decision
description: "Rule index: The architecture-scalability-auditor agent reads this index, then loads ONLY the rule files relevant to the code under review. Each row lists a r…"
---

# Rule index

The `architecture-scalability-auditor` agent reads this index, then loads ONLY the rule files relevant to the code under review. Each row lists a rule, its file, and the code shape that should trigger loading it.

## Code structure & dependency direction

| Rule | File | Load when reviewing... |
|------|------|------------------------|
| Dependency Rule | dependency-rule.md | use cases, domain code, controller↔domain boundaries; inner-layer code importing framework / persistence / UI types |
| Cross-boundary data | cross-boundary-data.md | DTOs, return values from data-access, data crossing layers |
| SRP | srp.md | classes / modules with multiple unrelated responsibilities; `Manager` / `Helper` / `Util` suffixes |
| OCP | ocp.md | growing if/else / switch trees over types; new variants requiring core edits |
| LSP | lsp.md | inheritance hierarchies, subclass overrides, polymorphism |
| ISP | isp.md | fat interfaces, clients depending on methods they don't use |
| DIP | dip.md | direct concrete dependencies, missing abstractions on persistence / transport / messaging |
| Details vs core | details-vs-core.md | business rules coupled to a specific database / framework / transport |
| Thin edges | thin-edges.md | controllers, views, ORM adapters, UI components |

## Domain modeling & boundaries

| Rule | File | Load when reviewing... |
|------|------|------------------------|
| Ubiquitous language | ubiquitous-language.md | domain naming, generic verbs (`process`, `handle`), role-suffix nouns |
| Bounded Context | bounded-context.md | multi-context code, same term used differently, cross-context integration |
| Aggregate | aggregate.md | entity clusters, transactions touching multiple entities, persistence boundaries |
| Entity vs Value Object | entity-vs-value-object.md | identity-bearing vs attribute-defined types, mutable value-like types |
| Repository | repository.md | persistence abstractions, ORM use, query interfaces, data-access layer |
| Domain Service | domain-service.md | behavior that belongs to no single entity |
| Context relationship | context-relationship.md | cross-context calls, integration design between subsystems |

## Application patterns & distribution

| Rule | File | Load when reviewing... |
|------|------|------------------------|
| Three layers | three-layers.md | layered architecture, controller↔domain↔persistence calls, mixed concerns |
| Domain-logic style | domain-logic-style.md | choosing how to organize business logic |
| Service Layer | service-layer.md | application-layer use cases, transaction boundaries, controller→domain orchestration |
| Unit of Work | unit-of-work.md | multi-entity writes, scattered save calls, transaction management |
| Don't distribute fine-grained | dont-distribute-fine-grained.md | RPC over chatty domain calls, microservice decomposition for "performance" |
| Statelessness scales | statelessness-scales.md | server state, in-memory session state, autoscaling, failover |

## Data, replication, distributed systems

| Rule | File | Load when reviewing... |
|------|------|------------------------|
| Replication semantics | replication-semantics.md | leader/follower reads, replicated stores, read-after-write expectations |
| Partition key | partition-key.md | sharded data, key choice, hot-spot risk |
| Secondary index partitioning | secondary-index-partitioning.md | indexes on partitioned data, scatter/gather patterns |
| Multi-object atomicity | multi-object-atomicity.md | cross-aggregate / cross-service transactions, ACID assumptions |
| At-least-once | at-least-once.md | webhooks, queue consumers, retries, mutations without dedup keys |
| Backpressure | backpressure.md | producers/consumers, queues, buffers, in-memory accumulation |
| Fan-out tradeoff | fan-out-tradeoff.md | feeds, broadcasts, write-time vs read-time computation |
| Cache consistency | cache-consistency.md | cache layers, invalidation strategy, TTL choices |
| CAP | cap.md | distributed reads/writes under partition, consistency assumptions |

## Architectural characteristics & trade-offs

| Rule | File | Load when reviewing... |
|------|------|------------------------|
| Trade-off explicitness | tradeoff-explicitness.md | architecture decisions without stated sacrifices |
| Characteristics ranked | characteristics-ranked.md | "-ilities" prioritization, system-priority decisions |
| Scalability vs elasticity | scalability-vs-elasticity.md | load patterns, autoscaling decisions, gradual vs spike traffic |
| Independent deployable unit | independent-deployable-unit.md | service decomposition, shared databases, deploy coupling |
| Distributed monolith | distributed-monolith.md | microservices that deploy together / in order |
| Sync coupling | sync-coupling.md | synchronous inter-service calls, availability chains |

## Selection heuristic — common combinations

When unsure, lean toward loading fewer rule files rather than more. Match the code's shape to one of these starting sets, then add more only if the code genuinely calls for them.

- **HTTP handler / controller** → `dependency-rule`, `thin-edges`, `three-layers`, `service-layer`
- **Use case / interactor** → `dependency-rule`, `cross-boundary-data`, `service-layer`, `unit-of-work`
- **Repository / data-access** → `repository`, `cross-boundary-data`, `dip`, `unit-of-work`
- **Domain class / entity / value object** → `aggregate`, `entity-vs-value-object`, `ubiquitous-language`, `srp`
- **Queue consumer / webhook handler** → `at-least-once`, `backpressure`, `multi-object-atomicity`
- **Notification / fan-out / feed code** → `fan-out-tradeoff`, `backpressure`, `partition-key`, `sync-coupling`
- **Cache / read-after-write logic** → `cache-consistency`, `replication-semantics`, `cap`
- **Service-to-service call** → `sync-coupling`, `dont-distribute-fine-grained`, `independent-deployable-unit`
- **Database schema / partition design** → `partition-key`, `secondary-index-partitioning`, `multi-object-atomicity`
- **Service decomposition / microservices design** → `distributed-monolith`, `independent-deployable-unit`, `sync-coupling`, `characteristics-ranked`
- **Architecture decision doc / ADR** → `tradeoff-explicitness`, `characteristics-ranked`, `scalability-vs-elasticity`
