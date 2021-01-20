/**
 * stylelint configuration.
 *
 * @since unreleased
 *
 * @type {Object}
 */
module.exports = {
	config: {
		extends: [
			"stylelint-config-sass-guidelines",
			"stylelint-config-standard",
		],
		rules: {
			indentation: [ 'tab', { baseIndentLevel: 1 } ],
			'media-feature-name-no-unknown': [
				true,
				{
					ignoreMediaFeatureNames: [/^prefers-reduced-/]
				}
			]
		},
	},
	fix: true,
  reporters: [
    { formatter: 'string', console: true },
  ],
}
