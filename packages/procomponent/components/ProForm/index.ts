import type { App, Plugin } from 'vue'
import ProForm from './src/BaseForm/index.vue'

export const ProFormPlugin: Plugin = {
  install(app: App) {
    app.component('ProForm', ProForm)
  },
}

export {
  ProForm,
}
