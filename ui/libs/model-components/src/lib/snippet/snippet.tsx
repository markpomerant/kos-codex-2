import { createElement, Fragment } from "react";

/**
 * Renders one or more `<snippet-viewer>` elements. The viewer (loaded in .storybook/preview-head.html from its published distribution)
 * fetches snippets.json — the output of `nx run kos-codex-2-ui:extract`, harvested
 * from `// extract-code <name>` markers — and looks each key up as `<name>@<file>`.
 */
export const Snippet = ({ name }: { name: string | string[] }) => {
  const keys = Array.isArray(name) ? name : [name];
  return createElement(
    Fragment,
    null,
    keys.map((key) =>
      createElement("snippet-viewer", { key, snippet: key, class: "codex-snippet" })
    )
  );
};
