/**
 * gulp-rename configuration.
 *
 * @since unreleased
 *
 * @type {Object}
 */
module.exports = path => {
  path.dirname = path.dirname
  	.replace('/assets', '')
}
