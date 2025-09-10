// @ts-check

import pluginJs from "@eslint/js";
import configPrettier from "eslint-config-prettier";
import pluginReactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";
import pluginTypescript from "typescript-eslint";

export default defineConfig([
  { ignores: ["dist/", "out/"] },
  pluginJs.configs.recommended,
  { plugins: { "react-hooks": pluginReactHooks } },
  {
    rules: {
      "no-undef": "off",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
    },
  },
  ...pluginTypescript.configs.recommendedTypeChecked.map((config) => ({ ...config, files: ["**/*.{ts,tsx,mts,cts}"] })),
  { languageOptions: { parserOptions: { projectService: true } } },
  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    rules: {
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    },
  },
  configPrettier,
]);
