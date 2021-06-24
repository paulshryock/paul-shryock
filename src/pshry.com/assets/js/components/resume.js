/**
 * Resume class.
 *
 * @since 0.2.0
 */
export default class Resume {
	constructor () {
		this.periods = [...document.querySelectorAll('[data-resume="period"]')]
		this.updateDatetimeAttributes()
	}

	/**
	 * Update `datetime` attributes.
	 *
	 * @since 0.2.0
	 */
	updateDatetimeAttributes () {
		this.periods.forEach(period => {
			const [from, to] = period
				.textContent
				.replace('present', new Date().getFullYear())
				.split('–')

			// Set datetime to number of years.
			const years = (to - from)
			const pluralize = years === 1 ? 'year' : 'years'
			if (years > 0) period.setAttribute('datetime', years + ' ' + pluralize)

			// Remove data attribute.
			period.removeAttribute('data-resume')
		})
	}
}
