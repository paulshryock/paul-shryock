import { access, copyFile, mkdir } from 'fs/promises'

/**
 * File paths.
 *
 * @since unreleased
 */
const paths: {[index: string]: any} = {
	src: 'src',
	dest: 'build',
	files: {
		src: {
			index: 'src/index.html',
			robots: 'src/robots.txt',
			sitemap: 'src/sitemap.xml',
		},
		dest: {
			index: 'build/index.html',
			robots: 'build/robots.txt',
			sitemap: 'build/sitemap.xml',
		},
	},
}

/**
 * Creates a directory.
 *
 * @since unreleased
 *
 * @param  {string} path Path.
 * @return {Promise<void>}
 */
async function createDirectory (path: string) {
	// If path is not a string, bail.
	if (typeof path !== 'string') {
		throw new Error(`${typeof path} passed to createDirectory`)
	}

	// If path is an empty string, bail.
	if (!path) {
		throw new Error('empty string passed to createDirectory')
	}

	// Access directory.
	try {
		await access(path)
	} catch (error) {
		// Create directory.
		await mkdir(path, { recursive: true })
		console.log(`${path} created`)
	}
}

/**
 * Builds the site.
 *
 * @since unreleased
 *
 * @return {Promise<void>}
 */
async function build () {
	// Create build directory.
	await createDirectory(paths.dest)

	// Copy files.
	try {
		const files = Object.keys(paths.files.src)
		await Promise.all(
			files.map(async file => {
				return copyFile(paths.files.src[file], paths.files.dest[file])
			}),
		)
		console.log(`copied ${files.length} files`)
	} catch (error) {
		// If there's a problem copying files, bail.
		throw new Error('could not copy files')
	}
}

// Build site.
await build()
