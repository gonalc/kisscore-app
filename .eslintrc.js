module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/jsx-runtime",
],
overrides: [],
parser: "@typescript-eslint/parser",
parserOptions: {
	ecmaVersion: "latest",
    sourceType: "module",
},
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "single"],
    semi: ["error", "never"],
    "prettier/prettier": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "no-console" :["error", { allow: ["warn", "error"] }]
  },
};
