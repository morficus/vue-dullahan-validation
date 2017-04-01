module.exports = {
    "env": {
        "mocha": true,
        "jasmine": true,
        "node": true,
        "es6": true
    },
    "rules": {
        "object-property-newline": 0,
        // because test cases with Chai are nested callbacks, the original limit of 3 is hit rather quickly
        "max-nested-callbacks": [2, {"max": 5}],
        "no-console": 0,
        "func-names": 0,
        "prefer-arrow-callback": 0,
        "require-jsdoc": 0,
        "arrow-body-style": 0
    }
};
