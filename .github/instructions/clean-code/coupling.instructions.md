---
applyTo: "**"
---

# Coupling, cohesion, orthogonality

- **Single Responsibility Principle (SRP).** A class has one reason to change. If you describe what the class does and the description contains "and" or "or", suspect it.
- **Law of Demeter.** A method should call methods only on `this`, parameters, things it created, and its own fields. `ctxt.getOptions().getScratchDir().getAbsolutePath()` is a train wreck. Replace with `ctxt.scratchDirAbsolutePath()` or, better, `ctxt.createScratchFileStream(name)` — push the request into the object instead of pulling its internals out so the caller can do the work.
- **Feature Envy.** A method that uses another class's data more than its own wants to live in that other class. Move it.
- **Inappropriate Intimacy.** Two classes that constantly poke at each other's privates. Either merge them or formalize the relationship.
- **Orthogonality.** Changing one thing should not require changes in unrelated places. Eliminate effects between unrelated things.
- **Avoid global mutable state.** Globals create hidden coupling — anyone could be reading or writing.
- **Hide implementation, expose abstraction.** Trivial getters/setters, `@property` wrappers around stored attributes, or exported fields with thin pass-through methods are barely better than public fields — they violate information hiding. The exposed surface should describe the abstraction, not mirror the storage.
