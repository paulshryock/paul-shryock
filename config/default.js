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
		critical: require('./html/critical'),
		htmllint: require('./html/htmllint'),
		htmlmin: require('./html/htmlmin')
	},
	sass: {
		'node-sass': require('./sass/node-sass'),
		rename: require('./sass/rename')
	},
	css: {
		beautify: require('./css/beautify'),
	},
	javascript: {
		ava: require('./javascript/ava'),
		eslint: require('./javascript/eslint'),
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
