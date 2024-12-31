import type { App, Plugin } from 'vue'
import LiteFilter from './src'

export const LiteFilterPlugin: Plugin = {
  install(app: App) {
    app.component('LiteFilter', LiteFilter)
  },
}

export {
  LiteFilter,
}
