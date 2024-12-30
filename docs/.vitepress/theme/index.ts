import type { Theme } from 'vitepress'
import { setup } from '@css-render/vue3-ssr'
import { NConfigProvider, NMessageProvider } from 'naive-ui'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
// https://vitepress.dev/guide/custom-theme
import { defineComponent, h, inject } from 'vue'
import './style.css'
import './custom.scss'
import 'uno.css'

const { Layout } = DefaultTheme

const CssRenderStyle = defineComponent({
  setup() {
    const collect = inject('css-render-collect') as () => void
    return {
      style: collect && collect(),
    }
  },
  render() {
    return h('css-render-style', {
      innerHTML: this.style,
    })
  },
})

const VitepressPath = defineComponent({
  setup() {
    const route = useRoute()
    return () => {
      return h('vitepress-path', null, [route.path])
    }
  },
})

const NaiveUIProvider = defineComponent({
  render() {
    return h(
      NConfigProvider,
      { abstract: true, inlineThemeDisabled: true },
      {
        default: h(
          NMessageProvider,
          {},
          {
            default: () => [
              h(Layout, null, { default: this.$slots.default?.() }),
              import.meta.env.SSR ? [h(CssRenderStyle), h(VitepressPath)] : null,
            ],
          },
        ),
      },
    )
  },
})

export default {
  extends: DefaultTheme,
  Layout: NaiveUIProvider,
  // Layout: () => {
  //   return h(DefaultTheme.Layout, null, {
  //     // https://vitepress.dev/guide/extending-default-theme#layout-slots
  //   })
  // },
  async enhanceApp({ app, _router, _siteData }) {
    // ...
    if (import.meta.env.SSR) {
      const { collect } = setup(app)
      app.provide('css-render-collect', collect)
    }
  },
}
