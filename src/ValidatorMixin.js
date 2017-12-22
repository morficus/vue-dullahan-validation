// @flow

import log from './logger';
import doCreate from './create';


let customValidations = {};



// TODO: make it so you can use this with out being global
export default {
    data () {
        return {
            // because of the `$`, this will only be accesable via `this.$data.$validation`. so to make things
            // convenient for the developer using the plugin... a computed property named "$validations" exposes this
            // data property.
            // ref: https://vuejs.org/v2/api/#data
            $validation: {}
        }

    },

    computed: {

        $validations () {
            log(this, 'testing', 'error');
            return this.$data.$validation;
        },


        /**
         * Convenience property to check if any validations failed.
         *
         * @returns {Boolean} true if all validation passed, false if at least 1 failed.
         */
        $isValid () {
            // if anything with `isValid` = false... then the entire thing is invalid.
            const hasInvalid = Object.keys(this.$validation).filter((key) => {

                return this.$data.$validation[key].isValid === false;
            });

            // eslint-disable-next-line no-magic-numbers
            return hasInvalid.length === 0;
        }
    },

    beforeCreate () {

        // no `validation` property? nothing to do here
        if (!this.$options.validation || !this.$options.validation.rules) {
            const logMsg = 'You are attempting to use the Validator plugin with no validations configured.';
            log(this, logMsg, 'error');

            return;
        }
    },

    created: doCreate,

};
