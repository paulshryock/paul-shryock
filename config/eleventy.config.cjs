module.exports = function(eleventyConfig) {
	eleventyConfig.addWatchTarget('./src/assets/ts/')
	eleventyConfig.addWatchTarget('./src/assets/images/')
	eleventyConfig.addWatchTarget('./src/assets/scss/')
	eleventyConfig.setQuietMode(true)

	return {
		dir: {
			data: 'data',
			includes: 'includes',
			input: 'src',
			layouts: 'layouts',
			output: 'dist',
		},
	}
}
