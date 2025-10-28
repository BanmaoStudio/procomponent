import type { App, Plugin } from 'vue'
import LinkDiagram from './src'

export const LinkDiagramPlugin: Plugin = {
  install(app: App) {
    app.component('LinkDiagram', LinkDiagram)
  },
}

export {
  LinkDiagram,
}
