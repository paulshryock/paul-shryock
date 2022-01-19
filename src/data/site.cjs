module.exports = function() {
	const title = 'Paul Shryock'
	const year = new Date().toLocaleString('en-US', { year: 'numeric' })

	return {
		copyright: `© ${year} ${title}. All rights reserved.`,
		language: 'en-US',
		pronouns: ['he', 'him'],
		tagline: 'Ethical Software Engineer',
		title,
	}
}