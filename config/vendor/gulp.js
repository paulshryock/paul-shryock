/**
 * gulp configuration.
 *
 * @since unreleased
 *
 * @type {Object}
 */
module.exports = {
	paths: {
		changelog: './CHANGELOG.md',
		dest: './build',
		html: {
			src: './src/**/*.html',
			get lint () {
				return [
					this.src,
					this.written
				]
			},
			written: './build/**/*.html'
		},
		svg: {
			src: './src/**/*.svg',
		},
		sass: {
			src: './src/**/sass/*.s+(a|c)ss',
			lint: {
				src: [
					'./src/**/*.s+(a|c)ss',
					'!./src/**/vendor/**/*.s+(a|c)ss'
				],
				dest: './src'
			}
		},
		css: {
			written: './build/**/*.css'
		},
		javascript: {
			config: './config/*.js',
			src: './src/**/*.js',
			root: {
				files: './*.js',
				dotfiles: './.*.js',
				get all () {
					return [
						this.files,
						this.dotfiles
					]
				}
			},
			get lint () {
				return {
					src: [
						this.config,
						this.src,
						this.root.files
					],
					dest: './'
				}
			},
			test: [
				'./*.test.js',
				'./.*.test.js',
				'./config/**/*.test.js',
				'./src/**/*.test.js',
			]
		}
	},
}
