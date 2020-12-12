const dotenv = require('dotenv').config()
if (dotenv.error) throw dotenv.error
const config = require('config')
const { src, dest, series, parallel } = require('gulp')
const gulpif = require('gulp-if')
const merge = require('merge-stream')
const del = require('del')
const Eleventy = require('@11ty/eleventy')
const ssg = new Eleventy()
const htmllint = require('gulp-htmllint')
const beautify = require('gulp-beautify')
const htmlmin = require('gulp-htmlmin')
const connect = require('gulp-connect')
const eslint = require('gulp-eslint')
const replace = require('gulp-replace')
const ava = require('gulp-ava')

/**
 * File paths.
 *
 * @since unreleased
 *
 * @type {Object}
 */
const paths = {
	changelog: './CHANGELOG.md',
	html: {
		src: './src/**/*.html',
		get lint () {
			return [
				this.src,
				this.written
			]
		},
		written: './build/**/*.html',
		dest: './build'
	},
	svg: {
		src: './src/**/*.svg',
	},
	sass: {
		src: './src/**/*.scss',
	},
	css: {
		src: './src/**/*.css',
	},
	javascript: {
		config: './config/*.js',
		src: './src/**/*.js',
		root: {
			files: './*.js',
			dotfiles: './.*.js',
			get all () {
				return [
					this.files,
					this.dotfiles
				]
			}
		},
		get lint () {
			return [
				this.config,
				this.src,
				this.root.files
			]
		},
		test: [
			'./*.test.js',
			'./.*.test.js',
			'./config/**/*.test.js',
			'./src/**/*.test.js',
		]
	}
}
exports.paths = paths

/**
 * Clean the build directory.
 * Usage: `gulp clean`
 *
 * @since unreleased
 *
 * @return {Promise}
 */
function clean () {
	return del([paths.html.dest])
}
exports.clean = clean

/**
 * Handle linting tasks.
 * Usage: `gulp lint`
 *
 * @since unreleased
 *
 * @return {Object} Gulp stream
 */
function lint () {
	const merged = merge(
		// Lint HTML.
		src(paths.html.lint)
			.pipe(htmllint(config.get('html.htmllint'))),

		// @todo [#7]: Lint Sass.
		// - https://github.com/sasstools/gulp-sass-lint/
		// - https://github.com/juanfran/gulp-scss-lint
		// @todo [#4]: Lint SVG.
		// - https://github.com/birjolaxew/svglint

		// Lint JavaScript.
		src(paths.javascript.lint)
			.pipe(eslint(config.get('javascript.eslint')))
			.pipe(eslint.format())
			.pipe(eslint.failAfterError())
	)

	return merged.isEmpty() ? null : merged
}
exports.lint = lint

/**
 * Handle HTML tasks.
 * Usage: `gulp html`
 *
 * @since unreleased
 *
 * @return {Object} Gulp stream
 */
async function html () {
	// Delete previously written HTML files.
	del([paths.html.written])

	// Start SSG.
	await ssg.init()

	// Write HTML files.
	await ssg.write()

	// Post-process HTML.
	return src(paths.html.written)
		// @todo [#6]: Validate HTML after building.
		// - https://github.com/validator/gulp-html
		// - https://github.com/center-key/gulp-w3c-html-validator
		// @todo [#5]: Inline critical CSS.
		// Beautify HTML.
		.pipe(beautify.html(config.get('html.beautify')))
		// Minify HTML in production.
		.pipe(gulpif(config.get('isProduction'), htmlmin(config.get('html.htmlmin'))))
		.pipe(dest(paths.html.dest))
		.pipe(connect.reload())
}
exports.html = html

/**
 * Handle SVG tasks.
 * Usage: `gulp svg`
 *
 * @since unreleased
 *
 * @return {Object} Gulp stream
 */
function svg (cb) {
	console.log('@todo [#9]: Optimize SVG.')
	console.log('@todo [#10]: Minify SVG.')
	return cb()
}
exports.svg = svg

/**
 * Handle Sass tasks.
 * Usage: `gulp sass`
 *
 * @since unreleased
 *
 * @return {Object} Gulp stream
 */
function sass (cb) {
	console.log('@todo [#7]: Lint Sass.')
	console.log('@todo: Process Sass.')
	return cb()
}
exports.sass = sass

/**
 * Handle CSS tasks.
 * Usage: `gulp css`
 *
 * @since unreleased
 *
 * @return {Object} Gulp stream
 */
function css (cb) {
	console.log('@todo: Post-process CSS.')
	console.log('@todo [#3]: Lint CSS.')
	console.log('@todo: Beautify CSS.')
	console.log('@todo [#8]: Validate CSS.')
	// - https://github.com/gchudnov/gulp-w3c-css
	return cb()
}
exports.css = css

/**
 * Handle JavaScript tasks.
 * Usage: `gulp javascript`
 *
 * @since unreleased
 *
 * @return {Object} Gulp stream
 */
function javascript (cb) {
	console.log('@todo [#11]: Bundle JavaScript modules.')
	console.log('@todo [#12]: Transpile modern JavaScript.')
	console.log('@todo [#13]: Polyfill modern JavaScript.')
	return cb()
}
exports.javascript = javascript

/**
 * Handle testing tasks.
 * Usage: `gulp test`
 *
 * @since unreleased
 *
 * @return {Object} Gulp stream
 */
function test () {
	// Test JavaScript.
	return src(paths.javascript.test)
		.pipe(ava(config.get('javascript.ava')))
}
exports.test = test

/**
 * Handle build tasks.
 * Usage: `gulp build`
 *
 * @since unreleased
 *
 * @type {Object} Gulp series
 */
const build = series(
	parallel(clean, lint),
	html
)
exports.build = build

/**
 * Handle version tasks.
 * Usage: `gulp version`
 *
 * @since unreleased
 *
 * @return {Object} Gulp stream
 */
function version () {
	const { version, repository } = require('./package.json')
	const url = repository.url.replace('git+', '').replace('.git', '')
	const [month, date, year] = new Date().toLocaleDateString('en-US').split('/')
	const today = `${month}/${date}/${year}`

	/**
	 * Bump docblock version.
	 *
	 * @since unreleased
	 *
	 * @return {string} Bumped docblock version.
	 */
	function bumpDocblock () {
		return replace(/(?<!\))@since unreleased/g, `@since ${version}`)
	}

	const merged = merge(
		// Config files.
		src(paths.javascript.config)
			.pipe(bumpDocblock())
			.pipe(dest('./config/')),

		// Source files.
		src(paths.javascript.src)
			.pipe(bumpDocblock())
			.pipe(dest('./src/')),

		// Root files.
		src(paths.javascript.root.all)
			.pipe(bumpDocblock())
			.pipe(dest('./')),

		// Changelog.
		src(paths.changelog)
			// Bump unreleased version.
			.pipe(replace('## [Unreleased]', `## [${version}] - ${today}`))
			// Remove empty changelog subheads.
			.pipe(replace(
				new RegExp(
					'### \(Added|Changed|Deprecated|Removed|Fixed|Security\)\\n\\n',
					'g'
				),
				''
			))
			// Add default unreleased section.
			.pipe(replace(
				`## [${version}] - ${today}`,
				'## [Unreleased]\n\n' +
					'### Added\n\n' +
					'### Changed\n\n' +
					'### Deprecated\n\n' +
					'### Removed\n\n' +
					'### Fixed\n\n' +
					'### Security\n\n' +
					`## [${version}] - ${today}`
			))
			// Bump unreleased link and add new release link.
			.pipe(replace(
				new RegExp('/compare/HEAD..\(HEAD\|\\d*\.\\d*\.\\d*\)', 'g'),
				`/compare/HEAD..${version}\n[${version}]: ${url}/commits/${version}`)
			)
			.pipe(dest('./'))
	)

	return merged.isEmpty() ? null : merged
}
exports.version = version
