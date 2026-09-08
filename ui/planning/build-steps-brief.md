# "How it was built": tables to headed steps with bash blocks

Every page's `## How it was built` section is a two-column table (Step | Command). Cells
that hold a real command are hard to read at a glance, and a cell such as "once per
method, with --methodName, --servicePath ..." shows no actual list of calls. Rewrite each
section as a sequence of steps: a bold lead sentence, then a fenced `bash` block when the
step is a command. Nothing else on the page changes.

## Target shape

```
## How it was built

**Pull the codex backend's API types.** The request commands validate every path
against this catalog.

```bash
kosui api:generate --project core-concept-models --studio --host http://127.0.0.1:10010
```

**Scaffold the model.**

```bash
kosui model --name document --project core-concept-models
```

**Give it the notes container.** Container support on `document`: property `notes`,
child `NoteModel`.

**Add the requests.** One command per method. `--lifecycle LOAD` runs the request when
the model loads; without it the request runs when the method is called.

```bash
kosui model:add-service-request --modelName document --project core-concept-models \
  --methodName onNotesLoaded --servicePath /api/codex/objects --method get --lifecycle LOAD
kosui model:add-service-request --modelName document --project core-concept-models \
  --methodName addNote --servicePath /api/codex/objects --method post
```
```

Rules for the shape:
- One step = one bold lead sentence (ends with a period, inside the bold) and, when the
  step is a command, one fenced `bash` block. A step with no command is the sentence alone.
- Every command that was run is written out in full and copy-pasteable. "Once per method
  with ..." becomes the actual list of commands, one per line, in one block. Break long
  lines with ` \` and a two-space indent.
- Keep the existing steps and their order. Keep the paragraph(s) that follow the table
  unchanged. Steps that read "written by hand" stay as sentences.
- Tables are removed entirely from this section. Do not touch any other section.

## Verified command facts (from `kosui <cmd> --help` and the CLI source)

- Flags are camelCase: `--modelName`, `--project`, `--methodName`, `--servicePath`,
  `--method`, `--lifecycle`, `--mode`, `--futureAware`, `--parentAware`, `--singleton`,
  `--container`. `--future-aware` and `--parent-aware` are WRONG and must be corrected.
- Use `--project value`, never `--project=value`.
- `kosui model --name <model> --project core-concept-models [--futureAware complete]
  [--parentAware]`. `--futureAware` takes `none | minimal | complete`. `--parentAware`
  alone means true.
- `kosui model:add-service-request --modelName <model> --project core-concept-models
  --methodName <name> --servicePath <path> --method <get|post|put|delete>
  [--lifecycle LOAD]`. `--method` values are lowercase. Passing `--lifecycle` selects
  lifecycle mode; leaving it out selects method mode, so `--mode method` is not written.
- `kosui model:add-future --modelName <model> --project core-concept-models --futureType
  complete` adds future support to an existing model (the futures page's second half).
- `kosui model:companion --name timer --project core-concept-models --companionParent
  session --companionPattern composition`.
- `kosui model:hook --modelName <model> --project model-components`.
- `kosui component --name <component> --project model-components`.
- There is no kosui command for: adding a property, a computed property, a dependency, a
  topic handler, a config property, a model effect, container support, a single child, or
  registering a model. Those steps stay as plain sentences (as the tables already word
  them). Never name kos-codegen, MCP, or any `snake_case` tool.

## Endpoints per model (from `libs/core-concept-models/src/models/*/services/*-services.ts`)

document: onNotesLoaded GET /api/codex/objects (lifecycle LOAD); addNote POST
/api/codex/objects; modifyNote PUT /api/codex/objects/{id}; removeNote DELETE
/api/codex/objects/{id}; refreshStats GET /api/codex/objects/stats (lifecycle LOAD, the
service-caching page's request); loadNote GET /api/codex/objects/{id}. The reload on the
service-mapping page (`reloadNotes`) reuses the onNotesLoaded endpoint in method mode and
was not a separate command. Read `document-model.ts` before writing any `--lifecycle`.
journal: onNotesLoaded GET /api/codex/test/objects/race (lifecycle LOAD).
task: startAdditionalData POST /api/codex/objects/additional-data/{numOfItems}.
timer: startShort and startLong, both POST /api/codex/objects/additional-data/{numOfItems}.
project: startSync POST /api/codex/objects/additional-data/{numOfItems}.
device: publishEvent POST /api/codex/test/event; addObject POST
/api/codex/test/objects/added; removeObject POST /api/codex/test/objects/removed;
raiseTrouble POST /api/codex/test/troubles/raise; removeTrouble POST
/api/codex/test/troubles/remove.

Where a page's table names a service-caching or service-errors request, confirm the
method name and lifecycle against the model source; the table on service-caching names
`onStatsLoaded` but the catalog key is `refreshStats`. The source wins.

## Prose

No em dashes. Concrete sentences. "model property" and "computed model property". No
narration of history. Do not add commentary beyond the lead sentence.

## Verify

After editing, run `grep -n '^|' <file>` inside the section to confirm no table rows
remain, and `grep -n 'future-aware\|parent-aware\|--project=\|--mode method' <file>`
returns nothing. Report the pages edited and any fact you could not confirm.
