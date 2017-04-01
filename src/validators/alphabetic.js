/**
 * Check that the value contains letter characters only, no numbers or special characters
 *
 * @param  {Boolean | Object} ruleValue Rule configuration
 * @param {*} dataValue Attributes current value
 * @returns {{isValid: boolean, errorMessage: string}} Validation result object
 */
export default function alphabetic (ruleValue, dataValue) {
    const expression = RegExp('^[A-Za-z ]+$'),
        // value = ruleValue.value || ruleValue,
        isValid = expression.test(dataValue),
        errorMessage = ruleValue.message || 'Does not meet the `alphabetic` rule.';

    return {
        isValid,
        errorMessage: isValid ? '' : errorMessage
    };
}
