import { access, copyFile, mkdir } from 'fs/promises'

/**
 * File paths.
 *
 * @since unreleased
 *
 * @const {[index: string]: any}
 */
const paths: { src: string; dest: string; files: string[] } = {
	src: 'src',
	dest: 'dist',
	files: ['index.html', 'robots.txt', 'sitemap.xml'],
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
	from: string,
	to: string,
	files: string[],
): Promise<boolean> {
	try {
		await Promise.all(
			files.map(async (file) => {
				return copyFile(`${from}/${file}`, `${to}/${file}`)
			}),
		)
	} catch (error) {
		return false
	}
	return true
}

/**
 * Builds the site.
 *
 * @since  unreleased
 *
 * @param  {object}        paths File paths.
 * @return {Promise<void>}
 */
async function build ({
	src,
	dest,
	files,
}: {
	src: string;
	dest: string;
	files: string[];
}): Promise<void> {
	// Create build directory.
	const hasDest: boolean = await createDirectory(dest)
	if (!hasDest) throw new Error(`could not write to ${dest}`)

	// Copy files.
	const copied: boolean = await copyFiles(src, dest, files)
	if (!copied) throw new Error(`could not copy ${files.length} files`)
}

// Initialize the build.
init()
