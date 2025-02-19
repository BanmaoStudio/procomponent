import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import libCss from 'vite-plugin-libcss'
import baseConfig from './base.config'

interface LibConfigOptions {
  entry: string
  name: string
  fileName: string
  external?: string[]
  globals?: Record<string, string>
}

export function createLibConfig(options: LibConfigOptions) {
  return defineConfig({
    ...baseConfig,
    build: {
      outDir: 'dist',
      lib: {
        entry: resolve(__dirname, options.entry),
        name: options.name,
        fileName: format => `${options.fileName}.${format}.js`,
      },
      rollupOptions: {
        external: ['vue', 'uno.css', ...(options.external || [])],
        output: {
          globals: {
            vue: 'Vue',
            ...options.globals,
          },
        },
      },
    },
    plugins: [
      ...(baseConfig as any).plugins,
      dts(),
      libCss(),
    ],
  })
}
