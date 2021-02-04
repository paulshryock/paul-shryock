const site = require('./site')

/**
 * Monogram data object.
 *
 * @since 0.0.1
 *
 * @type {Object}
 */
module.exports = {
	get letters () {
		return this.title.match(/\b(\w)/g)
	},
	title: site.title,
}
