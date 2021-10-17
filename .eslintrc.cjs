module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'standard',
		'plugin:@typescript-eslint/recommended',
		'plugin:ava/recommended',
	],
	ignorePatterns: [
		'build',
		'node_modules',
		'tsconfig.json',
		'package-lock.json',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 13,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'json-format'],
	rules: {
		'@typescript-eslint/no-explicit-any': 'off',
		'comma-dangle': ['error', 'always-multiline'],
		indent: [
			'error',
			'tab',
			{
				offsetTernaryExpressions: true,
			},
		],
		'max-len': [
			'error',
			{
				code: 80,
			},
		],
		'multiline-ternary': ['error', 'always-multiline'],
		quotes: [
			'error',
			'single',
			{ allowTemplateLiterals: true, avoidEscape: true },
		],
		'no-tabs': 'off',
	},
}
