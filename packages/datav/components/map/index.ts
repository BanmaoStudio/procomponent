import type { App, Plugin } from 'vue'
import EchartMap from './src/map.vue'

export const EchartMapPlugin: Plugin = {
    install(app: App) {
        app.component('EchartMap', EchartMap)
    },
}

export {
    EchartMap,
}
