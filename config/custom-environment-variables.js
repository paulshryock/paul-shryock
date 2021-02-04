/**
 * Custom environment variables.
 *
 * @since 0.0.1
 *
 * @type {Object}
 */
module.exports = {
	build: {
		environment: 'BUILD_ENV',
		published: 'BUILD_PUBLISHED',
	},
	site: {
		url: 'SITE_URL'
	},
	vendor: {
	  twitter: {
	    api: {
	      key: 'TWITTER_API_KEY',
	      secret: 'TWITTER_API_SECRET_KEY'
	    },
	    bearer: {
	      token: 'TWITTER_BEARER_TOKEN'
	    }
	  }
	},
}
