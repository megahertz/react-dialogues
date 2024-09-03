module.exports = {
  parserOptions: {
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  settings: {
    'import/core-modules': ['@playwright/test', 'playwright'],
  },
};
