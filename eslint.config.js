import js from '@eslint/js';
import ts from 'typescript-eslint';
import vue from 'eslint-plugin-vue';

import stylisticJs from '@stylistic/eslint-plugin-js';

export default ts.config(
    {
        ignores: ['dist/']
    },
    js.configs.recommended,
    {
        // js options
        plugins: {
            '@stylistic/js': stylisticJs
        },
        rules: {
            '@stylistic/js/semi': ['error', 'always'],
            '@stylistic/js/quotes': ['error', 'single', { 'avoidEscape': true }],
            '@stylistic/js/indent': ['warn', 4, { 'SwitchCase': 1 }],
            '@stylistic/js/eol-last': ['warn', 'always']
        }
    },
    ...ts.configs.recommended,
    {
        // ts options
        rules: {
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    'args': 'all',
                    'argsIgnorePattern': '^_',
                    'caughtErrors': 'all',
                    'caughtErrorsIgnorePattern': '^_',
                    'destructuredArrayIgnorePattern': '^_',
                    'varsIgnorePattern': '^_',
                    'ignoreRestSiblings': true
                }
            ]
        }
    },
    ...vue.configs['flat/recommended'],
    {
        // vue sfc options
        files: ['src/**/*.vue'],
        languageOptions: {
            parser: vue.parser,
            parserOptions: {
                parser: ts.parser,
                sourceType: 'module'
            }
        },
        rules: {
            'vue/html-indent': ['warn', 4],
            'vue/max-attributes-per-line': ['error', {
                'singleline': { 'max': 128 },
                'multiline': { 'max': 128 }
            }],
            'vue/html-self-closing': ['warn', {
                'html': {
                    'void': 'never',
                    'normal': 'never',
                    'component': 'always'
                },
                'svg': 'never',
                'math': 'never'
            }],
            'vue/singleline-html-element-content-newline': ['off']
        }
    }
);
