# Which test first?

When you have a feature to build, you have a list of tests in your head. Pick the order deliberately.

## Ordering rules

1. **Start with a test that teaches you something and that you're confident you can make pass.** Not the hardest test. Not the trivial one if you've done this kind of thing before. The one that gives you the first foothold and the first piece of API.

2. **For something hard, first test the degenerate or empty case** (e.g. "summing an empty collection returns zero," "parsing an empty string returns no tokens," "scheduling zero jobs is a no-op"). It forces the function's signature into existence without forcing the algorithm.

3. **Force the abstraction with a second example.** If unsure whether the implementation should generalize, write two tests with different values; let the second force you to generalize beyond the first. Delete one if the generalization makes it redundant.

4. **Hardcode first, then generalize.** For complex logic, return a hardcoded value to get to green, then refactor to derive the value properly. This is the path of least fear.

5. **Just write it for trivial cases.** For simple things (`x + y`), write the implementation directly. Drop back to hardcode-then-generalize only if a red bar surprises you.

6. **Develop from inputs to outputs.** Trace the data flow. Start with the unit that receives the external event (function, handler, process, actor) and drive its dependencies out one at a time, working toward the boundary where output happens.

## Stating the order

When you give a test list, order it by what each test teaches:

> "Test 1 forces the function to exist. Test 2 forces it to handle non-zero. Test 3 forces it to handle the boundary case. Stop and refactor between each."

## When to stop adding tests

Stop when you can confidently say: "any change to this code that breaks the documented behavior will fail at least one test." More tests beyond that point are coverage theater; missing tests before that point are gaps.
