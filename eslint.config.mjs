import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      indent: [
        'error',
        'tab',
        {
          ignoredNodes: ['PropertyDefinition'],
          SwitchCase: 1,
          offsetTernaryExpressions: true,
        },
      ],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'no-trailing-spaces': 'error',
      'no-console': [
        'error',
        {
          allow: ['warn', 'error', 'info', 'debug', 'time', 'timeEnd'],
        },
      ],
      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'always-multiline',
        },
      ],
      'jsx-quotes': ['error', 'prefer-double'],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'off',
      'eol-last': ['error', 'always'],
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];

export default eslintConfig;
