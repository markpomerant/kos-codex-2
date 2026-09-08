#!/bin/bash
set -e -o pipefail

THIS_SCRIPT=$(realpath "$0")
TOP_DIR=$(dirname "$THIS_SCRIPT")/..

# Skips cleanly while java/ has no modules so the repo builds end-to-end from
# day one. Scaffold modules with the KOS Maven archetypes — see java/README.md.
if [ ! -f "${TOP_DIR}/java/pom.xml" ]; then
  echo "No Java modules yet (java/pom.xml not found); skipping Java build."
  exit 0
fi

# Provision a repo-local JDK + Maven if none are installed (the mvnw pattern).
. "$(dirname "$THIS_SCRIPT")/jdkw.sh"

cd "${TOP_DIR}/java"
mvn clean install --no-snapshot-updates -DskipTests -T4
