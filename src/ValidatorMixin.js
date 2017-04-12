import required from './validators/required';
import min from './validators/min';
import max from './validators/max';
import numeric from './validators/numeric';
import alphabetic from './validators/alphabetic';
import alphanumeric from './validators/alphanumeric';
import list from './validators/list';
import {sameAs, compareObject, compareArray} from './validators/sameAs';
import or from './validators/or';

import log from './logger';

const initialValues = {},
    // ^ the two items above are "primed" during the `beforeCreate()` hook

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

let customValidations = {};

// TODO: this is VERY similar to the `sameAs()` validation... maybe it can be re-used here?
/**
 * Helper function to check if the given values have caused an attribute to become "dirty"
 *
 * @param currentValue
 * @param initialValue
 * @returns {boolean}
 */
function checkIfDirty (currentValue, initialValue) {
    const currentType = typeof currentValue,
        initialType = typeof initialValue;

    let isDirty = false;

    if (currentType !== initialType) {
        // not the same type? clearly it has been modified...
        isDirty = true;
    } else if (currentType === 'string' || currentType === 'number') {
        // if they are both strings or numbers... then do a direct value comparison
        isDirty = currentValue !== initialValue
    } else if (Array.isArray(currentValue)) {
        // perform a deep array comparison
        isDirty = !compareArray(currentValue, initialValue)
    } else if (currentType === 'object') {
        // perform an object-attribute comparison
        isDirty = !compareObject(currentValue, initialValue);
    }

    return isDirty;
}


// TODO: make it so you can use this with out being global
export default {
    data () {
        return {
            // because of the `$`, this will only be accesable via `this.$data.$validation`. so to make things
            // convenient for the developer using the plugin... a computed property of the same name exposes this
            // data property.
            // ref: https://vuejs.org/v2/api/#data
            $validation: {}
        }

    },

    computed: {
        $validation () {
            return this.$data.$validation;
        },

        /**
         * Convenience property to check if any validations failed.
         *
         * @returns {Boolean} true if all validation passed, false if at least 1 failed.
         */
        $isValid () {
            // if anything with `isValid` = false... then the entire thing is invalid.
            return true;
            /*
            const hasInvalid = Object.keys(this.$validation).filter((key) => {

                return this.$validation[key].isValid === false;
            });

            // eslint-disable-next-line no-magic-numbers
            return hasInvalid.length === 0;
            */
        }
    },

    beforeCreate () {

        // no `validation` property? nothing to do here
        if (!this.$options.validation || !this.$options.validation.rules) {
            const logMsg = 'You are attempting to use the Validator plugin with no validations configured.';
            log(this, logMsg, 'error');

            return;
        }
    },

    created () {
        // setup local references for the component/instance properties we care about
        const options = this.$options,
            rules = options.validation.rules || {},
            componentData = Object.assign({}, options.data(), options.computed),
            validationResults = this.$data.$validation;

        // remove references to its self
        delete componentData['$isValid'];
        delete componentData['$validation'];

        // combine custom validations with built-in validations
        validators = Object.assign(validators, options.validation.validations);

        let attributesToValidate = Object.keys(rules);
        // eslint-disable-next-line one-var
        const missingAttr = attributesToValidate.filter((attr) => {
            return !componentData.hasOwnProperty(attr);
        });

        if (missingAttr.length) {
            const logMsg = `Validations will not work for the follow attribute(s) because it was not found in the 'data'
             nor 'computed' properties: ${missingAttr}`;

            log(this,  logMsg, 'warn');
            // remove any validation configuration for data properties that are not present.
            attributesToValidate = attributesToValidate.filter((attr) => {
                return !missingAttr.includes(attr);
            });
        }

        attributesToValidate.forEach((attribute) => {

            // keep a history of their initial value, used to initially determine the dirtinesss" of an attribute
            if (typeof componentData[attribute] === 'function') {
                // computed properties need to be treated as functions
                initialValues[attribute] = componentData[attribute]();
            } else {
                initialValues[attribute] = componentData[attribute];
            }

            // setup the initial validation result structure for each attribute
            // th JSON-stringify-parse thing is a hack to make a deep-copy
            this.$set(validationResults, attribute, JSON.parse(JSON.stringify(_validationObjectTemplate)));

            const watcherOptions = {
                immediate: true
            };

            // when validating objects, setup a deep watching
            // ref: https://vuejs.org/v2/api/#vm-watch
            if (componentData[attribute] instanceof Object) {
                watcherOptions.deep = true;
            }

            this.$watch(attribute, async function (newValue, oldValue) {
                const result = validationResults[attribute],
                    initialValue = initialValues[attribute],
                    applicableRules = rules[attribute],
                    ruleNames = Object.keys(applicableRules);

                result.isValid = true;
                result.errors = new Set();


                // "dirty" means that the value been modified by the user. even if the old an new attributes values
                // are the same... it is still considered to be "dirty" because it has been tampered with. so once
                // you become dirty...there is no going back.
                result.isDirty = (result.isDirty) || checkIfDirty(newValue, initialValue);

                // this flag to indicate that a particular attribute is in the process of being validated.
                // kind of pointless in this context since this is a synchronous validation, but absolutely
                // needed for async validations.
                result.isProcessing = true;

                // actually run all the rules.
                // we wait for all of them to be done so we can properly set `isProcessing`.
                // we also assume that they are sync... since we can not predict what users will do in custom validators
                let allResults = await Promise.all(ruleNames.map(async function (rule) {

                    const ruleValue = applicableRules[rule],
                        res = await validators[rule](ruleValue, newValue, this);

                    result.rules[rule] = res.isValid;

                    if (!res.isValid) {
                        result.isValid = res.isValid;
                        result.errors.add(res.errorMessage);
                    }

                    return res;
                }, this));


                // if any of the resultsdid not pass... mark everything as invalid
                const failureCount = allResults.filter((r) => {return !r.isValid});
                result.isValid = failureCount.length === 0;


                result.isProcessing = false;



            }, watcherOptions);

        }, this);
    },

};
