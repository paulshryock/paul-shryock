module.exports = {
  build: {
    environment: '',
    html: {
      beautify: {
        indent_size: 2,
        max_preserve_newlines: 1
      },
      htmlmin: {
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
      }
    }
  },
  javascript: {
    eslint: {
      env: {
        browser: true,
        es2020: true,
        node: true
      },
      extends: [
        'standard',
        'plugin:sonarjs/recommended',
        'plugin:unicorn/recommended'
      ],
      fix: true,
      parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module'
      }
    }
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
