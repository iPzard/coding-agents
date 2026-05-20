# Modules and abstraction layers

A good module hides substantial logic behind a simple, small interface. When the interface is nearly as complex as the implementation, the module adds cost without paying for itself.

## Red flags

- **Shallow class / shallow function.** Interface almost the same size as the implementation. Examples: a one-line wrapper like `getName() { return this.name; }` or `addItem(x) { items.append(x); }` — the caller is no better off than touching the underlying field or collection directly.
- **Pass-through method.** Forwards arguments to another method with the same signature. Indicates muddled responsibility between two classes. Merge or redistribute.
- **Information leakage.** The same design decision (file format, protocol detail, units, validation rule) appears in two or more modules. Refactor so it lives in one place.
- **Time-ordered decomposition.** Code is structured around the order operations happen at runtime (e.g., one class to read, one to parse, one to write) rather than around the knowledge each piece needs. The shared knowledge leaks across the time-ordered pieces.

## Standards

- Make the common case simple. Defaults should "do the right thing"; advanced configuration should be opt-in.
- Design interfaces slightly more general than today's call sites strictly need. Tomorrow's caller will use the module differently than you anticipate.
- Push complexity into the module, away from callers. If callers must supply configuration the module could decide on its own, the burden is in the wrong place.
- Adjacent abstraction layers should use different vocabulary. If two stacked layers describe things in the same terms, one is probably redundant or a missing abstraction is hiding between them.
