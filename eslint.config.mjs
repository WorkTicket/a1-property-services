import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'node_modules/**',
    '.wrangler/**',
    '.wrangler-dry-run/**',
    '.tmp-*/**',
    '.tmp_*/**',
    'scripts/**',
    'worker/**',
    'next.config.js',
    'postcss.config.js',
    'tailwind.config.js',
    'next-env.d.ts',
  ]),
])
