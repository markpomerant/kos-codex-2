#!/bin/bash
set -e -o pipefail

# Run a repo build inside the same container image CI uses — no local Node,
# JDK, or Maven required (only Docker or Podman). "Works in the container" ≈
# "works in CI". Usage: ./build/docker-build.sh [ui|java|release]  (default:
# release)
#
# The image is pulled from GitHub Container Registry; if the pull is denied,
# authenticate first:  docker login ghcr.io -u <github-user>   (or podman login)

THIS_SCRIPT=$(realpath "$0")
TOP_DIR=$(dirname "$THIS_SCRIPT")/..
TARGET="${1:-release}"

if command -v docker >/dev/null 2>&1 && docker info >/dev/null 2>&1; then
  RUNTIME=docker
elif command -v podman >/dev/null 2>&1; then
  RUNTIME=podman
else
  echo "Neither a running docker daemon nor podman found — install one, or use ./build/build-${TARGET}.sh with a local toolchain." >&2
  exit 1
fi

case "$TARGET" in
  ui | java | release) ;;
  *)
    echo "usage: $0 [ui|java|release]" >&2
    exit 1
    ;;
esac

IMAGE="ghcr.io/kosdev-code/kos-buildpublish/kos_builder:dockerimage"
WORKSPACE_NAME="$(basename "$(cd "$TOP_DIR" && pwd)")"

# npm cache + node_modules volumes only make sense once a ui half exists
# (and mounting /work/ui/node_modules would otherwise create a stray ui/).
UI_VOLUMES=""
if [ -f "${TOP_DIR}/ui/package.json" ]; then
  UI_VOLUMES="-v kos-npm-cache-${WORKSPACE_NAME}:/root/.npm -v kos-node-modules-${WORKSPACE_NAME}:/work/ui/node_modules"
fi

# Named volumes keep Maven/npm caches warm between runs and keep the
# container's linux node_modules out of the host's ui/node_modules.
"$RUNTIME" run --rm \
  -v "$(cd "$TOP_DIR" && pwd):/work" \
  -v "kos-m2-${WORKSPACE_NAME}:/root/.m2" \
  ${UI_VOLUMES} \
  -w /work \
  -e KOS_KABTOOL_JAR=/usr/local/lib/kabtool.jar \
  -e JAVA_CMD=java \
  ${KOSBUILD_VERSION:+-e KOSBUILD_VERSION="${KOSBUILD_VERSION}"} \
  --entrypoint bash \
  "$IMAGE" \
  -lc "./build/build-${TARGET}.sh"
