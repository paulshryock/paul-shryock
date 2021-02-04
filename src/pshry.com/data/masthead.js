const env = require('./env')
const site = require('./site')

/**
 * Masthead data object.
 *
 * @since 0.0.1
 *
 * @type {Object}
 */
module.exports = {
	title: site.title,
	logo: {
		src: `/img/logos/ps-monogram-2021-4c${env.isProduction ? '.min' : ''}.svg`,
		alt: 'Paul Shryock',
		width: 36,
		height: 36,
	}
}
