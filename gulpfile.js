const config = require('config')
const { src, dest, series, parallel } = require('gulp')
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
  return src(paths.javascript.lint)
    .pipe(eslint(config.get('javascript.eslint')))
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
  const beautifyHtml = src(paths.html.written)
    .pipe(beautify.html(config.get('build.html.beautify')))
    .pipe(dest(paths.build))

  const minifyHtml = beautifyHtml
    .pipe(htmlmin(config.get('build.html.htmlmin')))
    .pipe(dest(paths.build))

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
        new RegExp('### \(Added|Changed|Deprecated|Removed|Fixed|Security\)\\n\\n', 'g'),
        ''
      ))
      // Bump unreleased link and add new release link.
      .pipe(replace(
        new RegExp('/compare/HEAD..\(HEAD\|\\d*\.\\d*\.\\d*\)', 'g'),
        `/compare/HEAD..${version}\n[${version}]: ${url}/commits/${version}`)
      )
      // Add default unreleased section.
      .pipe(replace(
        '[Semantic Versioning](semver).',
        '[Semantic Versioning](semver).\n\n' +
          '## [Unreleased]\n\n' +
          '### Added\n\n' +
          '### Changed\n\n' +
          '### Deprecated\n\n' +
          '### Removed\n\n' +
          '### Fixed\n\n' +
          '### Security'
      ))
      .pipe(dest('./'))
  )

  return merged.isEmpty() ? null : merged
}

/**
 * Builds the site.
 * Usage: `gulp build`
 *
 * @since unreleased
 *
 * @type {Object} Gulp series
 */
exports.build = series(parallel(exports.clean, exports.lint), exports.html)
