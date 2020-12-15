const config = require('config')

/**
 * Environment data object.
 *
 * @since unreleased
 *
 * @type {Object}
 */
module.exports = {
	isProduction: config.get('isProduction')
}
