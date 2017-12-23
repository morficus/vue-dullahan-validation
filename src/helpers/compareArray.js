import compareObject from './compareObject';
const EMPTY = 0;

/**
 * Check if the two given arrays are the same by doing a comparison of their individuals items.
 * It takes in to account the order of its content.
 *
 * @param {Array} dataValue The base array
 * @param {Array} partnerValue The array to be compared
 * @returns {boolean} True if they are the same, otherwise False
 */
export default function compareArray (dataValue, partnerValue) {
    let isValid = true;

    // find miss-matched values.
    // the "gap" here is that if one list is longer than the other... then the miss-match might not be detected.
    // but there is a check for that later on.
    const missMatchedValues = dataValue.filter((val, index) => {
        let missMatchVal = undefined;

        if (Array.isArray(val) || Array.isArray(partnerValue[index])) {
            // if values at the given index are arrays... go in and check those too
            // because the "partner value" could be shorter than the value its self... we set a fallback value of empty
            // array.
            missMatchVal = !compareArray(val, partnerValue[index] || []);
        } else if (val instanceof Object || partnerValue[index] instanceof Object) {
            missMatchVal = !compareObject(val, partnerValue[index]);
        } else {
            missMatchVal = val !== partnerValue[index];
        }

        return missMatchVal;
    });

    if (dataValue.length !== partnerValue.length) {
        // must be the same length
        isValid = false;
    } else if (missMatchedValues.length !== EMPTY) {
        // must have the same content in the same order
        isValid = false;
    }

    return isValid;
}
