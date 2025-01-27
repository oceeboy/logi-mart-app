import { Linter } from 'eslint';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginTypescript from '@typescript-eslint/eslint-plugin';
import eslintParser from '@typescript-eslint/parser';

/** @type {Linter.FlatConfig[]} */
const config = [
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: eslintParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      react: eslintPluginReact,
      '@typescript-eslint': eslintPluginTypescript,
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  // Manually including recommended rules instead of using 'extends'
  {
    // rules: {
    //   // 'eslint/recommended': 'error', // Equivalent to 'eslint:recommended'
    //   // 'react/recommended': 'error', // Equivalent to 'plugin:react/recommended'
    //   'no-console': 'warn',
    //   '@typescript-eslint/recommended': 'error', // Equivalent to 'plugin:@typescript-eslint/recommended'
    //   prettier: 'error', // Equivalent to 'prettier'
    // },
  },
];

export default config;
