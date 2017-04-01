import list from './list';

/**
 * Checks that the given value matches the value of the companion field.
 * Applies to list s as well.
 *
 * @param  {String | Object} ruleValue Rule configuration
 * @param {String | Number | Array} dataValue Attributes current value
 * @returns {{isValid: boolean, errorMessage: string}} Validation result object
 */
export function sameAs (ruleValue, dataValue, componentData) {
    const value     = ruleValue.value || ruleValue,
        isValueList = list({}, dataValue).isValid,

        partnerValue    = componentData[value],
        isPartnerList   = list({}, partnerValue).isValid,

        errorMessage = ruleValue.message || 'Does not meet the `sameAs` rule.';

    let isValid = false;

    if (isValueList && isPartnerList) {
        isValid = compareArray(dataValue, partnerValue);
    } else if (dataValue instanceof Object && partnerValue instanceof Object) {
        isValid = compareObject(dataValue, partnerValue);
    } else if (dataValue === partnerValue) {
        isValid = true;
    }

    return {
        isValid,
        errorMessage: isValid ? '' : errorMessage
    };
}

/**
 * Check if the two given arrays are the same by doing a comparison of their individuals items.
 * It takes in to account the order of its content.
 *
 * @param {Array} dataValue
 * @param {Array} partnerValue
 * @returns {boolean} True if they are the same, otherwise False
 */
export function compareArray (dataValue, partnerValue) {
    let isValid = true;

    // find miss-matched values.
    // the "gap" here is that if one list is longer than the other... then the miss-match might not be detected.
    // but there is a check for that later on.
    const missMatchedValues = dataValue.filter((val, index) => {
        let missMatchVal;

        if (Array.isArray(val) || Array.isArray(partnerValue[index])) {
            // if values at the given index are arrays... go in and check those too
            missMatchVal = !compareArray(val, partnerValue[index]);
        }else if (val instanceof Object || partnerValue[index] instanceof Object) {
            missMatchVal = !compareObject(val, partnerValue[index]);
        } else {
            missMatchVal = val !== partnerValue[index];
        }

        return missMatchVal;
    });

    if (dataValue.length !== partnerValue.length) {
        // must be the same length
        isValid = false;
    } else if (missMatchedValues.length !== 0) {
        // must have the same content in the same order
        isValid = false;
    }

    return isValid;
}

/**
 * Checks if the two given objects are the same by doing a comparison of each individual attribute
 *
 * @param {Object} dataValue
 * @param {Object} partnerValue
 * @returns {boolean} True if they are the same, otherwise False
 */
export function compareObject (dataValue, partnerValue) {
    // generate an array of keys and an array of values
    const dataKeys = Object.keys(dataValue),
        dataValues = Object.values(dataValue),
        partnerKeys = Object.keys(partnerValue),
        partnerValues = Object.values(partnerValue),

        // now that we have an array of strings... just treat them as normal arrays :-)
        doKeysMatch = compareArray(dataKeys, partnerKeys),
        doValuesMatch = compareArray(dataValues, partnerValues);

    return doKeysMatch && doValuesMatch;
}
