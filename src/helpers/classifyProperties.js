/**
 * Classifies a components properties as "missing" or "toValidate" based on the list of validation rules that are to
 * be applied to the component.
 *
 * @param {Object} validationRules A "rules" object, as declared in the component
 * @param {Object} vmProperties Object representing the `data` and `computed` properties on the component
 * @returns {{missing: Array, toValidate: Array}} Object with 2 lists... indicating what needs to be validated vs
 * what is missing.
 */
export default function classifyProperties (validationRules, vmProperties) {
    const missing = [],
        toValidate = [];

    Object.keys(validationRules).forEach(ruleAttr => {
        if (vmProperties.hasOwnProperty(ruleAttr)) {
            toValidate.push(ruleAttr);
        } else {
            missing.push(ruleAttr);
        }
    });

    return {
        missing,
        toValidate
    };
}
