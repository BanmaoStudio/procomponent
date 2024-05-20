import type { App, Plugin } from 'vue'
import Card from './src/index.vue'

export const CardPlugin: Plugin = {
  install(app: App) {
    app.component('DemoCard', Card)
  },
}

export {
  Card,
}
