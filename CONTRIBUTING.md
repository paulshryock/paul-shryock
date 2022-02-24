# How to contribute

- [Local setup](#markdown-header-local-setup)
- [Branch strategy](#markdown-header-branch-strategy)
- [Code quality](#markdown-header-code-quality)
    - [During development](#markdown-header-during-development)
    - [Skipping code quality checks](#markdown-header-skipping-code-quality-checks)
- [Commits](#markdown-header-commits)
- [Pull requests](#markdown-header-pull-requests)
- [Tags](#markdown-header-tags)
- [Releases](#markdown-header-releases)

## Local setup

Follow the [quick start guide](../README.md#markdown-header-quick-start) to get up and running locally.

## Branch strategy

This repository uses [Trunk Based Development](https://trunkbaseddevelopment.com/), where developers collaborate on code in a single branch called `main`, and resist any pressure to create other long-lived development branches. **Short-lived feature branches** are used by one person over a couple of days (max), and will flow through pull-request style code review & build automation before "integrating" (merging) into the `main` branch.

## Code quality

A number of automated tools are in place to enforce code quality through formatting, linting, type-checking, static analysis, and unit testing.

### During development

Many code editors will support formatting, linting, type-checking, static analysis, and autocompletion during development either by default, or with relevant plugins installed. You can run individual checks (and optionally watch for changes) from the terminal. See `composer.json` and `package.json` for all available scripts.

Run through all code quality checks manually:

```bash
composer run quality
npm run quality
```

A pre-commit hook will enforce code quality before code is committed. **Don't skip code quality checks.**

### Skipping code quality checks

If you need to save code which doesn't pass code quality checks, and `git stash` is not a suitable option, you can use `git commit --no-verify`. Later you can run `git commit --amend` to add passing code to your latest commit and re-run code quality checks.


**You must run your code through code quality checks before pushing to remote and setting up a pull request.**

## Commits

By using [commits](https://github.com/git-guides/git-commit), you're able to craft history intentionally and safely. Please use [correctly formatted commit messages](https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html).

At a minimum, commit messages should include:
1. a ticket number followed by a colon (`:`)
2. a capitalized, short summary

```bash
JIRA-123: Add some cool new feature
```

> More important than the mechanics of formatting the body is the practice of having a subject line. You should shoot for about 50 characters (though this isn’t a hard maximum) and always, always follow it with a blank line. This first line should be a concise summary of the changes introduced by the commit; if there are any technical details that cannot be expressed in these strict size constraints, put them in the body instead. The subject line is used all over Git, oftentimes in truncated form if too long of a message was used.

## Pull requests

Never commit directly to the `main` branch. You should always work on a short-lived feature branch and then create a pull request against `main`. When you push code to the remote, CI will automatically run code quality checks and ensure that your source code compiles. These checks must pass before merging your PR, and you must have approvals from 2 other engineers.

**You should almost always squash pull requests.** Only use a merge commit if there is a good reason to preserve your feature branch's full commit history.

## Tags

todo

#### Prerelease ID's

- nightly
- alpha
- beta
- rc
- canary

## Releases

### Prerelease

todo

Run `npm version [premajor|preminor|prepatch] --preid [prerelease-id]` where `[prerelease-id]`.

### Release

todo

Run `npm version [major|minor|patch]`.