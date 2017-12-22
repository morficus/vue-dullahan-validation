import list from './list';

/**
 * Checks that the given value actually has a value.
 * In the case of lists, makes sure they are not empty
 *
 * @param  {Boolean | Object} ruleValue Rule configuration
 * @param {String | Number | Array | Boolean, Object} dataValue Attributes current value
 * @returns {{isValid: boolean, errorMessage: string}} Validation result object
 */
export default function required (ruleValue, dataValue) {
    const empty = 0,
        // value = ruleValue.value || ruleValue,
        isList = list(ruleValue, dataValue).isValid,
        errorMessage = ruleValue.message || 'Does not meet the `required` rule.';

    let isValid = true;

    if (dataValue === null || dataValue === undefined) {
        isValid = false;
    } else if (typeof dataValue === 'string' || isList) {
        isValid = dataValue.length > empty;
    } else if (dataValue instanceof Object) {
        isValid = Object.keys(dataValue).length > empty
            && Object.values(dataValue)
                // filter out falsy values (like empty strings, null, etc)
                .filter(val => val)
                .length > empty;
    }

    return {
        isValid,
        errorMessage: isValid ? '' : errorMessage
    };
}
