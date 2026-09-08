# Page notes — raw authoring observations for triage

One section per page. These are the notes that do NOT belong in the MDX (the
pages are for a human learner). They record what the tooling produced, what was
edited by hand and why, how the behaviour was verified, and anything that looked
off. `planning/tooling-gaps.md` is the curated log distilled from these; this file
is the unfiltered source, to be reviewed and triaged.

Legend: **tool** = produced by kos-codegen / kosui unchanged · **filled** =
generated TODO body written by hand (ordinary authoring) · **hand-added** =
option or wiring a mutator owns, written by hand (candidate gap) · **verified** =
behaviour exercised in a browser against KosMock standalone.

---

## simple-model (counter)
- tool: `scaffold_model counter`, `add_property count`, `add_computed isAtFloor`, `validate_model`, `register_model`, `create_hook counter`, `create_component counter-view`.
- filled: `increment/decrement/reset` bodies; component markup; story; page.
- hand-added: none in the model. Registration import specifier corrected by hand (`core-concept-models` → `@kos-codex-2/core-concept-models`); `libs/model-components/src/index.ts` barrel lines.
- verified: canvas renders count 0 with `−` disabled; three `+` and one `−` read 2.
- observations: `register_model` first wrote its entry inside the file's explanatory comment (fixed in SDK, see gaps). `optionsRequired` moved to the model-dependencies page: it only has meaning for dependency resolution (`kosModel.ts`: throws when a CREATE-policy dependency gets empty options).

## topic-handlers (widget)
- tool: `scaffold_model widget`, `add_property` ×3, `add_topic_handler` ×3 (`onTemperature`, `onLocalPing` websocket:false, `onRawFrame`).
- filled: handler bodies, `types/index.d.ts` event types, view, story, page.
- hand-added: `skipParse: true`, `lifecycle: READY` on `onRawFrame`. The tool emits `lifecycle: INIT` unconditionally.
- verified: socket frame → `temperature` 341; two `EventBus.publish` → `pings` 2; raw frame shows the JSON string.
- observations: `skipParse` is `@internal` in source but works; `fos`/`bridge` are `@internal` and transport-level → deferred in the matrix. `kosSubscribe` is `@deprecated`/`@internal` (removeAt 3) → its page removed, options deferred. One handler per topic per class (decorator map keyed by topic) — worth a line in the decorator resource.

## topic-filtering (widget)
- tool: `add_property` ×5, `add_topic_handler` ×4.
- hand-added: `condition`, `filter`, `once`, `transform`, and the generic parameters `<TemperatureFrame, WidgetModelImpl, Reading>`.
- verified: alert 25 → 0 alerts, 35 → 1; six samples → 3 even; second "first frame" ignored; readings render `21.5 °C (mild)` / `34.0 °C (hot)`.
- observations: `filter` receives the transport envelope (`{headers, body: string}`), not the parsed payload its type parameter implies — the predicate had to `JSON.parse(raw.body)`. Either the type or the runtime is wrong; runtime is what ships. `once` shares the wrapper slot with debounce/throttle/buffer (if/else chain in `applyFunctionalEnhancements`).

## topic-rate-control (widget)
- tool: `add_property` ×4, `add_topic_handler` ×3.
- hand-added: `debounce: 300`, `throttle: { interval, discardIntermediate }`, `buffer: { time, maxSize }`.
- verified (headless Chrome, CDP): debounce → 1 call, batch of 5; throttle → 1 immediate + 1 trailing call. **buffer hangs the page** at the third frame; a single frame never reaches the handler.
- observations: root cause in `applyFunctionalEnhancements` (closure over the reassigned `enhancedHandler`) — fixed in the SDK with tests. The Claude-in-Chrome extension loses the tab on a renderer hang, which hid the bisect; the scratchpad CDP harness (`cdp.mjs`) found it. Story's buffer button is disabled until a fixed SDK ships.

## topic-flow-control (widget)
- tool: `add_property` ×5, `add_topic_handler` ×3.
- hand-added: the three `flow` objects.
- verified: batch of 4 → one batch (sum 6) immediately, the 4th frame waits for the next burst; after two bursts 3 batches summing 20. rateLimit 2/s → 2 of 5 accepted, still 2 after 1 s. retry → 4 attempts, 2 successes, 2 logged errors.
- observations: in the flow path the manager never calls `getMessageBody`; `transform` sees raw envelopes. Top-level `transform`/`filter` are ignored when `flow` is set (only `condition` is applied). No timer-based batch flush — the check runs on event arrival only.

## topic-addressing (widget)
- tool: `add_property` ×2, `add_topic_handler` ×2.
- hand-added: `wildcardName`, `destinationAddress`, `explicitDestination`.
- verified: `raw.wildcardCapture.zone` = `north/door` then `south`; the addressed frame delivered; the transport recorder (`?kosRecord=addr`) shows the subscribe frame for `/codex/widget/addressed` carrying `dst-addr: codex-device` while the wildcard subscribe carries none.
- observations: wildcard delivery depends on the broker setting BOTH `subscription` (the pattern) and `topic` (the concrete topic) headers; the story publishes both. Not verified against a real broker — only against `BaseTransport.onMessage` routing and the mock.

## Pivot: codex backend (after review)
- The codex now runs against the codex backend (hosted by the Studio process) on 10010 in KosMock HYBRID mode, like the previous codex (its `.env`: KOS_PORT=10010, KOS_MOCK_WS=false). Standalone mode and my throwaway OpenAPI server are gone; types come from `kosui api:generate --studio`.
- Endpoints the codex backend lacks are PROVISIONAL mocks emitted by `add_service_request` (mock mode) and armed from the Storybook preview; listed in `planning/needed-endpoints.md`.
- The codex backend's `POST /api/codex/objects` ignores the posted `desc` and stores `id=N revision=R`; `PUT` bumps the revision; both answer 200 with the `{status, version}` envelope; the methods use `executeServiceRequest` like every other method-driven request.
- The mocked `GET /api/codex/objects/:id` route declines unknown ids; the request then passes through to the codex backend and returns a real 404 — verified: `lastError` reads `HTTP 404`.

## services / service-mapping (document, codex backend)
- tool: `scaffold_model document` (re-scaffolded after the pivot), `add_container_support notes`, `add_property` ×5, `add_service_request` ×7 (4 real codex backend paths, 2 provisional, 1 method-driven reload on the LOAD path).
- filled: bodies; the notes mapper wraps the bare array (`{ notes }`) so `iterateOver` has a path.
- hand-added: `iterateOver`, `mappings`, `modelFactory` (with a cast — the option is typed for a generic registration bean), `idExtractor`; `KosContainerAwareWithProp` in the merged interface (tool emits `KosContainerAware<T>` even with a custom `containerProperty`).
- verified (codex backend): add → 2 notes listed from the codex backend; modify → `revision=1`; remove → 1 note. Reload reconciles in place.
- **defect (SDK 3.0.20):** the LOAD request with `iterateOver` + `mappings` yields nothing — mappings run on the enclosing response first (`Required field 'id' is missing`). Fixed in SDK source with a test; the page must say the LOAD list is empty on 3.0.20 and the reload path is what fills it.

## service-caching / service-errors (document)
- provisional endpoints: `GET /api/codex/objects/stats`, `GET /api/codex/objects/{id}`.
- hand-added: `condition`, `requestOptions`, `cache`, `errorHandler`; edited the generated mock handlers (dynamic `computedAt`; decline unknown ids). `queryParams`: no codex backend endpoint the codex uses declares query parameters and the typed decorator rejects untyped ones → deferred in the matrix.
- verified: errors page — mocked id 1 loads, id 999 → real codex backend 404 via `onError`.
- open: `cachedStatsComputedAt` reads '' — the response-store key I used does not match; checking the store's key format.

## Findings from the codex backend verification pass
- `cache` and `condition` apply to LIFECYCLE requests only: the method-driven executor (`$ctx.$request`) never touches the response store and never evaluates `condition` (verified in `kos-service-request.ts`). The caching page therefore uses a LOAD request; `cachedStatsComputedAt` via `checkCache()` reads the store, shows the cached value, and reads `(expired)` after the 5 s TTL — verified.
- `@kosServiceRequest` keys its handler map by method+path, so a LOAD handler and a method-driven reload on the same path (what the service-requests guide prescribes) collide: the later decorator replaces the earlier. Fixed in SDK source (key by method name) with a test.
- `iterateOver` + `mappings` at LOAD yields nothing on 3.0.20 (mappings run on the enclosing response first). Fixed in SDK source with a test. The page states the LOAD list is empty on 3.0.20 and the reload path fills it.
- `@kosFuture({ abortController: true })` inserts the AbortSignal BEFORE the execution context, so a method that also carries `@serviceRequest` must declare `(args, signal, $ctx)`; the tool emits `($ctx?)`. Worth a note in the futures resource / the add_service_request hint when the method is future-wrapped.
- `@kosDependency({ resolutionPolicy: CONTINUE })` on a missing model: the model was CREATED anyway (project's `counterState` reads `count 0`). Construction-time injection in `kosModel.ts` (`injectDependencies`) creates unless `lazy`, ignoring the policy; the policy is only honoured by `resolveDependentModel` in `model-utils.ts`. SDK defect; logged, not yet fixed.
- `modelsProperty` rename is not reflected in `KosContainerAwareWithProp`'s typing (`team.roster` is untyped; `team.members` is the typed handle).
- The codex backend's `POST /api/codex/objects` and `PUT` answer 200 with the standard `{status, version}` envelope and no `data`. (An earlier note here said "no body"; that was wrong, see the 2026-09-08 correction below.)

## model-effects (counter)
- tool: `add_model_effect onCountChanged`, `add_property milestone`. hand-added: `dependencies`, `options.fireImmediately` (the tool emits an empty dependencies list).
- verified: "at the floor" on setup (fireImmediately), milestone at 5, reset.

## config-properties / config-conversion (widget, codex backend `studio:service:codex`)
- tool: `add_config_property` ×3 (enabled, colors, volume). hand-added: `lazy`, `serviceBasePath`, `optionsExpander`, `converter`, `formatter`; `@kosConfigBean` (no tool). App wiring: `registerConfigServicePathMapper('/api/config')` and `registerRegionServicePathMapper('/api/regions')` on the dispense extension manager in registration.ts (as the previous codex did).
- verified: enabled toggles and persists on the codex backend; colors HIGH_CONTRAST/DEFAULT; options from the expander; volume 355 (display, fluid-ounce) → raw 10499 ml.
- observations: unit ALIASES collide across measures ("oz" = fluid-ounce and mass ounce) → "Cannot convert between units of different families"; unit NAMES ("milliliter", "fluid-ounce") work. `updateProperty` takes the display-unit value. `IConfigBeanModel` exposes `schemaKeys`/`props`/`values`, not a `bean` object.

## state-machine (session)
- no tool for `@kosStateMachine`, `@kosStateGuard`, `@kosStateEntry/Exit`; hand-written from `kos-state-machine.ts`. `throwOnInvalid` lives in the machine's second (options) argument and on the guard.
- verified: guard refuses `record` in idle/locked, allows in active; entry/exit handlers fire; `closed` is terminal; invalid transitions are silent with `throwOnInvalid: false`.

## companion-models / multi-futures (session → timer)
- tool: `add_companion timer` (composition). It emitted NO `@kosCompanion` decorator (only an `options.companionParent` field), imported `SessionModel` from the bare project name `core-concept-models`, and `register_model kind:companion` is unimplemented → the chain entry `.companion(Session.type, Timer.type)` was written by hand. `@kosCompanion` and `@kosMultipleFutureAware` hand-written.
- `getKosCompanionModel(parent, type)` takes the type STRING; the companion guide shows `getKosCompanionModel(model, Type)`.
- verified: timer created with the session (`timer-model-session-companion`); two aliased futures on the codex backend run concurrently with independent progress; `onFutureUpdate` receives the alias.

## logging (session)
- `loggerProperty: 'log'` cannot be used on a model that calls `executeServiceRequest` — the helper's parameter type requires a `logger` property. Moved the exemplar from task to session.
- verified: lines logged.

## view-models (widget)
- no tool. `useViewModel(factory, deps)` returns `{ viewModel, ready, error }`; the resource shows no call shape.
- verified: display follows frames; unit toggle only changes the ViewModel.

## context-and-reload (document)
- `@kosContext` (no options) appends the context bean; `@kosReloadAware` marks self-managed reload. verified: reload() reconciles from the codex backend; describeContext reads the bean.

## troubles (session)
- `@kosTroubleAware` hand-written. The SDK trouble container is a singleton dependency that loads `/api/kos/troubles` (device path, no path mapper) → against the codex backend it fails to load unless a KosMock setup answers it; `fixtures/setups/codex-troubles.mjs` does, served by `kosui fixtures serve --dir fixtures`. Topics: `/kos/trouble/add` (TroubleResponse body), `/kos/trouble/remove` (the id string).
- verified (fixture server on 5676): the setup's `/api/kos/troubles` route lets the container load; a frame on `/kos/trouble/add` shows up on the session and `/kos/trouble/remove` (body = the id string) clears it.
- observations: a trouble's `ifaces` are trouble-MAPPER ids, not model paths. The SDK registers `path` (reads the trouble's top-level `path`) and `nozzle`; a trouble whose ifaces name nothing registered indexes nowhere and `@kosTroubleAware` sees nothing — silently. Took three tries to find; nothing in kos:// says it. The trouble container's model `data` is the response minus the known fields, so `path` must be top-level, not in `clientData`.

## topic-catch-up (document)
- tool: `add_topic_handler onNoteDelta`; hand-added `requiresBaseline` and `replay`. Choreography in `fixtures/setups/codex-catch-up.mjs` (observe onRequest/onResponse → publishTopic; responses correlate to requests by `requestId`, they carry no path).
- verified (fixture server on 5676): the delta pushed while the baseline was in flight was queued ("Baseline not ready … Queuing message") and applied after the response; the post-response delta applied; manual deltas apply. The handler had to register at INIT — at READY both frames had already passed and were dropped, not queued. `replay.bufferSize` produced no observable delivery; the offline queue did the work.

## Rendering
- Storybook's MDX does not render GitHub-flavoured tables by default; the "How it was built" tables rendered as literal pipes until `remark-gfm` was installed and passed through the docs addon's `mdxPluginOptions.mdxCompileOptions.remarkPlugins` in `.storybook/main.ts`. Repo configuration, not a KOS gap.

## futures — adding a future to an existing model (project)
- tool: `add_future_to_model project complete` (dry-run, then write). It added `@kosFutureAware()`, the `KosFutureAwareFull` merge, `ExternalFutureInterface` on the public type, a placeholder `@kosFuture performLongRunningOperation`, an `onFutureUpdate` hook, and a `services/project-services.ts` with a progress type AND a standalone `performProjectOperation` stub that throws "not yet implemented".
- tool: `add_service_request startSync` (method mode) on the codex backend's additional-data path; `add_property lastSync`.
- filled: placeholder replaced by the decorated request (as the placeholder comment says to); `onFutureUpdate` body.
- hand-added: `@kosFuture({ trackerPolicy: 'context' })` above the request; the argument list; deleted the throwing `performProjectOperation` stub, which the decorated form never calls.
- observations: the future generator's stub pattern (`performProjectOperation` + `futureHandler.setFuture`) predates the typed decorated request; when the operation is a `@serviceRequest` the stub is dead code that throws if anything imports it. Candidate: `add_future_to_model` should skip the services stub when the project has typed service modules, or emit the decorated form.

## Snippet viewer (correction)
- The pages now render code through the `<snippet-viewer>` web component loaded from its published distribution (https://subtle-kashata-528e61.netlify.app/snippet-viewer.js); the extract target writes `public/snippets.json` and Storybook serves both from its origin (`staticDirs`, `preview-head.html` sets `snippet-host` and loads the script). Until this point the pages used a `Snippet` component over Storybook's `Source`, following the old codex — the viewer was a stated requirement I had not carried over.
- verified: 9 viewers on the simple-model page, code present in their shadow roots, `/snippets.json` 200, no missing keys.

## config-conversion (depth pass)
- Regions: `RegionInfo` is an SDK model; `describe_sdk_model region-info` + `add_dependency` (with the wiring it returns) put it on `widget`. `setSelectedUnitSystem` writes `unitSystemId` on the region config source, so the switch is a real backend write and every property re-derives.
- Resolution (from `config-bean-prop-model.ts`): schema `format` → measure via the region's unit map → the region's default unit for that measure in the selected system is the "to" side; same-system means no conversion. An explicit `converter` fills `from` from the schema format and `to` from the region default when omitted. Decimals: schema per-unit-system `options.decimals`, else the unit tuple's `decimals`. Formatter: `Intl.NumberFormat`, default `{ style: 'unit', unit }` + decimals; a function formatter receives the unit system. `unit` is read back from `formatToParts`. `displayOptions`/`options` come from the schema's `unitSystems[system]` block (rangeInterval, rangeCount, list, keypad) or enum values; `optionsExpander` overrides.
- the codex backend's bean is built for this: `volume`/`other_volume` (`format: "ml"`), `unitSystemRangeInterval` (per-system range/interval/decimals), `colors` (enum), `codex_name` (String).

## Snippet granularity (extractor features)
- Markers now sit on individual decorator options (`converter`, `formatter`, `lazy`, `serviceBasePath`, `optionsExpander`) and on single members (`regionInfo` dependency, region read vs write), so each paragraph discusses one small piece. A marker nested inside a node CUTS the enclosing snippet at that line (seen on team-container), so a decorator is shown either whole or in pieces, not both.
- Still to do across the earlier pages: replace whole-decorator/whole-method snippets with option-level pieces and `ignore start/end` where bodies are long.

## Snippet refactor — COUNTER

### simple-model.mdx (ordered)
1. `counter-model@counter-model.ts` (3) — `MODEL_TYPE` constant + the `@kosModel({ modelTypeId, singleton })` annotation alone (additive: two markers).
2. `counter-logger@counter-model.ts` (1) — `@kosLoggerAware()` alone.
3. `counter-options@index.d.ts` (1) + `counter-constructor@counter-model.ts` (4) in one viewer group — the empty options interface and the constructor (scaffold placeholder `if (options)` block stripped with `ignore start/end`).
4. `counter-lifecycle@counter-model.ts` (7) — `init` + `load` (additive).
5. `counter-count@counter-model.ts` (9) — the `count` field + `increment` + `reset` (additive).
6. `counter-floor@counter-model.ts` (8) — `get isAtFloor` + `decrement`, the method that uses it (additive).
7. `counter-bean@counter-model.ts` (5) — public `CounterModel` type + `static Registration` + `export const Counter` (additive, three segments).
8. `registration-chain@registration.ts` (read-only, unchanged).
9. `use-counter@use-counter.ts` (10), 10. `with-counter@with-counter.tsx` (19), 11. `counter-view` (14) + `counter-view-connected` (1), 12. `counter-story` (3) — unchanged.
Removed name: `counter-actions` (its members are now split across `counter-count` / `counter-floor`); no other MDX referenced it.

### model-effects.mdx (ordered)
1. `counter-effect@counter-model.ts` (12) — the `@kosModelEffect({ dependencies, options: { fireImmediately } })` decorator + `onCountChanged` as one unit (the doc comment above the decorator is not captured by the marker).
2. `counter-effect-state@counter-model.ts` (3) — the `count` field it depends on + the `milestone` field it writes (additive; `count` carries two stacked markers, `counter-count` and `counter-effect-state`, each captures the field).
3. `model-effects-view@model-effects-view.tsx` (14), `model-effects-view-story@…stories.tsx` (8) — unchanged.

### Extractor behaviour worked around
- A marker directly above the FIRST of two stacked class annotations captures just that annotation, but a marker above the LAST annotation captures the class (cut at the next nested marker). Fixed with `// extract-code end counter-logger` placed between `@kosLoggerAware()` and `export class` — a terminator right after an annotation yields the 1-line annotation.
- Single-node `// extract-code ignore` on the `if (options) {}` block left the blank line before it in the snippet; `ignore start` placed above the blank line + `ignore end` after the block strips it cleanly.
- `.d.ts` files under the scanned roots ARE extracted (`counter-options@index.d.ts`), so the options interface can be shown from `types/index.d.ts`.
- Stacked markers on one field (`count`) both capture it — no cut, no duplication.

### Checks
- extract OK; whole-class check lists no counter snippet; `check-coverage` OK (simple-model and model-effects claims proven); `tsc` core-concept-models clean; `tsc` model-components fails only in other groups' files (team `roster`, unused story vars) — no counter file in the list.

## Snippet refactor — WIDGET
Files: `widget-model.ts`, `widget-view-model.ts`; pages topic-handlers, topic-filtering, topic-rate-control, topic-flow-control, topic-addressing, config-properties, config-conversion, view-models.

**widget-model.ts** — the `widget-model` marker (308-line whole class) is gone; nothing referenced it. Every topic handler snippet is now additive: a marker on the field(s) the handler writes (in the field block) + the same name on the decorator, so each snippet reads "the state, then the decorator + method". Adjacent field pairs are grouped with `extract-code end <name>`. `widget-region-dependency` was yielding the single token `private` (the marker sat between `@kosDependency` and the field, so the next node was the modifier) — moved above the decorator, now yields decorator + field. `widget-region-read` extended with an `end` terminator to cover all three getters the view reads.

**widget-view-model.ts** — `widget-view-model` (whole class) replaced by four snippets: `view-model-decorator` (marker + `end` over the two class annotations), `view-model-state` (`unit` field + constructor, `end` terminator), `view-model-computed` (`display` + `isHot`, `end` terminator), `view-model-action` (`toggleUnit`).

Per page (name → shows, lines):
- topic-handlers: `topic-websocket` (temperature field + handler, 10) → `topic-local` (pings + handler, 10) → `topic-skip-parse` (rawFrame + handler, 11) → `topic-handlers-view` (15) → `topic-handlers-story` (27).
- topic-filtering: `topic-condition` (threshold + alerts + handler, 12) → `topic-filter` (13) → `topic-transform` (14) → `topic-once` (11) → `topic-filtering-view` (17) → `topic-filtering-story` (17).
- topic-rate-control: `topic-debounce` (2 counters + handler, 14) → `topic-throttle` (12) → `topic-buffer` (13) → `topic-rate-view` (16) → `topic-rate-story` (20).
- topic-flow-control: `topic-flow-batch` (2 counters + handler, 22) → `topic-flow-rate-limit` (14) → `topic-flow-errors` (2 counters + handler, 22) → `topic-flow-view` (17) → `topic-flow-story` (14).
- topic-addressing: `topic-wildcard` (11) → `topic-destination` (12) → `topic-addressing-view` (14) → `topic-addressing-story` (14).
- config-properties: `config-property` (enabled binding, 2) → `config-lazy` (1) → `config-service-base-path` (1) → `config-options-expander` (4) → `config-bean` (6) → `config-properties-view` (16) → `config-properties-view-story` (8). Prose added to say the three option fragments belong to the `colors` binding.
- config-conversion: "How it was built" moved above the region section (region row first) so no snippet precedes its step; the region group split into three viewers: `widget-region-dependency` (2) → `widget-region-read` (11) → `widget-region-write` (3) → `config-conversion-implicit` (2) → `config-converter` (1) → `config-formatter` (4) → `config-display-options` (5) → `config-conversion-view` (18). Prose added to say converter/formatter are options on the `otherVolume` binding.
- view-models: `view-model-decorator` (2) → `view-model-state` (3) → `view-model-computed` (10) → `view-model-action` (4) → `view-models-view` (20); the step table now lists the class's parts in that order.

Extractor behaviour (probed on a scratch file):
- A SINGLE marker above a class decorator captures the whole class, decorators included. Only when markers are STACKED does each capture its own annotation — and the LAST stacked marker still captures the annotation plus the class. To get "just the annotations" from one marker use `extract-code end <name>` right after the last annotation.
- A marker placed between a decorator and its field captures the next token (`private`), not the field. Markers go above the decorator.
- Option-level markers (`lazy`, `serviceBasePath`, `optionsExpander`, `converter`, `formatter`) each yield exactly that property, verified.
- `end` terminators work inside class bodies (fields, getters, constructor); additive field + method works; nested markers inside a captured class did NOT cut the enclosing snippet in the probe (the cut seen elsewhere has some other trigger).
- `config-property` marker sits above a JSDoc; the doc comment is not emitted (capture starts at the decorator).

Also: `view-models-view.stories.tsx` failed `tsc` (TS6133, `noUnusedParameters`: destructured `widget` never read in the story's `Actions` HOC callback). Changed the parameter to `_props` — signature only, no behaviour change. The same pattern fails in `troubles-view.stories.tsx` and `model-dependencies-view.stories.tsx` (other groups). `codexName` on the widget has no marker and no page uses it; left alone.

## Snippet refactor — TEAM/USER/NOTE
- Whole-class captures removed: `team-container` (was 86 lines, the whole TeamModel), `user-model` (was 52 lines), `note-model` (was 33 lines). Names dropped: `team-members`, `team-index-queries`, `user-constructor` (only my three pages referenced them; all references updated).
- container-models, in page order: `team-container@team-model.ts` → `@kosContainerAware` annotation with `containerProperty`/`modelsProperty`/`includeGetters`/`includeMethods`/`containerOptions.extensionId`; `sortKey` and `indexMap` stripped for this page (9) · `team-container-type` → the merged interface typing `members` (3) · `team-lead` → `@kosChild` field (2) · `team-init` → lead created in `init()` (7) · `team-add-member` + `team-remove-member` in one viewer (7 + 3) · `team-lead-name` → getter over the child (3) · view · story.
- container-indexes: `team-indexes@team-model.ts` → the same annotation reduced to `containerOptions.sortKey` + `indexMap` (9) · `team-index-by-role` → `getIndexByKey` (3) · `team-index-keys` → `getIndexKeys` (3) · view · story.
- parent-and-child: `user-parent-aware@user-model.ts` → the `@kosParentAware({ parentId })` annotation alone (1) · `team-context-key@team-model.ts` → team constructor setting `teamId`, options block stripped (9) · `user-team-id` → user constructor reading `teamId`, options block stripped (11) · `user-team` → additive: the `kosContext` field + the `team` getter (5) · `team-enroll-child@team-model.ts` → additive: `init()` (logger line stripped) + `addMember`, both passing `kosParentId: this.id` (14) · view · story.
- `note-model@note-model.ts` is now the 1-line `@kosModel(... optionsRequired: true)` annotation. No MDX references it; it stays so `optionsRequired:` remains in extracted source for the coverage gate.
- Extractor behaviour (probed in the scratchpad before editing): (1) a lone marker above the FIRST annotation, or the LAST marker in a stack, captures annotation + class — `// extract-code end <name>` right after the annotation's `)` limits it to the annotation; needed for `team-container`/`team-indexes`, `user-parent-aware`, `note-model`. (2) Two names stacked on one annotation both capture it, and `ignore start/end <name>` / `ignore <name>` inside the annotation strip per-name without cutting — this is how one decorator yields the two page-specific views. (3) A marker on a decorator OPTION nested inside a captured annotation cuts the enclosing snippet at that line (confirmed), so the indexes page uses scoped ignore rather than an option-level marker. (4) A doc comment between a marker and its node is dropped from the capture (`membersByRole`/`initials` doc comments do not render; the MDX prose carries them). (5) A marker placed above an `eslint-disable-next-line` comment still captures the interface below it and keeps the eslint directive on the right line.
- Not done: the `UserOptions extends KosParentAware` type lives in `models/user/types/`, outside my file list, so the parent-and-child page describes it in prose rather than showing it.
- Checks: extract OK; whole-class check reports only `document-reload-aware@document-model.ts` (outside this group); `check-coverage` OK; both tsc runs pass.

## Snippet refactor — SESSION/TIMER
Pages: state-machine, logging, troubles, multi-futures, companion-models. Models: `session-model.ts`, `timer-model.ts`. Runtime untouched; only markers, comment placement and MDX changed.

**state-machine** (session): `session-states` (2, the `SessionState`/`SessionEvent` unions, grouped with `end`) → `session-state-machine` (13, the whole `@kosStateMachine` decorator: config + `{ throwOnInvalid: false }`) → `session-transitions` (15, the four wrapper methods, grouped with `end`) → `session-guard` (4, `@kosStateGuard` + `record`) → `session-entry-exit` (14, the three entry/exit handlers, grouped with `end`) → `state-machine-view` → `state-machine-view-story`.
- Option-level markers inside the `@kosStateMachine` config were probed and rejected: a nested marker cuts the enclosing snippet at that line (confirmed on a scratch file — the decorator snippet shrank to `@kosStateMachine<S, E>(` + `{`), so the reader would never see the decorator shell. A whole decorator is the unit Mark allowed; the option meaning goes in prose.

**logging** (session): `session-logger-aware` (1, `@kosLoggerAware({ loggerProperty, loggerContext })`) → `session-logger-group` (1, `@kosLogger({ group })`, terminated with `end` before `export class`) → `session-logger-field` (5, the merged interface declaring `log: KosContextLogger`) → `session-log-use` (6, additive: the `lines` field + the `note` method) → `logging-view` → `logging-view-story`. The old `session-logging` (26 lines, the class) is gone; no other MDX referenced it.

**troubles** (session): `session-trouble-aware` (1) → `session-trouble-path` (1, the `path` field) → `troubles-view` → prose on `fixtures/setups/codex-troubles.mjs` and the two topics (file is read-only and has no marker) → `troubles-view-story`.

**multi-futures** (timer): `timer-multi-future` (1, `@kosMultipleFutureAware`, terminated with `end` before `@kosLoggerAware()`) → `timer-merge` (4, the interface merge with `KosMultipleFutureAwareFull<'short' | 'long'>`) → `timer-future-short` (9) → `timer-future-long` (9) → `timer-future-update` (3) → `multi-futures-view` (18, additive: the `timer()` companion lookup helper + the component) → `multi-futures-view-story` (newly shown). The old `timer-multi-future` (17 lines, the class) and `timer-futures` are gone; nothing else referenced them.

**companion-models** (timer): `timer-companion` (6) → `timer-parent-field` (1, `declare readonly session`) → `timer-parent-read` (3) → `registration-companion@registration.ts` (unchanged, read-only) → `companion-view` → `companion-view-story` (newly shown).

Extractor behaviour worked around:
- The last decorator(s) above a class capture the class too unless terminated: `// extract-code end <name>` between the decorator and `export class` works and yields just the decorator.
- A `/** doc */` comment that sits between a captured decorator and the next marker is swept into the PRECEDING snippet (seen: `session-trouble-aware` grew to 4 lines, `timer-companion` to 7). A doc comment placed directly after a marker is dropped from that snippet. So the marker must go above the doc comment, not between it and the node.
- A nested marker cuts the enclosing snippet (re-confirmed); composition done with additive names and `end` instead.
- Whole-class check after my extract: only `document-reload-aware@document-model.ts` remains, outside this group. Coverage gate OK. Both `tsc` runs pass.
- `tsc` model-components: the only errors touching this group are the pre-existing `team.roster` ones (`Property 'roster' does not exist on type 'TeamModel'` in container-models-view.tsx/.stories.tsx and parent-and-child-view.tsx) — the known SDK typing gap already logged in tooling-gaps.md (`modelsProperty` rename is not typed by `KosContainerAwareWithProp`). Not caused by this refactor (comments and MDX only) and not fixable without a type change outside the brief's scope.
- `tsc -p libs/model-components/tsconfig.lib.json` flagged TS6133 (unused destructured `session`) on the story-apparatus `Actions` strip in `companion-view.stories.tsx` and `troubles-view.stories.tsx` — pre-existing, not from this refactor. Renamed the unused parameter to `_props` (type-only, no runtime change, not inside any snippet). The 6 remaining errors are in `container-models-view`, `parent-and-child-view` (`roster` on TeamModel) and `model-dependencies-view` — other groups.

## Snippet refactor — PROJECT/TASK

### container-capacity (project-model.ts)
1. `tasks-container` — `@kosContainerAware` with only `containerProperty` and `sortKey`; the capacity options are stripped by a scoped `ignore start/end tasks-container` (6 lines)
2. `project-interface` — the `ProjectModelImpl` interface merge that types `tasks` (4 lines)
3. `tasks-capacity` — `maxCapacity` + `evictionBatchSize` option pairs, grouped by `end tasks-capacity` (2 lines)
4. `tasks-eviction` — `evictionStrategy` + `customEvictionFilter` pairs, grouped by `end tasks-eviction` (2 lines)
5. `project-add-task` — additive: `taskSeq`/`evicted` fields (terminator-grouped) + `addTask` method (14 lines)
6. `container-capacity-view` (21) → `container-capacity-view-story` (8) → Canvas
- Removed `tasks-capacity` as the 118-line whole-class capture and `project-tasks` (was a 1-line capture of `taskSeq`); no other MDX referenced either.
- `containerOptions` properties were reordered (maxCapacity, evictionBatchSize, evictionStrategy, customEvictionFilter) so each pair of options is contiguous for a terminator; object-literal order, no behaviour change.

### futures (task-model.ts, project-model.ts, project-sync-view)
1. `task-future-aware` — the annotation alone, bounded by `end task-future-aware` (1 line)
2. `task-future` — the `@kosFuture({...})` decorator only, truncated by the next marker (6 lines)
3. `task-future-signature` — `@serviceRequest` + method header with the three-parameter signature; the body is hidden by a scoped `ignore start/end` and the snippet is bounded by a terminator so the nested body marker does not truncate it (11 lines)
4. `task-future-body` — the `executeServiceRequest` call carrying the tracker, terminator-grouped (6 lines)
5. `task-future-update` — `onFutureUpdate` (6 lines)
6. `futures-view` (18) → `futures-view-story` (8) → Canvas
7. Adding a future to an existing model: `project-future-aware` (1) → `project-future` decorator + method (12) → `project-future-update` additive `lastSync` field + `onFutureUpdate` (6) → `project-sync-view` (16) → `project-sync-story` (8) → Canvas
- Removed the 31-line `task-future-aware` whole-class capture. `lastSync` moved next to `onFutureUpdate` so the field and the hook compose as one additive snippet (field order only).

### model-dependencies (project-model.ts)
1. `project-dependency` — the CREATE `@kosDependency` + `team` field (8 lines)
2. `project-dependency-optional` — the CONTINUE `@kosDependency` + `counter` field (6 lines)
3. `project-dependency-reads` — all three getters, now bounded by `end project-dependency-reads` (was capturing only `teamId`, 3 lines; now 13)
4. `model-dependencies-view` (15) → Canvas
- The two declarations were one viewer group; they are now separate steps with the `optionsRequired` section between them, since it refers to the CREATE one.

### Extractor behaviour worked around
- A marker above a class-level decorator captures the decorator run **plus the class** unless a later start marker or an `extract-code end <name>` terminator bounds it. The terminator between two decorators is what makes the 1-line annotation captures (`task-future-aware`, `tasks-container`) — a following marker also works, but only a terminator avoids minting a spurious snippet for `@kosLoggerAware()`.
- A start marker nested inside another snippet's span truncates the outer snippet at that line **only when the outer snippet has no terminator**. With `extract-code end <outer>` present the outer is sliced to the terminator and nested markers (their lines stripped) are harmless — this is how option-level markers live inside `@kosContainerAware` and the body marker inside `startAdditionalData` without cutting the parent.
- A marker inside an object literal captures the `pair` node without its trailing comma; a terminator after the last wanted pair captures the run with commas intact.
- Intervening comments between a marker and its node are skipped, so the doc comments above `team`, `counter`, the reads and `onFutureUpdate` do not appear in snippets; comments *inside* a span are kept, so the capacity note was moved inside the scoped ignore block.

### Not done / outside the group
- Whole-class check still names `document-reload-aware@document-model.ts` (DOCUMENT group).
- `tsc` on model-components reports `roster` errors from `team-model.ts` (TEAM group, mid-edit). One pre-existing TS6133 (`project` destructured but unused) in `model-dependencies-view.stories.tsx` was fixed by renaming the parameter to `_`; no behaviour change.

## Snippet refactor — DOCUMENT
Files: `document-model.ts`, `services/document-services.ts`, and the six MDX pages. No runtime change; one comment moved inside `addNote` (below the guard line) so it lands in the tuple snippet.

**services** — `endpoint-catalog@document-services.ts` (3: the `DocumentEndpoints` shell with the first `GET` entry) → `endpoint-writes` (3: add/modify/remove) → `endpoint-provisional` (2: the two `as ApiPath` entries, both PROVISIONAL doc blocks stripped) → `service-load@document-model.ts` (13: the stats LOAD request with only `lifecycle` + `transform`, plus `onStatsLoaded`) → `service-method` (3: `addNote` decorator + signature, empty body) → `service-request-tuple` (9: the `$ctx.$request({ body })` body) → `service-path-params` (10: `modifyNote` whole; `removeNote` dropped from the snippet, named in prose) → `service-condition` (1) → `service-request-options` (1) → view → story. Removed names: `document-endpoints`, `service-method-body`, `service-method-path` (only this page referenced them).

**service-mapping** — `notes-mapper@document-services.ts` (7: type + mapper, was 3 — the const was never captured before) → `service-mapping` (3: decorator shell, `lifecycle` only) → `service-transform` (1) → `service-iterate-over` (1) → `service-mappings` (4) → `service-model-factory` (2: `modelFactory` + `idExtractor`, end-terminated) → `service-mapping-handler` (5: `onNotesLoaded`) → `service-reload` (7: decorator + `executeServiceRequest`, reconcile body hidden) → `service-reload-reconcile` (13: rows mapping + `resolveContainerDeltas`) → view → story.

**service-caching** — `service-load` (13, shared with services) → `service-cache` (6: the `cache` option) → `service-cached-value` (8) → view → story. Prose corrected: `maxSize` is "future use" in the SDK types, not a live bound.

**service-errors** — `service-error-request` (8: decorator with `transform` + `loadNote` signature, empty body) → `service-error-handler` (10: the `errorHandler` option) → `service-error-method` (9: `loadNote` whole) → view → story. Removed name: `service-errors`.

**topic-catch-up** — `topic-catch-up` (7: `@kosTopicHandler` with lifecycle/topic/websocket only) → `topic-requires-baseline` (5) → `topic-replay` (1) → `topic-catch-up-handler` (16: `onNoteDelta`) → view (newly on the page) → story.

**context-and-reload** — `document-context` (5) → `document-reload-aware` (1: just the annotation; was 7 lines and swallowed `export class … id: string;`) → `document-reload` (4) → view (newly on the page) → story.

Extractor behaviour worked around (read from `extractSnippets.mjs` and confirmed on a probe file):
- A marker on a class-level decorator captures the whole decorator run + class up to the NEXT start marker anywhere in the file (a decorator node has no `body` field, so the "stop at the body" guard never engages). `// extract-code end <name>` directly under the annotation is what yields a 1-line capture.
- An explicit `end <name>` terminator also DISABLES the nested-marker cut: with a terminator after the member, option-level markers can sit inside the decorator and the enclosing snippet survives intact. Every shell snippet here (`service-load`, `service-mapping`, `service-method`, `service-error-request`, `topic-catch-up`, `service-reload`, `endpoint-catalog`) relies on this, with `ignore start/end <name>` scoped to the shell to hide the options that get their own step.
- Without a terminator, a decorator containing an arrow function (`condition`, `onError`) makes the cut boundary land inside the decorator, so a marker between decorator and method would NOT cut the enclosing snippet — the terminator makes the behaviour predictable either way.
- A marker placed between a decorator and its method captures the method alone (confirmed; `widget-region-dependency` in snippets.json shows the decorator too, so that key is stale relative to source).
- `firstTokenAfter` skips comments: a marker above a JSDoc excludes the JSDoc, and a marker cannot capture a comment as its first line — hence the comment move in `addNote`.
- Ignore blocks with different scope lists nest correctly (`endpoint-provisional` inside `endpoint-catalog`).
- End-terminated groups inside an object keep the trailing comma on the last line (`endpoint-writes`, `service-model-factory`); single-pair captures do not.

Checks: extract clean (no warnings); whole-class check prints nothing; `check-coverage` OK; `tsc` core-concept-models passes; `tsc` model-components fails only on `team.roster` in container-models-view / parent-and-child-view (TEAM group, `modelsProperty` typing — pre-existing, not touched here).

## Snippet refactor — integration pass (2026-09-06)
- Extract: 191 snippets; none contains `export class`. Largest snippet is now 27 lines (a story); the largest model snippet is 22 lines (one topic handler with its state).
- Coverage gate: OK, 27/27 pages. Every `<Snippet name=…>` reference in the 27 MDX files resolves to a key in `public/snippets.json`.
- Storybook built; all 27 docs pages loaded headless: every `<snippet-viewer>` rendered code, none reported a missing snippet. All 28 stories loaded with live values (none on "loading…"); the two views showing a `lastError` row are the services and service-errors pages, where that label is part of the readout, not an error.
- Config conversion verified against the codex backend (the SDK `defaultUnitSystem` change was later found unnecessary and reverted; see the region-settings note below): `us` shows 355 ml as 12 fl oz, `si` shows 355; `otherVolume` formats "fluid ounces" (long, 1 decimal) in `us`; `rangeInterval` exposes displayOptions `{start:0,end:100,interval:13,decimals:1}` and 9 options.
- `<snippet-viewer>` is loaded from its published distribution (https://subtle-kashata-528e61.netlify.app/snippet-viewer.js) via `preview-head.html`; the vendored copy in `public/` is gone.
- Extractor findings from the six groups (all in the sections above): a marker on the last class-level decorator captures the class unless an `end` terminator follows; a nested marker cuts an unterminated enclosing snippet but is harmless inside a terminated one; a doc comment between marker and node is dropped, and one after a captured decorator is swept into the preceding snippet.

## Region settings correction (2026-09-07)
- Mark challenged "config properties throw before the region has loaded". Checked: the property model holds a CREATE dependency on RegionInfo and RegionInfo.ready() awaits the settings bean, so there is no load-order race. With the unmodified 3.0.20 bundle the story renders correct values from the first sample.
- The original throw came from the codex backend's `kos:service:region:settings` having no `unitSystemId` (empty schema, no defaults). It now returns `overrides: { unitSystemId: "us" }` on the root scope, which the story's own "unit system → us" action wrote through `setSelectedUnitSystem` → modify config bean. That write persists in Studio.
- Reverted the SDK change and deleted its test: returning "" instead of "undefined" still throws in `getDefaultUnitDecimalPlaces` ("Measure and unit system are required"), so it was not a fix.

## Services correction (2026-09-08)
- Mark: the document model's mutations used the raw `$ctx.$request` tuple instead of `executeServiceRequest`. I had assumed the codex backend's writes returned no body and that the helper would treat that as failure. Probed: POST/PUT/DELETE return the `{status, version}` envelope, which the helper accepts. Switched `addNote`, `modifyNote`, `removeNote` to `executeServiceRequest`; verified headless against the codex backend (add → 3 notes, remove → 2, no logged failures). The services page now shows `service-request-body` in place of the tuple snippet; no request method in the codex uses the tuple any more.
- Side effect on the codex backend: my curl probe created codex object id 1 ("id=1 revision=0"); it is still there.

## Status-code assumptions (2026-09-08)
- Mark: KOS practice is payload envelopes with embedded errors, not 201/204 or other HTTP status semantics. Dropped the "201 responses type as `{}`" gap entry (moot), reworded the requested `GET /api/codex/objects/{id}` contract to leave the unknown-id response to the endpoint owner (today: missing-route HTTP 404, empty body, for every id), and withdrew the claim that a 204 would trip `executeServiceRequest`'s empty-body check.

## Write path redesign (2026-09-08)
- Mark's rulings: a mutation closes its loop from the RESPONSE (item / list / bare success), never by re-reading the list and never via a topic echo; topic handlers are for out-of-band events. KOS responses are envelopes; no HTTP status semantics.
- Codex backend (`kos-studio-2`, uncommitted): POST honours a client id and returns the object; PUT returns the object; new GET /objects/{id} and GET /objects/stats. Compiles; verified on the restarted process.
- Codex: types regenerated (`kosui api:generate --studio`); the two provisional entries became real (`as ApiPath` gone, Raw aliases derived from the spec, `provisionalServiceRequest` → `serviceRequest`, `mocks/` module deleted, preview no longer arms mocks). `addNote` sends a client-chosen id and builds the note from the returned object; `modifyNote` updates the one note from the returned object; `removeNote` removes in place on the bare success; no mutation calls `reloadNotes` (it remains the explicit reconcile on the service-mapping page).
- Setups are now per story via `parameters.kosSetups` (preview loader loads the named setups and unloads the rest), which ends the catch-up choreography leaking into the services story (the count dip Mark saw).
- Errors page: unknown id = success without data (not an error); malformed id = real failure (`status: 500` envelope) → `errorHandler`.
- Verified after the rework: services story add → "#1: id=1 revision=0" from the returned object, modify → "revision=1" from the returned object with the count steady through the request (20 samples), remove → in place. Caching story loads real stats. Catch-up and troubles stories load their own setups. Errors story: malformed id → `HTTP 500` via onError; unknown id exposed the client's envelope fallback (logged in tooling-gaps).
- `modelFactory` cast: SDK declaration widened (uncommitted) with a type test; the codex keeps the cast until the published SDK carries it. `executeServiceRequest` verified (type probe) to return the mapper's type; the generated mapper is the identity, so the services page now says the mapper is where the wire shape becomes the model's shape. Dropped the redundant `NoteRow` annotation.

## No fixture server (2026-09-08)
- Codex backend test endpoints (uncommitted, kos-studio-2): frame publisher, out-of-band added/removed, racing baseline. Codex: new `device` model (singleton; three method-mode requests via add_service_request) drives every story's device-side action through the backend; new `journal` model (container of notes, LOAD on the race endpoint, handlers on the real `added`/`removed` topics with requiresBaseline + replay) is the Topic Catch Up exemplar; `document` lost its invented `/codex/notes/delta` handler. `fixtures/` deleted; preview has no KosMock at all; README updated.
- Troubles: `@kosDependency` on the trouble container with `options: { servicePath: '/api/troubles' }` (add_dependency, option by hand) creates the singleton before `@kosTroubleAware` looks it up — verified: story loads with no fixture answering `/api/kos/troubles`; raise/clear frames arrive via the backend.
- Verified headless: Topic Catch Up — console shows "Baseline not ready … Queuing message", then `added:3` applied with notes 2 after load; add → 3 notes, remove → 2. Handlers/filtering/rate/flow/view-models stories all move their readouts with frames published by the backend. Addressing: wildcard works; the destination-addressed handler does not fire because broker frames carry no destination (recorded in needed-endpoints as open).
- Mark's rulings this session: the device side is a model calling explicit test endpoints (no generic publish exposed beyond the one test frame endpoint, no server-side switches such as a list delay); the race is a purpose-built endpoint.
- Page retitled "Topics / Lifecycle Race Conditions" (folder and matrix id stay `topic-catch-up`). Added `race-timeline.tsx`, four SVG timelines (frame before the handler exists; during the baseline request; before the request; after the response) each with a "without / with" reading, and an opening paragraph per Mark: not an everyday requirement; usually the baseline is isolated or deltas carry enough context for eventual consistency. Verified: four diagrams render at full width with their labels, 8 viewers, story still shows the queued-then-applied delta.
- Note: every load of the race endpoint adds an object to the backend's in-memory list, so the journal's note count grows across page opens until the process restarts. Dummy data, session-scoped.

## Prose pass — ASYNC/SESSION
Scope: futures, multi-futures, state-machine, logging, troubles, companion-models, and the ui-root README (prose only). No code, markers, snippet references or table commands touched. Grep for the brief's banned patterns is clean across all seven files.

- **futures** (5 sentences): dropped "real" from the additional-data operation; "`$ctx` is the third parameter, not the second" → "`$ctx` moves from the second parameter to the third"; "That is what binds the codex backend's progress frames to this future rather than to a fresh one" → "Forwarding the tracker binds the codex backend's progress frames to this future instead of to a new one"; "`task` was born future-aware. A model that already exists gets the same capability in place: `project` here" → "`task` was scaffolded with future support. An existing model gains the same capability in place. The example is `project`"; "progress climbs" → "progress increases".
- **multi-futures** (0): no offending sentences found.
- **state-machine** (0): "`closed` lists nothing, so it is terminal" and "**record** does nothing while idle" are statements of mechanism, left as is.
- **logging** (3): "Renaming the logger has a cost: … expects a `logger` property … `session` has none" → "Renaming the logger has one constraint. … reads a `logger` property … `session` has no service requests"; "Nothing assigns it: the decorator injects the logger on construction" → "The decorator injects the logger on construction, so the class has no assignment for the field"; "so the view has something to show" → "so the view has a value to display".
- **troubles** (2): the device-side paragraph's semicolon sentence split into two, and "with the right path" → "with that path"; "clear it by id and it goes" → "Clear it by id and it is removed".
- **companion-models** (3): "It is how behaviour is attached to a model you do not own, and how a model's mere existence can start something else" → "A companion attaches behaviour to a model you do not own. Creating the parent creates the companion; the parent's code does not reference it"; "is declared, not assigned" → "is declared without an assignment"; "The decorator says what the timer is; the registration chain says whose … every session brings a timer with it" → "The decorator declares the timer as a companion; the registration chain names the parent type it attaches to … every session is created with a timer".
- **README** (5): "nothing here uses Studio-specific patterns" → "and use no Studio-specific patterns"; "Nothing is mocked: every request and every frame goes to and from the codex backend" → "Every request and every frame goes to and from the codex backend. The codex has no mock layer"; three em dashes in the Planning list replaced with colons.

## Prose pass — DOCUMENT/JOURNAL
Pages: services, service-mapping, service-caching, service-errors, context-and-reload, topic-catch-up, plus the SCENARIOS strings in `topic-catch-up-view/race-timeline.tsx`. Prose only; no snippet references, commands, headings or code changed. Brief grep (dashes, `matters`, `go wrong`, `exactly`, `simply`, `just`, `genuinely`, `honest`, `the point`, `worth`, `not .* but`, `in other words`, `think of`) is clean on all seven files; the only leftovers are the heading "Reload: reconcile, never reassign" (kept for structure) and factual uses of "never"/"even though".

- **services** (10 sentences). Removed "Nothing here hand-rolls `fetch`." Before: "It refuses paths the generated types do not declare, which is what keeps every request honest against the spec." After: "`add_service_request` rejects a path the generated types do not declare, so every catalog entry matches the spec." Before: "What is left in the method is the success path, and the success path closes the loop from the response." After: "The method body then handles only the success path: it applies the response to the model." Before: "Topic handlers play no part in any of this." After: "Topic handlers carry changes made outside the user's own action; the topic pages cover them. The requests on this page do not use them."
- **service-mapping** (6). Before: "A list response is rarely what the model wants to hold." After: "A list response arrives as rows; the model holds child models." Before: "The method receives the models, not the rows: … All that is left is to put them in the container." After: "The method receives one `NoteModel` per array item, already built. It puts them in the container." Before: "Identity is preserved, so nothing flickers." After: "Model identity is preserved: a view bound to an existing note keeps the same model instance."
- **service-caching** (2). Before: "a repeat request inside that window does not replace the data, it renews the clock." After: "a repeat request inside that window keeps the existing data and extends its lifetime." Before: "a cached response is told apart from a fresh one by its timestamp." After: "the timestamp shows whether a response is cached or fresh."
- **service-errors** (5). Before: "Failure policy is declared with the request, not repeated at every call site." After: "Failure policy is declared once, on the request." Before: "A malformed id is a real failure from a real backend, and that is what the policy below handles." After: "A malformed id produces a failure response, which the policy below handles." Before: "It does not handle the failure itself; by the time `executeServiceRequest` hands back `null`, `onError` has already set `lastError`." After: "The failure is handled before the body sees it: `onError` sets `lastError`, then `executeServiceRequest` hands back `null`."
- **context-and-reload** (3). Before: "Two decorators take no options and change how the framework talks to a model." After: "Two decorators take no options. One adds an argument to a method call; the other changes what the framework does with the model on reconnect." Before: "the framework leaves it alone." After: "the framework does not unload or reload it."
- **topic-catch-up** (12). Removed "The seam between the two has a window." and "even" in "before the request was even sent". Before: "This is not an everyday concern. … Reach for the options on this page when a race is real and a delta cannot be applied safely without its baseline." After: "In most models the baseline is isolated from the topics, or a delta carries enough context to be applied on its own, and the collection converges without these options. Use the options on this page when a delta cannot be applied safely without its baseline." Before: "The one choice that matters here is the phase: it must exist before the baseline goes out, so it registers at `INIT`; the LOAD request runs after that." After: "It registers at `INIT`, so the subscription exists before the LOAD request goes out." Before: "which is the race the options below exist to close." After: "which is case B. The options below handle it." Before: "Both run against the baseline, never before it." After: "Both run after the baseline has been applied."
- **race-timeline.tsx** (4 strings, SCENARIOS only; SVG labels were already plain). "exactly once" → "replays it once, on top of the baseline"; title C drops "even"; C.without "applying it first is harmless at best and wrong when it is out of date" → "Applying it first repeats a change the baseline carries, or applies a state older than the baseline."; A.without "The model never learns of the change" → "The model does not receive the change."

## Prose pass — FOUNDATIONS/CONTAINERS
Seven pages, 25 sentences changed in total. Prose only; every snippet reference resolves (50/50), heading levels and page structure unchanged, no em/en dashes remain. Two headings reworded ("Where registration actually happens" → "Where registration happens"; "Which ones go" → "Which models are evicted").

- **simple-model.mdx** (8 sentences)
  - "That is the whole minimum: nothing here talks to a device." → "Those three are the minimum. The model on this page does not talk to a device."
  - "so the floor is enforced by the model and not by whichever view happens to call it" → "reads the same getter and returns early at zero, so the model enforces the floor for every view that calls it"
  - "Scaffolding does not register anything. `register_model` upserts…" → leads with what `register_model` does; the scaffolding fact follows as its own sentence.
- **model-effects.mdx** (5 sentences)
  - "Some state changes need a reaction without a topic behind them." (narrative opener) → the decorator's behaviour comes first, then "It is the reaction for a state change that has no topic behind it."
  - "so derived state is never blank before the first change" → "so derived state has a value before the first change"
  - "it has no idea that one is derived from the other" → "Both are ordinary observable reads; the view carries no knowledge that one is derived from the other." Closing line now quotes the milestone string ("multiple of five: 5") instead of "flip it to a multiple of five".
- **container-models.mdx** (4 sentences)
  - "puts one on a model in place and injects the methods to work it" → "adds one to a model and injects the methods that add and remove members"
  - "Not every child belongs in a collection." (negative opener) → "`@kosChild` enrolls a single field as an owned child of the team, for a child that stands alone rather than in a collection."
  - "which is what ties the children's lifecycle to the team" → "that default ties the children's lifecycle to the team"
- **container-indexes.mdx** (2 sentences)
  - "buckets them by whatever the function returns" → "by the value the function returns"
  - "cross-model reads are computed getters or plain methods over the index, never container queries from a component" → split into two declarative sentences ending "Components do not query the container directly."
- **parent-and-child.mdx** (2 sentences)
  - "through **context**, not references" → "through **context**. A child holds no direct reference to its parent."
  - "which is what a child that must reach up during its own lifecycle needs" → "so a child can reach up during its own lifecycle"; "That option is what `@kosParentAware` reads" → "`@kosParentAware` reads that option".
- **container-capacity.mdx** (7 sentences)
  - "`maxCapacity` is a safety net." → "`maxCapacity` bounds how many models a container holds."
  - "`evictionStrategy` chooses the victims … evicts from whatever it returns … An evicted model is destroyed, not just removed." → "chooses the models to evict … evicts from the models it returns … An evicted model is removed from the container and destroyed."
  - "Nothing here limits how many tasks fit." / "The `tasks` field is not declared on the class:" → both now state what the block and the interface merge do first.
- **model-dependencies.mdx** (2 sentences)
  - "The project needs a team." → "The project depends on a team."
  - "which is why a `user` cannot be resolved as a bare dependency" → "so a `user` cannot be resolved as a bare dependency"

## Prose pass — WIDGET
Eight pages under `libs/model-components/src/lib/components/`. Prose only; no code, markers, snippet references or table commands touched. Final grep for `—`, `–`, ` - `, `matters`, `go wrong`, `exactly`, `simply`, `just `, `genuinely`, `honest`, `the point`, `worth`, `not .* but`, `in other words`, `think of` over the eight pages returns nothing.

- **topic-handlers** (11 sentences, 4 headings): the four em-dash headings became parenthetical (`## websocket: true (frames from the transport)`, and the same for `websocket: false`, `lifecycle`, `skipParse`). "`websocket: true` is what binds the handler to the device: the subscription manager…" → "`websocket: true` binds the handler to the device. The subscription manager…". "Most handlers need no `lifecycle` at all: … and that is the form every other handler on these pages uses. Set `lifecycle` only when…" → "Most handlers set no `lifecycle`. By default the subscription is registered as soon as the model is wired… Set `lifecycle` when registration must be tied to a phase. `READY` waits…; the raw-frame handler below uses it." (one sentence per phase). "The story's "local event" button does exactly that." → "makes that call." Dropped "real" from "the mock transport's real receive path"; note that the strip now goes through `device.publishFrame` on the backend, so "mock transport" may itself be stale (fact left as is per the brief).
- **topic-filtering** (7 sentences, 4 headings): "Not every frame on a topic deserves a method call, and the frame's shape is rarely the shape the model wants. Four options… narrow and reshape what reaches the method" → "Four options on `@kosTopicHandler` decide which frames reach the method and in what shape: … `condition` and `filter` drop frames, `transform` reshapes the payload, and `once` limits the handler to the first matching frame." "so a threshold held in model state is a one-liner: `threshold` is a plain field" → "so a predicate can read model state. Here `threshold` is a plain field". "## once — fire exactly once" → "## once (run for the first matching frame only)"; "applies exactly one of those wrappers" → "applies a single one of those wrappers per handler, chosen in that priority order".
- **topic-rate-control** (2 sentences): "A device that publishes faster than a view can usefully render needs the frames coalesced… three wrappers, and they are **not** variations on one idea: each changes what the method receives." → "A device can publish frames faster than a view can render them. `@kosTopicHandler` offers three wrappers that coalesce frames before the model sees them. Each wrapper changes what the method receives and when it runs."
- **topic-flow-control** (3 sentences): "`flow` is a second, separate pipeline… Where the top-level shortcuts wrap the method, `flow` replaces… before the method ever runs. Three things follow from that, all verified here:" → "`flow` is a second pipeline on `@kosTopicHandler`, separate from the top-level options. The top-level shortcuts wrap the method; `flow` replaces the subscription… before the method runs. Three consequences are verified on this page:". Bullet "discards, it does not delay or coalesce. It is not `throttle`." → "discards the excess frames; it does not delay or coalesce them, which separates it from `throttle`."
- **topic-addressing** (5 sentences, 1 heading): "decide **which** frames a subscription receives rather than what happens to them:" → "decide **which** frames a subscription receives: … The options on the other topic pages decide what happens to a frame after it is received." Routing paragraph split into one sentence per header: "`subscription` carries the pattern the model subscribed with; the transport dispatches on it. `topic` carries the concrete topic; the capture is parsed from it." "used exactly as written" → "used as written".
- **config-properties** (2 sentences): "which it exposes for exactly this purpose" → "which the backend exposes for this purpose". "for one binding, where the app-wide mapper is not what this property wants" → "for one binding. Use it when the bean is served from a path other than the one the app-wide mapper produces."
- **config-conversion** (5 sentences): "with the right number of decimals, the right symbol… does all of that from three sources of truth, and none of it in the view:" → "with a number of decimals, a unit symbol… derives all of that from three sources, and the view does none of the work:". "`converter` takes over when the schema is silent" → "`converter` sets the conversion when the schema declares no format". "Two things decide how a number is written." → "The decimals and the formatter decide how a number is written." `oz` aside moved into parentheses.
- **view-models** (2 sentences): "Not every piece of state belongs on a data model. Which unit a panel shows, which row is expanded, whether a warning is dismissed: that is UI state, and it lives in a ViewModel." → "UI state, such as which unit a panel shows, which row is expanded, or whether a warning is dismissed, lives in a ViewModel, separate from the data model." "exactly as on a model" → "as on a model".

## Ordering, vocabulary, Prop Keys (2026-09-08)
- Sidebar order is explicit (`parameters.options.storySort` in preview.tsx): each group opens with its default-configuration page (Simple Model, Model Effects, Container Models, Model Dependencies, Services, Topic Handlers, Futures, Config Properties, Context And Reload).
- Vocabulary per Mark: "model property" (not "observable field"), "computed model property" (not "getter" except as TS syntax or the `includeGetters` option), "event"/"broker message" (not "frame"). 19 prose replacements for the first two; "frame" renamed everywhere in prose and identifiers (EventPublisher, publishEvent, TemperatureEvent, SampleEvent, rawEvent, ownReadings...). Backend test endpoint renamed to `POST /api/codex/test/event` (`TestEvent`), types regenerated after the restart.
- New page "Foundations / Prop Keys" (second in Foundations): `{MODEL_ID}` and `createPropKey` in topics (widget `onOwnReading` on `/codex/widget/{MODEL_ID}/reading`, `onZoneStatus` on a constant built from `createPropKey<WidgetModelImpl>('zone')`, where `zone` is a computed property from the id), dependency id from `teamKey` on `project` (add_dependency id hand-edited; gap logged), service requests described (typed params accept a PropKey only for string parameters; gap logged), config property `path` noted as resolved through the dependency options. Verified headless: an event for widget-north moves only widget-north's counter (1/0), a zone-south status moves only widget-south's (0/1). Docs page renders 6 viewers.
- Gate: the matrix page id follows the page title slug, so `topic-catch-up` became `lifecycle-race-conditions`; Prop Keys claims no options (they are owned by Topic Handlers and Model Dependencies) so the gate does not see a double claim.
- Topic Handlers, troubles and the topic stories verified again through `/test/event`.
- Service Caching: removed `checkCache()`/`cacheSnapshot` and the "Reading the store" section. Mark: example code must never reach into the framework's response store; an exemplar is only warranted if something visible (a log line) reflects the cache. `ServiceResponseStore` logs nothing on a hit or TTL extension, so the page now declares the option and says so. The SDK's public `getServiceResponse`/`hasCachedResponse` helpers exist but type `path` against the SDK's own OpenAPI, so an app-spec path needs a cast (logged).
- Service Caching: the view section, component and story are removed as well (Mark: with the exemplar gone the view taught nothing about `cache`). The page is the request, the option and its retention settings.
- Service Caching: added "The retention policies" (IMMEDIATE, SINGLE default, TTL with extendOnRefresh, PERMANENT, MANUAL) and "Who reads a retained response" (the framework's requiresBaseline temporal check; the SDK's getServiceResponse/hasCachedResponse/clearServiceResponse helpers; maxSize unread), from `core/types/service-response-store.ts` and `ServiceResponseStore`. Note verified in source: with extendOnRefresh the handler still receives the new response; only the retained copy is the earlier one.

## Computed Properties page (2026-09-08)
- New "Foundations / Computed Properties" (second in Foundations, before Prop Keys). Built with add_dependency (project → widget 'widget-computed'), add_computed ×2 on project (`counterParity`, `temperatureBand`), create_component. Teaches: computed over own state (`isAtFloor`), over dependencies (`teamSize`, `counterParity`), and over data a topic handler set on another model (`temperatureBand` from the widget's `temperature`). The view colours its background by parity and its border by band; the story's strips act only on the source models (team, counter 'project-counter', device temperature events).
- Two authoring mistakes caught by verification: the band compared degrees against the widget's raw tenths (every event read hot); the counter strip drove id `counter` while the project depends on `project-counter`. Both fixed. `onOwnReading` (Prop Keys) now stores the raw value like `onTemperature`.
- Computed Properties page now leads with the composition principle (one model owns a reading; others depend on it and derive, without subscribing or calling endpoints).
- Model Dependencies page: added the composition principle (a dependency is how a model reaches the owner of some data; the owner subscribes/requests once, dependents derive via computed properties), cross-linked to Computed Properties.

## Foundations overview pages (2026-09-08)
- Mark: the two crux topics are how a model talks to the backend and how models relate (dependency + containment as the primary composition mechanisms); everything else is detail. Added two docs-only Foundations pages, ordered after Simple Model: "Communication Patterns" (service requests, topics, config properties, futures, troubles; state beans noted as absent from the codex backend; a table mapping pattern → decorator → direction → pages, one small existing snippet per pattern; references the kos-documentation article "Device Communication Patterns") and "Model Relationships" (dependency, containment, context, parent awareness, companion; table + small existing snippets; closes with how to combine them). No new models or stories; both pages reuse extracted snippets, claim no options in the matrix.
- Troubles described as markers (fault or 'something happened, needs attention', e.g. a daily cleaning reminder the user clears) on Communication Patterns and Troubles pages, per Mark. needed-endpoints: state service and a backend-raised trouble recorded as open requests.

## Defaults-first — CONTAINERS
Team is now the default container: `KosContainerAware<UserModel>` merge, `this.container` in the index methods, `team.data` in the three views and the container-models story. Every `roster`/`members` reader is renamed; the five pre-existing `roster` type errors are gone and both libs typecheck. One reader outside the group had to follow: `project-model.ts` `teamSize` reads `this.team?.data.length` (was `.members.data.length`; one token, inside `computed-team-size`, which the Computed Properties page shows). User is `@kosParentAware()` (verified in the SDK build: `parentId = options?.parentId || createPropKey("kosParentId")`); `createOptionKey` import dropped. Document's decorator carries the legacy options with option-level markers (`document-container`, `-container-property`, `-models-property`, `-include-getters`, `-include-methods`, `-extension-id`); `sortKey: 'desc'` is ignored from `document-container`. Nothing else in that file changed. Extract, gate (`OK - matrix covers the surface`) and both tsc pass.

- **container-models**: opener `team-container` is the bare decorator; then the injected surface in prose (container, models, data, getModel, addModel, removeModel, addAll, removeAll, removeAndDestroy, removeAndDestroyAll); `team-container-type` now `KosContainerAware<UserModel>`; then `@kosChild`, creating/adding/removing, the view. Last section "Migration and naming options" shows `document-container` (`containerProperty: 'notes'`, `modelsProperty: 'noteList'`, `includeGetters`, `includeMethods`, `containerOptions.extensionId: 'document-notes'`), stated as existing for code that already reads the container under another name. `extensionId` prose from source: `KosModelContainer` passes it to `ExtensionManager.indexExtension.loadIndexExtensions` and merges the result into the index map.
  - Extractor limit: the opener renders as `@kosContainerAware<UserModel>({` / `})`, not `()`. The same decorator carries the indexes page's `containerOptions`, and `ignore start/end` strips lines, so the braces of the emptied options object stay (ignoring the whole argument node gives `(` / `)` instead, probed). The prose says the team passes no options. A literal `()` needs the indexes on a different container model.
  - `includeGetters: true` / `includeMethods: true` on document restate defaults; kept because the matrix claims them and this is the legacy section.
  - `model-relationships.mdx` (not mine) reuses `team-container`; its prose says "with add, remove, indexes and sorting injected", which the bare decorator no longer shows.
- **container-indexes**: opener `team-indexes` shows the decorator with `containerOptions.indexMap` only (`sortKey` ignored from it); querying sections unchanged apart from `this.container`; new "Sorting" section with the option-level `team-sort-key`; build table split into indexes and sorting steps. Nested option markers inside a captured decorator did not cut the enclosing snippet in this extractor version (probed before relying on it).
- **container-capacity**: untouched (no reader of team).
- **parent-and-child**: opener `user-parent-aware` is `@kosParentAware()`; prose says it reads `kosParentId`, which `UserOptions` gets from `KosParentAware`. Closing prose section "When the option is named differently" describes `parentId` without a snippet. Could not place: the matrix claims `kosParentAware.parentId`, and the only code home would restate the default on the user model (a second parent-aware model is out of scope), so the gate reports `parent-and-child: 0/1 claimed options appear in extracted source` (report-only, exit OK). Suggested matrix change for the coordinator: move `parentId` to `deferred.kosParentAware` with reason "default kosParentId covers every model in the codex; parentId is only for an options type that carries the parent id under another name".

## Defaults-first — TOPICS/CONFIG/SERVICES
Files changed: `widget-model.ts`, `widget-view-model.ts`, `journal-model.ts`, `document-model.ts` (the `@kosModel` line only), `topic-catch-up-view.tsx`, and the MDX of topic-handlers, config-properties, view-models, services, service-errors, topic-catch-up. Extract, gate (OK; the one unproven page, parent-and-child, is another group's) and both tsc pass. 90/90 snippet references on the fourteen pages resolve; no whole-class snippet.

- **Topic Handlers**: opener `topic-websocket` is `topic` + `websocket: true` (verified `websocket` defaults to false in `kosTopicHandler.d.ts`; it stays). Prose now says those two are the whole declaration and everything else defaults. `lifecycle: READY` was bundled in the skipParse handler's snippet; it is now its own captured option `topic-lifecycle@widget-model.ts` (ignore start/end inside the decorator, plus an `end topic-skip-parse` after the method so the nested marker does not cut the snippet), shown under the `lifecycle` heading. `skipParse` stays last, heading renamed "internal". `@kosModel` on widget, journal and document lost `singleton: false`.
- **Topic Filtering / Rate Control / Flow Control / Addressing**: audited, unchanged. Each handler carries `topic`, `websocket: true` and the one option (or the option group) its section teaches. `topic-destination` shows `destinationAddress` and `explicitDestination` together because the section teaches them together.
- **Lifecycle Race Conditions**: both handlers keep `lifecycle: INIT` (needed; the comment and prose explain it, and the prose now says it is the one departure from the Topic Handlers opener). Journal moved to the default container: `@kosContainerAware<NoteModel>()`, interface `KosContainerAware<NoteModel>`, `this.getModel(id)` in `upsert`, view reads `journal.data.length`. `sortKey: 'desc'` dropped as well: the page does not teach sorting and nothing reads the order. "How it was built" row updated.
- **Config Properties**: opener `config-property` is path + attribute only (confirmed; both required, all else optional in `kos-config-bean-prop.d.ts`). `@kosConfigBean` lost `lazy: false` and `serviceBasePath: '/api/config'`: `lazy` undefined resolves eagerly (`!dependency.lazy`) and `ConfigBeanModelImpl` falls back to `servicePathMapper` when `serviceBasePath` is unset (SDK `index.js` 14787). The bean is now `@kosConfigBean({ path })`; prose says the other two options exist with the same meaning. The matrix's `kosConfigBean.lazy` / `serviceBasePath` claims are satisfied by the `colors` property fragments (the gate matches `leaf:` across all snippets).
- **Config Conversion**: audited, unchanged. `converter` and `formatter` are captured as single options on `otherVolume`; `volume` and `rangeInterval` are path + attribute.
- **View Models**: both `typeId` and `devToolsEnabled` are optional (`KosViewModelOptions`; `typeId` defaults to the class name, `devToolsEnabled` to false). Opener now renders `@kosViewModel({ typeId: 'widget-temperature' })` + `@kosLoggerAware()`; `devToolsEnabled: true` is its own fragment `view-model-devtools@widget-view-model.ts` under a new `## devToolsEnabled` section. Prose says `typeId` defaults to the class name.
- **Services**: opener `service-load` shows `lifecycle` + `transform` (condition/requestOptions/cache stay ignored out and appear in their own sections); prose now says `lifecycle` is the one input beyond the endpoint and the mapper is where the payload's shape is made. Method-driven opener `service-method` shows only `transform`.
- **Service Mapping / Caching / Errors**: openers already show one option each (`service-mapping` = lifecycle only, then one fragment per option; `service-cache`; `service-error-handler`). Service Errors gained a paragraph: the repo's `serviceRequest` helper already supplies `{ strategy: 'log', defaultValue: null }` when no `errorHandler` is declared, and a declared `errorHandler` replaces the whole object, which is why strategy and default are restated beside `onError`.
- **Context and Reload**: no options on either decorator; unchanged.
- Could not place: nothing. `cache.maxSize` remains in the cache fragment as a matrix claim the SDK does not read (already stated on the page).

## Defaults-first — FOUNDATIONS/ASYNC/RELATIONSHIPS (2026-09-08)
- Verified against SDK source (index.js): `@kosModel` builds the `Registration` bean only when `singleton` is set (`if (modelConfig.singleton !== void 0)`), so `singleton: false` is NOT a restated default and stays on every model. The brief's "singleton is only needed when true" is wrong. `@kosFutureAware`/`@kosMultipleFutureAware` default `mode: 'full'`, `handlerProperty: 'futureHandler'`; `@kosDependency` defaults `lifecycle: INIT`, `id` = modelType, policy CREATE; `@kosCompanion` defaults mode `decorator`, `parentProperty: 'companionParent'`, `excludeProperties: []`, lifecycle INIT, and injects the parent property in BOTH modes (`excludeProperties` is read only in decorator mode); `@kosLoggerAware` default `logger`.
- Simple Model: opener unchanged (`@kosModel({ modelTypeId, singleton: false })`, `@kosLoggerAware()`); prose now says `singleton` has no default and why.
- Futures: task opener is `@kosFutureAware()`; prose names the defaults it takes and describes `mode: 'minimal'`. `handlerProperty` moved to project (`@kosFutureAware({ handlerProperty: 'syncHandler' })`) in the last section "Future support, with the handler renamed (a migration option)"; project's merged interface now extends `ExternalFutureInterface<P>` and declares `syncHandler: FutureAwareContainer<P>` (new snippet `project-future-handler`; the member is `ignore`d from `project-interface` so the containers page's snippet is unchanged apart from the extends clause). `mode` could not be placed on any future model: task, project and timer views all read the derived state, so none can be `minimal`; the literal is covered by the companion's `mode: 'composition'`.
- Multi Futures: timer opener is `@kosMultipleFutureAware()`; prose points at the Futures page for the two options.
- Model Dependencies: opener is the widget dependency (`modelType` + `id`; the id stays because widget is not a singleton, and the prose says the default id is the type id). Team keeps `options` only (`lifecycle: INIT` and `resolutionPolicy: CREATE` dropped as defaults). Counter keeps `CONTINUE` and gains `lifecycle: DependencyLifecycle.READY` (nothing in init/load reads it), shown as the last section "Resolving at a later phase" via option-only snippet `project-dependency-lifecycle`. Semantics verified in source: before each phase hook the framework resolves the dependencies declared for that phase and awaits `whenReady`.
- Companion Models: opener is `@kosCompanion({ mode: 'composition' })` (the timer keeps its own surface; decorator mode would proxy the session's state machine, journal and trouble members onto it). `parentProperty: 'session'` stays in source but is scoped out of the opener with `ignore start/end timer-companion` and shown in "The parent" as option snippet `timer-companion-parent-property`. Dropped `excludeProperties: []` (meaningless in composition mode) and `lifecycle: READY` (not required). Could not place: `excludeProperties` (decorator mode only; the codex has no decorator-mode companion), so the gate reports companion-models 3/4 in source; `lifecycle` is described in prose on this page and its literal is covered by the dependency snippet. Suggest the matrix either defers `kosCompanion.excludeProperties` with that reason or a decorator-mode companion is added in a later pass.
- Logging: opener is counter's `@kosLoggerAware()` plus `counter-lifecycle` for `this.logger`; session's `loggerProperty`/`loggerContext` moved to "Renaming the logger and its context"; `@kosLogger({ group })` unchanged. `tools/codex-matrix.json` still lists only `session` for logging (not edited; add `counter`).
- Computed Properties / Prop Keys: their prose around `project-dependency` mentions no dropped option; unchanged. Other pages referencing changed snippets (container-capacity `project-interface`, model-relationships `timer-companion`/`project-dependency`, communication-patterns `task-future-aware`) render correctly with no stale prose.
- extract OK, gate OK (only the companion 3/4 line above), both tsc clean.

## Parent-aware children (2026-09-08)
- Mark: a parent-aware child is built with `kosParentId` in its options; that contract has not changed. What is dropped is the decorator's `parentId` option (only for legacy options shapes), so `@kosParentAware()` is the form and `createOptionKey` is unused. I briefly removed the option from the team's builds, which made every user fail to instantiate ("Parent context {PROP_kosParentId} does not exist") and took the team and project with it; restored. Not an SDK gap. `teamId` on the user is now a computed property over the context.
- Also this pass: `@kosModel({ singleton })` has no default (Registration is injected only when it is set); my brief called it one, three models briefly lost it and `Widget` came back undefined. Restored; logged as an SDK gap (inject Registration for the default case or make the option required in the type).

## Defaults-first integration + Advanced Options (2026-09-08)
- Three agents reworked every group's openers to the default form (see their sections above). Integration: Container Models now opens with the journal's bare `@kosContainerAware<NoteModel>()` (the team carries the index options the next page teaches); `includeGetters`/`includeMethods` removed from the document's migration exemplar and deferred with `containerOptions.parentId`/`legacy` (only meaningful as false / migration); `kosCompanion.excludeProperties` deferred (decorator mode only); `kosParentAware.parentId` deferred (legacy options shapes); logging page lists counter as its default-form model.
- New "Foundations / Advanced Options" (last in Foundations): per decorator, the options that exist for migration, special shapes or specific situations, each with the use case that justifies it and the page that shows it. Framing per Mark: none is a default; reach for one only when the named use case applies (agents included).
- Verified after the pass: all container, parent/child, futures, multi-futures, companion, logging, dependencies, computed-properties, race, services, view-model and config stories behave; reworked docs pages render all viewers; gate OK at 32 pages.

## SDK 3.0.21 (2026-09-08)
- `npm update @kosdev-code/kos-ui-sdk` → 3.0.21 from the local registry. Removed the `modelFactory` cast (compiles), enabled the buffer button on Topic Rate Control (5 events → bufferItems 5, twice → 10, no hang), removed every "in SDK 3.0.20" defect note (services, service mapping, rate control, parent-and-child, service-errors, document comment). Verified: the services and mapping stories list the backend's existing object on open (the LOAD + iterateOver + mappings path works); debounce/throttle unchanged; errors story unchanged. Still present and now described version-neutrally: CONTINUE creates the dependency at construction; the client's envelope fallback for a success without data.

## Troubles from the backend (2026-09-08)
- Per Mark: no fabricated trouble payloads. The codex backend now has `CodexSessionTrouble extends Trouble implements HandleTroubleIface` (path `codex.session`, resolvable, `resolve()` = succeeding FutureWork, modelled on OTAUpdatePendingTrouble) and holds one instance; `POST /test/troubles/raise` adds it through the TroubleService, `POST /test/troubles/remove` removes it (Mark: hold the instance rather than resolving by class; remove endpoint is for explicit cleanup; resolve is also a story). The device model gained `raiseTrouble`/`removeTrouble` via add_service_request. Story strips: backend (raise, remove) and user (`session.troubles[0]?.resolve()`).
- Verified against the backend: raise → session shows 1 trouble (type CodexSessionTrouble, on the wire `ifaces:["path"], path:"codex.session", resolvable:true`); user resolve → 0 (real `/api/troubles/resolve/{id}` flow, service removed it and published the removal); raise again → 1; backend remove → 0. Docs page renders.

## Build tables — FOUNDATIONS/CONTAINERS/ASYNC (2026-09-08)
Command cells rewritten so no page names kos-codegen, an underscored tool name or the MCP server. Where a `kosui` command exists the row now shows it with the arguments the row already carried; steps that only an agent tool covers are described in plain words naming the model, member and option values. Step cells, row order and values unchanged. 33 replacements across 13 pages; logging-view needed none.
- Simple Model (counter-view): 4 rows plus the sentence under the table (it said the `add_*` steps were tools of the kos-codegen MCP server; now: the `kosui` steps generate files, the others edit the model source and the app's registration file). Example: `kos-codegen \`add_property\`: \`count: number = 0\`` → `add \`count: number = 0\` as a property of \`counter\``. Out of scope and left as is: the body sentence at line 103 ("`register_model` upserts the bean into the app's registration chain") is three sections below the table.
- Computed Properties: 2 rows. `kos-codegen \`add_dependency\` on \`project\` for the widget, then \`add_computed\`: ...` → `add a dependency on the widget to \`project\`, then add \`teamSize\`, \`counterParity\` and \`temperatureBand\` as computed properties, each reading one of the injected dependencies`.
- Model Effects: 2 rows. `kos-codegen \`add_model_effect\` on \`counter\`: method \`onCountChanged\`` → `add a model effect on \`counter\` with the method \`onCountChanged\``.
- Container Models: 3 rows. `kos-codegen \`add_child\`: property \`lead\`, child \`UserModel\`, shape single` → `add a single child to \`team\`: property \`lead\`, child \`UserModel\``; `\`register_model\` ×2` → `register \`team\` and \`user\` in the app's registration chain`.
- Container Indexes: 1 row. `kos-codegen \`add_container_support\`: child \`UserModel\`` → `add container support to \`team\` with child \`UserModel\``. `kosui model:container` was not used: it scaffolds a new container model, and the team was scaffolded first and given the container afterwards.
- Container Capacity: 2 rows. `kos-codegen \`add_container_support\`: property \`tasks\`, child \`TaskModel\`` → `add container support to \`project\`: property \`tasks\`, child \`TaskModel\``.
- Parent and Child: 1 row. Dropped the parenthetical `(kos-codegen \`scaffold_model\` with \`parentAware: true\`)`; the row is now the `kosui model --name user --parent-aware` command alone.
- Model Dependencies: 4 rows. `kos-codegen \`add_dependency\`: property \`widget\`, type \`WidgetModel\`, ref \`Widget.type\`, id \`widget-computed\`` → `add a dependency to \`project\`: property \`widget\`, ...` (same values); `\`register_model\`` → `register \`project\` in the app's registration chain`.
- Companion Models: 2 rows. `kos-codegen \`add_companion\`: name \`timer\`, parent \`session\`, pattern composition` → `\`kosui model:companion --name timer --companionParent session --companionPattern composition\`` (flags verified against `kosui model:companion --help`).
- Futures: 5 rows across both tables. `kos-codegen \`add_service_request\`: \`startAdditionalData\`, \`POST /api/codex/objects/additional-data/{numOfItems}\`, "method" mode` → `\`kosui model:add-service-request --modelName task --methodName startAdditionalData --servicePath /api/codex/objects/additional-data/{numOfItems} --method POST --mode method\``; `kos-codegen \`add_future_to_model\`: model \`project\`, level \`complete\`` → `\`kosui model:add-future --modelName project --futureType complete\`` (`futureType` enum is `minimal | complete`, `mode` enum is `lifecycle | method`, both checked in the installed CLI).
- Multi Futures: 2 rows. The two service requests are one `kosui model:add-service-request ... --methodName startShort ... --method POST` command "then the same command with `--methodName startLong`"; "there is no mutator for them" → "written on the model by hand".
- State Machine: 2 rows. "written on the model; there is no mutator for them" → "written on the model by hand"; `register_model` → `register \`session\` in the app's registration chain`.
- Logging: 0 rows; the table named no tool.
- Troubles: 2 rows. "written on `session`; there is no mutator for it" → "written on `session` by hand"; the parenthetical `(kos-codegen \`add_dependency\`, the option added to the decorator)` → `(a dependency added to \`session\`, then the option added to the decorator)`.
- Checked after the pass: no `kos-codegen`, `mutator`, `MCP` or underscored tool name remains in any of the 14 pages' tables; every table row still has three pipes.

## Build tables — TOPICS/CONFIG/SERVICES
Only the "How it was built" tables changed, plus two sentences under the Services table. Step cells, row order and every value kept; every row still has two cells. No `kos-codegen`, underscore tool name or `MCP` remains in any of the fifteen tables. Service-request rows now show `kosui model:add-service-request` with the generator's own argument names (`--modelName`, `--project`, `--methodName`, `--servicePath`, `--method`, `--lifecycle` or `--mode method`; verified in `kosui model:add-service-request --help` and the generator source: `--lifecycle` implies lifecycle mode, `--mode method` is the on-call form, method values are lowercase).

- **topic-handlers** (3 rows). Before: `kos-codegen `add_property`: `temperature: number`, `pings: number`, `rawEvent: string``. After: `add `temperature: number`, `pings: number` and `rawEvent: string` as properties of `widget``. `register_model` became "register `widget` in the app's registration chain".
- **topic-filtering** (2 rows). Before: `kos-codegen `add_topic_handler` for `onHighTemperature`, ... each on its own topic`. After: `add a topic handler on `widget` for `onHighTemperature`, `onEvenSample`, `onFirstEvent` and `onReading`, each on its own topic`.
- **topic-rate-control** (2 rows). Before: `kos-codegen `add_property`: `debounceCalls`, ...`. After: `add `debounceCalls`, `debounceLastBatch`, `throttleCalls` and `bufferItems` as properties of `widget``.
- **topic-flow-control** (2 rows). Same pattern as rate control (`flowBatches` ... as properties of `widget`; a topic handler on `widget` for the three handlers).
- **topic-addressing** (2 rows). Before: `kos-codegen `add_topic_handler` for `onZoneEvent` on `/codex/widget/zone/*` and `onAddressedEvent``. After: `add a topic handler on `widget` for `onZoneEvent` on `/codex/widget/zone/*` and one for `onAddressedEvent``.
- **topic-catch-up** (3 rows). Before: ``scaffold_model journal`, then `add_container_support` (...) and `add_property` for the two counters`. After: ``kosui model --name journal --project core-concept-models`, then give `journal` container support (a container of `NoteModel` on the default `container` property) and add the two counters as properties`. Baseline row is now the full `kosui model:add-service-request --modelName journal ... --methodName onNotesLoaded --servicePath /api/codex/test/objects/race --method get --lifecycle LOAD`.
- **prop-keys** (4 rows). Before: `on `project`, kos-codegen `add_property` for `teamKey` and the existing `add_dependency`, with its `id` changed to ...`. After: `add `teamKey` as a property of `project`, then change the `id` of the existing dependency on `project` to `createPropKey<ProjectModelImpl>('teamKey')``. `add_computed` became "add `zone` as a computed property of `widget`".
- **config-properties** (1 row). Before: `kos-codegen `add_config_property` on `widget`: path ...`. After: `add a config property on `widget`: path `studio:service:codex`, the attribute, and its value type`.
- **config-conversion** (2 rows). Before: `kos-codegen `describe_sdk_model region-info`, then `add_dependency` with the wiring it returns`. After: `look up the SDK's `region-info` model, then add it as a dependency of `widget` with the wiring it describes`.
- **view-models** (0 rows). No tool names; unchanged.
- **services** (3 rows + 2 sentences). Before: `kos-codegen `add_service_request` once per method: the path, the HTTP method, and either a lifecycle or "method" mode`. After: ``kosui model:add-service-request --modelName document --project core-concept-models` once per method, with `--methodName`, `--servicePath`, `--method`, and either `--lifecycle` or `--mode method``. The paragraph under the table now opens "`kosui model:add-service-request` writes three things" and closes "The command rejects a path the generated types do not declare" (the CLI runs the same `addServiceRequestToModel` generator and validates the path against `api:generate` output). Left alone, outside the table scope: the "Method-driven" section (line 77) still says "the shape `add_service_request` leaves behind for `addNote`".
- **service-mapping** (3 rows). Before: `kos-codegen `add_service_request`: `reloadNotes`, same path, "method" mode`. After: ``kosui model:add-service-request --modelName document --project core-concept-models --methodName reloadNotes --servicePath /api/codex/objects --method get --mode method``. `add_property desc` became "add `desc` as a property of `note`".
- **service-caching** (1 row): the `onStatsLoaded` command on `/api/codex/objects/stats` with `--lifecycle LOAD`.
- **service-errors** (1 row): the `loadNote` command on `/api/codex/objects/{id}` with `--mode method`.
- **context-and-reload** (0 rows): the page has no "How it was built" table.

## Page structure (tell me, show me, tell me more)
Every page with a canvas follows one order: intro paragraphs, `## Try it` (the story canvas plus a short paragraph on what to press and what changes), `## How it was built`, then the mechanism sections, with `## The view` holding the view and story snippets near the end. Pages without a canvas (Communication Patterns, Model Relationships, Advanced Options, Service Caching) keep intro then sections. The restructure was applied by a script over all 28 canvas pages; eight pages had no usage paragraph after their canvas and got one written from the view's readout and button labels.

## How it was built: steps, not tables
The Step | Command tables became bold-lead steps with fenced bash blocks, so every command that was run is written out and copy-pasteable (the services page lists all six `model:add-service-request` calls). Flag spellings were checked against `kosui <cmd> --help`: flags are camelCase (`--futureAware complete`, `--parentAware`), `--method` values are lowercase, and passing `--lifecycle` selects lifecycle mode so `--mode method` is never written. Two source-vs-table corrections: the timer's `startLong` reuses the `startShort` endpoint (one command, not two), and the document's stats handler is `onStatsLoaded` while its catalog entry is `refreshStats`.

## Dedicated container model (built 2026-09-08)
Two container shapes exist. The team owns its users, so `@kosContainerAware<UserModel>` sits on `team` (the domain concept). The other shape is a concept model plus a dedicated `<x>-container` model enrolled with `@kosChild`. Page "Containers / Dedicated Container Model" builds it with `sprint`, `ticket` and `ticket-container`: `kosui model --name ticket --container --containerSingleton false`, then `kosui model:add-child --modelName sprint --childModel ticket-container --propertyName tickets --shape single`. Tickets read `sprintId` from context through the chain ticket → container model → sprint, with no `kosParentId` and no `@kosParentAware` (the container sets each added model's parent context to its own id). `TicketContainer.addRelatedModel(Ticket)` means only `Sprint` and `TicketContainer` are registered in the app chain. Team and user are unchanged. The CLI's `--dryRun` on `model:add-child` was not exercised; the write was intended.

## Container build steps use `kosui model:add-container` (2026-09-08)
The CLI update added `model:add-container` (decorates an existing owner model) and `model:add-parent-aware`, and honours `--dryRun`. Six build sections now show the real command: container-models, container-indexes (`--sortKey name`), container-capacity (`--containerProperty tasks`), services (`--containerProperty notes`), topic-catch-up (journal), parent-and-child (second command). The single-child (`lead`) step and the indexMap/capacity options remain hand edits.

## Home page (2026-09-08)
The landing page from the previous codex (`kos/kos_mark/packages/tools/kos-codex-ui`, `landing-page.mdx`) is recreated in `libs/model-components/src/lib/landing-page/` with its header background, icons and card layout. It is the docs-only page titled "Home", first in `storySort.order`, so the Storybook root opens on it; `manager-head.html` hides its sidebar item and the brand logo (`.storybook/theme.ts`, `brandUrl`) returns to it. Two cards: Core Concepts opens Foundations / Simple Model; Dispense Concepts is "Coming soon" for the dispense codex. Card links use `target="_top"` so they navigate the whole Storybook, not the docs iframe.

## View Models built with `kosui model:view-model` (2026-09-08)
The exemplar moved from `widget/widget-view-model.ts` to the generator's location, `widget-temperature/widget-temperature-view-model.ts`, produced by `kosui model:view-model --name widget-temperature --project core-concept-models --models widget`. Generated without options, so the decorator line is the generator's output; only the `unit` state, computed values and action were added, with the same snippet names as before. The generator does not touch `.kos.json`, which matches the page's statement that ViewModels are not registered.
