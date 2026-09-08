import chalk from 'chalk';
import { execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

/**
 * update-in-range.mjs — `npm update` every declared @kosdev-code package,
 * respecting whatever ranges are already pinned in package.json.
 *
 * Usage:
 *   node tools/scripts/update-in-range.mjs
 *   npm run update:patch
 *
 * Use this when you want to stay within your current pin (e.g., `~3.0.1`)
 * and just pull the latest patch in that line. No version arg — npm
 * resolves "latest within range" itself.
 *
 * For range-JUMP updates (e.g., 3.0 → 3.1, or pin to an exact version),
 * use `update.mjs` instead.
 *
 * After installing, this script syncs `.env.local` (`KOS_SDK_VERSION` /
 * `KOS_DDK_VERSION`) to the resolved installed versions so federation
 * handshake advertises the same versions that were just installed.
 */

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
const ddkRuntime = intersectWithDeclared(
  DDK_RUNTIME_PACKAGES,
  pkg.dependencies
);

const allDeclared = [...sdkRuntime, ...sdkDev, ...ddkRuntime];
if (allDeclared.length === 0) {
  console.warn(
    chalk.yellow(
      'update-in-range.mjs: no @kosdev-code packages found in package.json — nothing to update.'
    )
  );
  process.exit(0);
}

const flags = '--loglevel error --no-progress --no-audit --no-fund';

console.log(
  chalk.green(
    `Running 'npm update' for ${allDeclared.length} @kosdev-code package(s) — staying within declared ranges...`
  )
);
allDeclared.forEach((p) => console.log(chalk.gray(`  - ${p}`)));

execSync(`npm update ${allDeclared.join(' ')} ${flags}`, { stdio: 'inherit' });

// Sync .env.local federation source pins to the resolved installed
// versions. DDK is included only if any DDK package was actually
// declared in the consumer's dependencies.
syncEnvLocal({
  KOS_SDK_VERSION: readResolvedVersion(SDK_REFERENCE_PKG),
  KOS_DDK_VERSION:
    ddkRuntime.length > 0 ? readResolvedVersion(DDK_REFERENCE_PKG) : undefined,
});

console.log(chalk.green('✅ Done.'));
