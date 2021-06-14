module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  ignorePatterns: ["public"],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "class-methods-use-this": 0,
    "no-underscore-dangle": 0,
    "no-param-reassign": 0,
    "no-lonely-if": 0,
    'no-restricted-globals': 0,
  },

};
