module.exports = function(eleventyConfig) {
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
