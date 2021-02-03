import { handleLoad } from './utilities/onload.js'
import { Table } from './components/table.js'

function init () {
	handleLoad()
	new Table()
}

init()
