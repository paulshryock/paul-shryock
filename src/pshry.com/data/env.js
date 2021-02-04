const config = require('config')

/**
 * Environment data object.
 *
 * @since 0.0.1
 *
 * @type {Object}
 */
module.exports = {
	environment: config.get('build.environment'),
	isProduction: config.get('isProduction'),
	isPublished: config.get('isPublished'),
}
