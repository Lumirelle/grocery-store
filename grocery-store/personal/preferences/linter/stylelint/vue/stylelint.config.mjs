/** @type {import('stylelint').Config} */
export default {
  extends: [
    // Stylistic
    // '@stylistic/stylelint-config',
    // Order of css properties
    // 'stylelint-config-recess-order',
    // Language-specific
    'stylelint-config-standard-scss',
    'stylelint-config-standard-vue/scss',
    // Set `postcss-html` as the custom syntax for all `.html` like files
    // `stylelint-config-standard-vue/scss` just set `post-html` as the custom syntax for `.vue` files
    'stylelint-config-html/vue',
  ],

  allowEmptyInput: true,

  ignoreFiles: [
    // Build output
    '**/.nuxt/**/*',
    '**/dist/**/*',
    // Assets and static files
    '**/assets/font{,s}/**/*',
    '**/assets/icon{,s}/**/*',
    '**/assets/image{,s}/**/*',
    '**/assets/lang{,s}/**/*',
    '**/assets/json{,s}/**/*',
    '**/static/**/*',
    '**/public/**/*',
    '**/theme/**/*',
    '**/iconfont.*',
    // Node modules
    '**/node_modules/**/*',
    // Nuxt app
    '**/app/view/**/*',
    '**/app.html',
    // Add your custom ignore files here
  ],

  // `declaration-property-value-no-unknown` should not be used in none-css file, it's active by `stylelint-config-recommended-vue` and waiting for repair
  // See https://github.com/ota-meshi/stylelint-config-recommended-vue/pull/90 for details
  overrides: [
    {
      files: ['*.vue', '**/*.vue'],
      rules: {
        'declaration-property-value-no-unknown': null,
      },
    },
  ],

  rules: {
    // Override rules of `stylelint-config-recommended`
    // We don't want to set a generic family in some cases, like when we use iconfont
    'font-family-no-missing-generic-family-keyword': null,
    // In css, the specificity & order of selectors are important
    // This rule will disallow the low specificity selectors to be placed after the high specificity selectors
    // Actually, it's not so worth to fix it unless the project is extremely meticulous about standards, so we just left it's severity to `warning`
    'no-descending-specificity': [true, { ignore: ['selectors-within-list'], severity: 'warning' }],
    // For better dev experience, they didn't provide automatic fix
    'no-empty-source': [true, { severity: 'warning' }],
    'block-no-empty': [true, { severity: 'warning' }],

    // Override rules of `stylelint-config-standard`
    // It's recommended to use BEM class & id selector pattern
    'selector-class-pattern': [
      '^(([a-z][a-z0-9]*)(-[a-z0-9]+)*)(__[a-z][a-z0-9]*(-[a-z0-9]+)*)?(--[a-z][a-z0-9]*(-[a-z0-9]+)*)?$',
      {
        message: selector => `Expected class selector "${selector}" to be BEM case`,
        severity: 'warning',
      },
    ],
    'selector-id-pattern': [
      '^(([a-z][a-z0-9]*)(-[a-z0-9]+)*)(__[a-z][a-z0-9]*(-[a-z0-9]+)*)?(--[a-z][a-z0-9]*(-[a-z0-9]+)*)?$',
      {
        message: selector => `Expected id selector "${selector}" to be BEM case`,
        severity: 'warning',
      },
    ],
    // It's recommended to use kebab-case for keyframe name
    'keyframes-name-pattern': [
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      {
        message: name => `Expected keyframe name "${name}" to be kebab-case`,
        severity: 'warning',
      },
    ],
    // If you are not using `autoprefixer`, you should set it to false
    'property-no-vendor-prefix': true,

    // Override rules of `stylelint-config-recommended-scss`
    // You should use `%placeholder` to define the style should be reused and extend the `%placeholder` instead of other selector
    'scss/at-extend-no-missing-placeholder': [true, { severity: 'warning' }],

    // Override rules of `stylelint-config-standard-scss`
    'scss/dollar-variable-pattern': [
      '^(-|--)?[a-z][a-z0-9]*(-[a-z0-9]+)*$',
      {
        message: 'Expected variable to be kebab-case, start with "-" or "--"',
      },
    ],
    // In my opinion, a rule about stylistic and doesn't provide auto-fix operation is of little value
    'scss/double-slash-comment-whitespace-inside': null,

    // Override rules of `stylelint-config-recommended-vue`
    // Support pseudo classes and elements provided by vue, webpack and element-ui
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['deep', 'global', 'slotted', 'export'] },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      { ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted', 'input-placeholder'] },
    ],

    // Stylistic rules
    '@stylistic/max-line-length': null,
    '@stylistic/block-closing-brace-newline-after': [
      'always',
      {
        ignoreAtRules: ['if', 'else'],
      },
    ],

    // Add your custom rules here
  },
}
