import { readFile } from 'node:fs/promises'

const paths = {
	healthCheck: './dist/health-check/index.html',
}

/**
 * Runs health check.
 *
 * @since unreleased
 */
async function healthCheck() {
	const content = await readFile(paths.healthCheck, { encoding: 'utf8' })
	if (content !== 'success') {
		throw new Error('health check failed')
	}

	console.info('health check passed')
}

healthCheck()
