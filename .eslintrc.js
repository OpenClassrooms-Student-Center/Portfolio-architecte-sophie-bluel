module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended"
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    // Règles de formatage de base
    "indent": ["error", 2],
    "linebreak-style": ["error", "windows"],
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    
    // Règles pour la qualité du code
    "no-unused-vars": "warn",
    "no-undef": "error",
    "camelcase": "warn",
    
    // Règles de longueur et d'espacement
    "max-len": ["warn", { 
      "code": 100,
      "ignoreComments": true,
      "ignoreStrings": true,
      "ignoreTemplateLiterals": true
    }],
    "no-multiple-empty-lines": ["error", { "max": 2 }],
    "no-trailing-spaces": "error",
    "no-multi-spaces": "error",
    "comma-spacing": ["error", { "before": false, "after": true }],
    "keyword-spacing": ["error", { "before": true, "after": true }],
    "space-infix-ops": "error",
    
    // Règles pour les bonnes pratiques
    "eqeqeq": ["error", "always"],
    "no-var": "error",
    "prefer-const": "error",
    "no-irregular-whitespace": "error",
    
    // Règles pour améliorer la structure du code
    "no-else-return": "warn",
    "prefer-template": "warn",
    "arrow-body-style": ["warn", "as-needed"],
    "object-shorthand": "warn",
    
    // Désactivation temporaire des avertissements console pour le développement
    "no-console": "off",
    "spellcheck/spell-checker": ["warn", {
      "comments": false,
      "strings": false,
      "identifiers": true,
      "lang": "fr",
      "skipWords": [
        "dom",
        "localStorage",
        "async",
        "const",
        "var",
        "js",
        "json",
        "href",
        "html",
        "css"
      ],
      "skipIfMatch": [
        "http://[^s]*",
        "https://[^s]*"
      ]
    }]
  }
}
