const config = require('config')

/**
 * Site data object.
 *
 * @since unreleased
 *
 * @type {Object}
 */
module.exports = {
	lang: 'en-US',
	title: 'Paul Shryock',
	url: config.get('site.url'),
	year: new Date().getFullYear(),
}
