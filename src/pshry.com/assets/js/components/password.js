import Field from './field.js'

/**
 * Password class.
 *
 * @since unreleased
 */
export default class Password extends Field {
	/**
	 * Password constructor.
	 *
	 * @param {Object} field The field.
	 * @since unreleased
	 */
	constructor (field) {
		super(field)

		// If this is not a password field, bail.
		if (this.field.input.type !== 'password') return

		// Setup initial state.
		this.show = false
		this.icons = {
			show: '/img/icons/MdiEye.svg',
			hide: '/img/icons/MdiEyeOff.svg',
		}

		// Modify password markup.
		this.modify()

		// Add event listeners.
		this.listen()
	}

	/**
	 * Modify password markup.
	 *
	 * @since unreleased
	 */
	modify () {
		// Build container element.
		this.container = document.createElement('div')
		this.container.classList.add('form__input-container')
		this.container.dataset.formElement = 'password-container'

		// Build button element.
		this.button = document.createElement('button')
		this.button.dataset.formElement = 'show-password'
		this.button.dataset.show = false
		this.button.setAttribute('type', 'button')

		// Build icon element.
		this.icon = document.createElement('img')
		this.icon.dataset.formElement = 'show-password-icon'
		this.icon.setAttribute('src', this.icons.show)
		this.icon.setAttribute('alt', '') // Decorative image.
		this.icon.setAttribute('width', '20')
		this.icon.setAttribute('height', '20')

		// Build span element.
		this.span = document.createElement('span')
		this.span.classList.add('visually-hidden')
		this.span.dataset.formElement = 'show-password-span'
		this.span.textContent = 'Show'

		// Wrap password input in a flex layout container.
		this.field.input.before(this.container)
		this.container.appendChild(
			this.field.input.parentElement.removeChild(this.field.input)
		)

		// Add show password button markup.
		this.button.appendChild(this.icon)
		this.button.appendChild(this.span)
		this.container.appendChild(this.button)
	}

	/**
	 * Add event listeners.
	 *
	 * @since unreleased
	 */
	listen () {
		// If there is no show password button or password field, bail.
		if (!this.button || !this.field || !this.field.input) return

		// Listen for button clicks and toggle show/hide password, then shift focus.
		this.button.addEventListener('click', event => {
			// Toggle show/hide password.
			this.toggle()

			// Shift focus to input.
			this.field.input.focus()
		})

		// Listen for input change and hide password.
		this.field.input.addEventListener('change', event => {
			if (this.show) this.toggle()
		})

		// Listen for input blur and hide password.
		// Side-effect: This prevents both passwords from showing at the same time.
		this.field.input.addEventListener('blur', event => {
			if (this.show) this.toggle()
		})

		// If there is no parent form containing the input, bail.
		if (!this.field.input.form) return

		// Listen for form submit and hide password.
		this.field.input.form.addEventListener('submit', event => {
			if (this.show) this.toggle()
		})
	}

	/**
	 * Toggle show/hide password.
	 *
	 * @since unreleased
	 */
	toggle () {
		// If there is no input or button, bail.
		if (!this.field || !this.field.input || !this.button) return

		// Show or hide password value.
		this.show = this.field.input.getAttribute('type') === 'password'
		this.field.input.setAttribute('type', this.show ? 'text' : 'password')
		this.button.dataset.show = this.show

		// Update button icon.
		this.icon.setAttribute('src', this.show ? this.icons.hide : this.icons.show)

		// Update span text.
		this.span.textContent =
			(this.show ? 'Hide' : 'Show') + ' ' +
				this.field.input.dataset.formElement.replace('-', ' ')
	}
}
