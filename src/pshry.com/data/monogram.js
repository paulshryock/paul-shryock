const site = require('./site')

/**
 * Monogram data object.
 *
 * @since unreleased
 *
 * @type {Object}
 */
module.exports = {
	get letters () {
		return this.title.match(/\b(\w)/g)
	},
	title: site.title,
}
