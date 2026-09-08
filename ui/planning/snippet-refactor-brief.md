# Snippet refactor brief (shared by all page agents)

Repo: `/Users/markpomerant/Code/kos-codex-2/ui` (Nx workspace, Storybook 10, KOS SDK 3.0.20).
Pages: `libs/model-components/src/lib/components/<page>/<page>.mdx` with a view `.tsx`,
a `.stories.tsx`, and a hook/HOC. Models: `libs/core-concept-models/src/models/<model>/`.
Snippets: `// extract-code <name>` markers → `npx nx run kos-codex-2-ui:extract` →
`apps/kos-codex-2-ui/public/snippets.json` keyed `<name>@<basename>`. Pages render a
snippet with `<Snippet name="<name>@<file>" />` (or `name={[...]}` for several in one
viewer group). Coverage gate: `node tools/check-coverage.mjs` (reads
`tools/codex-matrix.json`, which lists the decorator options each page must show in
its extracted snippets).

## The problem being fixed
Pages currently drop a WHOLE MODEL CLASS in one snippet (e.g. `counter-model`,
`team-container`, `tasks-capacity`, `user-model`, `task-future-aware`,
`session-logging`, `timer-multi-future`, `widget-view-model`, `widget-model`) and then
show parts again. The reader gets no build-up. Mark's ruling:

> "I don't mind a whole decorator at a time...just not the WHOLE MODEL"
> "rather than show what gets added incrementally as part of the steps you're just
> blasting out the whole model at once and THEN showing parts"
> "there are soooo many features in the extractor that you should be better using
> and instead you've kind of gone with lowest common denominator"

## Rules
1. **No snippet may contain a whole model class.** A whole decorator plus the member
   it decorates is the largest acceptable unit. Class-level decorators (`@kosModel`,
   `@kosFutureAware`, `@kosContainerAware`, `@kosTroubleAware`, `@kosReloadAware`,
   `@kosStateMachine`, …) are captured by a marker placed directly above that
   annotation — the extractor captures just that annotation, not the class. Check
   with: `node -e 'const s=require("./apps/kos-codex-2-ui/public/snippets.json");for(const [k,v] of Object.entries(s)){const c=typeof v==="string"?v:v.code??JSON.stringify(v);if(/export class/.test(c))console.log(k)}'`
   — only 1-line `@kosModel(...)` captures may remain (they do not include the class).
2. **Build the concept up in steps.** The page's "how it was built" steps are the
   order; each step introduces one snippet that shows exactly what that step added
   (a decorator, a member, a body). Prose between snippets says why. Never show a
   piece before the step that introduces it.
3. **Use the extractor's features** (read `node_modules/@matrica-code/snippet-extractor/README.md`
   lines 10–182 first):
   - a marker captures the *next syntax node*; stacked markers above an annotation
     list each capture their own annotation;
   - a marker on a decorator OPTION (`converter: {…}`) captures just that property;
   - `// extract-code end <name>` groups loose lines;
   - the same name on several markers is ADDITIVE (segments join with a blank line) —
     use this to compose "the decorator + the method it names" from apart places;
   - `// extract-code ignore` / `ignore <names>` / `ignore start … ignore end [names]`
     strips noise (long bodies, unrelated members, doc comments) from named snippets;
   - a marker nested inside a captured node has been observed to cut the enclosing
     snippet at that line — avoid nesting; compose with additive names instead.
4. **Prose is for a human learner.** No tooling commentary ("added by hand", "the
   tool inserted"), no MCP call syntax; command sections are step tables of `kosui`
   commands / tool names as a human would run them. Keep GFM tables intact.
5. **Do not change runtime behaviour** of models, views or stories. Only markers,
   comments, and MDX prose/order change. Do not touch `registration.ts` (read it if
   you need to reference `registration-chain@registration.ts` / `registration-companion@registration.ts`).
   Do not touch files outside your group. No git commands of any kind.
6. Snippet names must stay unique per file. If you remove a name, update every MDX
   that references it (`grep -rn "<name>@" libs/model-components/src/lib/components`).
7. After edits: `npx nx run kos-codex-2-ui:extract`, then the whole-class check in
   rule 1, then `node tools/check-coverage.mjs` — failures naming pages outside your
   group may be from other agents mid-edit; yours must be clean. Also
   `npx tsc --noEmit -p libs/core-concept-models/tsconfig.lib.json` and
   `npx tsc --noEmit -p libs/model-components/tsconfig.lib.json` must pass.
   Do NOT run `build-storybook` (the coordinator does it once for everyone).
8. Report back: per page, the ordered snippet list (name → what it shows, line
   count), any extractor behaviour you had to work around, and anything you could
   not do. Append the same to `planning/page-notes.md` under a heading
   `## Snippet refactor — <group>`.
