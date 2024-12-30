import type { App, Plugin } from 'vue'
import QueryFilter from './src/index.vue'

export * from './src/types'

export const QueryFilterPlugin: Plugin = {
  install(app: App) {
    app.component('QueryFilter', QueryFilter)
  },
}

export {
  QueryFilter,
}
