import antfu from '@antfu/eslint-config'

export default antfu(
  // The options for generating the ESLint configurations
  {
    // Set vue version to 2
    vue: {
      // Disable sfc block detection for styles, because it's not supported in vue@^2
      sfcBlocks: {
        blocks: {
          styles: false,
        },
      },
      vueVersion: 2,
    },

    // Disable typescript support, if your project is not using typescript but including `typescript` packages because of the ghost dependency
    typescript: false,

    // Enable formatters for html and markdown (requires `eslint-plugin-format`)
    formatters: {
      css: false, // Use stylelint instead
      html: true,
      markdown: true,
    },

    // `.eslintignore` is no longer supported in flat config, use `ignores` option instead
    // Build output, node_modules and other common ignored files are already included
    ignores: [
      // Assets and static files
      '**/assets/font{,s}',
      '**/assets/icon{,s}',
      '**/assets/image{,s}',
      '**/assets/lang{,s}',
      '**/assets/json{,s}',
      '**/static',
      '**/public',
      '**/theme',
      // Nuxt html templates
      '**/app/view',
      '**/app.html',
      // Editor config
      '**/{t,j}sconfig.json',
      // Add your custom ignored files here
    ],
  },
)
  // NOTE: Custom (override) rules of `@antfu/config` below
  .override('antfu/javascript/rules', {
    rules: {
      // We need to use `console` in development environment, we can use build plugin to remove it in production environment
      'no-console': 'off',
    },
  })
  .override('antfu/regexp/rules', {
    rules: {
      // A large number of none-capturing groups are less readable than the same number of capturing groups
      // Tell the true, it's not so necessary to use none-capturing groups in most cases
      // Unless performance is sensitive or there are a large number of redundant captures, readability is more important
      // When working in teams, readability is more critical than which grouping you choose
      'regexp/no-unused-capturing-group': 'off',
    },
  })
  // FIXME: Need to prove (I'm not sure if these are caused by the different of browser env & node env, or the different of webpack4 & webpack5 (or vite))
  .override('antfu/node/rules', {
    rules: {
      // Use global variable `process` instead of import it explicitly such as `import process from 'process'`
      'node/prefer-global/process': 'off',
    },
  })
  .override('antfu/unicorn/rules', {
    rules: {
      // Use `path` instead of `node:path`
      'unicorn/prefer-node-protocol': 'off',
    },
  })
  // FIXME: Compatible with old project, these rules are not providing auto-fix operation, please reactive these rules progressively
  .override('antfu/javascript/rules', {
    rules: {
      'eqeqeq': 'warn',
      'unused-imports/no-unused-vars': 'warn',
      'unused-imports/no-unused-imports': 'warn',
      'no-irregular-whitespace': 'warn',
      'prefer-rest-params': 'warn',
    },
  })
  .override('antfu/vue/rules', {
    rules: {
      'vue/eqeqeq': 'warn',
      // Vue 2 recommends kebab-case for custom event names
      'vue/custom-event-name-casing': ['warn', 'kebab-case'],
      'vue/no-reserved-component-names': 'warn',
      'vue/no-unused-refs': 'warn',
      // You'd better not mutating props directly, it will break the unidirectional data flow
      // However, humans always tend to be lazy, wish they will not be debugging in hell in the future
      'vue/no-mutating-props': 'warn',
    },
  })
  // NOTE: Append custom rules below
  .append({
    name: 'lumirelle/setup',
    languageOptions: {
      globals: {
        // Add your custom global variables here
      },
    },
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
