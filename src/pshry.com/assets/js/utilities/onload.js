import { env, isProduction } from './env.js'

/**
 * Swap HTML element class .no-js for .js.
 *
 * @since 0.0.1
 */
function swapHtmlClass () {
	const html = document.documentElement
	html.classList.remove('no-js')
	html.classList.add('js')
}

/**
 * Swap stylesheet media property value.
 *
 * @since 0.0.1
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
 * @since 0.0.1
 */
function logEnv () {
	if (isProduction) return
	console.log('env:', env)
}

/**
 * Handle load.
 *
 * @since 0.0.1
 */
export function handleLoad () {
	swapHtmlClass()
	swapStylesheetMedia()
	logEnv()
}
