// https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parserOptions: {
    parser: '@babel/eslint-parser',
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: [
    'standard',
    'plugin:vue/recommended'
  ],
  plugins: [
    'html',
    'standard',
    'vue'
  ],
  // add your custom rules here
  rules: {
    'quotes': ['error', 'single', { allowTemplateLiterals: true }],
    'prefer-const': 'off',
    'generator-star-spacing': 'off',
    'no-debugger': 'error',
    'object-shorthand': 'off',
    'vue/no-v-for-template-key': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-closing-bracket-spacing': 'off',
    'vue/max-attributes-per-line': ['error', { 'singleline': { 'max': 10 }, 'multiline': { 'max': 1 } }]
  }
}
