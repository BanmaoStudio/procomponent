/**
 * !--------- FBI WARNING ----------!
 *
 * 根据 /packages 目录下的组件所生成的模块导出，请勿手动修改
 */
// import type { App, Plugin } from 'vue'

// import { DrawerFormPlugin } from './components/DrawerForm'
// import { ModalFormPlugin } from './components/ModalForm'
// import { ProFormPlugin } from './components/ProForm'
// import { ProTablePlugin } from './components/ProTable'
// import { ProTextPlugin } from './components/ProText'
// import { QueryFilterPlugin } from './components/QueryFilter'

import type { App } from 'vue'
import * as ProComponents from './components'

export * from './components'

export default {
  install: (app: App) => {
    Object.keys(ProComponents).forEach((key) => {
      app.use(ProComponents[key])
    })
  },
}
