import compareArray from './compareArray';

/**
 * Checks if the two given objects are the same by doing a comparison of each individual attribute
 *
 * @param {Object} dataValue The base value
 * @param {Object} partnerValue The value to be compared
 * @returns {boolean} True if they are the same, otherwise False
 */
export default function compareObject (dataValue, partnerValue) {

    let isValid = false;

    if (dataValue && partnerValue) {
        // generate an array of keys and an array of values
        // sorting so that order of keys will not influence the result
        const dataKeys = Object.keys(dataValue).sort(),
            dataValues = Object.values(dataValue).sort(),
            partnerKeys = Object.keys(partnerValue).sort(),
            partnerValues = Object.values(partnerValue).sort(),

            // now that we have an array of strings... just treat them as normal arrays :-)
            doKeysMatch = compareArray(dataKeys, partnerKeys),
            doValuesMatch = compareArray(dataValues, partnerValues);

        isValid = doKeysMatch && doValuesMatch;
    }

    return isValid;


}
