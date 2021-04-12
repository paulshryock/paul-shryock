/**
 * Field class.
 *
 * @since unreleased
 */
export default class Field {
	/**
	 * Field constructor.
	 *
	 * @param {Object}      field       The field.
	 * @param {HTMLElement} field.input The field input.
	 * @since unreleased
	 */
	constructor (field) {
		// If there is no field input, bail.
		if (!field || !field.input) return

		// Setup field.
		this.field = field
	}
}
