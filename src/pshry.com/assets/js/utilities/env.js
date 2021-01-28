/**
 * The current environment.
 *
 * @since unreleased
 *
 * @type {string}
 */
export const env = document.documentElement.getAttribute('data-env')

/**
 * Boolean telling if the current environment is production.
 *
 * @since unreleased
 *
 * @type {Boolean}
 */
export const isProduction = env === 'production'
