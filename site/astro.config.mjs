import starlight from '@astrojs/starlight'
import vue from '@astrojs/vue'
import icon from 'astro-icon'
// @ts-check
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  integrations: [
    icon(),
    vue(),
    starlight({
      title: 'ProComponent',
      social: {
        github: 'https://github.com/banmaoStudio/procomponent',
      },
      sidebar: [
        {
          label: 'Guides',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Example Guide', slug: 'guides/example' },
          ],
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
        {
          label: 'ProComponents',
          autogenerate: { directory: 'procomponents' },
        },
      ],
    }),
  ],
})
