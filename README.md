# Neutrino Lint Test

This repo is to show off a repro of the difference between `neutrino lint` and using `eslint` directly. The two commands should be the same, but have different results. Editors (at least VS Code) will also show no errors likely becuase they just read the `.eslintrc.js` directly.

## What was done?

1. Generate the project

```bash
> yarn create @neutrinojs/project neutrino-lint-test
yarn create v1.3.2
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 📃  Building fresh packages...
success Installed "@neutrinojs/create-project@8.1.1" with binaries:
      - create-project
                          _          _
      _ __    ___  _   _ | |_  _ __ (_) _ __    ___
     | '_ \  / _ \| | | || __|| '__|| || '_ \  / _ \
     | | | ||  __/| |_| || |_ | |   | || | | || (_) |
     |_| |_| \___| \__,_| \__||_|   |_||_| |_| \___/

Welcome to Neutrino! 👋
To help you create your new project, I am going to ask you a few questions.

? 🤔  First up, what would you like to create? A web or Node.js application
? 🤔  Next, what kind of application would you like to create? React
? 🤔  Would you like to add a test runner to your project? Jest
? 🤔  Would you like to add linting to your project? Airbnb style rules

👌  Looks like I have all the info I need. Give me a moment while I create your project!

   create neutrino-lint-test/package.json
   create neutrino-lint-test/.neutrinorc.js
   create neutrino-lint-test/src/App.css
   create neutrino-lint-test/src/App.jsx
   create neutrino-lint-test/src/index.jsx
   create neutrino-lint-test/test/simple_test.js
   create neutrino-lint-test/.eslintrc.js

⏳  Installing dependencies: prop-types, react, react-dom, react-hot-loader
⏳  Installing devDependencies: @neutrinojs/react, neutrino, @neutrinojs/jest, @neutrinojs/airbnb
⏳  Performing one-time lint

Hooray, I successfully created your project!

I have added a few yarn scripts to help you get started:
  • To build your project run:  yarn build
  • To start your project locally run:  yarn start
  • To execute tests run:  yarn test
  • To lint your project manually run:  yarn lint
    You can also fix some linting problems with:  yarn lint --fix

Now change your directory to the following to get started:
  cd neutrino-lint-test

❤️  Neutrino                  n                  )
✨  Done in 136.46s.
```

2. Edit [.neutrinorc.js](.neutrinorc.js) to add a module resolve directory to Webpack
3. Edit [src/App.jsx](src/App.jsx) and [src/index.jsx](src/index.jsx) to pass linter
4. Add [src/foo/index.js](src/foo/index.js) and [src/bar/index.js](src/bar/index.js) where [src/bar/index.js](src/bar/index.js) imports `foo` with `import foo from 'foo'` which Webpack should be able to resolve
5. Run lint

```bash
> yarn lint
yarn run v1.3.2
$ neutrino lint
✖ Running lint failed
error: 'foo' should be listed in the project's dependencies. Run 'npm i -S foo' to add it (import/no-extraneous-dependencies) at src/bar/index.js:1:1:
> 1 | import foo from 'foo'
    | ^
  2 |
  3 | const bar = () => foo
  4 |


error: Unable to resolve path to module 'foo' (import/no-unresolved) at src/bar/index.js:1:17:
> 1 | import foo from 'foo'
    |                 ^
  2 |
  3 | const bar = () => foo
  4 |


error: Missing file extension for "foo" (import/extensions) at src/bar/index.js:1:17:
> 1 | import foo from 'foo'
    |                 ^
  2 |
  3 | const bar = () => foo
  4 |


3 errors found.
error Command failed with exit code 1.
```

6. Run eslint directly

```bash
yarn eslint src --ext .js,.jsx --debug
yarn run v1.3.2
$ /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/node_modules/.bin/eslint src --ext .js,.jsx --debug
  eslint:cli Running on files +0ms
  eslint:glob-util Creating list of files to process. +0ms
  eslint:ignored-paths Looking for ignore file in /Users/gir/workspace/src/github.com/gir/neutrino-lint-test +0ms
  eslint:ignored-paths Could not find ignore file in cwd +0ms
  eslint:cli-engine Processing /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/src/App.jsx +0ms
  eslint:cli-engine Linting /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/src/App.jsx +1ms
  eslint:config Constructing config file hierarchy for /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/src +0ms
  eslint:config Using .eslintrc and package.json files +0ms
  eslint:config Loading /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/.eslintrc.js +2ms
  eslint:config-file Loading JS config file: /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/.eslintrc.js +0ms
  eslint:config-file Loading airbnb +2s
  eslint:config-file Attempting to resolve eslint-config-airbnb +0ms
  eslint:config-file Loading JS config file: /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/node_modules/eslint-config-airbnb/index.js +1ms
  eslint:config-file Loading /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/node_modules/eslint-config-airbnb/rules/react-a11y.js +2ms
  eslint:config-file Loading JS config file: /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/node_modules/eslint-config-airbnb/rules/react-a11y.js +0ms
  eslint:config-file Loading /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/node_modules/eslint-config-airbnb/rules/react.js +118ms
  eslint:config-file Loading JS config file: /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/node_modules/eslint-config-airbnb/rules/react.js +0ms
  eslint:config-file Loading /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/node_modules/eslint-config-airbnb-base/rules/strict.js +29ms
  eslint:config-file Loading JS config file: /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/node_modules/eslint-config-airbnb-base/rules/strict.js +1ms
  eslint:config-file Loading /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/node_modules/eslint-config-airbnb-base/index.js +1ms
  eslint:config-file Loading JS config file: /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/node_modules/eslint-config-airbnb-base/index.js +0ms
  eslint:config-file Loading /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/node_modules/eslint-config-airbnb-base/rules/imports.js +1ms
  eslint:config-file Loading JS config file: /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/node_modules/eslint-config-airbnb-base/rules/imports.js +0ms
  eslint:config-file Loading /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/node_modules/eslint-config-airbnb-base/rules/es6.js +45ms
  eslint:config-file Loading JS config file: /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/node_modules/eslint-config-airbnb-base/rules/es6.js +0ms
  eslint:config-file Loading /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/node_modules/eslint-config-airbnb-base/rules/variables.js +13ms
  eslint:config-file Loading JS config file: /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/node_modules/eslint-config-airbnb-base/rules/variables.js +0ms
  eslint:config-file Loading /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/node_modules/eslint-config-airbnb-base/rules/style.js +7ms
  eslint:config-file Loading JS config file: /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/node_modules/eslint-config-airbnb-base/rules/style.js +0ms
  eslint:config-file Loading /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/node_modules/eslint-config-airbnb-base/rules/node.js +77ms
  eslint:config-file Loading JS config file: /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/node_modules/eslint-config-airbnb-base/rules/node.js +0ms
  eslint:config-file Loading /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/node_modules/eslint-config-airbnb-base/rules/errors.js +5ms
  eslint:config-file Loading JS config file: /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/node_modules/eslint-config-airbnb-base/rules/errors.js +0ms
  eslint:config-file Loading /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/node_modules/eslint-config-airbnb-base/rules/best-practices.js +6ms
  eslint:config-file Loading JS config file: /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/node_modules/eslint-config-airbnb-base/rules/best-practices.js +1ms
  eslint:config Using /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/.eslintrc.js +2s
  eslint:config-ops Using config from partial cache +0ms
  eslint:config-ops Apply environment settings to config +1ms
  eslint:config-ops Creating config for environment node +1ms
  eslint:config-ops Creating config for environment es6 +0ms
  eslint:config-ops Creating config for environment browser +0ms
  eslint:config-ops Creating config for environment commonjs +0ms
  eslint:linter Linting code for /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/src/App.jsx (pass 1) +0ms
  eslint:linter Generating fixed text for /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/src/App.jsx (pass 1) +301ms
  eslint:text-fixer Applying fixes +0ms
  eslint:text-fixer shouldFix parameter was false, not attempting fixes +0ms
  eslint:cli-engine Processing /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/src/bar/index.js +2s
  eslint:cli-engine Linting /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/src/bar/index.js +0ms
  eslint:config Constructing config file hierarchy for /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/src/bar +306ms
  eslint:config Using .eslintrc and package.json files +0ms
  eslint:config Using config from cache +0ms
  eslint:linter Linting code for /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/src/bar/index.js (pass 1) +1ms
  eslint:linter Generating fixed text for /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/src/bar/index.js (pass 1) +31ms
  eslint:text-fixer Applying fixes +32ms
  eslint:text-fixer shouldFix parameter was false, not attempting fixes +0ms
  eslint:cli-engine Processing /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/src/foo/index.js +32ms
  eslint:cli-engine Linting /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/src/foo/index.js +0ms
  eslint:config Constructing config file hierarchy for /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/src/foo +32ms
  eslint:config Using .eslintrc and package.json files +0ms
  eslint:config Using config from cache +0ms
  eslint:linter Linting code for /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/src/foo/index.js (pass 1) +1ms
  eslint:linter Generating fixed text for /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/src/foo/index.js (pass 1) +11ms
  eslint:text-fixer Applying fixes +12ms
  eslint:text-fixer shouldFix parameter was false, not attempting fixes +0ms
  eslint:cli-engine Processing /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/src/index.jsx +11ms
  eslint:cli-engine Linting /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/src/index.jsx +0ms
  eslint:config Constructing config file hierarchy for /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/src +11ms
  eslint:config Using .eslintrc and package.json files +0ms
  eslint:config Using config from cache +0ms
  eslint:linter Linting code for /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/src/index.jsx (pass 1) +0ms
  eslint:linter Generating fixed text for /Users/gir/workspace/src/github.com/gir/neutrino-lint-test/src/index.jsx (pass 1) +40ms
  eslint:text-fixer Applying fixes +41ms
  eslint:text-fixer shouldFix parameter was false, not attempting fixes +0ms
  eslint:cli-engine Linting complete in: 2376ms +41ms
```

#### Versions

```
neutrino v8.1.1
node v9.5.0
yarn v1.3.2

@neutrinojs/airbnb v8.1.1
@neutrinojs/jest v8.1.1
@neutrinojs/react v8.1.1
```
