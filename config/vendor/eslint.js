/**
 * eslint configuration.
 *
 * @since unreleased
 *
 * @type {Object}
 */
module.exports = {
	env: {
		es2020: true
	},
	extends: [
		'standard',
		'plugin:sonarjs/recommended',
		'plugin:unicorn/recommended',
	],
	fix: true,
	rules: {
		indent: ['error', 'tab'],
		'no-tabs': 0,
	},
	parserOptions: {
		ecmaVersion: 2020,
	}
}
