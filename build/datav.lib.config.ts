import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import libCss from 'vite-plugin-libcss'
import baseConfig from './base.config'

export default defineConfig({
  ...baseConfig,
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, '../packages/datav/index.ts'),
      name: '@banmao/datav',
      fileName: format => `datav.${format}.js`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'uno.css', 'naive-ui', 'echarts'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'naive-ui': 'naiveUi',
          echarts: 'echarts',
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
