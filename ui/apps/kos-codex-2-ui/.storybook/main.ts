import type { StorybookConfig } from "@storybook/react-vite";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { mergeConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import remarkGfm from "remark-gfm";

// Storybook loads this config as ESM, so __dirname is not defined here.
const here = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.join(here, "../../..");

// The SDK reads KOS_PORT / KOS_ALLOW_ANONYMOUS / KOS_MOCK_WS from process.env at
// runtime; the app's .env holds the Studio backend settings. Shell values win.
const dotenv = Object.fromEntries(
  readFileSync(path.join(here, "../.env"), "utf8")
    .split("\n")
    .filter((line) => line.trim() && !line.startsWith("#"))
    .map((line) => line.split("=") as [string, string])
    .map(([k, v]) => [k.trim(), v.trim()])
);
const kosEnv = Object.fromEntries(
  Object.keys(dotenv).map((k) => [k, process.env[k] ?? dotenv[k]])
);

// Stories live beside the code they document, in the concept packages — the
// exemplar source IS the documentation sample, so it cannot drift from it.
const config: StorybookConfig = {
  stories: [
    "../../../libs/*/src/**/*.mdx",
    "../../../libs/*/src/**/*.stories.@(ts|tsx)",
  ],
  // public/ carries the snippet viewer and the snippets.json the extract target
  // writes, so <snippet-viewer> fetches snippets from the Storybook origin.
  staticDirs: ["../public"],
  addons: [
    {
      name: "@storybook/addon-docs",
      options: {
        transcludeMarkdown: true,
        // The pages use Markdown tables (GitHub flavour); MDX needs the plugin.
        mdxPluginOptions: {
          mdxCompileOptions: { remarkPlugins: [remarkGfm] },
        },
      },
    },
    "@storybook/addon-themes",
  ],
  framework: { name: "@storybook/react-vite", options: {} },

  // react-docgen parses with Babel configured for `export @decorator class`,
  // and KOS models are generated the other way round — `@kosModel(...)` sits
  // above `export class`. Docgen only produces prop tables for components, and
  // the codex shows real extracted source instead, so it earns nothing here.
  typescript: { reactDocgen: false },
  viteFinal: async (cfg) =>
    mergeConfig(cfg, {
      plugins: [
        tsconfigPaths({
          projects: [path.join(workspaceRoot, "tsconfig.base.json")],
        }),
      ],
      cacheDir: path.join(
        workspaceRoot,
        "node_modules/.cache/kos-codex-2-storybook"
      ),
      define: { "process.env": kosEnv },
    }),
};

export default config;
