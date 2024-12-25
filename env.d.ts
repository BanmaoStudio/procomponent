/// <reference types="vite/client" />

interface ViteEnv {
  readonly SSR?: boolean
}

interface ImportMeta {
  readonly env: ViteEnv
}
