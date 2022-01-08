export default {
	extensions: {
		ts: 'module',
	},
	files: ['src/**/*.test.ts'],
	nodeArguments: ['--loader=ts-node/esm'],
}
