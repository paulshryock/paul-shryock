import test from 'ava'
import { sum } from './main.js'

test('1 + 1 = 2', (t) => {
	t.is(sum(1, 1), 2)
})

test('2 + 2 = 4', (t) => {
	t.is(sum(2, 2), 4)
})

test('2 + 2 != 2', (t) => {
	t.not(sum(2, 2), 2)
})
