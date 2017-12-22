import list from './list';

/**
 * Check if the list or string meets the minimum length.
 * Or if a number meets the minimum value.
 *
 * @param  {Number | Object} ruleValue Rule configuration
 * @param {*} dataValue Attributes current value
 * @returns {{isValid: boolean, errorMessage: string}} Validation result object
 */
export default function min (ruleValue, dataValue) {
    let isValid = true;
    const value = ruleValue.value || ruleValue,
        isList = list(ruleValue, dataValue).isValid,
        errorMessage = ruleValue.message || 'Does not meet the `min` rule.';

    if (typeof dataValue === 'string' || isList) {
        isValid = dataValue.length >= value;
    } else if (typeof dataValue === 'number') {
        isValid =  dataValue >= value;
    } else {
        isValid = false;
    }


    return {
        isValid,
        errorMessage: isValid ? '' : errorMessage
    };
}
