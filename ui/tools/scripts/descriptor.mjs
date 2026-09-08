import devkit from '@nx/devkit';
import { resolve } from 'path';
const { readCachedProjectGraph } = devkit;
const [, , name] = process.argv;

import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from 'fs';
import prettier from 'prettier';
const graph = readCachedProjectGraph();
const project = graph.nodes[name];

/**
 * Expand the Nx path tokens a KOS artifact target may use in its options.
 * Nx interpolates {projectRoot} in a target's `outputs` but never in arbitrary
 * `options`, and this script reads the options straight off the cached graph.
 */
function resolveTargetPath(value) {
  if (!value) return value;
  return value
    .replace(/\{projectRoot\}/g, project.data.root)
    .replace(/\{workspaceRoot\}\/?/g, '');
}

const dotKabFilePath = resolve(process.cwd(), project.data.root, '.kos.json');
const dotKabJson = JSON.parse(readFileSync(dotKabFilePath, 'utf8'));
if (dotKabJson) {
  dotKabJson.kos = dotKabJson.kos || {};
  dotKabJson.kos.localization = dotKabJson.kos.localization || {};
  const localizations = dotKabJson?.kos?.localization?.namespaces || {};
  if (dotKabJson?.kos?.localization) {
    dotKabJson.kos.localization.defaultLocale =
      dotKabJson.kos.localization.defaultLocale || 'en';
  }
  const locales = resolve(
    process.cwd(),
    project.data.root,
    'src',
    'assets',
    'locales'
  );

  mkdirSync(locales, { recursive: true });

  const localesDirs = readdirSync(locales);
  const mergedNamespaces = localesDirs.reduce(
    (acc, locale) => {
      const namespaces = readdirSync(resolve(locales, locale));

      namespaces.forEach((namespaceFile) => {
        const [namespace] = namespaceFile.split('.');
        acc.namespaces = [...new Set([...acc.namespaces, namespace])];
        acc.localizations[namespace] = acc.localizations[namespace] || {
          locales: {},
        };
        acc.localizations[namespace].locales =
          acc.localizations[namespace].locales || {};
        acc.localizations[namespace].locales[
          locale
        ] = `/assets/locales/${locale}/${namespace}.json`;
      });
      return acc;
    },
    { localizations, namespaces: [] }
  );

  console.log(mergedNamespaces.namespaces);
  const toRemove = Object.keys(localizations).filter(
    (namespace) => !mergedNamespaces.namespaces.includes(namespace)
  );

  toRemove.forEach((namespace) => {
    delete localizations[namespace];
  });
  dotKabJson.kos.localization.namespaces = mergedNamespaces.localizations;

  const options = await prettier.resolveConfig(dotKabFilePath);

  const configFile = await prettier.resolveConfigFile(dotKabFilePath);

  const namespaceOverrides = Object.keys(
    dotKabJson.kos.localization.namespaces
  ).reduce((acc, namespace) => {
    acc[namespace] = {};
    if (dotKabJson.kos.localization.namespaces[namespace].fallbackLocales) {
      acc[namespace].fallbackLocales =
        dotKabJson.kos.localization.namespaces[namespace].fallbackLocales;
    }
    return acc;
  }, {});

  const modified = {
    ...dotKabJson,
    kos: {
      ...dotKabJson.kos,
      localization: {
        ...dotKabJson.kos.localization,
        namespaces: namespaceOverrides,
      },
    },
  };
  const output = await prettier.format(JSON.stringify(modified, null, 2), {
    ...options,
    parser: 'json',
  });
  writeFileSync(dotKabFilePath, output);
}

const buildPath = resolve(
  resolveTargetPath(project.data?.targets?.descriptor?.options?.outputPath)
);

if (!existsSync(buildPath)) {
  mkdirSync(buildPath, { recursive: true });
}

if (dotKabJson) {
  writeFileSync(
    resolve(buildPath, 'descriptor.json'),
    JSON.stringify(dotKabJson, null, 2)
  );
}
