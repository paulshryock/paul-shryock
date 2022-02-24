import { paths } from '../config/paths.js'
import pkg from '../package.json'
import { $ } from 'zx'

const { BUILD_ENV, BUILD_ONLY, BUILD_SERVE, BUILD_WATCH } = process.env
const { version } = pkg

const serve = BUILD_SERVE === 'true'
const watch = BUILD_WATCH === 'true'

/**
 * Compiles HTML.
 *
 * @since  unreleased
 * @return {Promise<void>}
 */
async function html(): Promise<void> {
	serve
		? await $`eleventy --config=${paths.config.eleventy} --incremental --serve`
		: watch
		? await $`eleventy --config=${paths.config.eleventy} --incremental --watch`
		: await $`eleventy --config=${paths.config.eleventy}`
}

/**
 * Compiles CSS.
 *
 * @since  unreleased
 * @return {Promise<void>}
 */
async function css(): Promise<void> {
	serve || watch
		? await $`sass src/scss:dist/css --watch`
		: await $`sass src/scss:dist/css`
}

/**
 * Compiles JavaScript.
 *
 * @since  unreleased
 * @return {Promise<void>}
 */
async function javascript(): Promise<void> {
	// Get environment variables and pass to client-side bundle.
	const proc = JSON.stringify({
		env: {
			BUILD_ENV,
			BUILD_VERSION: version,
		},
	})

	// Bundle JavaScript modules.
	serve || watch
		? await $`esbuild ${paths.js.src} --bundle --define:process=${proc} --format=iife --minify --outfile=${paths.js.dist} --sourcemap --platform=browser --target=es2015 --watch`
		: await $`esbuild ${paths.js.src} --bundle --define:process=${proc} --format=iife --minify --outfile=${paths.js.dist} --sourcemap --platform=browser --target=es2015`

	// Transpile JavaScript bundles for legacy browsers.
	serve || watch
		? await $`swc ${paths.js.dist} --config-file config/.swcrc -o ${paths.js.legacy} --quiet --source-maps --watch`
		: await $`swc ${paths.js.dist} --config-file config/.swcrc -o ${paths.js.legacy} --quiet --source-maps`
}

/**
 * Compiles images.
 *
 * @since  unreleased
 * @return {Promise<void>}
 */
async function images(): Promise<void> {
	await $`mkdir -p ./dist/img`
	await $`cp -R ./src/img ./dist`
}

/**
 * Initializes build.
 *
 * @since  unreleased
 * @return {Promise<void>}
 */
async function build(): Promise<void> {
	try {
		// Compile assets.
		await Promise.all([html(), css(), javascript(), images()])
	} catch (error) {
		console.error(error)
	}
}

// Initialize build.
switch (BUILD_ONLY) {
	case 'html':
		html()
		break
	case 'css':
		css()
		break
	case 'javascript':
		javascript()
		break
	case 'images':
		images()
		break
	default:
		build()
		break
}
