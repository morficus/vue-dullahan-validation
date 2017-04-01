import mixinDefinition from './ValidatorMixin';

export default {
    install (Vue) {
        const supportedVersion = 2,
            majorVersionPosition = 0,
            version = Number(Vue.version.split('.')[majorVersionPosition]);
        if (version < supportedVersion) {

            /* eslint-disable no-console */
            console.warn('!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!');
            console.warn('! This plugin has NOT been tested with Vue 1.x. We suggest you move to 2.0 !');
            console.warn('!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!');
            /* eslint-disable */
        }

        Vue.mixin(mixinDefinition);
    }
};

export const Validator = mixinDefinition;
