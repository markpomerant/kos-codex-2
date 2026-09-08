# "How it was built" tables: rewrite for human readers

Pages: `libs/model-components/src/lib/components/<page>/*.mdx`. Each has a
`## How it was built` table with columns Step | Command. Today many Command cells name
kos-codegen MCP mutators (`kos-codegen \`add_topic_handler\``). Mark: that is agent
tooling and must not appear in prose for humans. The tool calls are already preserved in
`planning/recipes/codex-recipes.json`; do not worry about losing them.

Rewrite every Command cell so a human reads what was done:
- Where a `kosui` command exists, show it: `kosui model --name x --project y`,
  `kosui model:add-service-request ...`, `kosui model:add-future ...`,
  `kosui model:companion ...`, `kosui model:container ...`, `kosui model:hook ...`,
  `kosui component ...`, `kosui api:generate ...`. Keep the exact arguments already there.
- Where only an MCP mutator exists (add property, computed property, topic handler,
  dependency, child, config property, container support, model effect, registration,
  validation), describe the step in plain words: "add a topic handler on `widget` for
  `/codex/widget/temperature`", "add `teamKey` as a property of `project`", "register
  `device` in the app's registration chain". Name the model, the member and the option
  values the row already names. Never write "kos-codegen", a tool name with underscores,
  or "MCP".
- Keep every Step cell, row order and every value. Keep the table syntax valid. Prose
  rules: `planning/prose-style-brief.md`; vocabulary: model property, computed property,
  event, trouble.
- Touch only the tables (and a sentence next to a table if it says "the tool" in a way
  that no longer reads). No code, markers, snippets, stories. No git.

Report per page: rows changed, with one before/after example. Append to
`planning/page-notes.md` under `## Build tables — <group>`.
