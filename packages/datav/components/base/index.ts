import type { App, Plugin } from 'vue'
import BaseChart from './src/base.vue'

export const BaseChartPlugin: Plugin = {
    install(app: App) {
        app.component('BaseChart', BaseChart)
    },
}

export {
    BaseChart
}

export * from './src/types'
