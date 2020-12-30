const env = require('./env')

/**
 * Site data object.
 *
 * @since unreleased
 *
 * @type {Object}
 */
module.exports = {
	lang: 'en-US',
	csp: "default-src 'none';" +
		"script-src 'self';" +
		"style-src 'self';" +
		"img-src 'self';" +
		"manifest-src 'self';" +
		"base-uri 'self';" +
		"form-action 'self';" +
		"require-trusted-types-for 'script';",
	referrer: 'strict-origin-when-cross-origin',
	robots: 'noindex,nofollow',
	title: 'Paul Shryock',
	excerpt: '2021 reboot of my personal website.',
	url: env.isProduction ? 'https://pshry.com' : 'http://localhost:8080',
	favicon: '/img/favicon/favicon',
	colors: {
		primary: '#0085ca',
		white: '#ffffff',
	},
	year: new Date().getFullYear(),
}
