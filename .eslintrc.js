module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es2021: true,
  },
  rules: {
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  overrides: [
    {
      files: ['test/**'],
      env: {
        mocha: true,
      },
    },
    {
      files: ['**/*.@(ts|tsx)'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
      ],
      plugins: ['@typescript-eslint'],
      rules: {
        'import/no-unresolved': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        // TODO: Fix this.
        '@typescript-eslint/ban-types': 'off',
      },
    },
  ],
};
