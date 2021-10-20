export default {
	files: ['./*.test.{ts,js}', './{scripts,src}/**/*.test.{ts,js}'],
	extensions: [
		{
			ts: 'module',
		},
	],
	nodeArguments: ['--loader=ts-node/esm'],
	nonSemVerExperiments: {
		configurableModuleFormat: true,
	},
	require: [],
	typescript: {
		rewritePaths: {
			'src/assets/ts/': 'dist/js/',
		},
		compile: false,
	},
}
