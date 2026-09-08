import chalk from 'chalk';
import { execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

/**
 * update.mjs — bump @kosdev-code SDK and (optional) DDK families in a KOS app.
 *
 * Usage:
 *   node tools/scripts/update.mjs <sdk-version> [ddk-version]
 *
 * SDK and DDK ship on independent version streams (SDK can be at 3.0.5
 * while DDK is at 3.0.3, and vice versa). Pass each its own version.
 * DDK is optional — if you omit the second arg, or if the workspace has
 * no DDK packages declared in package.json, the DDK family is skipped.
 *
 * Version specs are passed through to `npm install pkg@<spec>`. Typical
 * forms a consumer reaches for:
 *   3.x        — latest within the current major
 *   3.0.x      — latest within the current minor
 *   3.0.5      — exact version pin
 *   ^3.0.0     — any 3.y.z that satisfies the caret range
 *   ~3.0.0     — any 3.0.z within the 3.0 minor line
 *
 * For a "stay within my pinned range, just pull the latest patch" flow,
 * use `update-in-range.mjs` (or `npm run update:patch`) instead — that
 * script runs `npm update` and respects whatever ranges are already in
 * package.json.
 *
 * Order of operations (intentional — do not reorder):
 *   1. Discover which @kosdev-code packages are declared in package.json
 *      and only bump those — consumers without (e.g.) DDK don't gain it.
 *   2. SDK runtime → SDK dev — peer-dep cascade ordering
 *      (`kos-ui-plugin-dev` peer-depends on `kos-ui-plugin`).
 *   3. DDK runtime (if any) — typically depends on already-installed SDK.
 *   4. Global `kos-ui-cli` last, so a workspace install failure doesn't
 *      leave the consumer with a mismatched global CLI.
 *   5. Sync `.env.local` — write the resolved SDK/DDK versions into
 *      KOS_SDK_VERSION / KOS_DDK_VERSION so federation handshake
 *      advertises the same versions that were just installed.
 *
 * `--save-prefix='~'` matches the tilde-pinning convention used by the
 * 3.x preset and the upgrade-to-3 orchestrator.
 */

const [, , sdkVersion, ddkVersion] = process.argv;

if (!sdkVersion) {
  console.error(
    chalk.red(
      'Usage: node tools/scripts/update.mjs <sdk-version> [ddk-version]\n' +
        'Examples:\n' +
        '  node tools/scripts/update.mjs 3.0.x          # SDK only\n' +
        '  node tools/scripts/update.mjs 3.0.x 3.0.x    # SDK + DDK\n' +
        '  node tools/scripts/update.mjs 3.0.5 3.0.3    # exact pins'
    )
  );
  process.exit(1);
}

// Canonical sets — kept in lockstep with the preset and project generators.
// SDK family ships independently of DDK family; they have separate cadence.
const SDK_RUNTIME_PACKAGES = [
  '@kosdev-code/kos-ui-sdk',
  '@kosdev-code/kos-ui-plugin',
  '@kosdev-code/kos-dispense-sdk',
  '@kosdev-code/kos-freestyle-sdk',
  '@kosdev-code/kos-api-levels',
];

const SDK_DEV_PACKAGES = [
  '@kosdev-code/kos-ui-plugin-dev',
  '@kosdev-code/kos-nx-plugin',
];

const DDK_RUNTIME_PACKAGES = [
  '@kosdev-code/kos-ddk',
  '@kosdev-code/kos-ddk-components',
  '@kosdev-code/kos-ddk-model-components',
  '@kosdev-code/kos-ddk-models',
  '@kosdev-code/kos-ddk-styles',
  '@kosdev-code/kos-ddk-story-containers',
];

// Reference packages whose installed (resolved) version is the source of
// truth for federation handshake. Reading these from node_modules after
// install gives us the actual numeric version regardless of whether the
// consumer passed a tag, range, or exact pin.
const SDK_REFERENCE_PKG = '@kosdev-code/kos-ui-sdk';
const DDK_REFERENCE_PKG = '@kosdev-code/kos-ddk';

function readPackageJson() {
  const path = join(process.cwd(), 'package.json');
  return JSON.parse(readFileSync(path, 'utf-8'));
}

function intersectWithDeclared(candidates, depsObj) {
  if (!depsObj) return [];
  return candidates.filter((name) =>
    Object.prototype.hasOwnProperty.call(depsObj, name)
  );
}

function readResolvedVersion(pkgName) {
  const path = join(process.cwd(), 'node_modules', pkgName, 'package.json');
  if (!existsSync(path)) return undefined;
  try {
    return JSON.parse(readFileSync(path, 'utf-8')).version;
  } catch {
    return undefined;
  }
}

/**
 * Update or append `KEY=value` entries in a `.env`-style file, preserving
 * comments, blank lines, and any keys not in the updates map. Returns
 * null when nothing actually changed (caller can skip the write).
 */
function applyEnvUpdates(content, updates) {
  const lines = content.split(/\r?\n/);
  const handled = new Set();
  const out = [];
  let changed = false;

  for (const line of lines) {
    const m = /^(\s*)([A-Z][A-Z0-9_]*)(\s*=\s*)(.*)$/.exec(line);
    if (m) {
      const key = m[2];
      if (Object.prototype.hasOwnProperty.call(updates, key)) {
        const next = `${m[1]}${key}${m[3]}${updates[key]}`;
        if (next !== line) changed = true;
        out.push(next);
        handled.add(key);
        continue;
      }
    }
    out.push(line);
  }

  for (const key of Object.keys(updates)) {
    if (!handled.has(key)) {
      out.push(`${key}=${updates[key]}`);
      changed = true;
    }
  }

  return changed ? out.join('\n') : null;
}

function syncEnvLocal(updates) {
  const filtered = Object.fromEntries(
    Object.entries(updates).filter(([, v]) => Boolean(v))
  );
  if (Object.keys(filtered).length === 0) return;

  const path = join(process.cwd(), '.env.local');
  const existing = existsSync(path) ? readFileSync(path, 'utf-8') : '';
  const next = applyEnvUpdates(existing, filtered);
  if (next === null) return;
  writeFileSync(path, next.endsWith('\n') ? next : `${next}\n`);
  console.log(chalk.green('Synced .env.local federation source pins:'));
  for (const [k, v] of Object.entries(filtered)) {
    console.log(chalk.gray(`  - ${k}=${v}`));
  }
}

const pkg = readPackageJson();
const sdkRuntime = intersectWithDeclared(
  SDK_RUNTIME_PACKAGES,
  pkg.dependencies
);
const sdkDev = intersectWithDeclared(SDK_DEV_PACKAGES, pkg.devDependencies);
const ddkRuntime = ddkVersion
  ? intersectWithDeclared(DDK_RUNTIME_PACKAGES, pkg.dependencies)
  : [];

if (sdkRuntime.length === 0 && sdkDev.length === 0 && ddkRuntime.length === 0) {
  console.warn(
    chalk.yellow(
      'update.mjs: no @kosdev-code packages found in package.json — nothing to update.'
    )
  );
  process.exit(0);
}

const buildInstallString = (packages, version) =>
  packages.map((dep) => `${dep}@${version}`).join(' ');

const flags = [
  '--loglevel error',
  '--no-progress',
  '--no-audit',
  '--no-fund',
  "--save-prefix='~'",
].join(' ');

console.log(chalk.green(`SDK target: ${sdkVersion}`));
if (ddkVersion) {
  console.log(chalk.green(`DDK target: ${ddkVersion}`));
} else if (
  intersectWithDeclared(DDK_RUNTIME_PACKAGES, pkg.dependencies).length > 0
) {
  console.log(
    chalk.yellow(
      'DDK packages are declared in package.json but no DDK version was passed — they will NOT be updated.'
    )
  );
}

if (sdkRuntime.length > 0) {
  console.log(
    chalk.green(
      `Updating ${sdkRuntime.length} SDK runtime dependency/dependencies...`
    )
  );
  sdkRuntime.forEach((p) => console.log(chalk.gray(`  - ${p}`)));
  execSync(
    `npm i ${buildInstallString(sdkRuntime, sdkVersion)} --save ${flags}`,
    { stdio: 'inherit' }
  );
}

if (sdkDev.length > 0) {
  console.log(
    chalk.green(`Updating ${sdkDev.length} SDK dev dependency/dependencies...`)
  );
  sdkDev.forEach((p) => console.log(chalk.gray(`  - ${p}`)));
  execSync(
    `npm i ${buildInstallString(sdkDev, sdkVersion)} --save-dev ${flags}`,
    { stdio: 'inherit' }
  );
}

if (ddkRuntime.length > 0) {
  console.log(
    chalk.green(
      `Updating ${ddkRuntime.length} DDK runtime dependency/dependencies...`
    )
  );
  ddkRuntime.forEach((p) => console.log(chalk.gray(`  - ${p}`)));
  execSync(
    `npm i ${buildInstallString(ddkRuntime, ddkVersion)} --save ${flags}`,
    { stdio: 'inherit' }
  );
}

console.log(chalk.green('Updating kos-ui-cli (global)...'));
execSync(`npm i -g @kosdev-code/kos-ui-cli@${sdkVersion} ${flags}`, {
  stdio: 'inherit',
});

// Sync .env.local federation source pins to the resolved installed
// versions, so KOS_SDK_VERSION / KOS_DDK_VERSION match what's in
// node_modules and federation handshake advertises the right values.
const installedSdkVersion = readResolvedVersion(SDK_REFERENCE_PKG);
const installedDdkVersion =
  ddkRuntime.length > 0 ? readResolvedVersion(DDK_REFERENCE_PKG) : undefined;
syncEnvLocal({
  KOS_SDK_VERSION: installedSdkVersion,
  KOS_DDK_VERSION: installedDdkVersion,
});

console.log(chalk.green('✅ Done.'));
