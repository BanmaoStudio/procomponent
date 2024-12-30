import { DefaultTheme, defineConfig } from 'vitepress'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'


/**
 * 生成 ProComponent 侧边栏配置
 * @returns {DefaultTheme.SidebarItem[]} 侧边栏配置数组
 */
function sidebarProComponent() {
  return [
    {
      text: '开始',
      collapsed: false,
      items: [
        { text: '介绍', link: '/' },
        { text: '快速上手', link: '/getting-started/' },
      ]
    },
    {
      text: '组件',
      collapsed: false,
      link: '/components/',
      items: [
        {
          text: '表单',
          collapsed: true,
          items: [
            { text: 'DrawerForm', link: '/drawer-form/' },
            { text: 'ModalForm', link: '/modal-form/' },
            { text: 'ProForm', link: '/pro-form/' },
            { text: 'QueryFilter', link: '/query-filter/' },
          ]
        },
        {
          text: '数据',
          collapsed: true,
          items: [
            { text: 'ProTable', link: '/pro-table/' },
            { text: 'ProList', link: '/pro-list/' },
            { text: 'ProDescriptions', link: '/pro-descriptions/' },

          ]
        },
        {
          text: '布局',
          collapsed: true,
          items: [
            { text: 'ProLayout', link: '/pro-layout/' },
          ]
        },
        {
          text: '通用',
          collapsed: true,
          items: [
            { text: 'ProText', link: '/pro-text/' },
            { text: 'Watermark', link: '/watermark/' }
          ]
        }
      ]
    },
    {
      text: 'Others',
      collapsed: true,
      items: [
        { text: '更新日志', link: 'https://github.com/banmaoStudio/procomponent/blob/main/packages/procomponent/CHANGELOG.md', target: '_blank' },
        { text: 'FAQ', link: '/faq/' },
        { text: 'Contributing', link: '/contributing/' },
      ]
    }
  ]
}

function sidebarDataV() {
  return [
    { text: '介绍', link: '/' },
    { text: '快速上手', link: '/getting-started/' },
    {
      text: '组件', link: '/components/', collapsed: false,
      items: [
        { text: 'Charts', link: '/components/base-chart/' },
      ]
    },
    {
      text: '其他',
      collapsed: false,
      items: [
        { text: '更新日志', link: 'https://github.com/banmaoStudio/procomponent/blob/main/packages/procomponent/CHANGELOG.md', target: '_blank' },
        { text: 'FAQ', link: '/faq/' },
        { text: 'Contributing', link: '/contributing/' },
      ]
    }
  ]
}

/**
 * 生成导航栏配置
 * @returns {DefaultTheme.NavItem[]} 导航栏配置数组
 */
function nav(): DefaultTheme.NavItem[] {
  return [
    { text: 'Home', link: '/' },
    { text: 'ProComponent', link: '/procomponent/' },
    { text: 'DataV [DEV]', link: '/data-v/' },
    // { text: 'Player [PLANNING]', link: '/player/' }
  ]
}

/**
 * 生成指南侧边栏配置
 * @returns {DefaultTheme.SidebarItem[]} 侧边栏配置数组
 */
function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '简介',
      collapsed: false,
      items: [
        { text: '介绍', link: '/guide/' },
        { text: '快速上手', link: '/guide/getting-started/' },
      ]
    }
  ]
}

const fileAndStyles: Record<string, string> = {}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ProComponent",
  description: "ProComponent for Naive UI",
  rewrites: {
    'packages/:pkg/src/(.*)': ':pkg/index.md'
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: nav(),

    sidebar: {
      '/guide/': { base: '/guide/', items: sidebarGuide(), },
      '/procomponent/': { base: '/procomponent/', items: sidebarProComponent(), },
      '/data-v/': { base: '/data-v/', items: sidebarDataV() },
    },

    editLink: {
      pattern: 'https://github.com/banmaoStudio/procomponent/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present BanmaoStudio'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航',
      level: 'deep'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到亮色模式',
    darkModeSwitchTitle: '切换到暗色模式',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    search: {
      provider: 'local'
    },
  },
  vite: {
    ssr: {
      noExternal: ['naive-ui', 'date-fns', 'vueuc'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        },
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
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
      jsxInject: 'import { h } from "vue"',
    },
  },
  postRender(context) {
    const styleRegex = /<css-render-style>((.|\s)+)<\/css-render-style>/
    const vitepressPathRegex = /<vitepress-path>(.+)<\/vitepress-path>/
    const style = styleRegex.exec(context.content)?.[1]
    const vitepressPath = vitepressPathRegex.exec(context.content)?.[1]
    if (vitepressPath && style) {
      fileAndStyles[vitepressPath] = style
    }
    context.content = context.content.replace(styleRegex, '')
    context.content = context.content.replace(vitepressPathRegex, '')
  },
  transformHtml(code, id) {
    const html = id.split('/').pop()
    if (!html) return
    const style = fileAndStyles[`/${html}`]
    if (style) {
      return code.replace(/<\/head>/, style + '</head>')
    }
  },
})
