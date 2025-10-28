import type { App, Plugin } from 'vue'
import ProText from './src'

export * from './src/types'

export const ProTextPlugin: Plugin = {
  install(app: App) {
    app.component('ProText', ProText)
  },
}

export {
  ProText,
}
