# Codex backend: endpoints and contract changes

The codex backend is the set of `/api/codex/*` endpoints the Studio process hosts for
the codex (in-memory, session-scoped dummy data). This file records what the codex
asked of it and the status of each request.

## Landed (2026-09-08, uncommitted in `~/Code/kos-studio-2`, `CodexService.java`)

| Change | Used by | Shape |
| ------ | ------- | ----- |
| `GET /api/codex/objects/stats` | document.onStatsLoaded (service-caching page) | `{ count, computedAt }` in the envelope |
| `GET /api/codex/objects/{id}` | document.loadNote (service-errors page) | the object; an unknown id answers success with no `data` (the dispatcher's rendering of a null return) |
| `POST /api/codex/objects` keeps a client-supplied `id` (assigns one only when absent) and returns the stored object | document.addNote | `{ id, desc }` |
| `PUT /api/codex/objects/{id}` returns the modified object | document.modifyNote | `{ id, desc }` |

The write-path rule these serve: a mutation closes its own loop from its response —
the changed item, the whole collection, or a bare success the model applies itself —
and never re-reads the list. Topic handlers are for out-of-band events only.

## Test endpoints (landed 2026-09-08, same uncommitted change)

| Endpoint | Used by | Behaviour |
| -------- | ------- | --------- |
| `POST /api/codex/test/event` `{ topic, payload }` | device.publishEvent (every topic story, troubles story) | publishes the payload on the topic through the broker, so stories exercise the real websocket |
| `POST /api/codex/test/objects/added` | device.addObject (Lifecycle Race Conditions page) | adds an object out of band and publishes it on `/studio/codex/objects/added` |
| `POST /api/codex/test/objects/removed` | device.removeObject (Lifecycle Race Conditions page) | removes the highest-id object and publishes it on `/studio/codex/objects/removed` |
| `GET /api/codex/test/objects/race` | journal.onNotesLoaded (Lifecycle Race Conditions baseline) | adds and publishes an object, sleeps, then returns the list, so the delta always races the baseline |

These retire the fixture server: `fixtures/` is gone and the preview registers no mocks and no setups.

| `POST /api/codex/test/troubles/raise` / `remove` | device.raiseTrouble / removeTrouble (Troubles page) | the backend's `CodexSessionTrouble` (a `Trouble` implementing the `path` iface, resolvable, `resolve()` returns a succeeding `FutureWork`) is added to / removed from the backend's trouble service, which publishes `/kos/trouble/add` and `/remove` itself; resolving goes through the standard `/api/troubles/resolve/{id}` |

## Open

- **State beans.** `@kosStateBean` / `@kosStateProp` are the one communication pattern the codex cannot show: the codex backend has no state service (`/api/kos/state`). A small state service with one or two observable values would let the codex cover those two decorators.


- Frames published through the test endpoint carry no destination address, so the topic-addressing page's `destinationAddress` handler (frames addressed to this client's connection) cannot be exercised through the backend; its wildcard handler works. Whether the broker can publish to a destination is the backend owner's call.
- A malformed id (`GET /api/codex/objects/abc`) answers `status: 500` in the envelope; the
  errors page uses it as its real failure. Whether the backend should report that
  differently is the endpoint owner's call.

## Existing endpoints the codex uses as-is

`GET /api/codex/objects`, `DELETE /api/codex/objects/{id}`,
`POST /api/codex/objects/additional-data/{numOfItems}`, `GET /api/troubles`.
