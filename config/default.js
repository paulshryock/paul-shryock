/**
 * Default configuration.
 *
 * @since unreleased
 *
 * @type {Object}
 */
module.exports = {
  build: {
    environment: '',
  },
  html: {
  	beautify: require('./html/beautify'),
    htmlmin: require('./html/htmlmin'),
    htmllint: require('./html/htmllint')
  },
  javascript: {
    eslint: require('./javascript/eslint')
  },
  site: {
    url: ''
  },
  twitter: {
    api: {
      key: '',
      secret: ''
    },
    bearer: {
      token: ''
    }
  }
}
