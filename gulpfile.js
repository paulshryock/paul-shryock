const config = require('config')
const gulp = require('gulp')
const del = require('del')
const Eleventy = require('@11ty/eleventy')
const beautify = require('gulp-beautify')
const htmlmin = require('gulp-htmlmin')
const connect = require('gulp-connect')
const eslint = require('gulp-eslint')

const ssg = new Eleventy()
const isProduction = 'production' === config.get('build.environment')

/**
 * File paths.
 *
 * @type {Object}
 */
const paths = {
  src: './src/pshry.com',
  build: './build/pshry.com',
  get html () {
    return {
      written: `${this.build}/**/*.html`,
      postProcessed: this.build
    }
  },
  get javascript () {
    return {
      lint: [
        './.eleventy.js',
        './gulpfile.js',
        `${this.src}/assets/js/**/*.js`
      ],
      src: `${this.src}/assets/js/**/*.js`
    }
  }
}

/**
 * Cleans the build directory.
 *
 * @return {Promise}
 */
function clean () {
  return Promise.all([
    del([paths.build])
  ])
}

/**
 * Handle HTML tasks.
 *
 * @return {Object} Gulp stream
 */
async function html () {
  // Delete previously written HTML files
  del([paths.html.written])

  // Start SSG
  await ssg.init()

  // Write HTML files
  await ssg.write()

  // Post-process HTML
  const beautifyHtml = gulp.src(paths.html.written)
    .pipe(beautify.html(config.get('build.html.beautify')))
    .pipe(gulp.dest(paths.html.postProcessed))

  const minifyHtml = beautifyHtml
    .pipe(htmlmin(config.get('build.html.minify')))
    .pipe(gulp.dest(paths.html.postProcessed))

  return isProduction
    ? minifyHtml
    : beautifyHtml
      .pipe(connect.reload())
}

/**
 * Lint JavaScript.
 *
 * @return {Object} Gulp stream
 */
function lintJavaScript () {
  return gulp.src(paths.javascript.lint)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
}

/**
 * Cleans the build directory.
 * Usage: `gulp clean`
 *
 * @type {gulp.task}
 */
exports.clean = clean

/**
 * Handles HTML tasks.
 * Usage: `gulp html`
 *
 * @type {gulp.task}
 */
exports.html = html

/**
 * Handles Javascript tasks.
 * Usage: `gulp javascript`
 *
 * @type {gulp.task}
 */
exports.lintJavaScript = lintJavaScript

/**
 * Builds the site.
 * Usage: `gulp build`
 *
 * @type {gulp.series}
 */
exports.build = gulp.series(clean, html)

/**
 * Default Gulp task.
 * Usage: `gulp`
 *
 * @type {gulp.series}
 */
exports.default = exports.build
