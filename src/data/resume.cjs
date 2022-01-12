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
				description: `Engineers and maintains over 130 WordPress websites for affiliated leagues, teams, and microsites. Ensures great editorial user experiences and improves public-facing user interfaces. Follows modern best practices for improving accessibility, security, performance, and UX across all digital products.`,
				accomplishments: [
					`Helped build and maintain the editorial CMS environment powering NBA.com`,
					`Developed the front end interface for NBA Watch Party, a watch-together app`,
					`Building the next generation WNBA headless CMS experience`,
				],
			},
			{
				role: 'Web Developer',
				employer: 'Palantir',
				duration: {
					from: '2018',
					to: 'present',
				},
				description: `Develops and maintains marketing website and microsites, ensuring rich editorial CMS workflows and smooth web experiences. Contributes high-quality code and supports new features with minimal direction.`,
				accomplishments: [
					`Designed and engineered several new landing pages and content templates`,
					`Rebuilt development build pipeline, replacing Grunt with Gulp and other modern tools`,
				],
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
					`Engineered 2018 conference ecommerce platform generating $2M in sales`,
					`Built internal application for sending employee communications at scale (80k recipients)`,
					`Developed fair housing pledge website and admin dashboard with CSV exports (17k users)`,
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
		education: [
			{
				school: 'Execute Program',
				degree: 'Online learning platform',
				field: 'Software Engineering with a focus on TypeScript',
				duration: {
					from: new Date('2021'),
					to: new Date('2022'),
				},
				description: `Execute Program is a dynamic, highly interactive learning system. Lessons mix short explanations with real code examples running live in the browser. Each course has hundreds of code examples, so by the end you've worked with a lot of real code. Each lesson is built on concepts from earlier lessons, with follow-up reviews to reinforce what you've learned`,
				url: 'https://www.executeprogram.com/',
				courses: [
					'TypeScript Basics',
					'Everyday TypeScript',
					'Advanced TypeScript',
					'Regular Expressions',
					'JavaScript Arrays',
				],
			},
			{
				school: 'Lightning-Fast Web Performance',
				degree: 'Online learning platform',
				field: 'Web Performance',
				duration: {
					from: new Date('2021'),
					to: new Date('2021'),
				},
				description: `An online lecture course by Scott Jehl. Learn to analyze site performance, fix issues, monitor for regressions, and deliver fast, responsive designs from the start.`,
				url: 'https://scottjehl.com/lfwp/',
			},
			{
				school: 'Cloud Academy',
				degree: 'Certificate',
				field: 'Docker in Depth learning path',
				duration: {
					from: new Date('2020'),
					to: new Date('2022'),
				},
				description: `This learning path is designed to teach you all about Docker starting from the humble individual container and progressing to the continuous deployment of an application in AWS. In the first course, the fundamentals of using Docker containers are taught. You'll reinforce your learning in the first Lab on Docker basics. In the second course, you learn how to manage multi-container applications using Docker Compose. In the final course, you see how to deploy container applications to a cluster by running Docker in swarm mode. You round out what you've learned by performing blue-green deployments of an application using Docker containers in Amazon's EC2 Container Service. After completing this learning path you will have the skills needed to start using Docker to improve your development and operational efficiency.`,
				url: `https://cloudacademy.com/learning-paths/cloud-academy-docker-in-depth-129/`,
				courses: [
					'Introduction to Docker',
					'Getting Started with Docker on Linux for AWS',
					'Managing Applications with Docker Compose',
					'Using Amazon ECS for Blue-Green Deployments',
					'Final Exam: Docker in Depth',
				],
			},
			{
				school: 'The Complete Node.js Course',
				degree: 'Online learning platform',
				field: 'Full Stack Web Development',
				duration: {
					from: new Date('2019'),
					to: new Date('2019'),
				},
				description: `Learn to build highly-scalable, fast and secure RESTful APIs with Node, Express, and MongoDB.`,
				url: `https://codewithmosh.com/p/the-complete-node-js-course`,
				courses: [
					'All about Node module system',
					'Use existing Node packages or publish your own',
					`Write asynchronous JavaScript code (promises and async/await)`,
					'Implement CRUD operations',
					'Store complex, relational data in MongoDB using Mongoose',
					'Implement data validation',
					'Implement authentication and authorization',
					'Handle and log errors effectively',
					`Set up configuration for various environments (dev, test, prod)`,
					'Write unit and integration tests',
					'Build features using test-driven development',
					'Deploy your Node apps to Heroku',
				],
			},
			{
				school: 'Complete SQL Mastery',
				degree: 'Online learning platform',
				field: 'Data Science, Full Stack Web Development',
				duration: {
					from: new Date('2019'),
					to: new Date('2019'),
				},
				description: `Master the SQL statements that every software developer needs for designing, developing and maintaining databases. By the end of the course, be able to tackle the most complex SQL projects with relative ease and not feel confused by any SQL concepts.`,
				url: `https://codewithmosh.com/p/complete-sql-mastery`,
			},
			{
				school: 'JavaScript for WordPress',
				degree: 'Master Course Cohort Program',
				field: 'Front End Web Development',
				duration: {
					from: new Date('2016'),
					to: new Date('2019'),
				},
				description: `Learn JavaScript properly from the ground up: Syntax, the DOM, Events, ESNext and much more. Learn to use and customize the WordPress REST API with themes, plugins and decoupled apps. Learn how to use popular frameworks like React and Vue within WordPress or in decoupled apps. Learn from JavaScript and WordPress API projects built by the pros.`,
				url: `https://javascriptforwp.com/`,
				courses: [
					'JavaScript Basics',
					'JavaScript Deeply',
					'The WordPress REST API',
				],
			},
			{
				school: 'Command Line Power User',
				degree: 'Online learning platform',
				field: 'Full Stack Web Development',
				duration: {
					from: new Date('2018'),
					to: new Date('2018'),
				},
				description: `A video series for web developers on learning a modern command line workflow with ZSH, Z and related tools.`,
				url: 'https://commandlinepoweruser.com/',
				courses: [
					'Introduction to Command Line Power User',
					'Command Line Basics',
					'Installing iTerm or Cygwin',
					'Installing ZSH0',
					'Custom Terminal Colours',
					'Custom ZSH Themes & Prompts',
					'Discovering ZSH Features',
					'Advanced History with ZSH',
					'Getting the most out of ZSH with Plugins',
					'Using z to jump to frecent folders',
					'Better deletion of files & folders with trash',
				],
			},
			{
				school: 'LinkedIn Learning',
				degree: 'Online learning platform',
				field: 'Project Management',
				duration: {
					from: new Date('2017'),
					to: new Date('2017'),
				},
				url: 'https://www.linkedin.com/learning/',
				courses: ['Project Management Foundations'],
			},
			{
				school: 'Treehouse',
				degree: 'Online learning platform',
				field: 'Front End Development, WordPress, SEO, Business',
				duration: {
					from: new Date('2013'),
					to: new Date('2016'),
				},
				description: `Learn from over 1000 videos created by expert teachers on web design, coding, business, and much more. Our library is continually refreshed with the latest on web technology so you'll never fall behind. Practice what you've learned through quizzes and interactive Code Challenges. This style of practicing will allow you to retain information you've learned so you can apply it to your own future projects.`,
				url: 'https://teamtreehouse.com/',
				courses: [
					'HTML',
					'HTML forms',
					'HTML email design',
					'CSS basics',
					'jQuery basics',
					'How to make a website',
					'WordPress Development',
					'PHP for WordPress',
					'Local WordPress development',
					'WordPress theme development',
					'SEO basics',
					'SEO for WordPress',
					'Introduction to front end performance optimization',
					'Hosting a website with GitHub pages',
					'How to freelance',
				],
			},
			{
				school: 'Delaware County Community College',
				degree: 'Associate of Fine Arts with High Honors',
				field: 'Graphic Design',
				duration: {
					from: new Date('2008'),
					to: new Date('2010'),
				},
				description: `The Associate of Fine Art degree program in graphic design teaches students how to develop design concepts and aesthetically arrange type and image in order to plan and produce intelligent visual communication solutions to client problems or self-authored work. Visual communication skills are developed within the constraints of time, budget, and technology. These solutions may include a variety of print based and digital media materials.`,
				url: 'https://www.dccc.edu/',
				courses: [
					'2D Design',
					'3D Design',
					'Color & Design',
					'Drawing I',
					'Drawing II',
					'History of Graphic Design',
					'Graphic Design I',
					'Graphic Design II',
					'Computer Illustration',
					'Digital Imaging',
					'Page Layout',
					'Portfolio Seminar',
				],
			},
		],
	}

	return resume
}
