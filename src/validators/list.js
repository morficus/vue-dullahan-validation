/**
 * Check that given value is a type of list (Array, Map or Set).
 *
 * @param  {Boolean | Object} ruleValue Rule configuration
 * @param {*} dataValue Attributes current value
 * @returns {{isValid: boolean, errorMessage: string}} Validation result object
 */
export default function list (ruleValue, dataValue) {
    let isValid = true;
    const errorMessage = ruleValue.message || 'Does not meet the `list` rule.';
        // value = ruleValue.value || ruleValue;

    isValid = (Array.isArray(dataValue)) ||
            (dataValue instanceof Set) || (dataValue instanceof WeakSet) ||
            (dataValue instanceof  Map) || (dataValue instanceof  WeakMap);

    return {
        isValid,
        errorMessage: isValid ? '' : errorMessage
    };
}
