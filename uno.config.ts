import { defineConfig } from 'unocss'

export default defineConfig({
  // ... other UnoCSS options
  shortcuts: {
    'flex-center': 'flex justify-center items-center',
    'flex-y': 'flex flex-col',
    'flex-y-center': 'flex-y justify-center items-center',
    'border-b': 'border-b border-gray-300',
    'wh-screen': 'w-screen h-screen',
  }
})
