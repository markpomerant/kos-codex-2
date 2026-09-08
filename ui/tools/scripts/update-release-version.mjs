import devkit from '@nx/devkit';
import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import prettier from 'prettier';

// KOS artifact versioning: stamps the project's .kos.json "version" field
// (which kabtool bakes into the KAB). Never touches package.json.
// Driven by tag-based releases:
//   nx run-many --target=version --args=--ver=$KOSBUILD_VERSION

const { readCachedProjectGraph } = devkit;
const [, , name, versionArg] = process.argv;

// "{args.ver}" arrives literally when the target runs without --args=--ver=<v>;
// treat that (or a missing arg) as "report current version, change nothing".
const version =
  versionArg && !versionArg.startsWith('{args') ? versionArg : undefined;

if (!name) {
  console.error('usage: update-release-version.mjs <project> <version>');
  process.exit(1);
}

const graph = readCachedProjectGraph();
const project = graph.nodes[name];
if (!project) {
  console.error('Unknown project: ' + name);
  process.exit(1);
}

const kosJsonPath = resolve(process.cwd(), project.data.root, '.kos.json');
let kosJson;
try {
  kosJson = JSON.parse(readFileSync(kosJsonPath, 'utf8'));
} catch {
  console.error('Missing or invalid .kos.json: ' + kosJsonPath);
  process.exit(1);
}

if (!version) {
  console.log(name + ': ' + kosJson.version + ' (no --ver given; unchanged)');
  process.exit(0);
}

const prettierOptions = await prettier.resolveConfig(kosJsonPath);
const output = await prettier.format(
  JSON.stringify({ ...kosJson, version }, null, 2),
  { ...prettierOptions, parser: 'json' }
);
writeFileSync(kosJsonPath, output);
console.log(name + ': version -> ' + version);
