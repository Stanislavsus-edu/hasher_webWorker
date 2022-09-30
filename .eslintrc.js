const standardRestrictedGlobals = require('eslint-restricted-globals');

const noRestrictedGlobals = ['error', 'isNaN', 'isFinite'].concat(
  standardRestrictedGlobals,
);
const noRestrictedGlobalsWorker = noRestrictedGlobals.filter((o) => o !== 'self');

module.exports = {
  extends: 'airbnb-base',
  rules: {
    'no-restricted-globals': noRestrictedGlobals,
    'no-console': 'off',
    'no-restricted-syntax': [
      'error',
      'LabeledStatement',
      'WithStatement',
    ],
  },
  env: {
    es6: true,
    browser: true,
    jest: true,
    worker: true,
  },

  overrides: [
    {
      files: ['*.worker.js'],
      rules: {
        'no-restricted-globals': noRestrictedGlobalsWorker,
      },
    },
  ],
};
