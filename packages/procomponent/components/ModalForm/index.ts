import type { App, Plugin } from 'vue'
import ModalForm from './src'

export const ModalFormPlugin: Plugin = {
  install(app: App) {
    app.component('ModalForm', ModalForm)
  },
}

export {
  ModalForm,
}
