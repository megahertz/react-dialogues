'use strict';

module.exports = {
  parserOptions: {
    project: 'tsconfig.json',
  },

  overrides: [
    {
      files: ['*.spec.ts'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
