module.exports = {
    parser: 'vue-eslint-parser',
    env: {
        es6: true,
        node: true
    },
    parserOptions: {
        parser: '@typescript-eslint/parser', //指定 ESLint 解析器
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            // Allows for the parsing of JSX
            jsx: true
        }
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
    ]
};
