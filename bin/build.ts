import Eleventy from '@11ty/eleventy'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { $ } from 'zx'
import pkg from '../package.json'

const { BUILD_ENV } = process.env
const { version } = pkg
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const paths = {
	dist: 'dist',
	js: {
		src: join(__dirname, '../src/assets/ts/main.ts'),
		dist: join(__dirname, '../dist/js/main.js'),
		legacy: join(__dirname, '../dist/js/main-legacy.js'),
	},
}

/**
 * Cleans a directory.
 *
 * @since unreleased
 *
 * @param  {string}        path Path to directory.
 * @return {Promise<void>}
 */
async function clean(path: string): Promise<void> {
	$`rm -rf ${path}`
}

/**
 * Initializes build.
 *
 * @since  unreleased
 * @return {Promise<void>}
 */
async function build(): Promise<void> {
	try {
		// Clean dist directory.
		await clean(paths.dist)

		// Compile assets.
		await Promise.all([html(), javascript()])
	} catch (error) {
		console.error(error)
	}
}

/**
 * Compiles HTML.
 *
 * @since unreleased
 */
async function html() {
	const eleventy = new Eleventy('src', 'dist', {
		quietMode: true,

		config: () => {
			return {
				dir: {
					data: 'data',
					includes: 'includes',
					input: 'src',
					layouts: 'layouts',
					output: 'dist',
				},
			}
		},
	})

	return eleventy
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
	await $`swc ${paths.js.dist} -o ${paths.js.legacy} --source-maps --quiet`
}

// Initialize build.
build()
