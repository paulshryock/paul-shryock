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

- [pshry.com](https://pshry.com/)

## Development

### Requirements

- [Git](https://git-scm.com/)
	- Check if installed: `git version`
	- Install via [Homebrew](https://brew.sh/): `brew install git`
- [Node](https://nodejs.org)
	- Check if installed: `node --version`
	- Install via [`n`](https://github.com/tj/n): `n lts`
- [GitHub CLI ^1.6.0](https://cli.github.com/)
	- Check if installed: `gh --version`
	- Install via [Homebrew](https://brew.sh/): `brew install gh`

### Getting started

1. Run `gh repo clone paulshryock/paul-shryock` to clone this repository
2. Run `npm install` to install dependencies
3. Run `npm start` to build and serve all websites, and watch for changes

Each site will be served to a different `localhost` port beginning with `8000`, incremented alphabetically upwards by `1`. When you're ready to commit changes, git will automatically lint and test your code before committing or pushing to remote.

### Engineering workflow

1. Run `npm run latest` to pull latest `main` branch
2. Run `git checkout -B <issue-number>/<feature-name>` to start a new feature branch
3. Run `git add . && git commit -m "[#<issue-number>]: <feature-name>" && git push -u origin HEAD` to commit the feature and push to remote, and a pull request link will appear
4. Open the pull request link and **squash** `<issue-number>/<feature-name>` into `develop`
5. @todo: Automate pull request creation

### Versioning and release workflow

- Run `git checkout develop && git pull && git checkout -B release/v<version-number>` to checkout a release branch
- Run `npm version <major|minor|patch>` to kick off all versioning and release tasks, and a pre-populated pull request link will appear
- Open the pull request link and **rebase** `release/v<version-number>` into `main`

### npm development scripts

- `npm start`: Build and serve all sites, and watch for changes.
- `npm run lint`: Handle linting tasks.
- `npm test`: Handle testing tasks.
- `npm run build`: Build all sites.

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

- Set HTTP headers in `src/<site-name>/content/headers.liquid`
- Set redirects in `netlify.toml` using `[[redirects]]` array tables

#### Content Security Policy

```bash
# Hash some JavaScript code from the command line.
echo -n "console.log('hello world')" | openssl sha256 -binary | openssl base64
```

#### Access-Control-Allow-Methods

Only `GET` requests are allowed on all routes. Other HTTP methods will need to opened up on specific routes as needed.

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
