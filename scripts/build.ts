import { access, copyFile, mkdir } from 'fs/promises'

/**
 * File paths.
 *
 * @since unreleased
 *
 * @const {[index: string]: any}
 */
const paths: {[index: string]: any} = {
	src: 'src',
	dest: 'build',
	files: [
		'index.html',
		'robots.txt',
		'sitemap.xml',
	],
}

/**
 * Initializes the build.
 *
 * @since unreleased
 */
function init () {
	// Build site.
	build(paths)
}

/**
 * Checks if a directory exists, and if not, creates it.
 *
 * @since unreleased
 *
 * @param  {string}           path Path.
 * @return {Promise<boolean>}      Whether or not the directory exists.
 */
async function createDirectory (path: string): Promise<boolean> {
	// If path is an empty string, bail.
	if (!path.length) return false

	// Access directory.
	try {
		await access(path)
	} catch (error) {
		// Create directory.
		try {
			await mkdir(path, { recursive: true })
		} catch (error) {
			return false
		}
	}
	return true
}

/**
 * Copies files from one directory to another.
 *
 * @since  unreleased
 *
 * @param  {string}           from  Directory to copy from.
 * @param  {string}           to    Directory to copy to.
 * @param  {string[]}         files Files to copy.
 * @return {Promise<boolean>}       Whether or not the files were copied.
 */
async function copyFiles (
	from: string, to: string, files: string[],
): Promise<boolean> {
	try {
		await Promise.all(files.map(async file => {
			return copyFile(`${from}/${file}`, `${to}/${file}`)
		}))
	} catch (error) {
		return false
	}
	return true
}

/**
 * Builds the site.
 *
 * @since unreleased
 *
 * @return {Promise<void>}
 */

/**
 * Builds the site.
 *
 * @since  unreleased
 *
 * @param  {{[index: string]: any}} paths File paths.
 * @return {Promise<void>}
 */
async function build (paths: {[index: string]: any}): Promise<void> {
	// Create build directory.
	const hasDest: boolean = await createDirectory(paths.dest)
	if (!hasDest) throw new Error(`could not write to ${paths.dest}`)

	// Copy files.
	const copied: boolean = await copyFiles(paths.src, paths.dest, paths.files)
	if (!copied) throw new Error(`could not copy ${paths.files.length} files`)
}

// Initialize the build.
init()
