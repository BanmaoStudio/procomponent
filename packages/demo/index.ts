/**
 * !--------- FBI WARNING ----------!
 *
 * 根据 /packages 目录下的组件所生成的模块导出，请勿手动修改
 */
import type { App, Plugin } from 'vue'

import { ButtonPlugin } from './components/button'
import { CardPlugin } from './components/card'
import { ProFormPlugin } from './components/ProForm'
import { DrawerFormPlugin } from './components/DrawerForm'
import { ModalFormPlugin } from './components/ModalForm'

const BanmaoDemoPlugin: Plugin = {
  install(app: App) {
    ButtonPlugin.install?.(app)
    CardPlugin.install?.(app)
    ProFormPlugin.install?.(app)
    DrawerFormPlugin.install?.(app)
    ModalFormPlugin.install?.(app)
  },
}

export default BanmaoDemoPlugin

export * from './components/button'
export * from './components/card'
export * from './components/ProForm'
export * from './components/DrawerForm'
export * from './components/ModalForm'
