import { sum } from './main.js'

test('1 + 1 = 2', () => {
	expect(sum(1, 1)).toBe(2)
})

test('2 + 2 = 4', () => {
	expect(sum(2, 2)).toBe(4)
})
