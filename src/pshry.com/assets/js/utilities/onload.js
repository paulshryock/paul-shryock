import { env, isProduction } from './env'

/**
 * Swap HTML element class .no-js for .js.
 *
 * @since unreleased
 */
function swapHtmlClass () {
	const html = document.documentElement
	html.classList.remove('no-js')
	html.classList.add('js')
}

/**
 * Swap stylesheet media property value.
 *
 * @since unreleased
 */
function swapStylesheetMedia () {
	const links = document.querySelectorAll(
		'[media="print"][data-onload="this.media=\'all\'"]'
	)
	if (!links) return

	for (const link of links) {
		link.setAttribute('media', 'all')
		link.removeAttribute('data-onload')
	}
}

/**
 * Confirm load.
 *
 * @since unreleased
 */
function logEnv () {
	if (isProduction) return
	console.log('env:', env)
}

/**
 * Handle load.
 *
 * @since unreleased
 */
export function handleLoad () {
	swapHtmlClass()
	swapStylesheetMedia()
	logEnv()
}
