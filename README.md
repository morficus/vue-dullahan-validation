# Vue Dullahan Validation
The Headless Validator  

> The Irish Dullahan (also Gan Ceann, meaning "without a head" in Irish) is a type of Unseelie fairy.
 The Dullahan (pronounced DOOL-a-HAN) is a headless rider,  usually on a black horse who carries his or her own head 
  under one arm.


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
* sameAs: checks that the given value matches the value of the companion field (works with Lists and Objects too) - 
for Lists, the elements must also be in the same order  


For details on how to configure each built-in rule, take a look at the [rules in details page](documentation/rules.md).



## Custom Validators

They can be sync or async... but what ever they are they MUST return the following data structure:

```
{
    isValid: Boolean,
    errorMessage: String
}
```

If your validator is async or triggers network requests.... it is HIGHLY recommended that you denounce your function.

## Road Map
(in no particular order)

* [ ] fix `sameAs` rule
* [ ] i18n and l10n support
* [ ] Vuex support w/o using `mapGetters()`
