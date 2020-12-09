const config = require('config')
const gulp = require('gulp')
const merge = require('merge-stream')
const del = require('del')
const Eleventy = require('@11ty/eleventy')
const ssg = new Eleventy()
const beautify = require('gulp-beautify')
const htmlmin = require('gulp-htmlmin')
const connect = require('gulp-connect')
const eslint = require('gulp-eslint')
const replace = require('gulp-replace')

/**
 * Returns true if `BUILD_ENV` is set to 'production'.
 *
 * @since unreleased
 *
 * @type {Boolean}
 */
const isProduction = config.get('build.environment') === 'production'

/**
 * File paths.
 *
 * @since unreleased
 *
 * @type {Object}
 */
const paths = {
  src: './src/pshry.com',
  build: './build/pshry.com',
  get html () {
    return {
      written: `${this.build}/**/*.html`
    }
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
    }
  }
}

/**
 * Cleans the build directory.
 * Usage: `gulp clean`
 *
 * @since unreleased
 *
 * @return {Promise}
 */
exports.clean = function clean () {
  return Promise.all([
    del([paths.build])
  ])
}

/**
 * Handle linting tasks.
 * Usage: `gulp lint`
 *
 * @since unreleased
 *
 * @return {Object} Gulp stream
 */
exports.lint = function lint () {
  return gulp.src(paths.javascript.lint)
    .pipe(eslint(config.get('lint.javascript')))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
}

/**
 * Handle HTML tasks.
 * Usage: `gulp html`
 *
 * @since unreleased
 *
 * @return {Object} Gulp stream
 */
exports.html = async function html () {
  // Delete previously written HTML files
  del([paths.html.written])  

  // Start SSG
  await ssg.init()

  // Write HTML files
  await ssg.write()

  // Post-process HTML
  const beautifyHtml = gulp.src(paths.html.written)
    .pipe(beautify.html(config.get('build.html.beautify')))
    .pipe(gulp.dest(paths.build))

  const minifyHtml = beautifyHtml
    .pipe(htmlmin(config.get('build.html.minify')))
    .pipe(gulp.dest(paths.build))

  return isProduction
    ? minifyHtml
    : beautifyHtml
      .pipe(connect.reload())
}

/**
 * Handle version tasks.
 * Usage: `gulp version`
 *
 * @since unreleased
 *
 * @return {Object} Gulp stream
 */
exports.version = function version () {
  const { version } = require('./package.json')

  const merged = merge(
    // Config files.
    gulp.src(paths.javascript.config)
      .pipe(replace(/(?<!\))@since unreleased/g, `@since ${version}`))
      .pipe(gulp.dest('./config/')),

    // Source files.
    gulp.src(paths.javascript.src)
      .pipe(replace(/(?<!\))@since unreleased/g, `@since ${version}`))
      .pipe(gulp.dest('./src/')),

    // Root files.
    gulp.src(paths.javascript.root.all)
      .pipe(replace(/(?<!\))@since unreleased/g, `@since ${version}`))
      .pipe(gulp.dest('./'))
  )

  return merged.isEmpty() ? null : merged
}

/**
 * Builds the site.
 * Usage: `gulp build`
 *
 * @since unreleased
 *
 * @type {gulp.series}
 */
exports.build = gulp.series(exports.clean, exports.lint, exports.html)
