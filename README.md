# pshry.com

Source code for my personal website.

Code is automatically formatted, linted, bundled and compiled. Unit tests are available, and some other development workflow automations are built-in.

- [Quick start](#quick-start)
- [Getting started](#getting-started)
    - [Install Node and npm](#install-node-and-npm)
- [Dependencies](#dependencies)
    - [Code quality](#code-quality)
    - [Upgrading dependencies](#upgrading-dependencies)
        - [Node packages](#node-packages)
- [How to contribute](#how-to-contribute)
- [Requirements](#requirements)
- [Roadmap](#roadmap)

## Quick start

1. Install Node and npm
2. Clone this repo (dependencies will automatically install)
3. Run `npm start` to enforce code quality and compile source code

```bash
git clone git@https://github.com/paulshryock/paul-shryock.git
cd paul-shryock
npm start
```

## Getting started

To run this project locally, first install the following software.

| Tool               | Min. version | Recommended version |
| :---               | :---         | :---                |
| Node.js            | 17           | 17.5                |
| npm                | 8.1          | 8.5                 |

### Install Node and npm

See https://nodejs.org/en/download/package-manager/

## Dependencies

When you first clone this project, it will automatically run `npm install` to install all the necessary project dependencies.

### Code quality

These development tools are provided and configured to ensure code quality is automatically enforced during development, before committing code changes, before and after pushing code to a remote repository, and before deployment.

| Ecosystem | Tool                | Purpose                       |
| :---      | :---                | :---                          |
| Editor    | Editorconfig        | Code formatter                |
| Node      | Prettier            | JS formatter                  |
| Node      | ESLint              | JS linter                     |
| Node      | TypeScript          | JS type-checker and analyzer  |
| Node      | Jest                | JS test runner                |
| Node      | ESbuild             | JS compiler and bundler       |
| Node      | swc                 | JS transpiler                 |
| Node      | Sync dotenv         | .env.example automation       |
| Node      | Sort package.json   | package.json sorter           |
| Node      | Husky               | Git hooks                     |
| Node      | Release Bump        | Version bump automation       |
| CI        | GitHub Actions      | Remote CI                     |

### Upgrading dependencies

Whenever you `git pull` new commits from the remote origin, you'll be automatically notified of any available dependency upgrades. When you see that upgrades are available, you should upgrade and test locally, and commit those changes. Please do not include source code changes in the same commit along with dependency updates unless you are refactoring source code to accomodate new breaking changes in upgraded dependencies.

#### Node packages

`npm-check-updates` is a helper tool for upgrading node package dependencies in `package.json`. Run the local version with `./node_modules/.bin/ncu` or install globally (`npm i -g npm-check-updates`) to use `ncu` directly.

Running `ncu` without any flags will perform a dry run to show what package upgrades are available. Running `ncu` with `-u` will modify `package.json`. After that, running `npm install` will modify `package-lock.json`.

It's a good idea to upgrade in phases and commit after each.

So for example, you might upgrade all **patch** versions with `ncu -t patch -u`, run `npm install`, and then commit your changes. Then you might upgrade minor versions the same way and commit. Finally, if you're ready for the major version upgrades, you would upgrade the major versions and commit those changes.

An alternate strategy would be to upgrade related packages together, such as `eslint` and all `eslint` plugins by filtering with `ncu -f eslint -u`.

| Command | Description | File modified |
| :--- | :--- | :--- |
| `ncu` | Check if updates are available. | N/A |
| `ncu -t patch -u` | Upgrade all available patch versions. | `package.json` |
| `ncu -t minor -u` | Upgrade all available minor versions. | `package.json` |
| `ncu -t latest -u` | Upgrade all available major versions. | `package.json` |
| `ncu -f some-filter -u` | Upgrade filtered packages by all available versions. | `package.json` |
| `ncu -f some-filter -t patch -u` | Upgrade filtered packages by patch versions. | `package.json` |
| `npm install` | Download upgraded dependencies, update lockfile. | `package-lock.json` |

## How to contribute

See [contributing guidelines](../CONTRIBUTING.md).

## Requirements

This project should be:

- Accessible (a11y, assets on cdn, caching/offline-first, no giant cookies/headers, no frequent user lockouts, "self-service" whenever possible, etc.)
- Agnostic (platform, network, device, screen size, browser, user agent, etc.)
- Budgeted (https://github.com/GoogleChrome/lighthouse/blob/master/docs/performance-budgets.md#performance-budgets-budgetjson)
- Continuously deployed (feature flags to hide incomplete/early features)
- Continuously integrated (Code formatting, linting, type-checking, testing, auditing, building etc.)
- Documented (code, documentation, CMS UI)
- Ethical (https://www.ethicalweb.org/)
- Inclusive (i18n, a11y, inclusive form fields and language, etc.)
- Modern (ESM, ES2021, latest TypeScript/Node.js/npm versions, etc.)
- Performant (lightweight, minimal dependencies, cookies, requests, etc.) (https://www.yunier.dev/post/2021/running-lighthouse-in-cicd-pipeline/)
- Responsive (mobile-first, etc.)
- Secure (HTTP headers, firewall, auth, etc.)
- Semantically versioned
- Stable (audit, test, qa before release)
- Test-driven (unit, integration, E2E)

## Roadmap
- [ ] Add Docker for local development
- [ ] Enforce Node and npm versions
- [ ] Fail build if code coverage is below minimum required
- [ ] Move config files into config directory