/**
 * !--------- FBI WARNING ----------!
 *
 * 根据 /packages 目录下的组件所生成的模块导出，请勿手动修改
 */
import type { App, Plugin } from 'vue'

import { DrawerFormPlugin } from './components/DrawerForm'
import { ModalFormPlugin } from './components/ModalForm'
import { ProFormPlugin } from './components/ProForm'
import { ProTablePlugin } from './components/ProTable'
import { QueryFilterPlugin } from './components/QueryFilter'

const ProComponentPlugin: Plugin = {
  install(app: App) {
    DrawerFormPlugin.install?.(app)
    ModalFormPlugin.install?.(app)
    ProFormPlugin.install?.(app)
    ProTablePlugin.install?.(app)
    QueryFilterPlugin.install?.(app)
  },
}

export default ProComponentPlugin

export * from './components/DrawerForm'
export * from './components/ModalForm'
export * from './components/ProForm'
export * from './components/ProTable'
export * from './components/QueryFilter'
