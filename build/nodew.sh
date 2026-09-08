# nodew — Node wrapper, the mvnw pattern for Node.js.
#
# SOURCE this file (it edits PATH): `. "$(dirname "$0")/nodew.sh"`
# If a suitable node is already on PATH it is used as-is. Otherwise a pinned
# Node runtime is downloaded ONCE into .kos/node/ (repo-local, gitignored) so
# non-UI developers can run the build scripts with no global Node install.
# npm ships inside the Node distribution.

NODEW_VERSION="22.20.0"
NODEW_MAJOR="${NODEW_VERSION%%.*}"

nodew_top_dir() {
  # BASH_SOURCE because this file is sourced, not executed.
  local src="${BASH_SOURCE[0]:-$0}"
  echo "$(cd "$(dirname "$src")/.." && pwd)"
}

nodew_have_suitable_node() {
  command -v node >/dev/null 2>&1 || return 1
  local v
  v="$(node --version 2>/dev/null)" || return 1
  v="${v#v}"
  [ "${v%%.*}" -ge "$NODEW_MAJOR" ] 2>/dev/null
}

nodew_platform() {
  case "$(uname -s)" in
    Darwin) echo "darwin" ;;
    Linux) echo "linux" ;;
    *) return 1 ;;
  esac
}

nodew_arch() {
  case "$(uname -m)" in
    arm64 | aarch64) echo "arm64" ;;
    x86_64) echo "x64" ;;
    *) return 1 ;;
  esac
}

nodew_ensure() {
  if nodew_have_suitable_node; then
    return 0
  fi

  local top platform arch dist dest
  top="$(nodew_top_dir)"
  platform="$(nodew_platform)" || {
    echo "nodew: unsupported OS $(uname -s) — install Node.js ${NODEW_MAJOR}+ manually" >&2
    return 1
  }
  arch="$(nodew_arch)" || {
    echo "nodew: unsupported arch $(uname -m) — install Node.js ${NODEW_MAJOR}+ manually" >&2
    return 1
  }
  dist="node-v${NODEW_VERSION}-${platform}-${arch}"
  dest="${top}/.kos/node/${dist}"

  if [ ! -x "${dest}/bin/node" ]; then
    echo "nodew: no Node ${NODEW_MAJOR}+ found; provisioning ${dist} into .kos/node/ (one-time)" >&2
    mkdir -p "${top}/.kos/node"
    curl -fsSL "https://nodejs.org/dist/v${NODEW_VERSION}/${dist}.tar.gz" |
      tar -xz -C "${top}/.kos/node" || {
        echo "nodew: download failed — install Node.js ${NODEW_MAJOR}+ manually" >&2
        return 1
      }
  fi

  export PATH="${dest}/bin:${PATH}"
}

nodew_ensure
