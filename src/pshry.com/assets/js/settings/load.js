/**
 * Load class.
 *
 * @since 0.2.0
 */
export default class Load {
	/**
	 * Load constructor.
	 *
	 * @since 0.2.0
	 */
	constructor () {
		this.declare()
	}

	declare () {
		// If there are no links, bail.
		this.links = document.querySelectorAll(
			'[media="print"][data-onload="this.media=\'all\'"]'
		)
		if (!this.links) return

		// Modify links markup.
		for (const link of this.links) {
			link.setAttribute('media', 'all')
			link.removeAttribute('data-onload')
		}
	}
}
