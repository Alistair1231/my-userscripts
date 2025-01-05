import globals from 'globals'
import pluginJs from '@eslint/js'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.js', '*.js'], languageOptions: { sourceType: 'script' } },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.greasemonkey,
        ...globals.devtools,
        GM_fetch: false,
      },
    },
    // 'no-debugger': false,
  },
  pluginJs.configs.recommended,
]
