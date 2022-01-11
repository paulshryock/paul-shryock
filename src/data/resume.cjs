module.exports = function() {
	const resume = {
		experience: [
			{
				role: 'WordPress Engineer',
				employer: 'NBA',
				duration: {
					from: '2020',
					to: 'present',
				},
				description: `Engineers and maintains WordPress CMS environments and microsites, ensuring great editorial user experiences and improving public-facing user interfaces. Follows modern best practices for improving accessibility, security, performance, and UX across all digital products.`,
			},
			{
				role: 'Web Developer',
				employer: 'Palantir',
				duration: {
					from: '2018',
					to: 'present',
				},
				description: `Develops and maintains marketing website and microsites, ensuring rich editorial CMS workflows and smooth web experiences. Contributes high-quality code and supports new features with minimal direction.`,
			},
			{
				role: 'Lead Front End Developer',
				employer: 'Realogy',
				duration: {
					from: '2017',
					to: '2020',
				},
				description: `Engineered and maintained many accessible websites, applications, and HTML emails for world-class real estate brands. Proposed and executed effective software and marketing solutions, providing high ROI for internal clients.`,
				accomplishments: [
					`Built 2018 conference ecommerce platform generating $2M in sales`,
					`Built internal application for sending employee communications at scale (80k recipients)`,
					`Built fair housing pledge website and admin dashboard with pdf/csv exports (17k users)`,
					`Built fast, secure web application to collect conference attendee information in a database`,
				],
			},
			{
				role: 'Interactive Art Director',
				employer: 'Ogilvy Health',
				duration: {
					from: '2016',
					to: '2017',
				},
			},
			{
				role: 'Graphic Designer',
				employer: 'McCann Echo',
				duration: {
					from: '2016',
					to: '2017',
				},
			},
			{
				role: 'Graphic Designer, Web Developer',
				employer: 'OSG Billing Services',
				duration: {
					from: '2015',
					to: '2016',
				},
			},
			{
				role: 'Web Designer, Web Developer',
				employer: 'Kaast Machine Tools',
				duration: {
					from: '2014',
					to: '2015',
				},
			},
			{
				role: 'Graphic Designer',
				employer: 'Sports Reports Press',
				duration: {
					from: '2013',
					to: '2014',
				},
			},
			{
				role: 'Graphic Designer',
				employer: 'Spirit Media Group',
				duration: {
					from: '2012',
					to: '2014',
				},
			},
			{
				role: 'Imaging Artist',
				employer: 'Barksdale Portraits',
				duration: {
					from: '2013',
					to: '2013',
				},
			},
			{
				role: 'Machine Operator, Web Designer',
				employer: 'Folsom Tool',
				duration: {
					from: '2011',
					to: '2013',
				},
			},
			{
				role: 'Graphic Designer',
				employer: 'The Vine',
				duration: {
					from: '2010',
					to: '2013',
				},
			},
			{
				role: 'Graphic Designer, Web Developer',
				employer: 'The Communitarian',
				duration: {
					from: '2011',
					to: '2011',
				},
			},
			{
				role: 'Software Engineer, Web Designer',
				employer: 'Freelance',
				duration: {
					from: '2009',
					to: 'present',
				},
			},
		],
		skills: [
			{
				type: 'HTML',
				tools: ['Eleventy, Jekyll', 'Liquid, nunchucks'],
			},
			{
				type: 'CSS',
				tools: ['PostCSS, Sass', 'ITCSS, BEM'],
			},
			{
				type: 'JavaScript',
				tools: [
					'TypeScript, ES2020',
					'Node.js, Express, MongoDB',
					'Next.js, React, Angular',
					'Jest, Ava, ESLint, Prettier',
					'Electron',
				],
			},
			{
				type: 'PHP',
				tools: ['WordPress, WP CLI & REST API', 'Composer', 'PHPCS'],
			},
			{
				type: 'SQL',
				tools: ['PostgreSQL', 'MySQL, MariaDB'],
			},
			{
				type: 'CI/CD',
				tools: [
					'Docker, Docker Compose',
					'GitHub Actions, BitBucket Pipelines',
					'Netlify, Vercel, Heroku',
				],
			},
			{
				type: 'Other',
				tools: [
					'HTTP, Postman, REST APIs',
					'JSON, Markdown, YAML, TOML',
					'esbuild, swc, webpack, babel',
					'Storybook',
					'nx, oclif',
					'Git, bash, zsh',
				],
			},
		],
	}

	return resume
}
