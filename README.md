# pshry.com

Source code for my personal website.

## Pre-requisites

| Tool    | Min. version | Install command          |
| :---    | :---         | :---                     |
| Node.js | 17           | `nvm use 17.3`, `n 17.3` |
| npm     | 8            | `npm i -g npm@8.3`       |

## Development tool chain

| Tool                | Purpose                                  |
| :---                | :---                                     |
| Editorconfig        | Code formatting                          |
| Prettier            | JavaScript formatting                    |
| sync-dotenv         | .env.example linting                     |
| ESLint              | JavaScript linting                       |
| sort-package-json   | package.json sorting                     |
| Skeleton            | File system structure linting            |
| TypeScript          | JavaScript type-checking and analysis    |
| Ava                 | JavaScript unit test runner              |
| ESbuild             | JavaScript module bundling and compiling |
| swc                 | JavaScript legacy transpiling            |
| Husky               | Git hooks                                |
| release-bump        | Release version-bump automation          |
| BitBucket pipelines | CI                                       |

## Roadmap
- Add GitHub action to run a full build after pushing to remote.

## Release tags

- nightly
- alpha
- beta
- rc
- stable
- canary

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