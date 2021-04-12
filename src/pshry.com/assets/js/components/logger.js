/**
 * Logger class.
 *
 * Describes a logger instance.
 *
 * The message MUST be a string or object implementing __toString().
 *
 * The message MAY contain placeholders in the form: {foo} where foo
 * will be replaced by the context data in key "foo".
 *
 * The context array can contain arbitrary data, the only assumption that
 * can be made by implementors is that if an Exception instance is given
 * to produce a stack trace, it MUST be in a key named "exception".
 *
 * See https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-3-logger-interface.md
 * for the full interface specification.
 *
 * @since unreleased
 */
export default class Logger {
	/**
	 * Logger constructor.
	 *
	 * @since unreleased
	 */
	constructor () {
	}

	/**
   * System is unusable.
   *
   * @param {string} message
   * @param {Object} context
   * @return void
   */
	emergency(message, context = {}) {
  	console.error(`[emergency] ${message}`)
  	if (context.exception) console.trace(context.exception)
	}

	/**
   * Action must be taken immediately.
   *
   * Example: Entire website down, database unavailable, etc. This should
   * trigger the SMS alerts and wake you up.
   *
   * @param {string} message
   * @param {Object} context
   * @return void
   */
	alert(message, context = {}) {
  	console.error(`[alert] ${message}`)
  	if (context.exception) console.trace(context.exception)
	}

	/**
   * Critical conditions.
   *
   * Example: Application component unavailable, unexpected exception.
   *
   * @param {string} message
   * @param {Object} context
   * @return void
   */
	critical(message, context = {}) {
  	console.error(`[critical] ${message}`)
  	if (context.exception) console.trace(context.exception)
	}

	/**
   * Runtime errors that do not require immediate action but should typically
   * be logged and monitored.
   *
   * @param {string} message
   * @param {Object} context
   * @return void
   */
	error(message, context = {}) {
  	console.error(`[error] ${message}`)
  	if (context.exception) console.trace(context.exception)
	}

	/**
   * Exceptional occurrences that are not errors.
   *
   * Example: Use of deprecated APIs, poor use of an API, undesirable things
   * that are not necessarily wrong.
   *
   * @param {string} message
   * @param {Object} context
   * @return void
   */
	warning(message, context = {}) {
  	console.warn(`[warning] ${message}`)
  	if (context.exception) console.trace(context.exception)
	}

	/**
   * Normal but significant events.
   *
   * @param {string} message
   * @param {Object} context
   * @return void
   */
	notice(message, context = {}) {
  	console.info(`[notice] ${message}`)
  	if (context.exception) console.trace(context.exception)
	}

	/**
   * Interesting events.
   *
   * Example: User logs in, SQL logs.
   *
   * @param {string} message
   * @param {Object} context
   * @return void
   */
	info(message, context = {}) {
  	console.info(`[info] ${message}`)
  	if (context.exception) console.trace(context.exception)
	}

	/**
   * Detailed debug information.
   *
   * @param {string} message
   * @param {Object} context
   * @return void
   */
	debug(message, context = {}) {
  	console.debug(`[debug] ${message}`)
  	if (context.exception) console.trace(context.exception)
	}

	/**
   * Logs with an arbitrary level.
   *
   * @param {mixed} level
   * @param {string} message
   * @param {Object} context
   * @return void
   */
	log(level, message, context = {}) {
  	console.log(`[${level}] ${message}`)
  	if (context.exception) console.trace(context.exception)
	}
}
