import { resolve } from 'path'
import { readdir, readFile } from 'fs/promises'
import { parse } from 'node-html-parser'

async function getFiles(directory: string): Promise<unknown> {
	const dirents = await readdir(directory, { withFileTypes: true })

	const files = await Promise.all(
		dirents.map((dirent) => {
			const res = resolve(directory, dirent.name)
			return dirent.isDirectory() ? getFiles(res) : res
		}),
	)

	return Array.prototype
		.concat(...files)
		.filter((file) => file.includes('.html'))
}

async function getAllFiles(directory: string): Promise<string[]> {
	const dirents = await readdir(directory, { withFileTypes: true })

	const files = await Promise.all(
		dirents.map((dirent) => {
			const res = resolve(directory, dirent.name)
			return dirent.isDirectory() ? getFiles(res) : res
		}),
	)

	return Array.prototype
		.concat(...files)
		.filter((file) => file.includes('.html'))
}

async function seoCheck() {
	const files = await getAllFiles('./dist')
	files.forEach(async (file: string) => {
		const content = parse(await readFile(file, 'utf8'))
		const title = content.querySelector('title')?.textContent
		const description = content
			.querySelector('meta[name="description"]')
			?.getAttribute('content')

		if ([title, description].some((meta) => meta?.endsWith('...'))) {
			throw new Error(`${file} has truncated SEO meta`)
		}
	})

	console.info('seo check passed')
}

seoCheck()
