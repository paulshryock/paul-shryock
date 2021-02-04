const env = require('./env')

/**
 * Site data object.
 *
 * @since 0.0.1
 *
 * @type {Object}
 */
module.exports = {
	lang: 'en-US',
	cspDirectives: {
		'default-src': "'none'",
		'script-src': "'self'",
		'style-src': "'self'",
		'img-src': "'self'",
		'font-src': "'self'",
		'manifest-src': "'self'",
		'base-uri': "'self'",
		'form-action': "'self'",
		'require-trusted-types-for': "'script'"
	},
	get csp() {
		return Object.entries(this.cspDirectives)
			.reduce(
				(value, directive) => {
					return value +
					[
						directive[0],
						(Array.isArray(directive[1])
							? directive[1].join(' ')
							: directive[1])
					].join(' ') + ';'
				},
				''
			)
	},
	referrer: 'strict-origin-when-cross-origin',
	robots: env.isProduction && env.isPublished
		? 'index,follow'
		: 'noindex,nofollow',
	title: 'Paul Shryock',
	excerpt: '2021 reboot of my personal website.',
	url: env.isProduction ? 'https://pshry.com' : 'http://localhost:8000',
	favicon: '/img/favicon/favicon',
	colors: {
		primary: '#0085ca',
		white: '#ffffff',
	},
	year: new Date().getFullYear(),
}
