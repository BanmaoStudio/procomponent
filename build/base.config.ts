/// <reference types="vitest" />

import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import { compression } from 'vite-plugin-compression2'

export default defineConfig({
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, '../packages/docs')}/`,
      'packages': `${path.resolve(__dirname, '../packages')}/`,
    },
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    VueJsx(),
    AutoImport({
      imports: [
        'vue',
      ],
      dts: true,
    }),
    compression(),
  ],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: 'import { h } from "vue"',
  },
})
