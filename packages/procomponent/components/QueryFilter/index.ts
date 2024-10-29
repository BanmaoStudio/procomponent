import type { App, Plugin } from 'vue'
import QueryFilter from './src/index.vue'
import { QueryFilterProps } from './src/types'

export const QueryFilterPlugin: Plugin = {
  install(app: App) {
    app.component('QueryFilter', QueryFilter)
  },
}

export {
  QueryFilter,
  QueryFilterProps,
}
