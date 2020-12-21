/**
 * babel configuration.
 *
 * @since unreleased
 *
 * @type {Object}
 */
module.exports = {
	presets: [
		['@babel/preset-env', {
			corejs: 3,
			useBuiltIns: 'entry',
		}]
	],
}
