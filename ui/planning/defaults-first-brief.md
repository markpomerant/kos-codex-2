# Defaults-first pass (shared by all page agents)

Repo: `/Users/markpomerant/Code/kos-codex-2/ui`. Pages: `libs/model-components/src/lib/components/<page>/`.
Models: `libs/core-concept-models/src/models/<model>/`. Snippets come from `// extract-code`
markers (see `planning/snippet-refactor-brief.md` for the extractor rules). Gate:
`node tools/check-coverage.mjs` after `npx nx run kos-codex-2-ui:extract`.

## Mark's rule
The FIRST snippet on any page, and the first page of any group, shows the decorator with
only the inputs it cannot infer. Everything with a sensible default is left out. The
next section shows the option most models reach for. Options that exist for migration
or legacy layouts come LAST under a heading that names them as such. Within a sub-topic
the same applies: do not pass an option whose default is what you want.

Mark, verbatim: "a user would almost NEVER set the containerProperty or the
modelsProperty or frankly ANY of these ... all of those have sensible defaults and are
generally only there to support legacy migration cases ... its much more common to
reach for indexMap"; "even within a sub topic, there are aspects that would typically
fall back to the defaults like the kosParentAware you don't need to pass in the
parentId and it will fall back to the kosParentId option".

## SDK defaults (read from source; re-verify anything you rely on)
- `@kosContainerAware`: containerProperty `container`, modelsProperty `models`,
  includeMethods true, includeGetters true, no extensionId. Typed access to the default
  is `KosContainerAware<T>`; a renamed property needs `KosContainerAwareWithProp<T,'name'>`.
- `@kosTopicHandler`: websocket defaults to FALSE, so `websocket: true` is required for
  device topics and stays; `lifecycle` unset = no phase gating.
- `@kosDependency`: lifecycle INIT by default; `id` defaults to the model type; no
  resolutionPolicy needed for the common case.
- `@kosFutureAware` / `@kosMultipleFutureAware`: mode `full`, handlerProperty
  `futureHandler` by default, so `@kosFutureAware()` is the first form.
- `@kosLoggerAware`: loggerProperty `logger` by default, so `@kosLoggerAware()` first.
- `@kosCompanion`: mode `decorator`, parentProperty `companionParent` by default.
- `@kosParentAware`: `parentId` falls back to the `kosParentId` option (verify in
  `core/core/decorators/kos-parent.ts`), so `@kosParentAware()` is the first form.
- `@kosModel`: `singleton` is only needed when true.
- `@kosConfigProperty`: `path` and `attribute` are required; everything else optional.

## Rules
1. Change model code only to remove options that restate a default or to move
   non-default options into a clearly secondary exemplar. Keep every option the matrix
   claims (`tools/codex-matrix.json` → `claims`) present in SOME extracted snippet that a
   page references, otherwise the gate fails. Legacy options may live on a different
   model than the opener (say which in the page).
2. When you rename a container property to the default, update every reader (model
   methods, other models, views, stories, pages). Typecheck both libs:
   `npx tsc --noEmit -p libs/core-concept-models/tsconfig.lib.json` and
   `npx tsc --noEmit -p libs/model-components/tsconfig.lib.json` (the pre-existing
   `roster` errors should disappear when team uses the default).
3. Pages: the opener section shows the default form and the surface it injects; then
   the common option; then, last, a section titled for migration/legacy options. Prose
   follows `planning/prose-style-brief.md` and the vocabulary in memory (model property,
   computed property, event, trouble = marker).
4. Do not touch files outside your group. No git. Do not run build-storybook; run
   extract + gate + tsc and report.
5. Report per page: what the opener now shows, what moved where, and any option you
   could not place. Append to `planning/page-notes.md` under `## Defaults-first — <group>`.
