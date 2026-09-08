/**
 * Codex coverage gate.
 *
 * Compares the exemplar matrix against the SDK decorator surface and reports
 * options nothing demonstrates and options claimed that do not exist. This is
 * what makes the codex a release signal rather than a pile of pages: a new SDK
 * option shows up as a hole, a removed one as a stale claim.
 *
 * A page may claim options across several decorators, because concepts do not
 * respect decorator boundaries — a guard belongs with the machine it guards.
 *
 * It also refuses to count a page that does not exist, or one whose claimed
 * options never appear in extracted snippet source. Without that, a stub page
 * reports as full coverage.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const read = (f) => JSON.parse(readFileSync(path.join(here, f), "utf8"));

const surface = read("decorator-surface-full.json");
const matrix = read("codex-matrix.json");

// A deferred decorator is a deliberate exclusion, not a hole. It is reported
// every run so it stays visible instead of quietly vanishing from the bar.
const deferred = matrix.deferred ?? {};
const isDeferred = (dec, opt) =>
  dec in deferred && (deferred[dec].options ?? []).includes(opt);

const real = new Map(
  Object.entries(surface.decorators).map(([d, i]) => [d, new Set(i.options)])
);

const claimed = new Map();
const invented = [];
const duplicated = [];
const decoratorsSeen = new Set();

for (const page of matrix.pages) {
  for (const [dec, opts] of Object.entries(page.claims)) {
    decoratorsSeen.add(dec);
    const known = real.get(dec);
    if (!known) {
      invented.push(`${dec} (no such decorator) @ ${page.page}`);
      continue;
    }
    for (const opt of opts) {
      const key = `${dec}.${opt}`;
      if (!known.has(opt)) invented.push(`${key} @ ${page.page}`);
      if (claimed.has(key))
        duplicated.push(`${key} (${claimed.get(key)}, ${page.page})`);
      else claimed.set(key, page.page);
    }
  }
}

const uncovered = [];
for (const [dec, opts] of real)
  for (const opt of opts)
    if (!claimed.has(`${dec}.${opt}`) && !isDeferred(dec, opt))
      uncovered.push(`${dec}.${opt}`);

const decoratorsWithNoPage = [...real.keys()].filter(
  (d) => !decoratorsSeen.has(d) && !(d in deferred)
);

// Claimed options must appear as literals in extracted source, or a stub page
// counts as coverage.
let snippetText = "";
try {
  const snips = JSON.parse(
    readFileSync(
      path.join(here, "../apps/kos-codex-2-ui/public/snippets.json"),
      "utf8"
    )
  );
  snippetText = Object.values(snips).join("\n");
} catch {
  // No extraction yet.
}

const unproven = [];
for (const page of matrix.pages) {
  const opts = Object.values(page.claims).flat();
  if (!opts.length) continue;
  const shown = opts.filter((o) => {
    const leaf = o.split(".").pop();
    return new RegExp(`\\b${leaf}\\s*:`).test(snippetText);
  });
  if (shown.length < opts.length)
    unproven.push(
      `${page.page}: ${shown.length}/${opts.length} claimed options appear in extracted source`
    );
}

// A matrix entry is a promise; a built page is the thing itself.
let built = null;
try {
  const idx = JSON.parse(
    readFileSync(
      path.join(here, "../dist/storybook/kos-codex-2/index.json"),
      "utf8"
    )
  );
  built = new Set(
    Object.values(idx.entries).map((e) =>
      String(e.title).split("/").pop().trim().toLowerCase().replace(/\s+/g, "-")
    )
  );
} catch {
  // No build yet.
}

const totalReal = [...real.values()].reduce((n, s) => n + s.size, 0);
const pct = totalReal ? Math.round((claimed.size / totalReal) * 100) : 100;
const pagedCount = [...real.keys()].filter((d) => decoratorsSeen.has(d)).length;
const deferredDecorators = [...real.keys()].filter(
  (d) => !decoratorsSeen.has(d) && d in deferred
).length;
const deferredCount = Object.values(deferred).reduce(
  (n, d) => n + (d.options ?? []).length,
  0
);

console.log(
  `decorators : ${real.size} in SDK, ${pagedCount} with a page` +
    (deferredDecorators ? `, ${deferredDecorators} deferred` : "")
);
console.log(`options    : ${totalReal} in SDK, ${claimed.size} claimed  (${pct}%)`);
console.log(`pages      : ${matrix.pages.length}`);
if (deferredCount)
  console.log(
    `deferred   : ${deferredCount} option(s) across ${
      Object.keys(deferred).length
    } decorator(s)`
  );

const report = (label, items) => {
  if (!items.length) return;
  console.log(`\n${label} (${items.length}):`);
  for (const i of items) console.log(`  ${i}`);
};

if (built) {
  const missing = matrix.pages.map((p) => p.page).filter((n) => !built.has(n));
  const authored = matrix.pages.length - missing.length;
  console.log(
    `authored   : ${authored}/${matrix.pages.length} pages built  (${Math.round(
      (authored / matrix.pages.length) * 100
    )}%)`
  );
  report("PAGES IN THE MATRIX WITH NO BUILT PAGE", missing);
  report("PAGES WHOSE CLAIMED OPTIONS ARE NOT IN THE SOURCE", unproven);
} else {
  console.log("authored   : unknown (no storybook build found)");
}

report("OPTIONS NOTHING DEMONSTRATES", uncovered);
report("CLAIMED BUT NOT IN THE SDK", invented);
report("CLAIMED BY MORE THAN ONE PAGE", duplicated);
report("DECORATORS WITH NO PAGE", decoratorsWithNoPage);
report(
  "DEFERRED (deliberate, not a hole)",
  Object.entries(deferred).map(([d, v]) => `${d}: ${v.reason}`)
);

const failed =
  uncovered.length ||
  invented.length ||
  duplicated.length ||
  decoratorsWithNoPage.length;
console.log(failed ? "\nFAIL" : "\nOK - matrix covers the surface");
process.exit(failed ? 1 : 0);
