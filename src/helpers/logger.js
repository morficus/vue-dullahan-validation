// @flow
/**
 * Helper function to determine a friendly string to represent the given Vue instance
 *
 * @param {Object} vueInstance The instance in question
 * @returns {String} Components display name
 */
function getStringName (vueInstance) {
    let display = 'Anonymous Component';

    const tagName = vueInstance.$options._componentTag,
        el = vueInstance.$options.el;

    if (tagName) {
        display = `<${tagName}>`;
    } else if (el) {
        display = `el: ${el}`;
    }

    return display;
}

/**
 * Logs a message to the console with additional info about the Vue instance
 *
 * @param {Object} vueInstance Reference to the calling instance
 * @param {String} msg Message to be logged
 * @param {String} type Type of message to log (defaults to 'warn'), could be 'warn', 'error' or 'log'
 */
export default function log (vueInstance, msg, type = 'warn') {
    const componentName = getStringName(vueInstance);

    // eslint-disable-next-line no-console
    console[type](`${componentName} - ${msg}`);
}
