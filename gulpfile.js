// Environment variables and configuration
require('dotenv').config()
const config = require('config')

// Gulp
const { src, dest, series, parallel, watch } = require('gulp')
const gulpif = require('gulp-if')
const merge = require('merge-stream')
let isWatching = false

// Utilities
const del = require('del')
const replace = require('gulp-replace')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const connect = require('gulp-connect')
const fg = require('fast-glob')
const log = require('fancy-log')

// HTML
const Eleventy = require('@11ty/eleventy')
const htmllint = require('gulp-htmllint')
const critical = require('critical')
const beautify = require('gulp-beautify')
const beautifyConfig = config.get('vendor.beautify')
const htmlmin = require('gulp-htmlmin')
const validator = require('gulp-html')

// CSS
const gulpStylelint = require('gulp-stylelint')
const sass = require('gulp-sass')
sass.compiler = require('node-sass')
const postcss = require('gulp-postcss')
const purgecss = require('gulp-purgecss')

// JavaScript
const eslint = require('gulp-eslint')
const eslintConfig = config.get('vendor.eslint')
const ava = require('gulp-ava')
const esbuild = require('esbuild')
const babel = require('gulp-babel')

// SVG
const svgmin = require('gulp-svgmin')

// Images
const imagemin = require('gulp-imagemin')

/**
 * Set isWatching state.
 *
 * @since unreleased
 *
 * @param  {Function} callback Callback function.
 * @return {Object}            Gulp stream.
 */
function watching (callback) {
	isWatching = true

	return callback()
}

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
	return del([paths.dest])
}
exports.clean = clean

/**
 * Clean the temp directory.
 * Usage: `gulp finish`
 *
 * @since unreleased
 *
 * @return {Promise}
 */
function finish () {
	return del([paths.temp])
}
exports.finish = finish

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
			.pipe(eslint(eslintConfig))
			.pipe(eslint.format())
			.pipe(eslint.failAfterError())
			.pipe(dest('./config/')),

		// Lint JavaScript source files.
		src(paths.javascript.src)
			.pipe(eslint(eslintConfig))
			.pipe(eslint.format())
			.pipe(eslint.failAfterError())
			.pipe(dest('./src/')),

		// Lint JavaScript root files.
		src(paths.javascript.root.all)
			.pipe(eslint(eslintConfig))
			.pipe(eslint.format())
			.pipe(eslint.failAfterError())
			.pipe(dest('./'))
	)

	return merged.isEmpty() ? undefined : merged
}
exports.lint = lint

/**
 * Handle HTML tasks.
 * Usage: `gulp html`
 *
 * @since unreleased
 *
 * @param  {Function} callback Callback function.
 * @return {Object}            Gulp stream.
 */
async function html (callback) {
	try {
		// Generate a list of sites.
		const files = await fg([paths.markdown.src])
		const sites = [...new Set(
			files.map(site => {
				return site
					.replace('./src/', '')
					.replace(/\/.*/g, '')
			})
		)]

		// Generate HTML for all sites.
		sites.forEach(async site => {
			try {
				// Initialize static site generator.
				const ssg = new Eleventy()
				ssg.setConfigPathOverride(`./config/vendor/${site}/eleventy.js`)
				await ssg.init()

				// Write HTML files and maybe watch for changes.
				await isWatching ? ssg.watch() : ssg.write()
			}

			catch (error) {
				log.error(error)
			}
		})
	}

	catch (error) {
		log.error(error)
	}

	return callback()
}
exports.html = html

/**
 * Handle HTML post-processing tasks.
 * Usave: `gulp postHtml`
 *
 * @since unreleased
 *
 * @return {Object} Gulp stream
 */
function postHtml () {
	return src(paths.html.temp)
		// Inline critical CSS.
		.pipe(critical.stream(config.get('vendor.critical')))
		// Beautify HTML.
		.pipe(beautify.html(beautifyConfig))
		// Minify HTML in production.
		.pipe(
			gulpif(
				config.get('isProduction'),
				htmlmin(config.get('vendor.htmlmin'))
			)
		)
		.pipe(dest(paths.dest))
		.pipe(connect.reload())
}
exports.postHtml = postHtml

/**
 * Handle SVG tasks.
 * Usage: `gulp svg`
 *
 * @since unreleased
 *
 * @return {Object} Gulp stream.
 */
function svg () {
	return src(paths.svg.src)
		// Minify SVG in production; beautify in development.
		.pipe(svgmin({
			js2svg: {
				pretty: !config.get('isProduction')
			}
		}))
		// Rewrite directory path.
		.pipe(rename(path => {
			path.dirname = path.dirname
				.replace('/assets', '')
		}))
		// Rewrite file name in production.
		.pipe(gulpif(
			config.get('isProduction'),
			rename(path => {
				path.basename += '.min'
			})
		))
		.pipe(dest(paths.dest))
		.pipe(connect.reload())
}
exports.svg = svg

/**
 * Handle pass through tasks.
 * Usage: `gulp passThrough`
 *
 * @since unreleased
 *
 * @return {Object} Gulp stream.
 */
function passThrough () {
	const merged = merge(
		// XML files.
		src(paths.xml.temp)
			.pipe(dest(paths.dest))
			.pipe(connect.reload()),

		// Web manifest.
		src(paths.webManifest.temp)
			.pipe(dest(paths.dest))
			.pipe(connect.reload()),

		// Favicons.
		src(paths.favicon.src)
			.pipe(rename(path => {
				path.dirname = path.dirname
					.replace('/assets/img/favicon', '')
			}))
			.pipe(dest(paths.dest))
			.pipe(connect.reload())
	)

	return merged.isEmpty() ? undefined : merged
}
exports.passThrough = passThrough

/**
 * Handle image tasks.
 * Usage: `gulp images`
 *
 * @since unreleased
 *
 * @return {Object} Gulp stream.
 */
function images () {
	return src(paths.images.src)
		.pipe(imagemin())
		.pipe(rename(path => {
			path.dirname = path.dirname
				.replace('/assets', '')
		}))
		.pipe(dest(paths.dest))
		.pipe(dest(paths.dest))
		.pipe(connect.reload())
}
exports.images = images

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
		.pipe(beautify.css(beautifyConfig))
		// Minify CSS in production.
		.pipe(gulpif(
			config.get('isProduction'),
			postcss([
				require('cssnano')(config.get('vendor.cssnano'))
			])
		))
		// Rewrite file name in production.
		.pipe(gulpif(
			config.get('isProduction'),
			rename(path => {
				path.basename += '.min'
			})
		))
		// Rewrite directory path.
		.pipe(rename(path => {
			path.dirname = path.dirname
				.replace('/assets', '')
				.replace('/sass', '/css')
		}))
		// Write sourcemaps.
		.pipe(sourcemaps.write('.'))
		.pipe(dest(paths.dest))
		.pipe(dest(paths.temp))
		.pipe(connect.reload())
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
async function javascript () {
	try {
		// Bundle JavaScript modules.
		const entries = await fg([paths.javascript.entry])
		entries.forEach(entry => {
			esbuild.buildSync({
				bundle: true,
				color: true,
				entryPoints: [entry],
				format: 'iife',
				get metafile () {
					return config.get('isProduction')
						? ''
						: this.outfile
							.replace('.js', '.log.json')
				},
				// Minify JavaScript in production.
				minify: config.get('isProduction'),
				outfile: entry
					.replace('src/', 'build/')
					.replace('assets/', '')
					.replace(
						/(\.min)?\.js/g,
						config.get('isProduction') ? '.min.js' : '.js'
					),
				// Write sourcemaps.
				sourcemap: true,
				// Transpile modern JavaScript to ES2015.
				target: 'es2015'
			})
		})
	}

	catch (error) {
		log.error(error)
	}

	// Process JavaScript bundles.
	return src(paths.javascript.written)
		.pipe(sourcemaps.init())
		// Polyfill and transpile modern JavaScript to ES5.
		.pipe(babel(config.get('vendor.babel')))
		// Rename legacy file.
		.pipe(rename(path => {
			path.basename += '.legacy'
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(dest(paths.dest))
		.pipe(connect.reload())
}
exports.javascript = javascript

/**
 * Handle validation tasks.
 * Usage: `gulp validate`
 *
 * @since unreleased
 *
 * @return {Object} Gulp stream
 */
function validate () {
	const merged = merge(
		// Validate HTML.
		src(paths.html.temp)
			.pipe(validator())
			.pipe(dest(paths.dest)),

		// Validate CSS.
		src(paths.css.written)
			.pipe(require('gulp-w3c-css')())
			// Beautify
			.pipe(beautify.js(beautifyConfig))
			// Write to JSON log file.
			.pipe(rename(path => {
				path.basename += '.log'
				path.extname = '.json'
			}))
			.pipe(dest(paths.dest))
	)

	return merged.isEmpty() ? undefined : merged
}
exports.validate = validate

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
	parallel(lint, clean),
	parallel(
		series(
			parallel(html, css),
			validate,
			postHtml,
			passThrough
		),
		svg,
		images,
		javascript
	)
)
exports.build = series(build, finish)

/**
 * Handle serve tasks.
 * Usage: `gulp serve`
 *
 * @since unreleased
 *
 * @param  {Function} callback Callback function.
 * @return {Object}            Gulp stream.
 */
async function serve (callback) {
	// Watch written files and re-run tasks.
	watch(paths.sass.src, css)
	watch([paths.html.temp, paths.css.written], postHtml)
	watch(paths.svg.src, svg)
	watch(paths.images.src, images)
	watch(paths.javascript.src, javascript)
	watch([paths.xml.temp, paths.favicon.src], passThrough)

	try {
		// Generate a list of sites.
		const files = await fg([paths.html.written])
		const sites = [...new Set(
			files
				.filter(site => !site.includes('temp/'))
				.map(site => {
					return site
						.replace('./build/', '')
						.replace(/\/.*/g, '')
				})
		)]

		// Serve each site to a unique port.
		sites.forEach((site, index) => {
			connect.server({
				livereload: true,
				port: 8000 + index,
				root: `${paths.dest}/${site}`
			})
		})
	}

	catch (error) {
		log.error(error)
	}

	return callback()
}
exports.serve = series(watching, build, serve)

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
				/### \(Added|Changed|Deprecated|Removed|Fixed|Security\)\\n\\n/g,
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
				/\/compare\/HEAD..\(HEAD\|\\d*\.\\d*\.\\d*\)/g,
				`/compare/HEAD..${version}\n[${version}]: ${url}/commits/${version}`))
			.pipe(dest('./'))
	)

	return merged.isEmpty() ? undefined : merged
}
exports.version = version
