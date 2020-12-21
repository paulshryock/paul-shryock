const config = require('config')

/**
 * Default content data for pshry.com.
 *
 * @since unreleased
 *
 * @type {Object}
 */
module.exports = {
	layout: 'scaffold',
	permalink: './{{ slug }}/index.html',
	scripts: [{ src: '/js/main.js' }]
		.map(script => {
			return {
				...script,
				src: script.src
					.replace(
						/(\.min)?\.js/g,
						config.get('isProduction') ? '.min.js' : '.js'
					),
				legacy: script.src
					.replace(
						/(\.min)?\.js/g,
						config.get('isProduction') ? '.legacy.min.js' : '.legacy.js'
					)
			}
		}),
	stylesheets: [{ src: '/css/main.css' }]
		.map(stylesheet => {
			return {
				...stylesheet,
				src: stylesheet.src
					.replace(
						/(\.min)?\.css/g,
						config.get('isProduction') ? '.min.css' : '.css'
					)
			}
		}),
}
