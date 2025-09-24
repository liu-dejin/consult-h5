import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import prettier from '@vue/eslint-config-prettier'
import { globalIgnores } from 'eslint/config'

/**
 * ESLint 配置文件，用于配置 Vue 和 TypeScript 项目的代码检查规则
 *
 * @param {Object} config - 配置对象，指定需要检查的文件
 * @param {string} config.name - 配置名称
 * @param {string[]} config.files - 需要检查的文件模式
 * @param {...any} configs - 其他配置项，包括忽略文件、Vue 插件配置、TypeScript 配置、Prettier 配置等
 * @returns {Object} 返回合并后的 ESLint 配置对象
 */
export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,tsx,vue}']
  },

  // 配置需要忽略的文件和目录
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  // Vue 插件的基础配置
  pluginVue.configs['flat/essential'],

  // TypeScript 推荐配置
  vueTsConfigs.recommended,

  // 用 Prettier 配置替代 skipFormatting
  prettier,

  // 自定义规则配置
  {
    rules: {
      'vue/multi-word-component-names': [
        'warn',
        {
          ignores: ['index'] // index.vue 可单词
        }
      ],
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowShortCircuit: true, allowTernary: true }
      ]
    }
  }
)
