import type { App, Plugin } from 'vue'
import EchartMapComponent from './src/map.vue'

export const EchartMapPlugin: Plugin = {
    install(app: App) {
        app.component('EchartMap', EchartMapComponent)
    },
}

export const EchartMap = EchartMapComponent
