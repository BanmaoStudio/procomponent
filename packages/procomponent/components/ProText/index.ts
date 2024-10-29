import type { App, Plugin } from 'vue'
import ProText from './src/index.vue'
import { ProTextProps } from './src/types'

export const ProTextPlugin: Plugin = {
  install(app: App) {
    app.component('DemoButton', ProTextPlugin)
  },
}

export {
  ProText,
  ProTextProps,
}
