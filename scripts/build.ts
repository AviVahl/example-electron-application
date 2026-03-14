import * as esbuild from "esbuild";
import fs from "node:fs/promises";
import { tailwindEsbuildPlugin } from "./tailwind-esbuild-plugin.ts";

const isWatch = process.argv.includes("--watch") || process.argv.includes("-w");
const outPath = new URL("../dist/", import.meta.url);
const publicPath = new URL("../public/", import.meta.url);

const commonBuildOptions: esbuild.BuildOptions = {
  logLevel: "info",
  color: true,
  outdir: "dist",
  legalComments: "none",
  bundle: true,
  target: "es2022",
  entryNames: "[name]",
  loader: {
    ".json": "json",
    ".png": "file",
    ".jpeg": "file",
    ".jpg": "file",
    ".svg": "file",
  },
  assetNames: "assets/[name]-[hash]",
  minify: !isWatch,
  sourcemap: isWatch,
  jsx: "automatic",
  jsxDev: isWatch,
  define: {
    // avoid "Download the React DevTools" message, we're in electron and do not intend to use the browser extension
    __REACT_DEVTOOLS_GLOBAL_HOOK__: `{ "isDisabled": true }`,
    "process.env.NODE_ENV": isWatch ? '"development"' : '"production"',
  },
  external: ["electron/common", "electron/renderer", "electron/main", "electron/utility"],
};

const nodeEsmBundles: esbuild.BuildOptions = {
  platform: "node",
  ...commonBuildOptions,
  format: "esm",
  entryPoints: ["src/main.ts"],
};

const browserEsmBundle: esbuild.BuildOptions = {
  ...commonBuildOptions,
  format: "esm",
  entryPoints: ["src/renderer.tsx"],
  plugins: [tailwindEsbuildPlugin],
};

const browserCjsPreloadBundle: esbuild.BuildOptions = {
  ...commonBuildOptions,
  format: "cjs",
  entryPoints: ["src/preload.ts"],
  outExtension: { ".js": ".cjs" },
  packages: "external",
};

await fs.rm(outPath, { recursive: true, force: true });
await fs.mkdir(outPath, { recursive: true });
await fs.cp(publicPath, outPath, { recursive: true });

const bundles = [nodeEsmBundles, browserEsmBundle, browserCjsPreloadBundle];

if (isWatch) {
  const buildContexts = await Promise.all(bundles.map((bundle) => esbuild.context(bundle)));
  await Promise.all(buildContexts.map((context) => context.watch()));
} else {
  await Promise.all(bundles.map((bundle) => esbuild.build(bundle)));
}
