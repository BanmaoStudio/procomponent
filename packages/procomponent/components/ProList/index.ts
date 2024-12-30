import type { App, Plugin } from 'vue'
import ProList from './src/index'

export const ProListPlugin: Plugin = {
  install(app: App) {
    app.component('ProList', ProList)
  },
}

export {
  ProList,
}
