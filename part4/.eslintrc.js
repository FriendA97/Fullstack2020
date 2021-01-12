module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
  },

  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
  extends: "eslint:recommended",
  rules: {
    // ...
    eqeqeq: "warn",
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
    "arrow-spacing": ["error", { before: true, after: true }],
    "no-unused-vars": "warn",
  },
};
