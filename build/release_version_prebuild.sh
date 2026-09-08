#!/bin/bash
set -e -o pipefail

THIS_SCRIPT=$(realpath "$0")
TOP_DIR=$(dirname "$THIS_SCRIPT")/..

# KOS artifact versioning: stamp the tag-derived release version into every
# UI project's .kos.json and into the Maven POMs before the release build.
if [ -z "${KOSBUILD_VERSION}" ]; then
  echo "KOSBUILD_VERSION must be defined for release builds"
  exit 1
fi

if [ -f "${TOP_DIR}/ui/package.json" ]; then
  # Provision a repo-local Node if none is installed (the mvnw pattern).
  . "$(dirname "$THIS_SCRIPT")/nodew.sh"
  cd "${TOP_DIR}/ui"
  npm ci
  npx nx run-many --target=version --args=--ver="${KOSBUILD_VERSION}"
else
  echo "No ui workspace yet; skipping ui version stamp."
fi

if [ -f "${TOP_DIR}/java/pom.xml" ]; then
  # Provision a repo-local JDK + Maven if none are installed.
  . "$(dirname "$THIS_SCRIPT")/jdkw.sh"
  cd "${TOP_DIR}/java"
  # -DprocessAllModules: archetype-generated modules are standalone (no
  # <parent> link to the aggregator), so a plain versions:set would stamp
  # only the aggregator and leave module KABs at the old version.
  mvn versions:set -DnewVersion="${KOSBUILD_VERSION}" -DprocessAllModules=true -DgenerateBackupPoms=false
else
  echo "No Java modules yet; skipping Java version stamp."
fi
