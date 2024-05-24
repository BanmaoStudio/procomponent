import type { App, Plugin } from 'vue'
import ProText from './src/index.vue'

export const ProTextPlugin: Plugin = {
  install(app: App) {
    app.component('DemoButton', ProTextPlugin)
  },
}

export {
  ProText,
}
