module.exports = {
  root: true,
  // required to lint *.vue files
  plugins: [
    'html'
  ],

  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "impliedStrict": true
    }
  },

  "parser": "babel-eslint",

  "env": {
    "browser": true,
    "es6": true
  },

  // add your custom rules here
  "rules": {
    /**
     * A detailed description (along with samples) of every single rule can be found by going to :
     * http://eslint.org/docs/rules/<rule-name>
     *
     * And a complete list of rules can be found by going to: http://eslint.org/docs/rules
     */

    /** Common error/type-o detection */
    // warn trailing commas
    "comma-dangle": [1, "never"],
    // no assignments in conditional statements
    "no-cond-assign": [2, "always"],
    // warn on console statements
    "no-console": 1,
    // no debugger statements in prod
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // do not allow constant conditionals
    "no-constant-condition": 2,
    // no duplicate function arguments
    "no-dupe-args": 2,
    // no duplicate labels in `case` statements
    "no-duplicate-case": 2,
    // no empty blocks, other than `catch` statements
    "no-empty": [2, {"allowEmptyCatch": true}],
    // no extra semi-colons
    "no-extra-semi": 2,
    // no reassigning of declared function to a variable
    "no-func-assign": 2,
    // no declaration of stuff within a nested block (like an if-statement)
    "no-inner-declarations": [2, "both"],
    // no empty slots in declared arrays
    "no-sparse-arrays":  2,
    // no unreachable code
    "no-unreachable": 2,
    // no control flows inside a `finally` block
    "no-unsafe-finally": 2,
    // force use of `isNaN()` and not `x == NaN`
    "use-isnan": 2,
    // enforce valid js-doc comments (assuming we are using js-doc)
    "valid-jsdoc": [2, {"requireReturn": false}],

    "no-control-regex": 2,

    /**  "Best Practices" */
    // make sure getters and setters are used
    "accessor-pairs": 2,
    // check that most Array functions have a `return` statement
    "array-callback-return": 2,
    // check for a reasonable cyclomatic complexity - defaults to 20
    "complexity": 2,
    // never omit curly braces, not even for one-line `if` statements
    "curly": 2,
    // enforce a `default` case in switch-statements
    "default-case": 2,
    // always use `===` or `!===`
    "eqeqeq": 2,
    // make sure `for-in` statements have and `if`-condition in them
    "guard-for-in": 2,
    // this is not 1995... no alert boxes
    "no-alert": 2,
    // no declaration of variables inside switch-case statements, unless wrapped in brackets
    "no-case-declarations": 2,
    // disallow then unnecessary `else` if all the previous if-blocks have return statements
    "no-else-return": 2,
    // disallow empty functions
    "no-empty-function": 2,
    // no empty destructing patterns
    "no-empty-pattern": 2,
    // no fallthrough case statements in switch-cases
    "no-fallthrough": 2,
    // always preclude or proceed decimal points with a number
    "no-floating-decimal": 2,
    // no assuming that if `var`, `let`, `function` or `const` is missing that it's global
    "no-implicit-globals": 2,
    // only use `this` inside class-like object
    "no-invalid-this": 2,
    // prefer the usage of constants over "magic numbers"
    "no-magic-numbers": [2, {}],
    // no re-assigning native objects
    "no-native-reassign": 2,
    // no re-declaring function parameters
    "no-param-reassign": 2,
    // no re-declaring normal variables (aka: `var a = 3; var a = 10`)
    "no-redeclare": 2,
    // no assignments in return statements (ie: `return foo = bar + 2`)
    "no-return-assign": 2,
    // self-assigning has no effect, so most likely an error
    "no-self-assign": 2,
    // self comparisons always result in true, so mostly likely an error
    "no-self-compare": 2,
    // only allow Error() objects to be thrown
    "no-throw-literal": 2,
    // warn about expressions that have no effect and are hence not needed
    "no-unused-expressions": 1,
    // who uses labels in the first place...
    "no-unused-labels": 2,
    // because JS is silly and `parseInt` defaults to hex base... always require a radix param
    "radix": 2,

    /** Variables */
    // warn when a variable is declared with out being initiated
    "init-declarations": [1, "always"],
    // no use of undeclared variables. they should be globals
    "no-undef": 2,
    // no unused variables, exclude unused function arguments
    "no-unused-vars": [2, {"vars": "all", "arg": "none"}],
    // no more relying on hoisting, define variable or function before using
    "no-use-before-define": [2, {"functions": true, "classes": true}],

    /** Stylistic */
    // no padding around array elements
    "array-bracket-spacing": [1, "never", {"singleValue": false, "objectsInArrays": false, "arraysInArrays": false}],
    // space between one-line block functions
    "block-spacing": [2, "always"],
    // consistent brace style for blocks
    "brace-style": [2, "1tbs", {"allowSingleLine": false}],
    // consistent coma spacing - no space before, only space after
    "comma-spacing": 2,
    // comas after things, not before
    "comma-style": 2,
    // no spaces around computer properties
    "computed-property-spacing": 2,
    // use `that` when referring to `this`
    "consistent-this": 2,
    // end all files with a new-line (typically taken care of via .editorconfig file)
    "eol-last": 2,
    // all functions should have a name
    "func-names": 2,
    // the following items are not allowed as variable or function
    "id-blacklist": [1, "e", "cb"],
    // minimum length for var and func names
    "id-length": [2, {"min": 3, "properties": "never", "exceptions": ["i", "j", "k", "_", "vm", "h", "el"] }],
    // consistent 4-spaces for indentation
    "indent": [1, 4, {"SwitchCase": 1, "VariableDeclarator": 1}],
    // for object literals, no space before colon and at least 1 space after
    "key-spacing": [2, {"mode": "minimum"}],
    // one space before and after keywords
    "keyword-spacing": [2],
    // for comments, require a single empty line before block comments. nothing for single-line comments
    "lines-around-comment": [2],
    // maximum of 4 levels deep for nested blocks
    "max-depth": [2],
    // maximum line lengths, excluding URLs
    "max-len": [2, {"code": 120, "ignoreUrls": true}],
    // max of 3 nested callbacks
    "max-nested-callbacks": [2, {"max": 3}],
    // maximum number of parameters for a function call
    "max-params": [2, {max: 5}],
    // no more than 1 statement per line
    "max-statements-per-line": [2],
    // constructors (or anything called with `new`) must be capitalized
    "new-cap": [2],
    // must use parenthesis even when calling a constructor with no parameters
    "new-parens": [2],
    // leave empty line before `return` statements
    "newline-before-return": [2],
    // allow up to two chained methods on the same line. all others must be on a new line
    "newline-per-chained-call": [2],
    // no bit-wise operators
    "no-bitwise": [2],
    // no `continue` statements, ever
    "no-continue": [2],
    // no single `if` statements inside `else` block
    "no-lonely-if": [2],
    // must use parenthesis when doing complex expressions
    //"no-mixed-operators": [2],
    // no mixing tabs and spaces
    "no-mixed-spaces-and-tabs": [2],
    // max 2 empty lines between things
    "no-multiple-empty-lines": [2],
    // no negated conditions in if-else blocks (thanks Dave)
    "no-negated-condition": [2],
    // never nest your ternary
    "no-nested-ternary": [2],
    // no `new` when creating new object literals
    "no-new-object": [2],
    // do not allow the use of `with`
    "no-restricted-syntax": [2, "WithStatement"],
    // no space between function name and parenthesis when invoking
    "no-spaced-func": [2],
    // no trialing spaces - this is enforced by .editorconfig
    "no-trailing-spaces": [2],
    // no needless ternary
    "no-unneeded-ternary": [2],
    // no whitespaces before properties
    "no-whitespace-before-property": [2],
    // only require a line break if there are line breaks inside
    //"object-curly-newline": [2, {"multiline": true}],
    // no spaces inside curly braces
    "object-curly-spacing": [2, "never"],
    // for object literals, each property should be on a new line
    "object-property-newline": [2],
    // one var (or let, or const) per function
    "one-var": 2,
    // var initialises need to be on their own line
    "one-var-declaration-per-line": [2, "initializations"],
    "operator-linebreak": [2, "after"],
    // quotes around object literals, only as needed. if they are not needed... do not quote
    "quote-props": [2, "as-needed"],
    // consistently use single-quotes, except for template literals
    "quotes": [2, "single", {"allowTemplateLiterals": true}],
    // require JSDoc comments for all functions
    "require-jsdoc": [2, {"require": {"FunctionDeclaration": true, "ClassDeclaration": true, "MethodDefinition": true}}],
    // semicolons all the time
    "semi": [2, "always"],
    // always require a space before blocks
    "space-before-blocks": [2],
    // no spaces before function parenthesis
    "space-before-function-paren": [2, "always"],
    // no spaces between arguments parenthesis and function declaration arguments
    "space-in-parens": [2, "never"],
    // space around operators
    "space-infix-ops": [2],
    // always leave space before comment
    "spaced-comment": [2, "always"],
    // Unicode Byte Order Mark
    "unicode-bom": [2],


    /** ES2015 Specifics */
    // always use parans around arrow function arguments
    "arrow-parens": [2, "always"],
    // enforce space before and after the =>
    "arrow-spacing": [1, { "before": true, "after": true }],
    // warn on potentially confusing arrow functions, unless the arguments re wrapped in a parens
    "no-confusing-arrow": [1, {"allowParens": true}],
    // consistent spacing around the * for generator functions
    "generator-star-spacing": [1, "before"],
    // warn on class variables being re-assigned
    "no-class-assign": 2,
    // no modifying things that are declared with `const`
    "no-const-assign": 2,
    // no duplicate member names in classes and objects
    "no-dupe-class-members": 2,
    // ensure their are no duplicate imports or exports
    "no-duplicate-imports": [2, {includeExports: true}],
    // might be nice to enable later on - http://eslint.org/docs/rules/no-restricted-imports
    //"no-restricted-imports": 1,
    // do not allow the use of `this` in a constructor before calling the `super()` method
    "no-this-before-super": 1,
    // error on constructors that do not do anything other than call `super()` with no params
    "no-useless-constructor": 1,
    // do not rename an imported module to the same name
    "no-useless-rename": 2,
    // favor the use of `let` and `const` over the old-school `var` (block-scope vs function-scope)
    "no-var": 1,
    // use arrows-function callbacks over function expressions
    "prefer-arrow-callback": 1,
    // use `const` if the variable is never changed or re-assigned
    "prefer-const": 2,
    // juse template literals in place of old-school string concatenation
    "prefer-template": 2,
    // no spaces when using ${} in template strings - ${name] over ${ name }
    "template-curly-spacing": [2, "never"],

    /** Rules from plug-ins */
    // Ensures an imported module can be resolved to a module on the local filesystem
    "import/no-unresolved": 0
  }
};
