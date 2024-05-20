/**
 * !--------- FBI WARNING ----------!
 *
 * 根据 /packages 目录下的组件所生成的模块导出，请勿手动修改
 */
import type { App, Plugin } from 'vue'

import { ButtonPlugin } from './components/button'
import { CardPlugin } from './components/card'

const BanmaoDemoPlugin: Plugin = {
  install(app: App) {
    ButtonPlugin.install?.(app)
    CardPlugin.install?.(app)
  },
}

export default BanmaoDemoPlugin

export * from './components/card'
