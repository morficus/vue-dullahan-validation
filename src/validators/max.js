import list from './list';

/**
 * Check if the list, string or number does not surpass the maximum length;
 *
 * @param  {Number | Object} ruleValue Rule configuration
 * @param {*} dataValue Attributes current value
 * @returns {{isValid: boolean, errorMessage: string}} Validation result object
 */
export default function max (ruleValue, dataValue) {
    let isValid = true;
    const value = ruleValue.value || ruleValue,
        isList = list(ruleValue, dataValue).isValid,
        errorMessage = ruleValue.message || 'Does not meet the `max` rule.';

    if (typeof dataValue === 'string' || isList) {
        isValid = dataValue.length <= value;
    } else if (typeof dataValue === 'number') {
        isValid =  dataValue <= value;
    } else {
        // TODO: show a warning about invalid rule and type?
    }


    return {
        isValid,
        errorMessage: isValid ? '' : errorMessage
    };
}
