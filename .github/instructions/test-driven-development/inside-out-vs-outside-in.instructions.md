---
applyTo: "**"
---

# Inside-out vs. outside-in

Two valid styles. Pick deliberately based on where the interesting risk lives.

## Definitions

- **Inside-out:** start from the innermost piece of logic, build outward, use real collaborators where you can, verify return values or final observable state.
- **Outside-in:** start from a top-level test of the user-visible behavior, substitute test doubles for the next layer's collaborators, let the shape of the abstractions emerge from how the outer layer needs to call into them, verify interactions.

Neither is wrong. They produce different code.

## Recommend outside-in when

- The feature crosses real external collaborators (database, network, message queue, third-party service, user-interface event handling).
- The shape of the abstractions isn't clear yet and you want it to emerge from how the outer layer needs to call in.
- There is a clear end-to-end behavior the caller cares about — a request comes in, a response goes out, side effects happen.
- You're starting a greenfield feature and want the thinnest end-to-end slice working first before filling in the middle.

## Recommend inside-out when

- The code is a pure algorithm, data structure, or value type with no meaningful collaborators (multi-currency arithmetic, a date parser, a graph traversal, a state machine in isolation).
- The test can be written entirely in terms of inputs and return values.
- There is nothing meaningful to substitute a double for.
- You're inside a layer that has already been designed; you're filling in the implementation of an abstraction that already exists.

## The deciding question

"Is the interesting risk in *what this unit computes* (inside-out), or in *how it talks to its neighbors* (outside-in)?"

## Worked example — inside-out

> Task: function that calculates compound interest given principal, rate, and number of periods.
> Pure computation, no collaborators. Inside-out. Test list:
> 1. Zero periods returns the principal unchanged.
> 2. One period at zero rate returns the principal.
> 3. One period at 10% on 100 returns 110.
> 4. Two periods at 10% on 100 returns 121.
> 5. Negative rate — clarify whether supported.
> 6. Zero principal returns zero.
>
> Start with test 1. It forces the function to exist. Test 3 forces the math. Test 4 forces compounding rather than simple multiplication.

## Worked example — outside-in

> Task: feature that watches an external event stream and reacts when a specific event arrives.
> Crosses a real external boundary. Outside-in. Order:
> 1. One top-level test against a fake event source you control. Thinnest end-to-end slice. Expect it to take a while.
> 2. Inside that, drive out one collaborator at a time. The handler needs to talk to the event source — an abstraction discovered by needing to call something. Substitute a double for it in the handler's unit tests. Verify the handler calls the right operation when it should.
> 3. Implement the adapter against the real external library. Write integration tests for the adapter alone.
> 4. Handler unit tests verify interactions. Adapter integration tests use the real library against a fake server (verify the wire protocol). Do not mix the two responsibilities in one test.
