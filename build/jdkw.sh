# jdkw — JDK + Maven wrapper (the mvnw pattern, one level deeper).
#
# SOURCE this file (it edits PATH/JAVA_HOME): `. "$(dirname "$0")/jdkw.sh"`
# If mvn and a JDK >= the pin are already on PATH they are used as-is —
# developers with their own toolchain/IDE are never touched. Otherwise a
# pinned Temurin JDK and Apache Maven are provisioned ONCE into .kos/
# (repo-local, gitignored) so the java build runs with no global installs.

JDKW_JAVA_MAJOR="21"
JDKW_MAVEN_VERSION="3.9.9"

jdkw_top_dir() {
  # BASH_SOURCE because this file is sourced, not executed.
  local src="${BASH_SOURCE[0]:-$0}"
  echo "$(cd "$(dirname "$src")/.." && pwd)"
}

jdkw_java_ok() {
  command -v java >/dev/null 2>&1 || return 1
  local v
  v="$(java -version 2>&1 | head -n 1 | sed -E 's/.*version "([0-9]+).*/\1/')" || return 1
  [ "$v" -ge "$JDKW_JAVA_MAJOR" ] 2>/dev/null
}

jdkw_os() {
  case "$(uname -s)" in
    Darwin) echo "mac" ;;
    Linux) echo "linux" ;;
    *) return 1 ;;
  esac
}

jdkw_arch() {
  case "$(uname -m)" in
    arm64 | aarch64) echo "aarch64" ;;
    x86_64) echo "x64" ;;
    *) return 1 ;;
  esac
}

jdkw_ensure_java() {
  if jdkw_java_ok; then
    return 0
  fi
  local top os arch dest home
  top="$(jdkw_top_dir)"
  os="$(jdkw_os)" || {
    echo "jdkw: unsupported OS $(uname -s) — install JDK ${JDKW_JAVA_MAJOR}+ manually" >&2
    return 1
  }
  arch="$(jdkw_arch)" || {
    echo "jdkw: unsupported arch $(uname -m) — install JDK ${JDKW_JAVA_MAJOR}+ manually" >&2
    return 1
  }
  dest="${top}/.kos/jdk-${JDKW_JAVA_MAJOR}"
  if [ ! -d "${dest}/bin" ] && [ ! -d "${dest}/Contents/Home/bin" ]; then
    echo "jdkw: no JDK ${JDKW_JAVA_MAJOR}+ found; provisioning Temurin ${JDKW_JAVA_MAJOR} into .kos/ (one-time)" >&2
    mkdir -p "$dest"
    curl -fsSL "https://api.adoptium.net/v3/binary/latest/${JDKW_JAVA_MAJOR}/ga/${os}/${arch}/jdk/hotspot/normal/eclipse" |
      tar -xz -C "$dest" --strip-components=1 || {
        echo "jdkw: JDK download failed — install JDK ${JDKW_JAVA_MAJOR}+ manually" >&2
        return 1
      }
  fi
  if [ -d "${dest}/Contents/Home" ]; then
    home="${dest}/Contents/Home"
  else
    home="$dest"
  fi
  export JAVA_HOME="$home"
  export PATH="${home}/bin:${PATH}"
}

jdkw_ensure_maven() {
  if command -v mvn >/dev/null 2>&1; then
    return 0
  fi
  local top dest
  top="$(jdkw_top_dir)"
  dest="${top}/.kos/maven/apache-maven-${JDKW_MAVEN_VERSION}"
  if [ ! -x "${dest}/bin/mvn" ]; then
    echo "jdkw: no mvn found; provisioning Apache Maven ${JDKW_MAVEN_VERSION} into .kos/ (one-time)" >&2
    mkdir -p "${top}/.kos/maven"
    curl -fsSL "https://archive.apache.org/dist/maven/maven-3/${JDKW_MAVEN_VERSION}/binaries/apache-maven-${JDKW_MAVEN_VERSION}-bin.tar.gz" |
      tar -xz -C "${top}/.kos/maven" || {
        echo "jdkw: Maven download failed — install Maven manually" >&2
        return 1
      }
  fi
  export PATH="${dest}/bin:${PATH}"
}

jdkw_ensure_java && jdkw_ensure_maven
