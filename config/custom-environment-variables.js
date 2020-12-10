/**
 * Custom environment variables.
 *
 * @since unreleased
 *
 * @type {Object}
 */
module.exports = {
  build: {
    environment: 'BUILD_ENV'
  },
  site: {
    url: 'SITE_URL'
  },
  twitter: {
    api: {
      key: 'TWITTER_API_KEY',
      secret: 'TWITTER_API_SECRET_KEY'
    },
    bearer: {
      token: 'TWITTER_BEARER_TOKEN'
    }
  }
}
