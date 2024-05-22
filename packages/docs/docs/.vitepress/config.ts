import path from 'node:path'
import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import list from '../../../datav-vue3/list.json'

const BorderDecorationList = list.filter(item => item.children && item.children.length > 0)
const OtherList = list.filter(item => !item.children || item.children.length === 0)

const Guide = [
  {
    text: '快速开始',
    link: '/Guide/Guide',
  },
  {
    text: '边框组件注意事项',
    link: '/Guide/BorderTip',
  },
  {
    text: '二次开发',
    link: '/Guide/contribute',
  },
]

function getDecorationLinkList() {
  const links: any[] = []

  BorderDecorationList[0].children?.forEach((item) => {
    links.push({
      text: item.compZhName,
      link: `/Decoration/${item.compName}/${item.compName}`,
    })
  })
  return links
}

function getBorderLinkList() {
  const links: DefaultTheme.SidebarItem[] = []

  BorderDecorationList[1].children?.forEach((item) => {
    links.push({
      text: item.compZhName,
      link: `/Border/${item.compName}/${item.compName}`,
    })
  })
  return links
}

function getOtherLinkList() {
  const links: DefaultTheme.SidebarItem[] = []
  OtherList?.forEach((item) => {
    links.push({
      text: item.compZhName,
      link: `/Other/${item.compName}/${item.compName}`,
    })
  })
  return links
}

const SideBar: DefaultTheme.Sidebar = {
  ProComponent: [
    { text: '介绍', link: '/ProComponent/' },
    {
      text: '组件',
      items: [
        { text: 'ProTable', link: '/ProComponent/ProTable/ProTable' },
        { text: 'ProForm', link: '/ProComponent/ProForm/ProForm' },
        { text: 'DrawerForm', link: '/ProComponent/DrawerForm/DrawerForm' },
        { text: 'ModalForm', link: '/ProComponent/ModalForm/ModalForm' },
      ],
    },
    { text: '资源', link: '/ProComponent/Resource/' },
    { text: '更新日志', link: '/ProComponent/ChangeLog/' },
    { text: '常见问题', link: '/ProComponent/FAQ/' },
    { text: '贡献指南', link: '/ProComponent/Contribute/' },
    { text: '版本说明', link: '/ProComponent/Version/' },
  ],
  DataV: [
    { text: '介绍', items: Guide },
    { text: '边框', items: getBorderLinkList() },
    { text: '装饰', items: getDecorationLinkList() },
    { text: '其他', items: getOtherLinkList() },
  ],
}

export default defineConfig({
  title: 'Pro Component for Naive UI',
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  },
  themeConfig: {
    siteTitle: 'ProNaiveUI',
    outlineTitle: '目录',
    search: {
      provider: 'local',
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/banmaoStudio/pro-component',
      },
    ],
    nav: [
      { text: '指引', link: '/Guide/Guide' },
      {
        text: '组件',
        items: [
          { text: 'ProComponent', link: '/ProComponent/ProComponent' },
          { text: 'DataV', link: '/DataV/' },
          { text: 'Draw', link: '/Draw/' },
          { text: 'Jessibuca', link: '/Jessibuca/' },
        ],
      },
      { text: 'Demo', link: '/Demo/Demo' },
    ],
    sidebar: SideBar,
  },
  vite: {
    resolve: {
      alias: {
        packages: `${path.resolve(__dirname, '../../../')}/`,
      },
    },
    plugins: [
      Unocss(),
      VueJsx(),
      AutoImport({
        imports: [
          'vue',
        ],
        dts: true,
      }),
    ],
    server: {
      fs: {
        allow: ['..'],
      },
    },
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
      jsxInject: 'import { h } from "vue"',
    },
  },
})
