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
	javascript: {
		eslint: require('./javascript/eslint'),
		ava: require('./javascript/ava')
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
