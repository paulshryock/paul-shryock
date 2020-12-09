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
  changelog: './CHANGELOG.md',
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
  const { version, repository } = require('./package.json')
  const url = repository.url
    .replace('git+', '')
    .replace('.git', '')
  const [month, date, year] = new Date().toLocaleDateString('en-US').split('/')
  const today = `${month}/${date}/${year}`

  /**
   * Bump docblock version.
   *
   * @since unreleased
   * @todo  Abstract some of the changelog strings
   *
   * @return {function} [description]
   */
  function bumpDocblock () {
    return replace(/(?<!\))@since unreleased/g, `@since ${version}`)
  }

  const merged = merge(
    // Config files.
    gulp.src(paths.javascript.config)
      .pipe(bumpDocblock())
      .pipe(gulp.dest('./config/')),

    // Source files.
    gulp.src(paths.javascript.src)
      .pipe(bumpDocblock())
      .pipe(gulp.dest('./src/')),

    // Root files.
    gulp.src(paths.javascript.root.all)
      .pipe(bumpDocblock())
      .pipe(gulp.dest('./')),

    // Changelog.
    gulp.src(paths.changelog)
      // Bump unreleased version.
      .pipe(replace('## [Unreleased]', `## [${version}] - ${today}`))
      // Remove empty release changelog subheads.
      .pipe(replace(
        new RegExp('### \(Added|Changed|Deprecated|Removed|Fixed|Security\)\\n\\n', 'g'),
        ''
      ))
      // Bump unreleased link and add new release link.
      .pipe(replace(
        new RegExp('/compare/HEAD..\(HEAD\|\\d*\.\\d*\.\\d*\)', 'g'),
        `/compare/HEAD..${version}
[${version}]: ${url}/commits/${version}`)
      )
      // Add default unreleased section.
      .pipe(replace(
        'and this project adheres to [Semantic Versioning](semver).',
        `and this project adheres to [Semantic Versioning](semver).

## [Unreleased]

### Added

### Changed

### Deprecated

### Removed

### Fixed

### Security`
      ))
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
