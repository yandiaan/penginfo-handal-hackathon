import { defineConfig, globalIgnores } from 'eslint/config';
import astroPlugin from 'eslint-plugin-astro';
import prettierPlugin from 'eslint-plugin-prettier';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';

export default defineConfig([
  // Astro recommended rules
  ...astroPlugin.configs.recommended,

  globalIgnores(['dist/**', '.astro/**', 'node_modules/**', '.vercel/**']),

  // TypeScript & JS files
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.mjs'],
    plugins: {
      '@typescript-eslint': tsPlugin,
      'unused-imports': unusedImports,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { vars: 'all', args: 'after-used', argsIgnorePattern: '^_', caughtErrors: 'none' },
      ],
      'unused-imports/no-unused-imports': 'error',
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },

  // Astro files
  {
    files: ['**/*.astro'],
    plugins: {
      '@typescript-eslint': tsPlugin,
      'unused-imports': unusedImports,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
    },
  },
]);
