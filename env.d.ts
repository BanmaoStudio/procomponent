interface ViteEnv {
  readonly SSR?: boolean
}

interface ImportMeta {
  readonly env: ViteEnv
}
