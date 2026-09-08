# Prose pass brief (all page agents)

Scope: the MDX pages under `libs/model-components/src/lib/components/<page>/*.mdx`
assigned to you, plus (for the lifecycle group) the label strings in
`topic-catch-up-view/race-timeline.tsx`. Edit prose only. Do not touch code, snippet
markers, `<Snippet>` references, tables' commands, story files, or models. No git.

Mark's rules (verbatim intent):
1. No em dashes or en dashes anywhere ("—", "–"). Use a comma, a period, or
   parentheses. Also no " - " used as a dash.
2. Concrete prose. Replace figurative sentences with the mechanism and its effect.
   Bad: "The seam between the two has a window." Good: "A frame can arrive before the
   handler is registered, while the baseline request is in flight, or before the
   request is sent."
3. No narrative suspense and no negative countdowns. Do not open with what can go
   wrong before saying what the thing does; do not write "Nothing here hand-rolls
   fetch", "not X, but Y", "that is what keeps every request honest", "two things can
   go wrong", "the one choice that matters". State the fact.
4. No pseudo-intellectual framing: "it matters because", "what matters most", "the
   reality is", "worth knowing", "the point is", "in other words", "think of it as".
5. Functional, not selling. Remove intensifiers and evaluatives: "exactly", "simply",
   "just", "genuinely", "cleanly", "honest", "real" (as praise), "elegant". Keep
   sentences short and declarative; one idea per sentence.
6. Keep every fact, every snippet reference, every command, every heading level and
   the page structure. Do not add new claims. Do not shorten explanations of
   mechanisms; shorten only the rhetoric around them.

Method: read the page top to bottom, rewrite offending sentences in place, then grep
your pages for `—`, `–`, `matters`, `go wrong`, `exactly`, `simply`, `just `,
`genuinely`, `honest`, `the point`, `worth`, `not .* but`, `in other words`,
`think of` and fix what remains. Report per page: number of sentences changed and
two or three before/after examples. Append the same to `planning/page-notes.md`
under `## Prose pass — <group>`.
