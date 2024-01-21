const { createConfig } = require('@edx/frontend-build');

module.exports = {
    ...createConfig('eslint'),
    ignorePatterns: ['.eslintrc.js'],
  };
