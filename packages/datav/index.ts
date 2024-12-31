import type { App } from 'vue'
import * as DataVComponents from './components'

export * from './components'

export default {
  install: (app: App) => {
    Object.keys(DataVComponents).forEach((key) => {
      app.use(DataVComponents[key])
    })
  },
}
