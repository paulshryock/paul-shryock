const test = require('ava')
const { paths } = require('./gulpfile')

test('gulp paths is an object', t => {
	t.is(typeof paths, 'object', 'gulp paths must be an object')
})
