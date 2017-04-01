/**
 * Checks that the given value is a number.
 *
 * @param  {Number | Object} ruleValue Rule configuration
 * @param {*} dataValue Attributes current value
 * @returns {{isValid: boolean, errorMessage: string}} Validation result object
 */
export default function numeric (ruleValue, dataValue) {
    const errorMessage = ruleValue.message || 'Does not meet the `numeric` rule.',
        // value = ruleValue.value || ruleValue,
        isValid = typeof dataValue === 'number';

    return {
        isValid,
        errorMessage: isValid ? '' : errorMessage
    };
}
