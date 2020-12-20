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
	site: {
		url: ''
	},
	vendor: {
		ava: require('./vendor/ava'),
		beautify: require('./vendor/beautify'),
		critical: require('./vendor/critical'),
		cssnano: require('./vendor/cssnano'),
		eslint: require('./vendor/eslint'),
		gulp: require('./vendor/gulp'),
		htmllint: require('./vendor/htmllint'),
		htmlmin: require('./vendor/htmlmin'),
		node_sass: require('./vendor/node-sass'),
		purgecss: require('./vendor/purgecss'),
		stylelint: require('./vendor/stylelint'),
		twitter: require('./vendor/twitter'),
		webpack: require('./vendor/webpack'),
	},
}
