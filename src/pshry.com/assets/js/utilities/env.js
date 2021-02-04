/**
 * The current environment.
 *
 * @since 0.0.1
 *
 * @type {string}
 */
export const env = document.documentElement.getAttribute('data-env')

/**
 * Boolean telling if the current environment is production.
 *
 * @since 0.0.1
 *
 * @type {Boolean}
 */
export const isProduction = env === 'production'
