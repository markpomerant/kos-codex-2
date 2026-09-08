# kos-codex-2

KOS application repository. The layout is the same whether the repo holds a
UI workspace, a Java backend, or both — each half can be added at any time
without restructuring, and every build/CI script skips cleanly over a half
that doesn't exist yet.

## Layout

| Path | Purpose |
| --- | --- |
| `ui/` | KOS UI workspace, if present (Nx root lives here — run `npm`/`nx` commands inside `ui/`; grow with `kosui ui:add`) |
| `java/` | KOS Java backend, if present (Maven; scaffold modules with the KOS Maven archetypes — `kosui java:add` or see `java/README.md`) |
| `build/` | Repo-level build orchestration scripts used locally and by CI |
| `.github/` | CI workflows and `kos_build_handler` manifests (`build-*.json`) |

The two halves never embed into each other: each produces its own KAB
artifacts, published together by the release pipeline.

## Local builds

```sh
./build/build-ui.sh        # npm ci + build all UI KABs (skips if no ui/)
./build/build-java.sh      # mvn build (skips if no java modules)
./build/build-release.sh   # both, in order — what the release pipeline runs
```

**No toolchain? No problem.** The build scripts provision what's missing
automatically (the `mvnw` pattern): `build/nodew.sh` fetches a pinned Node
runtime and `build/jdkw.sh` a pinned Temurin JDK + Maven, each into the
repo-local, gitignored `.kos/` on first use. Developers with their own
toolchains/IDEs are never touched — the wrappers always defer to an existing
install, so working on just one half in your own IDE needs nothing from here.

Optional: `./build/docker-build.sh ui|java|release` runs a build inside the
same container image CI uses (docker or podman; `docker login ghcr.io` for the
image) — useful to reproduce a CI-environment issue, never required for
development. Publishing is CI-only (tag push); no local flow publishes
anything.

## Releases (tag-driven)

Push a semver tag to cut a release:

```sh
git tag 1.0.0 && git push origin 1.0.0
```

The release workflow derives `KOSBUILD_VERSION` from the tag, then
`build/release_version_prebuild.sh` stamps it into every UI project's
`.kos.json` (via `nx run-many --target=version`) and the Maven POMs
(`mvn versions:set`) before building and publishing all artifacts.

## CI configuration

Workflows run in the `kos_builder` container and publish through
`kos_build_handler.sh`. Repository secrets required:

- `KOSBUILD_SECRET_URL`
- `KOSBUILD_SECRET_PASSWORD`

The `default_keyset` in `.github/build-*.json` is org-specific (currently
`prod.kos`) — change it there if your organization uses a different
keyset.

## Adding artifacts

Every KAB the repo produces must be listed in the `artifacts` arrays of
`.github/build-ui.json` / `build-java.json`, with the union kept in
`build-release.json`. `kosui ci:sync` keeps these in sync with the projects
and modules that actually exist (`kosui java:add` updates them automatically).
