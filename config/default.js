module.exports = {
  build: {
    environment: '',
    html: {
      beautify: {
        indent_size: 2,
        max_preserve_newlines: 1
      },
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        decodeEntities: true,
        html5: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        sortAttributes: true,
        sortClassName: true,
        trimCustomFragments: true,
        useShortDoctype: true
      },
    },
  },
  site: {
    url: ''
  }
  twitter: {
    api: {
      key: '',
      secret: ''
    },
    bearer: {
      token: ''
    },
  },
}
