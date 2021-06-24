import Logger from '../components/logger.js'
const log = new Logger()

/**
 * Environment class.
 *
 * @since 0.2.0
 */
export default class Environment {
	/**
	 * Environment constructor.
	 *
	 * @since 0.2.0
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
	 * @since 0.2.0
	 */
	declare () {
		if (this.isProduction) return
		log.debug(`Environment: ${this.env}`)
	}
}
