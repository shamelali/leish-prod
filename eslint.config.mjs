import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";

import prettier from "eslint-plugin-prettier";

const prettierPlugin = {
  plugins: { prettier },
  rules: {
    "prettier/prettier": "warn",
  },
};

export default defineConfig([
  globalIgnores(["dist/**", "mobile/**", "e2e/**"]),
  prettierPlugin,
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    rules: {
      "no-unused-vars": "off",
      "no-empty": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
]);
