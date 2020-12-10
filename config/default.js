module.exports = {
  build: {
    environment: '',
    html: {
    	beautify: require('./html/beautify'),
      htmlmin: require('./html/htmlmin')
    }
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
