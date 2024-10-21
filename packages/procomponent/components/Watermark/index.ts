import type { App, Plugin } from 'vue'
import Watermark from './src/index.vue'
import { WatermarkProps } from './src/types'

export const WatermarkPlugin: Plugin = {
  install(app: App) {
    app.component('Watermark', Watermark)
  },
}

export {
  Watermark,
  WatermarkProps,
}
