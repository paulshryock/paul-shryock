const { BUILD_ENV, BUILD_VERSION } = process.env

if (typeof BUILD_ENV !== 'undefined' && typeof BUILD_VERSION !== 'undefined') {
	console.log({ BUILD_ENV, BUILD_VERSION })
}

/**
 * Returns the sum of two numbers.
 *
 * @since  unreleased
 *
 * @param  {number}   a First number.
 * @param  {number}   b Second number.
 * @return {number}     The sum.
 */
export function sum(a: number, b: number): number {
	return a + b
}
