/**
 * Table class.
 *
 * @since 0.0.1
 */
export class Table {
	constructor () {
		// If there are no tables, bail.
		if (!document.querySelectorAll('.table__container table')) return false

		// Set table cell headers.
		this.setHeaders()
	}

	/**
	 * Set table cell headers.
	 */
	setHeaders () {
		for (const table of document.querySelectorAll('.table__container table')) {
			// Get each table's headers.
			const headers = []
			for (const header of table.querySelectorAll('thead th')) {
				headers.push(header.textContent)
			}

			// Set each cell's `data-th` to the header text.
			for (const row of table.querySelectorAll('tbody tr')) {
				const cells = row.querySelectorAll('th, td')
				for (let index = 0; index < cells.length; index++) {
					const cell = cells[index]
					cell.setAttribute('data-th', headers[index])
				}
			}

			// Set `--data-th-width` based on the longest header length with padding.
			const width = headers.reduce((a, b) => a.length > b.length ? a : b).length
			table.style.setProperty('--data-th-width', `calc(${width}ch + 0.5em)`)
		}
	}
}
