import type { App, Plugin } from 'vue'
import NaiveProvider from './src/index'

export const NaiveProviderPlugin: Plugin = {
    install(app: App) {
        app.component(NaiveProvider?.name || 'NaiveProvider', NaiveProvider)
    }
}

export {
    NaiveProvider
}
