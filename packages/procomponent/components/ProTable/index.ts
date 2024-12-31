import type { App, Plugin } from 'vue'
import ProTable from './src'

export const ProTablePlugin: Plugin = {
  install(app: App) {
    app.component('ProTable', ProTable)
  },
}

export {
  ProTable,
}
