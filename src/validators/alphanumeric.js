/**
 * Check that the value contains numbers or letters, but no special characters.
 *
 * @param  {Boolean | Object} ruleValue Rule configuration
 * @param {*} dataValue Attributes current value
 * @returns {{isValid: boolean, errorMessage: string}} Validation result object
 */
export default function alphanumeric (ruleValue, dataValue) {

    const expression = RegExp('^[A-Za-z0-9 ]+$'),
        // value = ruleValue.value || ruleValue,
        isValid = expression.test(dataValue),
        errorMessage = ruleValue.message || 'Does not meet the `alphanumeric` rule.';

    return {
        isValid,
        errorMessage: isValid ? '' : errorMessage
    };
}
