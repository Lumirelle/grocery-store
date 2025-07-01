import antfu from '@antfu/eslint-config'

export default antfu({
  pnpm: true,
  formatters: {
    css: false,
    html: true,
    xml: true,
    markdown: true,
  },
  ignores: [
    'CATALOGS.json',
    '!resources/**/*',
  ],
})
  .append({
    name: 'lumirelle/jsonc/rules',
    files: [
      '**/{t,j}sconfig.json',
    ],
    rules: {
      'jsonc/sort-keys': 'off',
    },
  })
