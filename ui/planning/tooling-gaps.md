# Tooling gaps — KOS codex build

Logged when generated code was deleted or mutated, or when wiring a mutator
owns was written by hand. Ordinary authoring (method bodies, stories, prose,
component markup) is not logged.

Landing points: codegen | resources | tools | skills | codex-prose | none-needed.

---

### register_model inserts the `.model(Bean)` entry inside a comment
- Context:        Registering `counter` into `apps/kos-codex-2-ui/src/app/registration.ts`. The file's explanatory comment contained the literal text `` `.model(Bean)` ``.
- Workaround:     Reworded the comment so it no longer matches, removed the corrupted line, re-ran the tool. It then placed the entry correctly after `KosModelRegistry.dispense.models()`.
- Frequency:      occasional (any chain file whose comments mention `.model(X)`)
- Landing point:  tools
- Rationale:      `upsertChainEntry` in `packages/kos-ui-cli/src/lib/mcp/tools/registration.mjs` scanned raw text with a regex. Replaced by an AST mutation in kos-codegen-core (`generators/registration/upsert-chain-entry.ts`, ts-morph, 8 tests): the anchor is the outermost `.model(...)` call expression, comments and strings cannot match, and the import merges into an existing declaration for the same module. See "SDK changes".

### register_model imports a cross-project bean by Nx project name
- Context:        Same registration. The tool wrote `import { Counter } from 'core-concept-models'`; the workspace resolves the library as `@kos-codex-2/core-concept-models` (package.json `name` and the tsconfig path alias).
- Workaround:     Edited the import specifier by hand after every cross-project `register_model` call.
- Frequency:      common (every model registered from a library into the app)
- Landing point:  tools
- Rationale:      `importSpec = src.name` in registration.mjs. The source project's `package.json` `name` (falling back to a tsconfig `paths` alias, then the project name) is the resolvable specifier. Fixed in the SDK with a test.

### create_hook / create_component do not export from the library barrel
- Context:        `libs/model-components/src/index.ts` stayed empty after `create_hook` and `create_component`. The hook generator wrote `lib/hooks/index.ts` (and re-exported the new hook there) but nothing reaches the package entry point; the component generator wrote only its own folder.
- Workaround:     Wrote the three `export * from` lines in `src/index.ts` by hand.
- Frequency:      common (first hook/component in any model-component project)
- Landing point:  codegen
- Rationale:      A model-component library is consumed through its barrel; a generated hook or component nobody can import is not finished. The generator should upsert the barrel line the way `scaffold_model` already does for model projects.

### `// extract-code` markers added to generated files
- Context:        The codex extracts snippets from `use-counter.ts`, `with-counter.tsx`, `registration.ts` and the model class.
- Workaround:     Added marker comments to generated files. No logic changed.
- Frequency:      common (this codex only)
- Landing point:  none-needed
- Rationale:      Marker comments are documentation tooling specific to this repo, not something the generators should know about.

### Snippet viewer distribution
- Context:        The codex must render snippets with the `<snippet-viewer>` web component. Its published distribution is the hosted script https://subtle-kashata-528e61.netlify.app/snippet-viewer.js (documented in the repo README as a script tag; there is no npm package for the viewer).
- Workaround:     None needed. `preview-head.html` loads that URL and sets `snippet-host` / `snippet-theme` meta tags. (An earlier vendored copy in `public/` was wrong and has been removed.)
- Frequency:      rare
- Landing point:  none-needed

### Extract target did not cover the app's registration chain
- Context:        The registration chain lives under `apps/kos-codex-2-ui/src/app`; the kept `extract` target only scanned `libs/*/src`.
- Workaround:     Appended `apps/kos-codex-2-ui/src/app` to the `extract` command in `apps/kos-codex-2-ui/project.json`.
- Frequency:      rare
- Landing point:  none-needed
- Rationale:      Repo configuration, not SDK tooling.

### Stale `.kos.json` model entries from the swept attempt
- Context:        `libs/core-concept-models/.kos.json` still listed 15 models (including device-part names) whose files had been deleted. `list_models` reported them as existing.
- Workaround:     Reset the `models` map to `{}` before scaffolding; `scaffold_model` re-adds each entry.
- Frequency:      rare
- Landing point:  none-needed
- Rationale:      Sweep residue. `scaffold_model` overwrote its own entry cleanly, so no tool change is needed.

### add_topic_handler exposes only `topic`, `websocket` and `eventType`
- Context:        Every topic page. `@kosTopicHandler` has 21 options; the tool emits `lifecycle: INIT`, `topic` and `websocket`.
- Workaround:     Edited the generated decorator object by hand to add `condition`, `filter`, `once`, `transform`, `debounce`, `throttle`, `buffer`, `flow`, `wildcardName`, `destinationAddress`, `explicitDestination`, `skipParse` and a non-INIT `lifecycle` (14 handlers across 5 pages).
- Frequency:      common (any handler that narrows, reshapes or rate-limits)
- Landing point:  tools
- Rationale:      The shapes are fiddly (`debounce` is a number OR an object, `buffer` needs `time`, `flow` is a nested object, `condition`/`transform` change the handler signature). An `options` passthrough plus `lifecycle` on `add_topic_handler` would keep the decorator tool-owned.

### add_topic_handler spells out `lifecycle: DependencyLifecycle.INIT` on every handler
- Context:        The decorator's default (`lifecycle` unset) registers the subscription without phase gating, which is what nearly every handler wants. The mutator always emits `lifecycle: DependencyLifecycle.INIT` and the resource's example does the same, so every generated handler carries an option it does not need and readers take INIT for the default.
- Workaround:     Removed the option from 14 handlers in the codex; kept READY on one as the option's exemplar and INIT on the Topic Catch Up handler, which needs it.
- Frequency:      common (every generated handler)
- Landing point:  codegen — omit `lifecycle` unless the caller asks for a phase; resources — say the default is unset and show it that way.

### kos://decorator/kosTopicHandler documents 6 of 21 options
- Context:        Reading the resource before using the decorator, as the brief requires.
- Workaround:     Read `kosTopicHandler.ts`, `kos-topic-handler-flow-control.ts` and `kos-subscription-manager.ts` in the SDK.
- Frequency:      common
- Landing point:  resources
- Rationale:      The resource should list the full `IKosTopicHandlerParams` inventory with each option's runtime contract, in particular: `debounce`/`throttle`/`buffer`/`once` are mutually exclusive (one wrapper per handler, in that priority); `filter` receives the RAW transport envelope (`{ headers, body: string }`), not the parsed payload its type parameter suggests; one handler per topic per class (a later decorator on the same topic replaces the earlier one); with `flow`, top-level `transform`/`filter` are bypassed, the flow `transform` receives raw envelopes, and a partial batch waits for the NEXT event (there is no timer flush). All verified at runtime in the codex stories.

### `buffer` never reaches the handler (SDK 3.0.20 runtime defect)
- Context:        topic-rate-control page. A buffered handler with `maxSize: 3` hung the page at the third frame; a single frame re-armed the timer forever and never called the method.
- Workaround:     None possible in the codex. The exemplar keeps the literal `buffer: { time: 500, maxSize: 3 }` and the page says plainly that it does not deliver in 3.0.20. The story's buffer button is disabled until a fixed SDK is published.
- Frequency:      common (every use of `buffer`)
- Landing point:  sdk (not one of the listed points: this is a runtime bug, fixed in `~/Code/kos-ui-sdk` with tests — see "SDK changes")
- Rationale:      `applyFunctionalEnhancements` built the per-item adapter as a closure over `enhancedHandler`, then reassigned that variable to the buffered wrapper, so every flush pushed the items back into the buffer.

### register_model adds a second `import` statement for the same module
- Context:        Registering `widget` after `counter`; the chain file now has two import lines from `@kos-codex-2/core-concept-models`.
- Workaround:     None needed; valid TypeScript.
- Frequency:      common
- Landing point:  none-needed
- Rationale:      Cosmetic. If the tool ever grows an AST edit, merging named imports is the place.

### Story navigation freezes the Claude-in-Chrome extension on this page set
- Context:        Verifying rate-control in the browser. Not a KOS gap: a headless-Chrome CDP script in the scratchpad reproduced and bisected the hang instead.
- Frequency:      n/a
- Landing point:  none-needed

### generate_api_types cannot target Studio
- Context:        Pulling types from the codex backend (hosted by the Studio process), which the previous codex and this one run against. The CLI has `kosui api:generate --studio` (fetches `/api/openapi/api`); the MCP tool exposes only `host`, so it always fetches the device path `/api/kos/openapi/api`.
- Workaround:     Ran the CLI form by hand.
- Frequency:      common (any project whose backend is hosted by the Studio process)
- Landing point:  tools
- Rationale:      Add a `studio` boolean to `generate_api_types` mirroring the CLI flag.

### add_service_request emits `($ctx?)` for a method that is also a future
- Context:        `task.startAdditionalData` carries `@kosFuture({ abortController: true })` above the request. The future wrapper inserts an AbortSignal BEFORE the execution context, so the emitted single-parameter signature received the signal and `executeServiceRequest` reported a missing execution context.
- Workaround:     Declared `(numOfItems, _signal?, $ctx?)` by hand.
- Frequency:      occasional (every future-wrapped request with abortController)
- Landing point:  resources
- Rationale:      kos://decorator/kosFuture should state the parameter order under abortController + trackerPolicy "context"; the tool hint could mention it when the model is future-aware.

### `modelFactory` cannot take a concrete registration bean without a cast
- Context:        `modelFactory: Note` on the mapping request. The option is typed `KosModelRegistrationType<IKosDataModel, Record<string, unknown>>`, invariant in the options type, so a bean with real options does not assign.
- Workaround:     `Note as unknown as KosModelRegistrationType<IKosDataModel>` until the SDK ships the fix.
- Frequency:      common (every modelFactory use)
- Landing point:  sdk (typing) — fixed, uncommitted: `modelFactory?: KosModelRegistrationType<IKosDataModel, any> | ((id) => (options: any) => IKosDataModel)`, with a type-level test (`kos-service-request-model-factory.test-d.ts`) that fails against the old declaration. The cast comes out of the codex once the SDK is published.

### `KosContainerAwareWithProp` does not type a renamed `modelsProperty`
- Context:        `@kosContainerAware({ containerProperty: 'members', modelsProperty: 'roster' })`. The merged interface types `members` but `roster` is unknown to the compiler.
- Workaround:     Read through `members` in typed code.
- Frequency:      occasional
- Landing point:  sdk (typing)

### add_container_support emits `KosContainerAware<T>` even with a custom `containerProperty`
- Context:        Every container built here uses a named property (`members`, `notes`, `tasks`). The tool writes `interface X extends KosContainerAware<T>`, which types `container`, not the named property; `this.members` does not compile.
- Workaround:     Changed the merged interface to `KosContainerAwareWithProp<T, 'members'>` by hand, three times.
- Frequency:      common
- Landing point:  tools

### Service-request handler map keyed by method+path (SDK 3.0.20)
- Context:        The service-requests guide prescribes a LOAD handler plus a method-driven reload on the same path. The decorator stores handlers under `METHOD:path`, so the later decorator replaces the earlier.
- Workaround:     None reliable; fixed in the SDK (keyed by method name) with a test.
- Frequency:      common
- Landing point:  sdk

### `mappings` applied before `iterateOver` (SDK 3.0.20)
- Context:        LOAD request with `iterateOver` + `mappings` + `modelFactory` against the codex backend delivered nothing: `iterateOver path 'notes' did not resolve to an array`.
- Workaround:     None in the codex; the page says so. Fixed in the SDK with a test.
- Frequency:      common
- Landing point:  sdk

### `cache` and `condition` only apply to lifecycle requests
- Context:        The method-driven executor performs the call and returns the tuple; it never writes the response store or checks `condition`. The resource reads as if they were general.
- Workaround:     Moved the caching exemplar to a LOAD request.
- Frequency:      occasional
- Landing point:  resources — kos://decorator/kosServiceRequest should scope both options to the lifecycle form.

### `resolutionPolicy: CONTINUE` ignored at construction-time injection (SDK 3.0.20)
- Context:        `project`'s optional counter dependency was created although no such model existed. `injectDependencies` in kosModel.ts creates unless `lazy`; only `resolveDependentModel` honours the policy.
- Workaround:     The page states the observed behaviour.
- Frequency:      occasional
- Landing point:  sdk — not fixed here.

### Reading a retained response: the public helpers are typed to the SDK's own spec
- Context:        `getServiceResponse(model, path, method)` / `hasCachedResponse` (exported from the SDK) are the sanctioned way to read a retained lifecycle response, but `path: ApiPath` is the SDK's device OpenAPI union, so an app-generated path does not type-check without a cast. The codex no longer reads the store at all (Mark: example code must not; nothing is logged for a hit), so this is recorded for completeness.
- Frequency:      rare
- Landing point:  sdk (typing) — make the helpers generic over the path type, or accept `string`.

### add_companion emits no `@kosCompanion` decorator and an unresolvable import
- Context:        Scaffolding `timer` as a companion of `session` (composition). The class carried only `@kosModel`/`@kosLoggerAware` plus a `parent = options.companionParent` field; `SessionModel` was imported from `'core-concept-models'` (same specifier bug as register_model). `register_model kind:companion` is "not implemented".
- Workaround:     Wrote `@kosCompanion({ mode, parentProperty, lifecycle, excludeProperties })` and the `KosCompanionComposition` merge by hand; fixed the import; added `.companion(Session.type, Timer.type)` to the chain by hand.
- Frequency:      common (every companion)
- Landing point:  codegen (decorator + import) and tools (companion registration)

### No mutator for state machines, view models, troubles, multiple futures, logging options, reload/context
- Context:        `@kosStateMachine`/`@kosStateGuard`/`@kosStateEntry`/`@kosStateExit`, `@kosViewModel`, `@kosTroubleAware`, `@kosMultipleFutureAware`, `@kosLoggerAware` options, `@kosLogger`, `@kosReloadAware`, `@kosContext`, `@kosConfigBean` all hand-written from SDK source. None has a `kos://decorator` resource either.
- Frequency:      occasional each; common in aggregate
- Landing point:  resources first (each needs a `kos://decorator/*` page with its real option shapes); tools for the state machine and view model, whose shapes are the fiddliest.

### add_config_property exposes only path/attribute/valueType
- Context:        `lazy`, `serviceBasePath`, `optionsExpander`, `converter`, `formatter` hand-added.
- Frequency:      common (any converted or enumerated property)
- Landing point:  tools

### add_model_effect emits an empty dependencies list
- Context:        `dependencies: (model) => []` and a TODO body; `options.fireImmediately` hand-added.
- Frequency:      common
- Landing point:  tools — take a `dependencies` expression and `fireImmediately`.

### `loggerProperty` is incompatible with `executeServiceRequest`
- Context:        Renaming the logger on a model that uses the helper fails to compile: the helper's model parameter requires `logger`.
- Frequency:      rare
- Landing point:  sdk (typing) or resources (say so on kosLoggerAware).

### Unit aliases collide across measures
- Context:        `converter: { from: 'ml', to: 'oz' }` threw "Cannot convert between units of different families: volume and mass" — `oz` is also the mass ounce. Unit NAMES (`milliliter`, `fluid-ounce`) resolve unambiguously.
- Frequency:      occasional
- Landing point:  resources — kos://decorator/kosConfigProperty should say converters are named by the region service's unit names, and how to read them (`/api/regions/info`).

### Trouble container has no service path mapper
- Context:        The SDK trouble container loads `/api/kos/troubles`; config and region services have `register*ServicePathMapper`, troubles do not, so against the codex backend it 404s and fails to load.
- Workaround:     A KosMock setup module answers the path.
- Frequency:      occasional (any model using `@kosTroubleAware` against a backend without the device trouble path)
- Landing point:  sdk — a trouble service path mapper, or an option on the container.

### `@kosTroubleAware` needs the trouble-mapper contract documented
- Context:        A trouble's `ifaces` are mapper ids (`path`, `nozzle`, or domain-registered ones), and the built-in `path` mapper reads the trouble's top-level `path`. A trouble that names an unregistered interface is indexed nowhere and the model's `troubles` stays empty with no warning.
- Frequency:      occasional
- Landing point:  resources — a kos://decorator/kosTroubleAware page stating the contract; the container could warn when no mapper matches.

### add_future_to_model emits a throwing service stub alongside the decorated form
- Context:        Adding future support to `project` wrote `services/project-services.ts` with `performProjectOperation()` that throws "not yet implemented", plus a placeholder `@kosFuture` method whose comment points at that stub. The real operation is a typed `@serviceRequest` wrapped by `@kosFuture`, so the stub is dead code.
- Workaround:     Deleted the stub; replaced the placeholder method.
- Frequency:      common (every future added to a model with typed services)
- Landing point:  codegen — emit the `@kosFuture` + `@serviceRequest` form (or none) when the project has a generated service module; keep the stub only for projects without one.

### the codex backend's region settings carry no default unit system
- Context:        An implicitly converted property (schema `format`, no `converter`) threw on first render: "No unit system found for measure: volume and unit system: undefined". The codex backend's `kos:service:region:settings` bean has an empty schema and no `unitSystemId`; `RegionInfoModel.defaultUnitSystem` reads that bean, so every implicit conversion fails against the codex backend. Not a timing problem: the property model has a CREATE dependency on RegionInfo, whose `ready()` awaits the settings bean. (An earlier version of this entry blamed load order and carried an SDK change; both were wrong and the SDK change is reverted.)
- Workaround:     The config-conversion story's "unit system → us/si" actions write `unitSystemId` into the codex backend's region settings as a scope override, and it persists there, so the page works once either button has been pressed on that backend. The view also guards derived reads.
- Frequency:      common (any implicitly converted property against the codex backend before a unit system has been written)
- Landing point:  none of the listed points — codex backend: seed `kos:service:region:settings.unitSystemId` (the `factory` region from `/api/regions` already declares `unitSystemId: "us"`, which the SDK does not consult). Recorded in `planning/needed-endpoints.md`.

### kos://decorator/kosConfigProperty understates the service
- Context:        The resource lists options; it does not explain the resolution the codex had to read from source: schema `format` → measure → the region's default unit as the "to" side, same-system means no conversion, decimals from schema options or the unit tuple, the default `Intl` unit formatter and how `formatter` merges, `displayOptions`/`options` from per-unit-system schema options, `updateProperty` taking display units, and the RegionInfo dependency for switching systems.
- Frequency:      common
- Landing point:  resources — the config-conversion page is a draft of what the resource should say.

### A success envelope without `data` reaches the model as the envelope (SDK 3.0.20)
- Context:        `GET /api/codex/objects/999` answers `{ status: 200, version }` with no `data`. `executeFetch` returns `payload.data ?? payload`, so the method receives the envelope object, `executeServiceRequest` sees a non-null value, and `data.id` is undefined.
- Workaround:     The model checks the field it needs (`data.id === undefined`) instead of the object.
- Frequency:      common (any KOS endpoint that legitimately returns success with no payload)
- Landing point:  sdk — when the payload is a KOS envelope (has `status`/`version`) and carries no `data`, the client should hand back `null`, so the helper's "no data" path fires. The `?? payload` fallback should stay for non-envelope bodies.

### add_service_request: with iterateOver + modelFactory the lifecycle handler receives models, not the mapped payload
- Context:        The generated LOAD handler is typed `(error, data: XData)`. Once `iterateOver`/`modelFactory` are on the request, the framework hands over the built model array, so the signature had to be edited inside the model to `(error, models: NoteModel[])`. Every other type adaptation stayed in the services module, where the generated `XData`/`toXData`/`XCtx` trio lets a human reshape the payload without touching the model (verified by changing a mapper and compiling the untouched model).
- Workaround:     Hand-edited the handler parameter type.
- Frequency:      common (every container-populating LOAD request)
- Landing point:  tools — when the mutator gains `iterateOver`/`modelFactory`, emit the handler parameter as the model array (and say so in kos://decorator/kosServiceRequest).

### add_dependency has no `options` parameter
- Context:        The trouble container is a singleton the `@kosTroubleAware` decorator creates with empty options, so the only way to hand it `servicePath: '/api/troubles'` (the Studio-hosted path) is a `@kosDependency` on the same model that carries `options`. The tool emits `modelType` and `id` only.
- Workaround:     Added `options: { servicePath: '/api/troubles' }` and the `<TroubleContainerOptions>` type argument by hand.
- Frequency:      occasional (any singleton whose options must come from a dependent)
- Landing point:  tools — accept `options` (and the options type) on add_dependency; kos://decorator/kosDependency already documents the option.

### api:generate renders an untyped Java `Object` body field as `Record<string, never>`
- Context:        The codex backend's `POST /api/codex/test/event` takes `{ topic: string, payload: Object }`. The generated request body types `payload?: Record<string, never>`, which accepts nothing, so the one adaptation lives in the device model's services module as a cast (`toFrameBody`).
- Frequency:      occasional (any endpoint with an untyped object field)
- Landing point:  codegen — render a schema-less object as `unknown` or `Record<string, unknown>`.

### Same tool gaps hit again while building `device` and `journal` (2026-09-08)
- `register_model` imported both beans from `core-concept-models` (fixed in the SDK, commit bb643b9, not yet in the installed plugin) — hand-corrected twice.
- `add_container_support` emitted `KosContainerAware<NoteModel>` for `containerProperty: 'notes'` — hand-changed to `KosContainerAwareWithProp<NoteModel, 'notes'>`.
- `add_topic_handler` emitted `lifecycle: DependencyLifecycle.INIT` on both journal handlers; here INIT is genuinely needed, so they stayed. `requiresBaseline` and `replay` added by hand (tool exposes only topic/websocket/eventType).
- `add_service_request` needed `serviceModule` once the project had many generated service modules; the error names the candidates, which is adequate.

### PropKeys are undocumented as a topic and unsupported by the mutators
- Context:        `{MODEL_ID}` and `createPropKey` substitute a model property (including a computed property) into topic paths, `destinationAddress`, service request `path`/`pathParams`/`queryParams`, dependency `id`/`options`, and (through the dependency mechanism) a config property's `path`. No `kos://` resource explains this as a mechanism; `add_topic_handler` accepts a constant ref, `add_dependency` quotes its `id` as a literal, so the PropKey id was hand-edited.
- Workaround:     Page "Foundations / Prop Keys" (widget handlers on `{MODEL_ID}` and a `createPropKey` constant; project dependency id from `teamKey`).
- Frequency:      occasional (any model that needs per-instance registration)
- Landing point:  resources — a `kos://guide/prop-keys` page; tools — `add_dependency` should accept an expression for `id`.

### Typed `serviceRequest` params reject a PropKey where the spec type is not string
- Context:        `pathParams`/`queryParams` are typed from the OpenAPI spec. A PropKey is a string, so it only type-checks for string parameters; the codex backend's ids are integers, so the Prop Keys page shows the request case in prose only.
- Frequency:      occasional
- Landing point:  sdk (typing) — allow the PropKey string type on typed parameter values, or document the limitation on kos://decorator/kosServiceRequest.

### create_component does not add the barrel export (another instance)
- Context:        `prop-keys-view` needed `export * from './lib/components/prop-keys-view'` by hand, as every earlier component did.

### `@kosModel` injects `Registration` only when `singleton` is set
- Context:        Removing `singleton: false` from three models (it reads like a default) left `WidgetModelImpl.Registration` undefined, so `export const Widget = WidgetModelImpl.Registration` was undefined and every model depending on it failed at decorator evaluation. In `kosModel`, the Registration bean is built inside `if (modelConfig.singleton !== undefined)`.
- Workaround:     `singleton: false` restored on every model; the Simple Model page says the option has no default and why.
- Frequency:      common (every model)
- Landing point:  sdk — inject Registration for the default (non-singleton) case too, or make `singleton` required in the type so the omission is a compile error; resources — kos://decorator/kosModel should say so until then.

### Resource inaccuracies found while writing pages
- `kos://guide/companion-models` shows `getKosCompanionModel(model, Type)`; the function takes the companion's type id string.
- `kos://decorator/kosViewModel` gives no call shape for `useViewModel(factory, deps)` → `{ viewModel, ready, error }`.
- `kos://decorator/kosServiceRequest` and the guide present a lifecycle handler and a method-driven reload on one path as the pattern; in 3.0.20 they collide (fixed in SDK).
- Landing point:  resources

---

## SDK changes made in `~/Code/kos-ui-sdk` (committed on develop, 2026-09-07; published as 3.0.21 on 2026-09-08 and verified in the codex: buffered handlers deliver, a LOAD request with iterateOver + mappings fills the list on open, `modelFactory: Note` type-checks without a cast. Unchanged in 3.0.21: CONTINUE at construction-time injection; the envelope-without-data fallback.)

| commit | change |
| --- | --- |
| 9c89f62 | fix(sdk): deliver buffered topic frames to the handler |
| c46de22 | fix(sdk): key service-request handlers by method name |
| 7b20f31 | fix(sdk): apply request mappings per item when iterateOver is set |
| bb643b9 | fix(cli): import cross-project beans by package name in register_model |
| 76e320f | fix(cli): edit the registration chain on the AST instead of by regex |

- `packages/kos-codegen-core/src/lib/generators/registration/upsert-chain-entry.ts` (new, exported from the core barrel): the chain edit as a ts-morph AST mutation — `upsertChainEntry(content, bean, importSpec)` anchors on the outermost `.model(...)` call (or `.models()` when empty), keeps a trailing `.companion(...)` after the new entry, and merges the import into an existing declaration for the same module in the file's own quote style; `countChainEntries()` ranks candidate chain files without counting prose.
  - `upsert-chain-entry.test.ts` (new): 8 tests. Run: `npx vitest run --root packages/kos-codegen-core src/lib/generators/registration`
- `packages/kos-ui-cli/src/lib/mcp/tools/registration.mjs`: the regex chain surgery and its comment mask are gone; the tool calls the core mutation. `resolveCrossProjectImportSpec()`: cross-project imports use the library's `package.json` name, then a `tsconfig.base.json` path alias pointing at its source root, then the project name.
- `packages/kos-ui-cli/src/lib/mcp/tools/registration.test.ts` (new): 3 tests for the import specifier.
  Run: `npx vitest run --root packages/kos-ui-cli src/lib/mcp/tools/registration.test.ts`
- `packages/kos-ui-sdk/src/core/core/decorators/kosTopicHandler.ts`: `buffer` adapter captures the inner handler before `enhancedHandler` is reassigned.
- `packages/kos-ui-sdk/src/core/core/decorators/kosTopicHandler.test.ts` (new): buffer full/partial/this, debounce array, throttle discard.
  Run: `npx vitest run --root packages/kos-ui-sdk src/core/core/decorators/kosTopicHandler.test.ts`
- `packages/kos-ui-sdk/src/core/core/model/kos-service-request-manager.ts`: top-level `mappings` skipped when `iterateOver` is set (they apply per item).
- `packages/kos-ui-sdk/src/core/core/decorators/kos-service-request.ts`: handler map keyed by method name instead of method+path.
- `packages/kos-ui-sdk/src/core/core/model/kos-service-request-manager.test.ts` (new): 3 tests covering both.
  Run: `npx vitest run --root packages/kos-ui-sdk src/core/core/model/kos-service-request-manager.test.ts`
- Not yet in the installed plugin (3.0.21 bundle in `.kos/agent-plugins`). To pick it up: `npx nx build @kosdev-code/kos-ui-cli`, `kosui plugin build`, then `kosui plugin install --from dist/packages/kos-agent-plugin` in this checkout — Mark's call.

## Pages

Every page reached a working outcome and all 27 were verified behaving in a browser against the codex backend, with the codex's fixture server on 5676 serving the two setup modules.

| page | edits to tool-emitted code |
| ---- | -------------------------- |
| simple-model | registration import specifier (tool bug); library barrel (generator omission) |
| topic-handlers, topic-filtering, topic-rate-control, topic-flow-control, topic-addressing, topic-catch-up | decorator options the tool does not expose |
| container-models, container-indexes, container-capacity | `KosContainerAwareWithProp` merge (tool emits the wrong interface); container options beyond `sortKey`; `@kosChild` unchanged |
| parent-and-child | `parentId` option (PropKey form) |
| services, service-mapping, service-caching, service-errors | request options beyond the tool's set; method argument lists; `modelFactory` cast; provisional mocks later retired when the endpoints landed; reload declared before the LOAD handler (3.0.20 key collision) |
| model-dependencies | dependency options beyond `modelType`/`id`; `optionsRequired` literal on note |
| futures, multi-futures | future decorators hand-written; `(args, signal, $ctx)` signature |
| model-effects | `dependencies` and `options` on the emitted effect |
| config-properties, config-conversion | property options beyond path/attribute; `@kosConfigBean` hand-written; app registration path mappers |
| state-machine, logging, troubles, view-models, context-and-reload | decorators hand-written on the scaffolded class (no tool exists) |
| companion-models | `@kosCompanion` hand-written (tool omitted it); companion chain entry hand-written; import specifier fixed |

## Count

- Pages attempted: 27. Pages with a working outcome: 27, all verified in a browser against the codex backend.
- Pages completed with **zero** manual edits to SDK-provided surfaces: **0 of 27**.
- Pages whose only edits were adding decorator options a mutator does not expose (the decorator itself, the registration and the class came from the tools): 16 of 27.
- Pages that needed a hand-written decorator or registration entry because no tool exists: 8 of 27 (state-machine, logging, troubles, view-models, context-and-reload, companion-models, multi-futures, config-properties for `@kosConfigBean`).
- Pages that needed a repair of tool output (bug, not gap): 4 of 27 (simple-model, container-* for the merged interface, companion-models for the import).

The 90% target is not met on the strict reading. The honest shape of the result is: scaffolding, registration, hooks, components, service catalogs and mock modules came from the tools on every page; what the tools cannot yet say is the decorator option surface, and that is where every hand edit landed.
