module.exports = function(eleventyConfig) {
	eleventyConfig.addWatchTarget('./src/ts/')
	eleventyConfig.addWatchTarget('./src/images/')
	eleventyConfig.addWatchTarget('./src/scss/')
	eleventyConfig.setQuietMode(true)

	return {
		dir: {
			data: 'data',
			includes: 'includes',
			// todo: update source code directory to src/html
			input: 'src/html',
			layouts: 'layouts',
			output: 'dist',
		},
	}
}
