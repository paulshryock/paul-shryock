import Form from './components/form.js'
import Resume from './components/resume.js'
import Table from './components/table.js'

/**
 * Initialize components.
 *
 * @since 0.2.0
 */
export function init () {
	// Load forms.
	const forms = [...document.forms]
	if (forms && forms.length) {
		forms.forEach(form => new Form(form))
	}
	new Resume()
	new Table()
}
