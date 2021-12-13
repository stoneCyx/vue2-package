module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential",
        "plugin:prettier/recommended",
        "airbnb-base"
    ],
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "plugins": [
        "vue",
        "jsx"
    ],
    "rules": {
        "comma-dangle": 0,
        "import/no-extraneous-dependencies": 0,
        "import/no-unresolved": 0,
        "no-console": 1,
        "no-debugger": 1,
        "prettier/prettier": ["error", { "singleQuote": true }],
        "no-param-reassign":1,
    }
};
