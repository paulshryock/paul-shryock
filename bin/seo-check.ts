import { resolve } from 'path'
import { readdir, readFile } from 'fs/promises'
import { parse } from 'node-html-parser'

/**
 * Gets absolute file paths.
 *
 * @since  unreleased
 * @param  {string}           directory Relative directory path.
 * @return {Promise<unknown>}           Absolute file paths.
 */
async function getAbsoluteFilePaths(directory: string): Promise<unknown> {
	const dirents = await readdir(directory, { withFileTypes: true })

	const files = await Promise.all(
		dirents.map((dirent) => {
			const res = resolve(directory, dirent.name)
			return dirent.isDirectory() ? getAbsoluteFilePaths(res) : res
		}),
	)

	return Array.prototype
		.concat(...files)
		.filter((file) => file.includes('.html'))
}

/**
 * Gets all absolute paths of HTML files except for health check endpoint.
 *
 * @since  unreleased
 * @param  {string}            directory Relative directory path.
 * @return {Promise<string[]>}           Absolute file paths.
 */
async function getHtmlFilePaths(directory: string): Promise<string[]> {
	const dirents = await readdir(directory, { withFileTypes: true })

	const files = await Promise.all(
		dirents.map((dirent) => {
			const res = resolve(directory, dirent.name)
			return dirent.isDirectory() ? getAbsoluteFilePaths(res) : res
		}),
	)

	return Array.prototype
		.concat(...files)
		.filter((file) => file.match(/(?<!health-check\/index)\.html$/))
}

/**
 * Runs SEO check.
 *
 * Makes sure page titles and descriptions are the correct length and not
 * truncated.
 *
 * @since unreleased
 */
async function seoCheck() {
	const files = await getHtmlFilePaths('./dist')
	await Promise.all([
		...files
			.map(async (file: string) => {
				const content = parse(await readFile(file, 'utf8'))
				const title = content.querySelector('title')?.textContent ?? ''
				const description = content
					.querySelector('meta[name="description"]')
					?.getAttribute('content') ?? ''

				const metas = [
					{
						name: 'title',
						content: title,
						lengths: {
							min: 30,
							max: 60,
						},
					},
					{
						name: 'description',
						content: description,
						lengths: {
							min: 120,
							max: 160,
						},
					},
				]

				metas.forEach((meta) => {
					if (meta.content?.length > meta.lengths.max) {
						throw new Error(
							`${meta.name} too long (${meta.content?.length}): ${file}`,
						)
					}

					if (meta.content?.length < meta.lengths.min) {
						console.error(file)
						console.error(metas)
						throw new Error(
							`${meta.name} too short (${meta.content?.length}): ${file}`,
						)
					}

					if (meta.content?.endsWith('...')) {
						throw new Error(`truncated ${meta.name}: ${file}`)
					}
				})
			}),
	])

	console.info('seo check passed')
}

seoCheck()
