import Password from './password.js'
import Logger from './logger.js'
const log = new Logger()

/**
 * Form class.
 *
 * @since 0.2.0
 */
export default class Form {
	/**
	 * Form constructor.
	 *
	 * @param {HTMLElement} form The form.
	 * @since 0.2.0
	 */
	constructor (form) {
		// If there is no form element, bail.
		if (
			!form ||
			!(
				typeof HTMLElement === 'object'
					? form instanceof HTMLElement
					: (
						form &&
							typeof form === 'object' &&
							form !== null &&
							form.nodeType === 1 &&
							typeof form.nodeName === 'string'
					)
			)
		) return

		// Setup form.
		this.form = form

		// Setup fields.
		this.fields = []
		const fields = [...form.querySelectorAll('.form__field')]
		fields.forEach((field, index) => {
			this.fields[index] = {
				message: field.querySelector('.form__field-validation'),
				input: field.querySelector('.form__input'),
				note: field.querySelector('.form__field-note'),
			}
		})

		// Setup default messages.
		this.fields.forEach(field => {
			if (!field.message) return
			field.message.dataset.validationMessage = field.message.textContent
		})

		// Setup validations.
		this.validations = {
			email: [
				{
					validate: input => !!input.value.match(/.{5,}/),
					message: 'Your email address must be at least 5 characters.',
				},
				{
					validate: input => !!input.value.match(
						/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
					),
					message: 'Please enter a valid email address.',
				},
			],
			password: [
				{
					validate: input => !!input.value.match(/.{12,}/),
					message: 'Your password must be at least 12 characters.',
				},
				{
					validate: input => !!input.value.match(/.{12,99}/),
					message: 'Your password must be less than 99 characters.',
				},
				{
					validate: input => !!input.value.match(/^(?=.*?[A-Z]).*$/),
					message: 'Your password must include at least one uppercase letter.',
				},
				{
					validate: input => !!input.value.match(/^(?=.*?[a-z]).*$/),
					message: 'Your password must include at least one lowercase letter.',
				},
				{
					validate: input => !!input.value.match(/^(?=.*?[0-9]).*$/),
					message: 'Your password must include at least one number.',
				},
				{
					validate: input => !!input.value.match(/^(?=.*?[#?!@$ %^&*-]).*$/),
					message: 'Your password must include at least one symbol ' +
					'(?!@#$%^&*-) or space.',
				},
				{
					validate: input => {
						const passwords = this.fields.filter(field => {
							return field.input !== input &&
								field.input.dataset.formElement &&
								field.input.dataset.formElement.includes('password')
						})
						return !!passwords.every(password => {
							return input.value === '' ||
								password.input.value === '' ||
								password.input.value === input.value
						})
					},
					message: 'The passwords must match.',
				},
			],
		}

		// Modify form markup.
		this.modify()

		// Add event listeners.
		this.listen()
	}

	/**
	 * Modify form markup.
	 *
	 * @since 0.2.0
	 */
	modify () {
		// Add show password buttons.
		this.fields
			.filter(field => field.input.type === 'password')
			.forEach(password => new Password(password))
	}

	/**
	 * Add event listeners.
	 *
	 * @since 0.2.0
	 */
	listen () {
		// Listen for field changes and validate.
		this.fields.forEach(field => {
			field.input.addEventListener('change', event => this.validate(field))
		})

		// Listen for field input and validate if the field is valid. 😏
		this.fields.forEach(field => {
			field.input.addEventListener('input', event => {
				if (event.target.validity && event.target.validity.valid) {
					this.validate(field)
				}
			})
		})

		// Get password and confirm password fields.
		const password = this.fields.filter(field => {
			return field.input.dataset.formElement === 'password'
		})[0]
		const confirm = this.fields.filter(field => {
			return field.input.dataset.formElement === 'confirm-password'
		})[0]

		// Validate matching password fields while typing.
		if (password && confirm) {
			password.input.addEventListener('input', event => {
				this.touch({ current: password, other: confirm })
			})

			confirm.input.addEventListener('input', event => {
				this.touch({current: confirm, other: password })
			})
		}

		// Listen for form submission and validate all fields.
		this.form.addEventListener('submit', event => this.validateAll(event))
	}

	/**
	 * Touch other field, focus current field, then validate both.
	 *
	 * @param {Object} options.current       The current field.
	 * @param {Object} options.current.input The current field input.
	 * @param {Object} options.other         The other field.
	 * @param {Object} options.other.input   The other field input.
	 * @since 0.2.0
	 */
	touch ({ current, other }) {
		// If current or other inputs are not present, bail.
		if (!current || !current.input || !other || !other.input) return

		// Touch other input, then shift focus back to current input.
		other.input.focus()
		current.input.focus()

		// If current input is valid, validate other input.
		if (
			current.input.validity &&
			current.input.validity.valid &&
			this.validate(current)
		) {
			this.validate(other)
		}
	}

	/**
	 * Validate a field.
	 *
	 * @param {Object}      field         The field to validate.
	 * @param {HTMLElement} field.input   The field input element.
	 * @param {HTMLElement} field.message The field message element.
	 * @param {HTMLElement} field.note    The field note element.
	 * @since 0.2.0
	 */
	validate ({ input, message, note }) {
		// Input is valid.
		this.validateContainer({ input, valid: true })
		message.textContent = message.dataset.validationMessage
		message.dataset.valid = true
		input.dataset.valid = true
	  input.setCustomValidity('')
	  input.reportValidity()

	  // No valdations exist for this input type.
	  if (!this.validations[input.type]) return true

		// Test each validation for this input type.
		return this.validations[input.type].every(validation => {
			// If input is not valid, fail.
			if (!validation.validate(input)) {
				this.validateContainer({ input, valid: false })
				message.textContent = validation.message
				message.dataset.valid = false
				input.dataset.valid = false
			  input.setCustomValidity(validation.message)
			  input.reportValidity()
			  log.warning(validation.message)
				return false
			}

			// If input is valid, pass.
			return true
		})
	}

	/**
	 * Validate all fields.
	 *
	 * @param {event} event The submit event.
	 * @since 0.2.0
	 */
	validateAll (event) {
		const valid = this.fields.every(field => this.validate(field))
		if (!valid) event.preventDefault()
	}

	/**
	 * Validate a field input's container.
	 *
	 * @param {HTMLElement} options.input The field input.
	 * @param {boolean}     options.valid Whether or not the field is valid.
	 * @since 0.2.0
	 */
	validateContainer ({ input, valid }) {
		if (
			input.parentElement.dataset.formElement &&
			input.parentElement.dataset.formElement === 'password-container'
		) {
			input.parentElement.dataset.valid = valid
		}
	}
}
