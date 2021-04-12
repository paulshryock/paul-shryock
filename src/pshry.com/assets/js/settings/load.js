/**
 * Load class.
 *
 * @since unreleased
 */
export default class Load {
	/**
	 * Load constructor.
	 *
	 * @since unreleased
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
