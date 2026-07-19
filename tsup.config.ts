import { defineConfig } from 'tsup'
import path from 'node:path'

export default defineConfig({
  // Multiple entry points → subpath exports (e.g. `ngk-dashboard/ui/button`).
  // With code splitting, importing one component only pulls its own chunk, so a
  // Button-only consumer never drags in recharts / embla / vaul etc.
  entry: [
    'src/index.ts',
    'src/components/ui/*.tsx',
    'src/components/*.tsx',
    'src/components/data-table/index.ts',
    'src/components/layout/index.ts',
    'src/lib/utils.ts',
    'src/hooks/use-mobile.tsx',
    // Never build test files.
    '!src/**/*.test.tsx',
    '!src/**/*.test.ts',
  ],
  format: ['esm'],
  dts: true,
  clean: true,
  splitting: true,
  treeshake: true,
  sourcemap: true,
  // react/react-dom are peers; every runtime dep in package.json is external by default.
  external: ['react', 'react-dom'],
  // Resolve the "@/..." alias (kept from the source) for the JS bundle.
  esbuildOptions(options) {
    options.alias = {
      '@': path.resolve(__dirname, 'src'),
    }
  },
})
