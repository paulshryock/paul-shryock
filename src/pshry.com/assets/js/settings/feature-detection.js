/**
 * FeatureDetection class.
 *
 * @since unreleased
 */
export default class FeatureDetection {
	/**
	 * FeatureDetection constructor.
	 *
	 * @since unreleased
	 */
	constructor () {
		// Construct features state.
		this.features = {}

		this.detections = [
			{
				name: 'focus-within',
				detect () {
				  try {
				    document.querySelector(':focus-within')
				  } catch (error) {
				    return false
				  }
				  return true
				}
			},
		]

		// Detect feature support.
		this.detect()

		// Declare feature support in the DOM.
		this.declare()
	}

	/**
	 * Detect feature support.
	 *
	 * @since unreleased
	 */
	detect () {
		this.detections.forEach(detection => {
			this.features[detection.name] = detection.detect
		})
	}

	/**
	 * Declare feature support in the DOM.
	 *
	 * @since unreleased
	 */
	declare () {
		// Declare JavaScript support.
		const html = document.documentElement
		html.classList.remove('no-js')
		html.classList.add('js')

		// If features are not present, bail.
		if (!this.features) return

		for (const feature in this.features) {
			// If feature is not supported, bail.
			if (!this.features[feature]) return

			// Declare feature support.
			document.body.classList.add(`supports-${feature}`)
		}
	}
}
