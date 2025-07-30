/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
const config = {
  printWidth: 100,
  singleQuote: false,
  jsxSingleQuote: false,
  semi: true,
  tabWidth: 2,
  endOfLine: "crlf",
  trailingComma: "es5",
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: [
    "^react$",
    "^next$",
    "^\\.\\/\\+.*$",
    "<BUILTIN_MODULES>",
    "<THIRD_PARTY_MODULES>",
    "^@mui/(.*)$",
    "^@ui/(.*)$",
    "^@docs/(.*)$",
    "",
    "^./.*$",
    "^../(?!.*.css$).*$",
    "^./(?!.*.css$).*$",
    "\\.css$",
    "\\.svg$",
  ],
};

export default config;
