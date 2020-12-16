// Environment variables and configuration
require('dotenv').config()
const config = require('config')

// Gulp
const { src, dest, series, parallel } = require('gulp')
const gulpif = require('gulp-if')
const merge = require('merge-stream')

// Utilities
const del = require('del')
const replace = require('gulp-replace')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const connect = require('gulp-connect')

// HTML
const Eleventy = require('@11ty/eleventy')
const ssg = new Eleventy()
const htmllint = require('gulp-htmllint')
const critical = require('critical')
const beautify = require('gulp-beautify')
const htmlmin = require('gulp-htmlmin')

// CSS
const gulpStylelint = require('gulp-stylelint')
const sass = require('gulp-sass')
sass.compiler = require('node-sass')
const postcss = require('gulp-postcss')
const purgecss = require('gulp-purgecss')

// JavaScript
const eslint = require('gulp-eslint')
const ava = require('gulp-ava')

/**
 * File paths.
 *
 * @since unreleased
 *
 * @type {Object}
 */
const paths = config.get('vendor.gulp.paths')
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
			.pipe(htmllint(config.get('vendor.htmllint'))),

		// Lint Sass.
	  src(paths.sass.lint.src)
			.pipe(gulpStylelint(config.get('vendor.stylelint')))
			.pipe(dest(paths.sass.lint.dest)),

		// @todo [#4]: Lint SVG.
		// - https://github.com/birjolaxew/svglint

		// Lint JavaScript config files.
		src(paths.javascript.config)
			.pipe(eslint(config.get('vendor.eslint')))
			.pipe(eslint.format())
			.pipe(eslint.failAfterError())
			.pipe(dest('./config/')),

		// Lint JavaScript source files.
		src(paths.javascript.src)
			.pipe(eslint(config.get('vendor.eslint')))
			.pipe(eslint.format())
			.pipe(eslint.failAfterError())
			.pipe(dest('./src/')),

		// Lint JavaScript root files.
		src(paths.javascript.root.all)
			.pipe(eslint(config.get('vendor.eslint')))
			.pipe(eslint.format())
			.pipe(eslint.failAfterError())
			.pipe(dest('./'))
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
		// Inline critical CSS.
		.pipe(critical.stream(config.get('vendor.critical')))
		// Beautify HTML.
		.pipe(beautify.html(config.get('vendor.beautify')))
		// @todo [#6]: Validate HTML after building.
		// - https://github.com/validator/gulp-html
		// - https://github.com/center-key/gulp-w3c-html-validator
		// Minify HTML in production.
		.pipe(
			gulpif(
				config.get('isProduction'),
				htmlmin(config.get('vendor.htmlmin'))
			)
		)
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
 * Handle CSS tasks.
 * Usage: `gulp css`
 *
 * @since unreleased
 *
 * @return {Object} Gulp stream
 */
function css () {
	return src(paths.sass.src)
		// Initialize sourcemaps.
		.pipe(sourcemaps.init())
		// Process Sass.
		.pipe(sass(config.get('vendor.node_sass')).on('error', sass.logError))
		// Post-process CSS.
		.pipe(postcss([
			require('postcss-import'), // Inline @import rules content
			require('precss'), // Use Sass-like markup and staged CSS features
			require('postcss-preset-env'), // Polyfill modern CSS
			require('pixrem')(), // Add fallbacks for rem units
			require('autoprefixer') // Add vendor prefixes
		]))
		// Purge unused CSS.
		.pipe(purgecss(config.get('vendor.purgecss')))
		// Beautify CSS.
		.pipe(beautify.css(config.get('vendor.beautify')))
		// @todo [#8]: Validate CSS.
		// - https://github.com/gchudnov/gulp-w3c-css
		// Minify CSS in production.
		.pipe(gulpif(
			config.get('isProduction'),
			postcss([
				require('cssnano')(config.get('vendor.cssnano'))
			])
		))
		.pipe(gulpif(
			config.get('isProduction'),
			rename(config.get('vendor.rename.min'))
		))
		// Rewrite directory path.
		.pipe(rename(config.get('vendor.rename.dest')))
		// Write sourcemaps.
		.pipe(sourcemaps.write('.'))
		.pipe(dest(paths.css.dest))
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
function javascript () {
	return src(paths.javascript.src)
		// Initialize sourcemaps.
		.pipe(sourcemaps.init())
		// @todo [#11]: Bundle JavaScript modules.
		// @todo [#12]: Transpile modern JavaScript.
		// @todo [#13]: Polyfill modern JavaScript.
		// Write sourcemaps.
		.pipe(sourcemaps.write('.'))
		.pipe(dest(paths.javascript.dest))
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
		.pipe(ava(config.get('vendor.ava')))
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
	clean,
	lint,
	css,
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
