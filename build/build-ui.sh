#!/bin/bash
set -e -o pipefail

THIS_SCRIPT=$(realpath "$0")
TOP_DIR=$(dirname "$THIS_SCRIPT")/..

# Skips cleanly while the repo has no ui half so the same scripts work for
# every workspace shape. Grow a ui half with: kosui ui:add
if [ ! -f "${TOP_DIR}/ui/package.json" ]; then
  echo "No ui workspace yet (ui/package.json not found); skipping UI build."
  exit 0
fi

# Provision a repo-local Node if none is installed (the mvnw pattern).
. "$(dirname "$THIS_SCRIPT")/nodew.sh"

cd "${TOP_DIR}/ui"

echo "************ NPM Install ***********"
npm ci

echo "************ Build UI KABs ***********"
npm run kab
