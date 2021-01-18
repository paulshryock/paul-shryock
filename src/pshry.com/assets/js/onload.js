/**
 * Update markup after initial load.
 *
 * @since unreleased
 */
function updateMarkup () {
	// Swap media=print for media=all for deferred stylesheet loading.
	const links = document.querySelectorAll(
		'[media="print"][data-onload="this.media=\'all\'"]'
	)
	if (!links) return

	for (let i = 0; i < links.length; i++) {
		const link = links[i]
		link.setAttribute('media', 'all')
		link.removeAttribute('data-onload')
	}

	// Swap .no-js for .js
	const html = document.getElement('html')
	html.classList.toggle('no-js', 'js')
}

/**
 * Handle load.
 *
 * @since unreleased
 */
export function handleLoad () {
	updateMarkup()
}
