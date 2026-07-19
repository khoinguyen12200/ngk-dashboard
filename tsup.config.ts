import { defineConfig } from 'tsup'
import path from 'node:path'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
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
