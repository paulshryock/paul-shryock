# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/paulshryock/paul-shryock/compare/HEAD..0.1.1)

### Added

### Changed

### Deprecated

### Removed

### Fixed

### Security

## [0.1.1](https://github.com/paulshryock/paul-shryock/releases/tags/v0.1.1) - 2/19/2021

### Fixed
- Fix automatically rebasing release pull requests. [#115]

## [0.1.0](https://github.com/paulshryock/paul-shryock/releases/tags/v0.1.0) - 2/19/2021

### Added
- Cache CI npm dependencies. [#103]
- Commit `package-lock.json`. [#103]
- Automatically rebase release pull requests. [#115]
- Ensure releases begin on `develop` branch.

## [0.0.4](https://github.com/paulshryock/paul-shryock/releases/tags/v0.0.4) - 2/18/2021

### Added
- Automate GitHub releases. [#50]

## [0.0.3](https://github.com/paulshryock/paul-shryock/releases/tags/v0.0.3) - 2/18/2021

### Added
- Add aria roles to header and footer.
- Add engineering and release workflows to Readme.

### Fixed
- Move monogram letter to data attribute.

## [0.0.2](https://github.com/paulshryock/paul-shryock/releases/tags/v0.0.2) - 2/18/2021

### Added
- Add `.npmrc`.
- Only allow approved HTTP methods [#69]
- Add font utilities.

### Fixed
- Replace flexbox gap with margin. [#91]

### Security
- Update dependencies.

## [0.0.1](https://github.com/paulshryock/paul-shryock/releases/tags/v0.0.1) - 2/4/2021

### Added
- Add repository files.
- Add dependencies.
- Configure Gulp and Eleventy.
- Add legacy content.
- Add pshry.com content, data, and layouts.
- Add background-agnostic logo. [#1]
- Lint HTML. [#2]
- Lint Sass. [#7]/[#3]
- Lint JavaScript.
- Sanitize CSS. [#32]
- Implement ITCSS [#55]
- Process Sass. [#20]
- Post-process CSS. [#23]
- Purge unused CSS. [#29]
- Beautify CSS.
- Minify CSS in production. [#26]
- Preserve CSS sourcemaps.
- Validate CSS. [#8]
- Add HTML head elements. [#60]
- Build HTML.
- Set incremental build in development.
- Beautify HTML.
- Minify HTML in production.
- Inline critical CSS. [#5]
- Validate HTML. [#6]
- Add favicons. [#42]
- Optimize SVG. [#9]
- Minify SVG in production. [#10]
- Add webfonts with fallbacks on slower connections or reduced data. [#48]
- Bundle JavaScript modules. [#11]
- Transpile modern JavaScript for browsers supporting ES modules. [#12]
- Polyfill modern JavaScript to ES5. [#13]
- Preserve JavaScript sourcemaps.
- Add JavaScript testing. [#15]
- Add local development server. [#46]/[#47]
- Serve unbundled JS in development. [#72]
- Bump docblock and Changelog versions during new version.
- Setup CI/CD. [#38]
- Add Content Security Policy headers. [#65]
