/**
 * Default configuration.
 *
 * @since unreleased
 *
 * @type {Object}
 */
module.exports = {
	build: {
		environment: ''
	},
	get isProduction () {
		return this.build.environment === 'production'
	},
	html: {
		beautify: require('./html/beautify'),
		htmlmin: require('./html/htmlmin'),
		htmllint: require('./html/htmllint')
	},
	sass: {
		'node-sass': require('./sass/node-sass'),
		rename: require('./sass/rename')
	},
	javascript: {
		eslint: require('./javascript/eslint'),
		ava: require('./javascript/ava'),
		rename: require('./javascript/rename')
	},
	site: {
		url: ''
	},
	twitter: {
		api: {
			key: '',
			secret: ''
		},
		bearer: {
			token: ''
		}
	}
}
