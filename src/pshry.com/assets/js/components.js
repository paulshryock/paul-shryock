import Form from './components/form.js'
import Resume from './components/resume.js'
import Table from './components/table.js'

/**
 * Initialize components.
 *
 * @since unreleased
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
