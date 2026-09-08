# Build the KOS Codex — session brief

## The objective

Build a codex of KOS exemplars **by driving the KOS tooling**, so that a reader
learns the concept *and* a developer learns the commands that produce it.

**Writing code is expected.** Model method bodies, handler logic, computed
getters, component markup, stories and prose are yours to write — the generators
scaffold structure, not functionality, and filling in a generated TODO is the
normal flow.

What must not happen silently is **reaching past the tooling**: hand-writing a
decorator, declaration-merging interface, registration entry or service-request
method that a mutator produces, or **deleting or rewriting generated code** to get
a result. Those are the moments to stop and flag — not because they are forbidden,
but because each one marks a place where a real developer would also be on their
own, and that is precisely what this exercise exists to find.

The target: **90% of pages reach a working outcome without deleting or mutating
generated surfaces**.

A previous session ignored this and hand-wrote almost everything. Treat what is on
disk accordingly (see "What to trust").

## Before you write anything

These are not optional and not "background reading":

1. `kos://index` — then read the guides that bear on your page:
   `kos://guide/model-registration`, `model-lifecycle`, `container-models`,
   `relationships`, `service-requests`, `futures`, `model-context`,
   `loader-and-mapper`, `companion-models`, and **`kos://guide/anti-patterns`**.
2. `kos://decorator/{name}` for **every** decorator before you use it. Never guess
   an option name or its shape. When a tool result says
   `Reference: kos://decorator/X — fetch for …`, fetch it.
3. The `build-kos-model` skill — it is the workflow. Follow it.
4. `AGENTS.md` in this repo. (Guidance and skills come from the installed plugin;
   an earlier legacy per-repo install was removed so the plugin is the only
   source. If they are absent, stop and say so rather than proceeding without.)
5. `list_projects`, `list_models`, `describe_project` before touching anything.

## The build loop, per page

Everything below is a command or an MCP tool. Nothing here is hand-written.

1. `scaffold_model` (dry-run, review, then `dryRun:false`) — or
   `kosui model --name <x> --project <project> [--container]`.
2. Layer capabilities with the mutators, reading the decorator resource first:
   `add_property` · `add_computed` · `add_container_support` · `add_child` ·
   `add_model_effect` · `add_dependency` · `add_topic_handler` ·
   `add_config_property` · `add_service_request`.
3. `validate_model`.
4. `register_model` — registration is a chain in
   `apps/kos-codex-2-ui/src/app/registration.ts`, declared in the app's
   `.kos.json`. **Never `autoRegister`** (being deprecated). **Do not preload** —
   preload is for bootstrap/essential models only; everything else loads on demand.
5. `kosui hook --modelName <x> --project model-components` — model resolution
   lives in the generated hook, never in a component.
6. `kosui component --name <x> --project model-components` — components are
   presentational and receive the model **as a prop** via the generated
   `with<Name>` HOC. A component never calls `useKosModel`.
7. Write the story and the MDX page. These are genuinely yours to author — the
   generator deliberately does not scaffold stories for standard components
   (that is a DDK-plugin concern, not a gap).
8. `nx run kos-codex-2-ui:extract` then `build-storybook`.
9. **Verify it renders and behaves in a browser.** A green build proves nothing:
   the previous session shipped 29 "working" pages where every live canvas sat on
   `loading…`. Serve `dist/storybook/kos-codex-2`, open the story, publish a frame
   with `KosMock.publishTopic(...)`, and confirm the view updates.

## Page content rules

- **Options are literals in source.** Never Storybook args or controls — the
  extracted snippet is the lesson, and `debounce={args.debounce}` teaches nothing.
- **Models are concepts with state**, never device parts. A button press is an
  *event* that mutates a model; you do not model a button. Vocabulary:
  `counter, widget, team, user, task, session, timer, document, note, project`.
  Never reuse real SDK model names (`pump`, `nozzle`, `board`, `dispenser`).
- **Never assert behaviour you have not verified.** The inherited documentation
  corpus was agent-generated and is full of invented mechanisms; that is why this
  project exists. If you cannot verify a claim in a `kos://` resource, in SDK
  source, or at runtime — delete the claim.
- **Before declaring a framework mechanism broken, prove the failing hop at
  runtime.** Reading source is not proof.

## Gap logging — the second deliverable

When the tooling cannot reach something, that is **not automatically a bug**, and a
human making a manual change is a perfectly good outcome. What matters is that it
is recorded and that someone decides where — if anywhere — it should surface.

Log an entry when you **delete or mutate generated code**, or hand-write wiring a
mutator tool owns. Do not log ordinary authoring: filling in a method body,
writing a story, writing prose. Entries go in `planning/tooling-gaps.md`:

```
### <option or task the tooling could not reach>
- Context:        what I was trying to do
- Workaround:     what I did by hand
- Frequency:      common | occasional | rare | escape-hatch-only
- Landing point:  codegen | resources | tools | skills | codex-prose | none-needed
- Rationale:      why there, in one or two sentences
```

Choosing the landing point:

- **codegen** — the generator should emit it; a developer would hit this on a
  normal task.
- **tools** — a mutator should expose the option; the shape is fiddly enough that
  hand-writing invites hallucination.
- **resources** — the mechanism is fine, the documentation of it is missing or
  wrong. Say which `kos://` resource should change and how.
- **skills** — the individual pieces exist but the *sequence* is not obvious.
- **codex-prose** — **only** when the option is genuinely low-frequency or is an
  obvious escape hatch. Explaining it in prose is the right answer for the long
  tail; it is the wrong answer for anything a normal task needs.
- **none-needed** — the tooling was adequate and the manual step was ordinary
  authoring or a trivial expected edit. Say so; a clean result is a real finding,
  and a log full of `none-needed` is good news, not a failure to find problems.

Close the log with a count: pages completed with zero manual edits to
SDK-provided surfaces, out of pages attempted. That number is the 90% target.

## What to trust on disk

**The workspace has been swept.** Every model, view, story and page from the
previous attempt has been deleted, along with its page matrix and coverage gate,
because all of it was hand-written or agent-written and derived from a corpus that
must not seed this work. There is nothing here to copy and nothing to repair.

What remains is scaffold and configuration only:
- The four generated library/app projects, with empty barrels.
- `apps/kos-codex-2-ui/.storybook/` — Storybook config. Two settings in it are
  hard-won: `typescript.reactDocgen: false` (its Babel parse cannot read
  `@kosModel(...)` above `export class`), and `KosMock.configure({ standalone:
  true })` in `preview.tsx` before the app provider is imported.
- The `extract` target in `apps/kos-codex-2-ui/project.json`, which harvests
  `// extract-code` markers into `libs/model-components/src/snippets.json`.
  It invokes the extractor script directly because the package's
  `extract-snippets` bin does not resolve through npx here — it exits 0 and
  writes nothing.
- `apps/kos-codex-2-ui/src/app/registration.ts` — an empty registration chain,
  declared in the app's `.kos.json` under `registration.file` so `register_model`
  can upsert into it.
- `libs/model-components/.kos.json` sets `generator.defaults.component.folder`,
  which is what tells scaffolding where components land.

**The page matrix and coverage gate are kept**, and their provenance matters:

- `tools/decorator-surface-full.json` — 28 decorators / 126 options, extracted
  mechanically from SDK source by `packages/kos-ui-cli/tools/decorator-surface-full.mjs`
  in the SDK repo. Regenerate it after any SDK change touching decorators.
- `tools/codex-matrix.json` — which page demonstrates which options. The option
  side comes from that mechanical surface; the page grouping follows the previous
  codex's concept organisation. It is a **starting point, not a fixed plan** —
  validate each page against `kos://decorator/*` and `kos://guide/*` and change
  what does not hold up.
- `tools/check-coverage.mjs` — the gate. It fails on an option nothing
  demonstrates, a claim for an option that does not exist, a page in the matrix
  with no built page, and a page whose claimed options never appear in extracted
  source. Run it often; it is what stops a stub page counting as coverage.

Two options are deferred in the matrix with reasons — verify rather than assume:
`kosReference` and `kosModel.autoRegister`.

## Done means

- Every page built through the tools, with the commands used recorded.
- The coverage gate green, or every exclusion deliberate and explained.
- Each page verified rendering and behaving in a browser, not just building.
- `planning/tooling-gaps.md` complete, with landing points and the 90% count.

---

## Reference repos

### The SDK — `~/Code/kos-ui-sdk`

The source of everything you are documenting, and where a codegen/tool/resource
gap gets fixed.

- **It is IN PRODUCTION and used by real projects.** Read freely; change
  deliberately. Never stage or commit — Mark stages selectively himself. No
  `git add`, no `git commit`, no `git mv`.
- `AGENTS.md` and the `build-kos-model` skill are installed there.
- Useful source locations: decorators in
  `packages/kos-ui-sdk/src/core/core/decorators/` and
  `packages/kos-ui-sdk/src/models/decorators/`; the React hook in
  `src/ui/hooks/use-kos-model.ts`; registration in
  `src/core/core/registration/`; the KosMock transport (with its own README) in
  `src/core/core/transport/mock/`.
- `packages/kos-ui-cli/tools/decorator-surface-full.mjs` extracts the full
  decorator/option surface (28 / 126) that `tools/decorator-surface-full.json`
  here was produced from. Re-run it after any SDK change that touches decorators.
- `planning/scratch/` there holds notes from the previous attempt. They are
  UNVERIFIED and were produced by the process this brief exists to replace. Read
  them only if you want to know what was already tried; do not treat any claim in
  them as fact, and do not use them as a source for what to build.

## Closing the loop on a tooling gap

If a gap's landing point is **codegen**, **tools**, or **skills**, you may need the
fix in your own hands before continuing. The path:

1. Make the change in `~/Code/kos-ui-sdk` (templates live in
   `packages/kos-codegen-core/templates/`, CLI generators in
   `packages/kos-ui-cli/src/lib/generators/`, MCP tools in
   `packages/kos-ui-cli/src/lib/mcp/tools/`). Add a test — several generators had
   none, which is how defects survived.
2. **Publishing is Mark's to run, not yours.** Prepare the command and hand it
   over. The `publish-local` skill in `~/Code/kos-ui-sdk/.claude/skills/` documents
   the flow; the commands are `npx nx local-registry --clear=false` and
   `npm run publish:local-release -- --bump patch`.
3. Then `kosui cli:update --version <version>` picks it up globally.

Two traps, both of which have already cost a day:

- **`npm run local-registry` WIPES the registry storage on start** (its first log
  line is `Cleared local registry storage folder`). Always
  `npx nx local-registry --clear=false`. Never restart a registry that is already
  answering on :4873 — check with `curl -s -o /dev/null -w "%{http_code}"
  http://localhost:4873` first.
- **When Verdaccio is running it IS npm.** Plain `npm install` /
  `kosui cli:update` resolve through it. Never add `--registry` flags, never read
  `.npmrc` to decide otherwise.

Note the currently installed CLI is 3.0.20. `kosui plugin install` exists in SDK
source but not in 3.0.20, so using it requires a local publish first.
