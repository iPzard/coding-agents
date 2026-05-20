# Code smells and their canonical fixes

When you see one of these, name it specifically and apply the canonical refactoring:

| Smell | Canonical fix |
|---|---|
| Long Method | Extract Method; if locals tangle, Replace Temp with Query, then Extract Method |
| Large Class | Extract Class, Extract Subclass, Extract Interface |
| Long Parameter List | Introduce Parameter Object; Preserve Whole Object; Replace Parameter with Method |
| Divergent Change (one class changes for many reasons) | Extract Class along the axes of change |
| Shotgun Surgery (one change touches many classes) | Move Method / Move Field into a single class |
| Feature Envy | Move Method to the envied class |
| Data Clumps (same group of fields/parameters everywhere) | Extract Class; Introduce Parameter Object |
| Primitive Obsession (strings, ints standing in for concepts) | Replace Data Value with Object; Replace Type Code with Class/Subclass/Strategy |
| Switch on type code | Replace Conditional with Polymorphism (or polymorphic dispatch table) |
| Message Chains (`a.b().c().d()`) | Hide Delegate, or Extract Method on the chain target |
| Middle Man (most methods just delegate) | Remove Middle Man |
| Speculative Generality (unused hooks, abstract bases with one subclass) | Collapse Hierarchy, Inline Class, Remove Parameter |
| Temporary Field (field set only in some flows) | Extract Class for the algorithm; Introduce Null Object |
| Comments compensating for bad code | Extract Method, Rename, then re-evaluate if the comment is still needed |
