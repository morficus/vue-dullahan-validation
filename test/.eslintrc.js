module.exports = {
    "env": {
        "es6": true
    },
    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module"
    },
    "plugins": [
        "ava"
    ],
    "extends": "plugin:ava/recommended",
    "rules": {
        "object-property-newline": 0,
        "no-console": 0,
        "no-magic-numbers": 0,
        "func-names": 0,
        "prefer-arrow-callback": 0,
        "require-jsdoc": 0,
        "arrow-parens": 0,
        "id-length": [2, {
            "min": 3,
            "properties": "never",
            "exceptions": ["i", "j", "k", "_", "vm", "h", "el", "t", "or"]
        }],
    }
};
