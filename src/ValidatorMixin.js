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

const validationObject = {},
    initialValues = {},
    // ^ the two items above are "primed" during the `beforeCreate()` hook

    _validationObjectTemplate = {
        isDirty: false,
        isValid: true,
        errors: []
    },

    validators = {
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
    computed: {

        /**
         * Full details around validation results for each individual attribute.
         *
         * @returns {Object}
         */
        $validation () {
            // this is the data structure that will hold the validation results for each attribute
            const validationResults = Object.assign({}, validationObject);

            // reset everything to valid and no error messages
            Object.values(validationResults).forEach((result) => {
                result.isValid = true;
                result.errors = [];
            });

            // run through each attribute to be validated
            Object.keys(validationResults).forEach((key) => {

                const reservedWords = ['message', 'custom'],
                    attributeName = key,
                    attrValue = this[key], // this would cover both `data` and `computed` attributes
                    initialValue = initialValues[key],
                    applicableRules = this.$options.validation.rules[key];

                // "dirty" means that the value been modified by the user. even if the old an new attributes values
                // are the same... it is still considered to be "dirty" because it has been tampered with. so once
                // you become dirty...there is no going back.
                validationObject[attributeName].isDirty = (validationObject[attributeName].isDirty) || checkIfDirty(attrValue, initialValue),

                    // this flag to indicate that a particular attribute is in the process of being validated.
                    // kind of pointless in this context since this is a synchronous validation, but absolutely
                    // needed for async validations.
                    validationObject[attributeName].isProcessing = true;

                // run all configured relevant rules against this current attribute but exclude the "reserved"
                // attributes from the list of applicable rules to execute.
                Object.keys(applicableRules)
                    .filter((rule) => !reservedWords.includes(rule))
                    .forEach((rule) =>  {

                        // TODO: passing in `this` is  hack to pass the component `data` and `computed` attributes
                        // TODO: at once
                        // actually run the particular validation rule
                        const ruleResult = validators[rule](applicableRules[rule], attrValue, this);

                        if (!ruleResult.isValid) {
                            validationObject[attributeName].isValid = ruleResult.isValid;
                            validationObject[attributeName].errors.push(ruleResult.errorMessage);
                        }
                    });

                // clear flag to indicate that processing is done.
                validationObject[attributeName].isProcessing = false;
            });

            return validationResults;
        },

        /**
         * Convenience property to check if any validations failed.
         *
         * @returns {Boolean} true if all validation passed, false if at least 1 failed.
         */
        $isValid () {
            // if anything with `isValid` = false... then the entire thing is invalid.
            const hasInvalid = Object.keys(this.$validation).filter((key) => {

                return this.$validation[key].isValid === false;
            });

            // eslint-disable-next-line no-magic-numbers
            return hasInvalid.length === 0;
        }
    },

    beforeCreate () {

        // no `validation` property? nothing to do here
        if (!this.$options.validation) {
            const logMsg = 'You are attempting to use the Validator plugin with no validations configured.';
            log(this, logMsg, 'error');

            return;
        }

        // setup local references for the component/instance properties we care about
        const options = this.$options,
            rules = options.validation.rules || {},
            componentData = Object.assign({}, options.data(), options.computed);

        // remove references to its self
        delete componentData['$isValid'];
        delete componentData['$validation'];


        let attrToValidate = Object.keys(rules);

        // check that the attributes that need to be validated are present in the component
        // eslint-disable-next-line one-var
        const missingAttr = attrToValidate.filter((attr) => {
            return !componentData.hasOwnProperty(attr);
        });

        if (missingAttr.length) {
            const logMsg = `Validations will not work for the follow attribute(s) because it was not found in the 'data'
             nor 'computed' properties: ${missingAttr}`;

            log(this,  logMsg, 'warn');
            // remove any validation configuration for data properties that are not present.
            attrToValidate = attrToValidate.filter((attr) => {
                return !missingAttr.includes(attr);
            });
        }

        // create the initial validation object and keep a copy of their starting value
        attrToValidate.forEach((attr) => {
            validationObject[attr] = Object.assign({}, _validationObjectTemplate);


            if (typeof componentData[attr] === 'function') {
                // computed properties need to be treated as functions
                initialValues[attr] = componentData[attr]();
            } else {
                initialValues[attr] = componentData[attr];
            }

        });

    }
};
