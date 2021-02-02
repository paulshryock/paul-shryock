const config = require('config')

/**
 * Environment data object.
 *
 * @since unreleased
 *
 * @type {Object}
 */
module.exports = {
	environment: config.get('build.environment'),
	isProduction: config.get('isProduction'),
	isPublished: config.get('isPublished'),
}
