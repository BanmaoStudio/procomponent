import type { App, Plugin } from 'vue'
import ProDescriptions from './src/index'

export const ProDescriptionsPlugin: Plugin = {
  install(app: App) {
    app.component('ProDescriptions', ProDescriptions)
  },
}

export {
  ProDescriptions,
}
