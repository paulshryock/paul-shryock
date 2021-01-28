import { handleLoad } from './utilities/onload'
import { Table } from './components/table'

function init () {
	handleLoad()
	new Table()
}

init()
