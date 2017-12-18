// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
    allowImportExportEverywhere: true
  },
  env: {
    browser: true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: "standard",
  // required to lint *.vue files
  plugins: ["html"],
  globals: {
    "__DEV__": false
  },
  // add your custom rules here
  "rules": {
    "semi": ["warn", "always"],
    "no-unused-vars": [
      "warn",
      {
        "vars": "all",
        "args": "none",
        "ignoreRestSiblings": true
      }
    ],
    // https://eslint.org/docs/rules/eqeqeq
    "prefer-template": "warn",
    "eqeqeq": "off",
    // @TODO close these 2 rules temporarily https://eslint.org/docs/rules/space-before-function-paren
    "space-after-function-name": "off",
    "space-before-function-paren": "off",
    // allow paren-less arrow functions
    "arrow-parens": "off",
    "generator-star-spacing": "off",
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0
  }
}
