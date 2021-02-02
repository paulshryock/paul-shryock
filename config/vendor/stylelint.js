/**
 * stylelint configuration.
 *
 * @since unreleased
 *
 * @type {Object}
 */
module.exports = {
	config: {
		plugins: [
	    "stylelint-scss",
			"stylelint-selector-bem-pattern",
		],
		extends: [
			"stylelint-config-sass-guidelines",
			"stylelint-config-standard",
		],
		rules: {
	    'at-rule-no-unknown': null,
			indentation: [ 'tab', { baseIndentLevel: 1 } ],
	    'max-nesting-depth': null,
			'media-feature-name-no-unknown': [
				true,
				{
					ignoreMediaFeatureNames: [/^prefers-reduced-/]
				}
			],
			"plugin/selector-bem-pattern": { preset: 'bem' },
	    'scss/at-rule-no-unknown': true,
	    'scss/selector-no-redundant-nesting-selector': null,
			'selector-class-pattern': null,
			'selector-max-compound-selectors': null,
		},
	},
	fix: true,
  reporters: [
    { formatter: 'string', console: true },
  ],
}
