/* eslint-disable no-invalid-this */

import required from './validators/required';
import min from './validators/min';
import max from './validators/max';
import numeric from './validators/numeric';
import alphabetic from './validators/alphabetic';
import alphanumeric from './validators/alphanumeric';
import list from './validators/list';
import sameAs from './validators/sameAs';
import or from './validators/or';

import log from './helpers/logger';
import classifyProperties from './helpers/classifyProperties';

const initialValues = {},
    // ^ the two items above are "primed" during the setup process

    _validationObjectTemplate = {
        isDirty: false,
        isValid: true,
        isProcessing: false,
        rules: {},
        errors: new Set()
    };

let validators = {
    required,
    min,
    max,
    numeric,
    alphabetic,
    alphanumeric,
    list,
    sameAs,
    or
};

/**
 * Helper function to check if the given values have changed.
 * The only reason this is a helper and not just a simple `===` check... is so we can do a deep-compare for objects
 * and arrays. For this we leverage the existing logic defined in the `sameAs()` validator.
 *
 * @param {*} currentValue Present value
 * @param {*} initialValue Starting value
 * @returns {boolean} True if it has changed, otherwise false.
 */
function checkIfDirty (currentValue, initialValue) {
    const data = {
        currentValue,
        initialValue
    };

    // in this context, "isValid = true" means it has not changed while "isValid = false" means it has changed, so
    // we want to return the opposite of the validation.
    return !sameAs('initialValue', data.currentValue, data).isValid;
}

/**
 * Runs through all the necessary steps for configuring and setting up validations.
 * It is intended to be used with with a lifecycle hook.
 */
export default function setupValidations () {

    // setup local references for the component/instance properties we care about
    const vm = this,
        options = vm.$options,
        rules = options.validation.rules || {},
        componentData = Object.assign({}, options.data(), options.computed),
        validationResults = vm.$data.$validation;

    // remove references to its self
    delete componentData['$isValid'];
    delete componentData['$validation'];

    // combine custom validations with built-in validations
    validators = Object.assign({}, validators, options.validation.customValidations || {});

    // eslint-disable-next-line one-var
    const propertyClassification = classifyProperties(rules, componentData);

    if (propertyClassification.missing.length) {
        const logMsg = `Validations will not work for the follow attribute(s) because it was not found in the 'data'
             nor 'computed' properties: ${propertyClassification.missing.join(', ')}`;

        log(vm,  logMsg, 'warn');
    }

    // setup a watcher for each property that has a validation rule.
    propertyClassification.toValidate.forEach(attribute => {

        // keep a history of their initial value, used to initially determine the "dirtiness" of a property
        if (typeof componentData[attribute] === 'function') {
            // computed properties need to be treated as functions
            initialValues[attribute] = componentData[attribute]();
        } else {
            initialValues[attribute] = componentData[attribute];
        }

        // setup the initial validation result structure for each attribute
        // the JSON-stringify-parse thing is a hack to make a deep-copy
        vm.$set(validationResults, attribute, JSON.parse(JSON.stringify(_validationObjectTemplate)));

        const watcherOptions = {
            immediate: true
        };

        // when validating objects, setup a deep watching
        // ref: https://vuejs.org/v2/api/#vm-watch
        if (componentData[attribute] instanceof Object) {
            watcherOptions.deep = true;
        }

        // eslint-disable-next-line prefer-arrow-callback
        vm.$watch(attribute, async function validationTrigger (newValue) {
            const result = validationResults[attribute],
                initialValue = initialValues[attribute],
                applicableRules = rules[attribute],
                ruleNames = Object.keys(applicableRules);

            result.isValid = true;
            result.errors = new Set();


            // "dirty" means that the value has been modified by the user. even if the old and new value are the same...
            // ... it is still considered to be "dirty" because it has been tampered with. so once you become dirty...
            // ...there is no going back.
            result.isDirty = (result.isDirty) || checkIfDirty(newValue, initialValue);

            // this flag is to indicate that a particular attribute is in the process of being validated.
            // kind of pointless in this context since this is a synchronous validation, but absolutely need for
            // customer validation rules that may be async.
            result.isProcessing = true;

            // actually run all the rules.
            // we wait for all of them to be done so we can properly set `isProcessing`.
            // we also assume that they are sync... since we can not predict what users will do in custom validators
            // eslint-disable-next-line one-var
            const allResults = await Promise.all(ruleNames.map(async rule => {

                const ruleValue = applicableRules[rule],
                    vmProperties = Object.assign({}, vm.$data, vm.$options.computed),
                    res = await validators[rule](ruleValue, newValue, vmProperties);

                result.rules[rule] = res.isValid;

                if (!res.isValid) {
                    result.isValid = res.isValid;
                    result.errors.add(res.errorMessage);
                }

                return res;
            }));


            // if any of the results did not pass... mark everything as invalid
            // eslint-disable-next-line one-var
            const failureCount = allResults.filter(result => !result.isValid);
            result.isValid = !failureCount.length;

            result.errors = Array.from(result.errors);


            result.isProcessing = false;


        }, watcherOptions);

    });

}
