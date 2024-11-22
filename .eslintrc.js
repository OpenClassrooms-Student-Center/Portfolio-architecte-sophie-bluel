module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "indent": ["error", 2],
        "linebreak-style": ["error", "windows"],
        "quotes": ["error", "double"],
        "semi": ["error", "always"],
        "no-unused-vars": "warn",
        "no-console": "warn",
        "no-undef": "error",
        "camelcase": "warn",
        "max-len": ["warn", { "code": 100 }],
        "no-multiple-empty-lines": ["error", { "max": 2 }]
    }
}
