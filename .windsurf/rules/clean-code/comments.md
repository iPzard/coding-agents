---
trigger: model_decision
description: "Comments: Two competing schools of thought matter; surface the tension when relevant."
---

# Comments

Two competing schools of thought matter; surface the tension when relevant.

- **View A — comments as failure.** A comment is a signal that the code itself failed to express its intent. Prefer expressive code over comments; comments tend to drift out of sync with the code they describe because nobody updates them. Bad comments: redundant (restating what the code obviously does), misleading, in-source change-logs (use VCS history instead), author signatures, commented-out dead code, position/section markers, closing-brace markers.
- **View B — comments as essential design output.** Some information genuinely can't be expressed by code alone: what an interface promises to callers, the units a parameter expects, invariants the function preserves, the reasoning behind a non-obvious choice, what the caller must guarantee before calling. Without those comments, callers can't use the function without reading its body — which defeats the point of having an interface. Drafting these comments before or alongside the implementation is itself a design activity, not after-the-fact paperwork.
- **Synthesis (recommend this):** Every public function/class/data structure deserves an interface-level comment describing the abstraction — what it does, units, pre/post conditions, what callers can assume. Implementation comments should explain *why*, not *what*; if the comment restates the code, delete the comment or improve the code. Useful comment types: TODO, warning-of-consequences ("not thread-safe", "called from signal handler"), rationale for non-obvious decisions, and legal/license headers. Noise: commented-out dead code, in-source change-logs (use VCS), author signatures, decorative section dividers, and comments that just restate the code.
- **Test:** if a block needs a comment to explain it, first try extracting it into a method with the comment as the name.
