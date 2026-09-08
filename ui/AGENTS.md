# AGENTS

<!-- BEGIN KOS MODEL GUARDRAILS (managed by kosui mcp install-guidance) -->
## KOS model conventions

You are in a KOS workspace. Build and edit KOS models with the kosui MCP server's
tools, not by hand — they produce correct, idempotent decorator wiring.

Rules:
- Never import mobx or use observable arrays/maps directly — reactivity is internal to KOS.
- Use KOS container models (KosModelContainer / KosDataContainer) for collections, not raw
  arrays or Maps; they give indexing, sorting, lifecycle, and delta handling.
- Configuration goes through @kosConfigProperty — never the model options object or constructor.
- Process topic/collection payloads as baseline + deltas (resolveContainerDeltas), not
  clear-and-re-add.
- Don't hand-write decorators, declaration-merging interfaces, or service-request methods —
  use the mutator tools (add_property, add_computed, add_container_support, add_model_effect,
  add_dependency, add_topic_handler, add_config_property, add_service_request).
- 'A property called X' means a basic field → add_property; only use add_config_property when
  the value is device/system-config-bound. Derived values → add_computed (a getter).
- Keep properties (basic fields, dependencies, config properties) grouped at the TOP of the
  class, before the constructor and methods. The property mutators place them there.
- Tools default to dry-run: preview, then write with dryRun:false; validate with validate_model.
- Service requests use the typed decorator from api:generate output, not the SDK barrel.
- An endpoint the generated types don't declare is a BLOCKER TO REPORT, never a reason to fall
  back to resolveServiceUrl / ServiceFactory.build / getAll — that compiles and looks finished,
  which is worse than the hole. add_service_request checks the path and offers the only two
  supported answers: regenerate the types (the endpoint exists, this project just hasn't pulled
  it), or its mock mode (the endpoint doesn't exist yet). When it reports a mocked endpoint,
  say so — the feature is not done.
- Before declaring a framework mechanism broken, prove the failing hop with runtime logging —
  the browser tab's network capture does not show /api traffic.

Toolkit: scaffold_model + the add_* mutators; references at kos://decorator/{name} and
kos://guide/{topic}; run the plan_new_model prompt to plan a model; the build-kos-model
skill walks the flow. Full anti-pattern rationale: kos://guide/anti-patterns.

Stateless tools:
- The kos MCP tools hold no cross-call state. Pass `workspaceRoot` on every call
  whenever the session's cwd is not the checkout being edited (worktrees included).
- Repo-bundled plugins register per checkout: run `kosui plugin install --from <bundleDir>`
  once in each checkout/worktree you launch sessions from.
<!-- END KOS MODEL GUARDRAILS -->
