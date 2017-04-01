import list from './list';

export default function or (ruleValue, fieldValue, componentData) {
    let isValid = false,
        isCompanionValid = false;

    const empty = 0,
        companionFieldName = ruleValue.value || ruleValue,
        companionValue = componentData[companionFieldName],
        isValueList = list({}, fieldValue).isValid,
        isPartnerList = list({}, companionValue).isValid,
        errorMessage = ruleValue.message || 'Does not meet the `max` rule.';

    // first check if the primary field is non-empty
    if (isValueList || typeof fieldValue === 'string') {
        isValid = fieldValue.length > empty;
    } else if (fieldValue !== null || fieldValue !== undefined) {
        isValid = true;
    }

    // now do the same thing for the companion field
    if (isPartnerList || typeof companionValue === 'string') {
        isCompanionValid = companionValue.length > empty;
    } else if (companionValue !== null || companionValue !== undefined) {
        isCompanionValid = true;
    }

    return {
        // this rule is only valid if at least one of the fields are non-empty
        isValid: isValid || isCompanionValid,
        errorMessage: isValid ? '' : errorMessage
    };
}
