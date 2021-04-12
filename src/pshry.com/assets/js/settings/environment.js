import Logger from '../components/logger.js'
const log = new Logger()

/**
 * Environment class.
 *
 * @since unreleased
 */
export default class Environment {
	/**
	 * Environment constructor.
	 *
	 * @since unreleased
	 */
	constructor () {
		// If there is no environment, bail.
		this.env = document.documentElement.getAttribute('data-env')
		if (!this.env) return

		// Determine if the current environment is production.
		this.isProduction = this.env === 'production'

		// Declare environment.
		this.declare()
	}

	/**
	 * Declare environment.
	 *
	 * @since unreleased
	 */
	declare () {
		if (this.isProduction) return
		log.debug(`Environment: ${this.env}`)
	}
}
