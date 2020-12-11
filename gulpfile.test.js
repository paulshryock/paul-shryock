const test = require('ava')
const { paths, clean } = require('./gulpfile')
const fs = require('fs')

test('gulp paths is an object', t => {
	t.is(typeof paths, 'object')
})

test(
	'gulp clean() is a function',
	async t => {
		t.is(typeof clean, 'function')
	}
)

test(
	'gulp clean() deletes the html dest directory',
	async t => {
		await clean()
		if (fs.existsSync(paths.html.dest)) t.fail()
		t.pass()
	}
)
