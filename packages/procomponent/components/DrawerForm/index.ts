import type { App, Plugin } from 'vue'
import DrawerForm from './src/index.vue'

export const DrawerFormPlugin: Plugin = {
  install(app: App) {
    app.component('DrawerForm', DrawerForm)
  },
}

export {
  DrawerForm,
}
