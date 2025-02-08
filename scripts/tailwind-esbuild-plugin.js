// @ts-check

import fs from "node:fs/promises";
import tailwindPostcss from "@tailwindcss/postcss";
import postcss from "postcss";

/** @type {import("esbuild").Plugin} */
export const tailwindEsbuildPlugin = {
  name: "tailwind-esbuild-plugin",
  setup(build) {
    build.onLoad({ filter: /\.css$/ }, async (args) => {
      const result = await postcss([tailwindPostcss()]).process(
        await fs.readFile(args.path, "utf8"),
        { from: args.path },
      );

      return {
        contents: result.css,
        warnings: result
          .warnings()
          .map((warning) => ({ pluginName: "tailwind-esbuild-plugin", text: warning.toString() })),
        loader: "css",
      };
    });
  },
};
