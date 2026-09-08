# Java backend

Scaffold KOS Java modules here with the official KOS Maven archetypes — do not
hand-roll the project structure.

## Prerequisites

- JDK 17 and Maven (see https://kosdev.com/articles/setup-you-kos-java-workspace/)

## Creating a module

```sh
cd java
mvn archetype:generate \
  -DarchetypeGroupId=com.kos.archetypes \
  -DarchetypeArtifactId=system-app
```

Archetypes (see https://kosdev.com/articles/kos_maven_archetypes/):

| Archetype | Use for |
| --- | --- |
| `system-app` | The system app — the starting point of any KOS device |
| `app` | Apps extending system functionality |
| `sdk-app` | SDKs enabling inter-app collaboration |
| `multi-module` | Multiple KABs from a single project |

If your KOS CLI provides it, `kosui java:add` runs the archetype and updates
the CI manifests in one step.

## Conventions

- Keep module versions at `0.0.0-SNAPSHOT` — releases are stamped from the git
  tag by `build/release_version_prebuild.sh` (`mvn versions:set`).
- Register each module's KAB in `.github/build-java.json` and
  `.github/build-release.json` (`artifacts` arrays) so CI publishes it.
