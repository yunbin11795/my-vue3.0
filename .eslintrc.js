module.exports = {
    "root": true,
    "env": {
        "node": true
    },
    "extends": [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        "@vue/typescript"
    ],
    "parserOptions": {
        "parser": "@typescript-eslint/parser"
    },
    "rules": {
        "no-unused-vars": 'off'
    },
    "overrides": [
        {
            "files": [
                "**/__tests__/*.{j,t}s?(x)",
                "**/tests/unit/**/*.spec.{j,t}s?(x)"
            ],
            "env": {
                "mocha": true
            }
        }
    ]
}
