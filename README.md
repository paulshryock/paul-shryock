<div align="center">
  <p><img src="https://raw.githubusercontent.com/paulshryock/paul-shryock/main/src/pshry.com/assets/img/logos/ps-monogram-2021-4c.svg" alt="Paul Shryock" width="96" height="96"></p>
	<p><strong>2021 reboot of my personal website.</strong></p>
	<p><a href="https://app.netlify.com/sites/pshry-com/deploys"><img src="https://api.netlify.com/api/v1/badges/99675821-ec9f-46d6-a6b4-c47a0104b756/deploy-status" alt="Netlify status"></a></p>
	<br /><br />
</div>

# Paul Shryock

I [aspire][aspire] to make Accessible, Secure, Performant, Inclusive, Responsive, and Ethical websites.

## Websites

This repository contains source code for the following websites:

- pshry.com

## Development

Clone this repository, run `npm install`, and you're all ready to get started. Run `npm start` to build and serve all websites, and watch for changes. Each site will be served to a different `localhost` port beginning with `8000`, incremented alphabetically upwards by `1`.

When you're ready to commit changes, git will automatically lint and test your code before committing or pushing to remote.

When it's time to release a new code version, run `npm version`, select `major`, `minor`, or `patch`, and Gulp and npm will handle the rest of the version update.

### npm scripts

- `npm start`: Build and serve all sites, and watch for changes.
- `npm run lint`: Handle linting tasks.
- `npm test`: Handle testing tasks.
- `npm run build`: Build all sites.
- `npm version`: Handle version tasks.

### Gulp tasks

- `gulp clean`: Clean the build directory.
- `gulp finish`: Clean the temp directory.
- `gulp lint`: Handle linting tasks.
- `gulp html`: Handle HTML tasks.
- `gulp postHtml`: Handle HTML post-processing tasks.
- `gulp svg`: Handle SVG tasks.
- `gulp css`: Handle CSS tasks.
- `gulp javascript`: Handle JavaScript tasks.
- `gulp validate`: Handle validation tasks.
- `gulp test`: Handle testing tasks.
- `gulp build`: Handle build tasks.
- `gulp serve`: Handle serve tasks.
- `gulp version`: Handle version tasks.

### HTTP headers and redirects

Set HTTP headers and redirects in `netlify.toml` using `[[headers]]` and `[[redirects]]` array tables.

#### Content Security Policy

```bash
# Hash some JavaScript code from the command line.
echo -n "console.log('hello world')" | openssl sha256 -binary | openssl base64
```

## Open Source

This project is open source and the code is publicly [available on GitHub][github-repo].

### License

This project is available under the [Hippocratic License][license].

### Contributing

If you'd like to contribute, please read the [Code of Conduct][code-of-conduct] and [Contributing Instructions][contributing]. Then fork the repository and create a new branch. [Pull requests][github-pull-requests] are welcome.

The type of contributions I am interested in are those that would make the website more accessible, secure, performant, inclusive, and/or ethical. Small pull requests that solve a specific problem or make a specific improvement are preferred.

You're welcome to [create an Issue][github-create-issue] if there's something on my website that you would like to discuss, or to report a bug, typo, or problematic content or functionality.

[netlify-status]: https://api.netlify.com/api/v1/badges/99675821-ec9f-46d6-a6b4-c47a0104b756/deploy-status
[netlify-deploys]: https://app.netlify.com/sites/pshry-com/deploys
[aspire]: https://www.filamentgroup.com/lab/aspire/
[github-repo]: https://github.com/paulshryock/paul-shryock
[license]: https://firstdonoharm.dev/
[code-of-conduct]: blob/main/CODE_OF_CONDUCT.md
[contributing]: blob/main/CONTRIBUTING.md
[github-pull-requests]: https://github.com/paulshryock/paul-shryock/pulls
[github-create-issue]: https://github.com/paulshryock/paul-shryock/issues/new/choose
