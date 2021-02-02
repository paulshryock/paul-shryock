/**
 * Navigation class.
 *
 * @since unreleased
 */
export class Navigation {
	constructor () {
		// Define navigation and bail early if there is none.
		this.navigation = document.querySelector(
			'[data-component="navigation"][data-navigation="nav"]'
		)
		if (!this.navigation) return false

		// Set the expanded state.
		this.expanded = false

		// Add button and toggle navigation on click.
		this.addButton()
		this.button.addEventListener('click', event => {
			this.toggleNavigation()
		})

		// Remove list.
		this.removeList()
	}

	/**
	 * Add button.
	 *
	 * @since unreleased
	 */
	addButton () {
		// Build the button.
		this.button = document.createElement('button')
		this.button.setAttribute('type', 'button')
		this.button.setAttribute('class', 'button navigation__toggle')
		this.button.setAttribute('data-component', 'navigation')
		this.button.setAttribute('data-navigation', 'button')
		this.button.setAttribute('aria-expanded', this.expanded)
		this.button.textContent = 'More'

		// Append the button.
		this.navigation.appendChild(this.button)
	}

	/**
	 * Toggle navigation.
	 *
	 * @since unreleased
	 */
	toggleNavigation () {
		// Update the expanded state.
		this.expanded = this.expanded ? false : true

		// Update the button.
		this.button.setAttribute('aria-expanded', this.expanded)
		this.button.textContent = this.expanded ? 'Close' : 'More'

		// Add navigation list when expanded.
		if (this.expanded) {
			this.addList()
		} else {
			this.removeList()
		}
	}

	/**
	 * Add list.
	 *
	 * @since unreleased
	 */
	addList () {
		this.navigation.appendChild(this.list)
	}

	/**
	 * Remove list.
	 *
	 * @since unreleased
	 */
	removeList () {
		this.list = this.navigation.removeChild(this.navigation.querySelector('ul'))
	}
}
