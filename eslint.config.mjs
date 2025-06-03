import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}", "**/**/*.{js,mjs,cjs}"],
    ignores: ["node_modules", "dist", "coverage", ".env"],
    languageOptions: { globals: globals.browser },
  },
]);
