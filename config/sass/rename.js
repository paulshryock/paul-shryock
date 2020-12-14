/**
 * gulp-rename configuration.
 *
 * @since unreleased
 *
 * @type {Object}
 */
module.exports = {
	dest: path => {
	  path.dirname = path.dirname
	  	.replace('/assets', '')
	  	.replace('/sass', '/css')
	},
	min: path => {
		path.basename += '.min'
	}
}
