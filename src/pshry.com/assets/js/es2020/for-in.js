export function forIn () {
	const obj = {
		lorem: 'ipsum',
		another: 'thing'
	}
	for (let key in obj) {
		console.log(key);
	}
}
