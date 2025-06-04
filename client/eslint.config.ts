// Minimal ESLint configuration for React Native + TypeScript
import { defineConfig, globalIgnores } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactNativePlugin from 'eslint-plugin-react-native';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';

import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default defineConfig([
  // Files to ignore
  globalIgnores([
    '**/node_modules/',
    '**/android/',
    '**/ios/',
    '**/.expo/',
    '**/build/',
    '**/dist/',
    '**/app-example/**',
    '**/scripts/**',
    'app.config.ts',
    'metro.config.js',
    '**/*.d.ts',
  ]),

  // Main configuration
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json',
      },
      globals: { __DEV__: 'readonly' },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-native': reactNativePlugin,
      import: importPlugin,
      'simple-import-sort': simpleImportSortPlugin,
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-native/no-unused-styles': 'warn',
      'react-native/no-inline-styles': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // React and react-native first
            ['^react$', '^react-native$'],
            // React-related packages
            ['^@?react'],
            // Expo packages
            ['^expo', '^@expo'],
            // External packages (not starting with @)
            ['^[a-z]'],
            // External packages starting with @ (but not our custom paths)
            ['^@(?!ui|components|hooks|utils|config|assets|lib|models|constants/)\\w'],

            // Empty line between external and internal imports (via empty group)
            ['^$'],

            // Internal custom paths (our aliases)
            ['^@ui', '^@components', '^@hooks', '^@utils', '^@config', '^@assets', '^@lib', '^@models', '^@constants', '^@providers', '^@/'],

            // Relative imports
            ['^\\.\\./.*', '^\\./?.*'],

            // Side effect imports
            ['^\\u0000'],
          ],
        },
      ],
      'import/no-unresolved': 'error',
      'simple-import-sort/exports': 'error',
    },
  },

  // Test files
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/__tests__/**/*'],
    rules: {
      'no-console': 'off',
    },
  },
]);
