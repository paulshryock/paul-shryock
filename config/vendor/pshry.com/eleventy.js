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
  if (eleventyConfig) eleventyConfig.setQuietMode(true)

  // Return configuration object.
  return {
    dir: {
      data: 'data',
      includes: 'includes',
      input: 'src/pshry.com',
      layouts: 'layouts',
      output: 'build/temp/pshry.com'
    }
  }
}
