import { defineConfig } from 'vitepress'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'


const siderBar = {
  procomponent: [
    {
      text: 'ProComponent',
      items: [
        { text: 'Introduction', link: '/procomponent/' },
        { text: 'Getting Started', link: '/procomponent/getting-started/' },
      ]
    },
    {
      text: 'Components',
      items: [
        {
          text: 'Form',
          items: [
            { text: 'DrawerForm', link: '/procomponent/drawer-form/' },
            { text: 'ModalForm', link: '/procomponent/modal-form/' },
            { text: 'ProForm', link: '/procomponent/pro-form/' },
            { text: 'QueryFilter', link: '/procomponent/query-filter/' },
          ]
        },
        {
          text: 'Data',
          items: [
            { text: 'ProTable', link: '/procomponent/pro-table/' },
          ]
        },
        {
          text: 'Layout',
          items: [
            { text: 'ProLayout', link: '/procomponent/pro-layout/' },
          ]
        },
        {
          text: 'Common',
          items: [
            { text: 'ProText', link: '/procomponent/pro-text/' },
          ]
        }
      ]
    },
    {
      text: 'Others',
      items: [
        { text: 'Changelog', link: '/procomponent/changelog/' },
        { text: 'FAQ', link: '/procomponent/faq/' },
        { text: 'Contributing', link: '/procomponent/contributing/' },
      ]
    }
  ]
}

const fileAndStyles: Record<string, string> = {}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ProComponent",
  description: "ProComponent for Naive UI",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'ProComponent', link: '/procomponent/' }
    ],

    sidebar: siderBar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  vite: {
    ssr: {
      noExternal: ['naive-ui', 'date-fns', 'vueuc'],
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
