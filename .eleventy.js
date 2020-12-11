const config = require('config')

/**
 * Eleventy configuration.
 *
 * @since unreleased
 *
 * @param  {Object} eleventyConfig Eleventy configuration.
 * @return {Object}                Modified Eleventy configuration.
 */
module.exports = function (eleventyConfig) {
  // Quiet output.
  eleventyConfig.setQuietMode(config.get('isProduction'))

  // Return configuration object.
  return {
    dir: {
      data: 'data',
      includes: 'includes',
      input: 'src/pshry.com',
      layouts: 'layouts',
      output: 'build/pshry.com'
    }
  }
}
