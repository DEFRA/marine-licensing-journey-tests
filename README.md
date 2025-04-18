# marine-licensing-journey-tests

The template to create a service that runs WDIO tests against an environment.

- [Local Development](#local-development)
  - [Requirements](#requirements)
    - [Node.js](#nodejs)
  - [Setup](#setup)
  - [Running Tests](#running-tests)
  - [Configuration Files](#configuration-files)
- [Production](#production)
  - [Running Tests in CDP Portal](#running-tests-in-cdp-portal)
- [BrowserStack Integration](#browserstack-integration)
- [GitHub Workflow](#github-workflow)
- [Licence](#licence)

## Local Development

### Requirements

#### Node.js

Please install [Node.js](http://nodejs.org/) `>= v20` and [npm](https://nodejs.org/) `>= v9`. You will find it
easier to use the Node Version Manager [nvm](https://github.com/creationix/nvm)

To use the correct version of Node.js for this application, via nvm:

```bash
nvm use
```

### Setup

Install application dependencies:

```bash
npm install
```

### Running Tests

The test suite provides several configurations for different environments:

1. **Local Development**:

   ```bash
   npm run test:local
   ```

   For debugging:

   ```bash
   npm run test:local:debug
   ```

2. **BrowserStack (CDP Portal)**:

   ```bash
   npm run test:browserstack
   ```

3. **GitHub Workflow**:

   ```bash
   npm run test:github
   ```

4. **BrowserStack (GitHub)**:
   ```bash
   npm run test:github:browserstack
   ```

### Configuration Files

The test suite uses a modular configuration structure:

1. **Base Configuration** (`wdio.base.conf.js`)

   - Contains common settings for all configurations
   - Defines default Chrome capabilities and test framework settings

2. **BrowserStack Base Configuration** (`wdio.browserstack.base.conf.js`)

   - Extends the base configuration
   - Contains BrowserStack-specific settings and capabilities

3. **Environment-Specific Configurations**:
   - `wdio.conf.js` - Main configuration (extends base)
   - `wdio.local.conf.js` - Local development configuration
   - `wdio.browserstack.conf.js` - BrowserStack for CDP Portal
   - `wdio.github.conf.js` - GitHub workflow configuration
   - `wdio.github.browserstack.conf.js` - BrowserStack for GitHub workflow

Each configuration file extends from the appropriate base configuration and only contains environment-specific overrides.

## Production

### Running Tests in CDP Portal

Tests are run from the CDP-Portal under the Test Suites section. Before any changes can be run, a new docker image must be built, which happens automatically when a pull request is merged into the `main` branch.

You can check the progress of the build under the actions section of this repository. Builds typically take around 1-2 minutes.

The results of the test run are made available in the portal.

## BrowserStack Integration

The test suite supports running tests on BrowserStack in two ways:

1. **From CDP Portal** (`wdio.browserstack.conf.js`)

   - Uses the CDP Portal's BrowserStack configuration
   - Run with: `npm run test:browserstack`

2. **From GitHub Workflow** (`wdio.github.browserstack.conf.js`)
   - Uses GitHub-specific BrowserStack configuration
   - Run with: `npm run test:github:browserstack`

Both configurations extend from the BrowserStack base configuration (`wdio.browserstack.base.conf.js`).

## GitHub Workflow

The test suite can be run as a GitHub workflow against a local Docker environment. This is useful for testing changes before deploying to CDP.

1. Edit `compose.yml` to include your services
2. Modify the scripts in `docker/scripts` to pre-populate the database and create any required localstack resources
3. Test locally with:
   ```bash
   docker compose up
   npm run test:github
   ```
4. Set up the workflow trigger in `.github/workflows/journey-tests`

The workflow can be triggered manually from GitHub or by another workflow.

## Licence

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government licence v3

### About the licence

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable
information providers in the public sector to license the use and re-use of their information under a common open
licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
