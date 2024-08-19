'use strict';

module.exports = {
  root: true,

  overrides: [
    {
      files: ['*.js'],
      extends: ['airbnb-base', 'plugin:prettier/recommended'],
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'script',
      },
      plugins: ['import', 'prettier'],
      rules: {
        strict: ['error', 'global'],
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'airbnb',
        'airbnb-typescript',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
      ],

      parserOptions: {
        sourceType: 'module',
        project: 'tsconfig.json',
      },

      plugins: ['@typescript-eslint', 'import', 'prettier', 'react'],

      rules: {
        '@typescript-eslint/lines-between-class-members': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        'import/prefer-default-export': 'off',
        'react/destructuring-assignment': 'off',
        'react/function-component-definition': [
          'error',
          {
            namedComponents: 'function-declaration',
            unnamedComponents: 'arrow-function',
          },
        ],
        'react/jsx-props-no-spreading': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/require-default-props': 'off',
      },
    },
  ],
};
