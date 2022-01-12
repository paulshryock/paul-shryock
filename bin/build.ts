import { readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { $ } from 'zx'
import pkg from '../package.json'

const { BUILD_ENV, BUILD_ONLY, BUILD_SERVE, BUILD_WATCH } = process.env
const { version } = pkg
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const paths = {
	dist: 'dist',
	config: {
		eleventy: 'config/eleventy.config.cjs',
	},
	js: {
		src: join(__dirname, '../src/assets/ts/main.ts'),
		dist: join(__dirname, '../dist/js/main.js'),
		legacy: join(__dirname, '../dist/js/main-legacy.js'),
	},
	healthCheck: './dist/health-check/index.html',
}

const serve = BUILD_SERVE === 'true'
const watch = BUILD_WATCH === 'true'

/**
 * Initializes build.
 *
 * @since  unreleased
 * @return {Promise<void>}
 */
async function build(): Promise<void> {
	try {
		// Compile assets.
		await Promise.all([css(), html(), images(), javascript()])

		await healthCheck()
	} catch (error) {
		console.error(error)
	}
}

async function healthCheck() {
	const content = await readFile(paths.healthCheck, { encoding: 'utf8' })
	if (content === 'success') return

	throw new Error('health check failed')
}

/**
 * Compiles HTML.
 *
 * @since  unreleased
 * @return {Promise<void>}
 */
async function html(): Promise<void> {
	serve
		? await $`eleventy --config=${paths.config.eleventy} --serve`
		: watch
			? await $`eleventy --config=${paths.config.eleventy} --watch`
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
		? await $`sass src/assets/scss:dist/css --watch`
		: await $`sass src/assets/scss:dist/css`
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
	// eslint-disable-next-line max-len
	await $`esbuild ${paths.js.src} --bundle --define:process=${proc} --format=iife --minify --outfile=${paths.js.dist} --sourcemap --platform=browser --target=es2015`

	// Transpile JavaScript bundles for legacy browsers.
	await $`swc ${paths.js.dist} --config-file config/swc.config.json -o ${paths.js.legacy} --quiet --source-maps`
}

/**
 * Compiles images.
 *
 * @since  unreleased
 * @return {Promise<void>}
 */
async function images(): Promise<void> {
	await $`mkdir -p ./dist/img`
	await $`cp -R ./src/assets/img ./dist`
}

// Initialize build.
switch (BUILD_ONLY) {
	case 'css':
		css()
		break
	case 'html':
		html()
		break
	case 'javascript':
		javascript()
		break
	default:
		build()
		break
}
