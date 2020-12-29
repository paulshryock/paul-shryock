const config = require('config')

/**
 * Site data object.
 *
 * @since unreleased
 *
 * @type {Object}
 */
module.exports = {
	lang: 'en-US',
	csp: `default-src 'none';
		style-src 'self' 'unsafe-inline';
		script-src 'self' 'unsafe-inline';
		img-src 'self';`,
	referrer: 'strict-origin-when-cross-origin',
	robots: 'noindex,nofollow',
	title: 'Paul Shryock',
	excerpt: '2021 reboot of my personal website.',
	url: config.get('site.url'),
	favicon: '/img/favicon/favicon',
	colors: {
		primary: '#0085ca',
		white: '#ffffff',
	},
	year: new Date().getFullYear(),
}
