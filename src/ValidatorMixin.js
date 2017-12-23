import log from './helpers/logger';
import setupValidations from './setupValidations';


export default {
    data () {
        return {
            // because of the `$`, this will only be accesable via `this.$data.$validation`. so to make things
            // convenient for the developer using the plugin... a computed property named "$validations" exposes this
            // data property.
            // ref: https://vuejs.org/v2/api/#data
            $validation: {}
        };

    },

    computed: {

        $validations () {
            return this.$data.$validation;
        },


        /**
         * Convenience property to check if any validations failed.
         *
         * @returns {Boolean} true if all validation passed, false if at least 1 failed.
         */
        $isValid () {
            // if anything with `isValid` = false... then the entire thing is invalid.
            const validationResults = Object.values(this.$validations).map(validation => validation.isValid);

            return !validationResults.includes(false);
        }
    },

    beforeCreate () {

        // no `validation` property? nothing to do here
        if (!this.$options.validation || !this.$options.validation.customValidations) {
            const logMsg = 'You are attempting to use the Validator plugin with no validations configured.';
            log(this, logMsg, 'error');
        }
    },

    created: setupValidations

};
