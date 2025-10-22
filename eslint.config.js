import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';


const baseConfigs = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
];

const reactConfig = {
  files: ['**/*.{ts,tsx}'],
  extends: baseConfigs,


  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },

  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
  },

  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
};

export default defineConfig([
  globalIgnores(['dist']),
  reactConfig,
]);