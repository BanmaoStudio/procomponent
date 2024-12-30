import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  unocss: true,
  vue: true,
  // react: true,
  astro: true,
  typescript: true,
  stylistic: {
    indent: 2,
    semi: false,
    singleQuote: true,
    tabWidth: 80,
  },
}, {
  files: ['**/shims.d.ts'],
  rules: {
    'ts/no-empty-object-type': 'off',
  },
}, {
  files: ['script/**/*.js'],
  rules: {
    'no-console': 'off',
  },
})
