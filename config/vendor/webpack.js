const config = require('../default')

/**
 * webpack configuration.
 *
 * @since unreleased
 *
 * @type {Object}
 */
module.exports = function () {
	return {
	  mode: config.isProduction ? 'production' : 'development',
	  watch: !config.isProduction,
	  module: {
	    rules: [
	      {
	        test: /\.js$/,
	        exclude: /node_modules/,
	        use: {
	          loader: 'babel-loader',
	          options: {
	            presets: ['@babel/preset-env']
	          }
	        }
	      }
	    ]
	  },
	  devtool: 'source-map'
	}
}
