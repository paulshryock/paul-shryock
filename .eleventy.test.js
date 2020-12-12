const test = require('ava')
const eleventy = require('./.eleventy.js')
const { dir } = eleventy()
const { data, includes, input, layouts } = dir
const fs = require('fs')

test('data directory exists', t => {
	if (!fs.existsSync(`./${input}/${data}`)) t.fail(`data directory must exist: ./${input}/${data}`)
	t.pass()
})

test('includes directory exists', t => {
	if (!fs.existsSync(`./${input}/${includes}`)) t.fail(`includes directory must exist: ./${input}/${includes}`)
	t.pass()
})

test('input directory exists', t => {
	if (!fs.existsSync(`./${input}`)) t.fail(`input directory must exist: ./${input}`)
	t.pass()
})

test('layouts directory exists', t => {
	if (!fs.existsSync(`./${input}/${layouts}`)) t.fail(`layouts directory must exist: ./${input}/${layouts}`)
	t.pass()
})
