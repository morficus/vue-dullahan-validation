# Vue Dullahan Validation
The Headless Validator  

> The Irish Dullahan (also Gan Ceann, meaning "without a head" in Irish) is a type of Unseelie fairy.
 The Dullahan (pronounced DOOL-a-HAN) is a headless rider,  usually on a black horse who carries his or her own head 
  under one arm.
  
Basically a fancy way of saying "headless validation" :grin:

## Getting started

### Installation

```npm install vue-dullahan-validation --save ```  
or  
```yarn install vue-dullahan-validation --save ```    


### Using validations in your component
Simply define it as with [any other mixin](https://vuejs.org/v2/api/#mixins) on a component then define a property 
called `validation`.  
Within it, you can use `rules` property to use pre-defined validations or the `customValidations` property to define 
your own validations.

```javascript
import validation from 'vue-dullahan-validation';

export default {
    mixins: [validation],
    validation: {
        rules: {
            // configure built-in validations here
        },
        customValidations: {
            // add your custom validations here
        }
    }
}
```

Here is a more concrete example:

```javascript
import validation from 'vue-dullahan-validation';

export default {
    mixins: [validation],
    data () {
        return {
            email: 'test'
        }
    },
    
    validation: {
        rules: {
            email: {
                required: true,
                min: 5,
                checkEmail: true  // <-- this is a custom validation defined below
            }
        },
        customValidations: {
            checkEmail (ruleValue, dataValue, componentData) {
                
                return {
                    isValid: dataValue.indexOf('@') > 0,
                    errorMessage: 'that is not an email.'
                }
            }
        }
    }
}

```

This mixin will add 2 computed properties to your component:

* `$isValid` (Boolean): a convenience property to check if any validations failed. `true` means all validation have 
passed, `false` means that at least one has failed. 
* `$validations` (Object): this if the full validation result object. for the example above... `$validations` would 
look like this:

```json
{
  "email": {
    "isDirty": false,
    "isValid": false,
    "isProcessing": false,
    "rules": {
      "required": true,
      "min": false,
      "checkEmail": false
    },
    "errors": [
    "Does not meet the `min` rule.",
    "that is not an email"
    ]
  }
}

```

And here is what each of those things mean...

* `isDirty` (Boolean): indicates if the value has been changed
* `isValid` (Boolean): indicates the overall state of validation for this particular property. `false` means at least 
one rule failed to pass, `true` means they all past
* `isProcessing` (Boolean): indicates if a validation rule is still running. this is only useful for async 
validations... if it is `false` then something is still running.
* `rules` (Object): the keys are the name of the rule (includes custom ones) and the value is the state of its 
validation (`true` = pass, `false` = false).
* `errors` (Array): an array of error messages


## Built-in validation rules

* alphabetic: check that the value contains letter characters only, no numbers or special characters    
* alphanumeric: check that the value contains numbers or letters, but no special characters    
* list: check that given value is a type of list (Array, Map or Set)  
* max: check if the list or string does not surpass the maximum length; Or if a number is not above this value  
* min: check if the list or string meets the minimum length, or if a number meets the minimum value  
* numeric: checks that the given value is a number (includes decimals)  
* or:  checks that at least one of the fields is not empty    
* required: checks that the given field actually has a value; in the case of lists, checks that they are not empty    
* sameAs: ~~checks that the given value matches the value of the companion field (works with Lists and Objects too) -- 
for Lists, the elements must also be in the same order~~ currently broken and disabled... :weary:


For details on how to configure each built-in rule, take a look at the [rules in details page](documentation/rules.md).



## Custom validations

When creating custom validations, your validation function will be passed 3 arguments in the following order:

* ruleValue: the value given to the rule in the `rules` section (ie: in the case of `min: 5`, `ruleValue` would be 5)
* dataValue: the value of the data property that the rule applies to
* componentData: the entire `data` object on the component. useful for when you want to see values of other properties

So for example.... if we have something like this in our component
```javascript
...
    data () {
        return {
            email: 'testing',
            fullName: 'Headless Rider'
        }
    },
    
    validation: {
        rules: {
            email: {
                required: true,
                min: 5,
                checkEmail: true
            }
        },
        customValidations: {
            checkEmail (ruleValue, dataValue, componentData) {
                
                return {
                    isValid: dataValue.indexOf('@') > 0,
                    errorMessage: 'that is not an email.'
                }
            }
        }
    }
...
```

each argument would have the following values:

* `ruleValue` would be `true`  
* `dataValue` would be `testing`  
* and `componentData` would be `{"email": "testing", "fullName": "Headless Rider"}`


Custom validations can be sync or async... but what ever they are they MUST return the following data structure, either 
directly or in the resolved promise:

```
{
    isValid: Boolean,
    errorMessage: String
}
```

Because validations are ran every time a particular data property is changed (see Vue's [documentation about 
"reactivity"](https://vuejs.org/v2/guide/reactivity.html))... if  your validator is async or  triggers network 
requests.... it is HIGHLY recommended that you denounce your function otherwise you made end up with a race condition
if the same async validation is triggered multiple times.

## Road Map
(in no particular order)

* [ ] fix `sameAs` rule
* [ ] i18n and l10n support
* [ ] offer multiple module formats
* [ ] add more detailed documentation around using each rule
* [ ] add "code recipes" to show common use-cases  
