import tailwindPostcss from "@tailwindcss/postcss";
import type * as esbuild from "esbuild";
import fs from "node:fs/promises";
import postcss from "postcss";

export const tailwindEsbuildPlugin: esbuild.Plugin = {
  name: "tailwind-esbuild-plugin",
  setup(build) {
    build.onLoad({ filter: /\.css$/ }, async (args) => {
      const fileContents = await fs.readFile(args.path, "utf8");
      const result = await postcss([tailwindPostcss()]).process(fileContents, { from: args.path });

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
