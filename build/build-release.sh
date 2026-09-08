#!/bin/bash
set -e -o pipefail

THIS_SCRIPT=$(realpath "$0")
THIS_SCRIPT_DIR=$(dirname "$THIS_SCRIPT")

echo "************ Run UI Build ***********"
"${THIS_SCRIPT_DIR}/build-ui.sh"

echo "************ Run Java Build ***********"
"${THIS_SCRIPT_DIR}/build-java.sh"
