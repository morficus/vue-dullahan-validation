import list from './list';
import compareObject from '../helpers/compareObject';
import compareArray from '../helpers/compareArray';


/**
 * Checks that the given value matches the value of the companion field.
 * Applies to list s as well.
 *
 * @param  {String | Object} ruleValue Rule configuration
 * @param {String | Number | Array} dataValue Attributes current value
 * @param {Object} componentData All data attributes on the component
 * @returns {{isValid: boolean, errorMessage: string}} Validation result object
 */
export default function sameAs (ruleValue, dataValue, componentData) {
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
