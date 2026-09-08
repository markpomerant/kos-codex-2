# KOS Codex

A codex of KOS exemplars: each page teaches one concept through a model built
with the KOS tooling, a live canvas, and the commands that produced it.

## Running it

The codex talks to the **codex backend**: endpoints hosted for the codex by the Studio process on port 10010 (like the previous codex). They are plain KOS-device-style endpoints and use no Studio-specific patterns.
`apps/kos-codex-2-ui/.env` carries the backend settings (`KOS_PORT=10010`).

1. Start the Studio process so the codex backend answers on `http://127.0.0.1:10010`.
2. `npx nx run kos-codex-2-ui:storybook` for the dev loop, or
   `npx nx run kos-codex-2-ui:build-storybook` and serve `dist/storybook/kos-codex-2`.

Every request and every event goes to and from the codex backend. The codex has no mock layer. Device-side activity (events, out-of-band changes) is requested through the `device` model, whose service requests call the backend's `/api/codex/test/*` endpoints.

## Regenerating

- Types: `kosui api:generate --project=core-concept-models --studio --host=http://127.0.0.1:10010`
- Snippets: `npx nx run kos-codex-2-ui:extract` writes `apps/kos-codex-2-ui/public/snippets.json` (runs before every Storybook build); pages render them with the `<snippet-viewer>` web component, loaded in `.storybook/preview-head.html` from its published distribution (https://subtle-kashata-528e61.netlify.app/snippet-viewer.js).
- Coverage gate: `node tools/check-coverage.mjs`

## Planning

- `planning/tooling-gaps.md`: curated log of where the tooling could not reach, with landing points.
- `planning/page-notes.md`: raw per-page notes (what was generated, filled, hand-added, verified).
- `planning/needed-endpoints.md`: endpoints and contract changes requested from the codex backend.
