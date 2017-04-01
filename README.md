# Vue Dullahan Validation
The Headless Validator  

11.20kb (uncompressed)

## Getting started

### Installation

```npm install vue-dullahan-validation --save ```  
or  
```yarn install vue-dullahan-validation --save ```  
or  
```bower install vue-dullahan-validation --save ```  


### Using validations in your component


## Built-in validation rules

* alphabetic: check that the value contains letter characters only, no numbers or special characters    
* alphanumeric: check that the value contains numbers or letters, but no special characters    
* list: check that given value is a type of list (Array, Map or Set)  
* max: check if the list or string does not surpass the maximum length; Or if a number is not above this value  
* min: check if the list or string meets the minimum length, or if a number meets the minimum value  
* numeric: checks that the given value is a number (includes decimals)  
* or:  checks that at least one of the fields is not empty    
* required: checks that the given field actually has a value; in the case of lists, checks that they are not empty  
* sameAs: checks that the given value matches the value of the companion field (works with Lists and Objects too)  





## Custom Validators

They can be sync or async... but what ever they are they MUST return the following data structure:

```json
{
    isValid: Boolean,
    errorMessage: String
}
```

## Road Map

* [] Support for custom validators
* [] Support for async validation
