# Native Proxy Agent

[![CI](https://github.com/axa-group/native-proxy-agent/actions/workflows/main.yml/badge.svg)](https://github.com/axa-group/native-proxy-agent/actions/workflows/main.yml)

A native proxy agent that uses the native nodejs `http.Agent` and `https.Agent` to proxy the requests.

**_All agents allow http or https proxy but you have to select over the agent depending on your target url._**

## How to install

```console
  npm install @axa/native-proxy-agent
```

## Usage

```js
const { createAgent } = require('@axa/native-proxy-agent');
const got = require('got');

got('http://requestUrl.com/service/1', {
  agent: createAgent('http://requestUrl.com/service/1')
});
```

- You can also directly create an httpsAgent or an httpAgent

```js
const { createHttpAgent } = require('@axa/native-proxy-agent');
const got = require('got');

got('http://requestUrl.com/service/1', {
  agent: {
    http: createHttpAgent()
  }
});
```

```js
const { createHttpsAgent } = require('@axa/native-proxy-agent');
const got = require('got');

got('http://requestUrl.com/service/1', {
  agent: {
    https: createHttpsAgent()
  }
});
```

- `createForeverAgent` will add to a singleton, agents with the same configuration to allow an easy reuse of the agents. Also this method will set the option `keepAlive` to true by default.

```js
const { createForeverAgent } = require('@axa/native-proxy-agent');
const got = require('got');

got('http://requestUrl.com/service/1', {
  agent: {
    https: createForeverAgent('http://requestUrl.com/service/1')
  }
});

// Target with same protocol and agent options will share same agent
got('http://requestUrl.com/another-service', {
  agent: {
    http: createForeverAgent('http://requestUrl.com/another-service')
  }
});
```

- If the protocol of the requests is always the same, you can create a target https or http `Agent`.
  - `createHttpForeverAgent`
  - `createHttpsForeverAgent`

### Environment variables

`@axa/native-proxy-agent` will pick the proxy configuration from the environment if the options are not provided at the creation of the agent. It will also pick environment variables for making unproxied (`no_proxy` and `NO_PROXY`) requests.

The environment variables used for this purpose are:

- Setting the proxy: http_proxy, https_proxy, HTTP_PROXY, and HTTPS_PROXY.
- Proxy exemptions: no_proxy and NO_PROXY.

The preference of variable is the order in which they are written in this readme.

## Contributing

You can read the guide of how to contribute at [Contributing](./CONTRIBUTING.md).

## Code of Conduct

You can read the Code of Conduct at [Code of Conduct](./CODE_OF_CONDUCT.md).

# Legal Notice

Copyright (c) AXA Group. All rights reserved.
Licensed under the MIT License.

## Third party dependencies licenses

### Production
 - [hyperid@3.0.1](https://github.com/mcollina/hyperid) - MIT
 - [node-object-hash@2.3.10](https://github.com/SkeLLLa/node-object-hash) - MIT

### Development
 - [@commitlint/config-conventional@17.0.2](https://github.com/conventional-changelog/commitlint) - MIT
 - [@types/jest@28.1.3](https://github.com/DefinitelyTyped/DefinitelyTyped) - MIT
 - [@types/node@18.0.0](https://github.com/DefinitelyTyped/DefinitelyTyped) - MIT
 - [@typescript-eslint/eslint-plugin@5.29.0](https://github.com/typescript-eslint/typescript-eslint) - MIT
 - [@typescript-eslint/parser@5.29.0](https://github.com/typescript-eslint/typescript-eslint) - BSD-2-Clause
 - [commitizen@4.2.4](https://github.com/commitizen/cz-cli) - MIT
 - [commitlint@17.0.2](https://github.com/conventional-changelog/commitlint) - MIT
 - [cz-conventional-changelog@3.3.0](https://github.com/commitizen/cz-conventional-changelog) - MIT
 - [eslint@8.18.0](https://github.com/eslint/eslint) - MIT
 - [eslint-config-airbnb-base@15.0.0](https://github.com/airbnb/javascript) - MIT
 - [eslint-config-airbnb-typescript@17.0.0](https://github.com/iamturns/eslint-config-airbnb-typescript) - MIT
 - [eslint-config-prettier@8.5.0](https://github.com/prettier/eslint-config-prettier) - MIT
 - [eslint-import-resolver-typescript@2.7.1](https://github.com/alexgorbatchev/eslint-import-resolver-typescript) - ISC
 - [eslint-plugin-import@2.26.0](https://github.com/import-js/eslint-plugin-import) - MIT
 - [eslint-plugin-jest@26.5.3](https://github.com/jest-community/eslint-plugin-jest) - MIT
 - [eslint-plugin-json@3.1.0](https://github.com/azeemba/eslint-plugin-json) - MIT
 - [eslint-plugin-prettier@4.0.0](https://github.com/prettier/eslint-plugin-prettier) - MIT
 - [got@11.8.5](https://github.com/sindresorhus/got) - MIT
 - [husky@8.0.1](https://github.com/typicode/husky) - MIT
 - [jest@28.1.1](https://github.com/facebook/jest) - MIT
 - [nock@13.2.7](https://github.com/nock/nock) - MIT
 - [prettier@2.7.1](https://github.com/prettier/prettier) - MIT
 - [rimraf@3.0.2](https://github.com/isaacs/rimraf) - ISC
 - [standard-version@9.5.0](https://github.com/conventional-changelog/standard-version) - ISC
 - [ts-jest@28.0.5](https://github.com/kulshekhar/ts-jest) - MIT
 - [typescript@4.7.x](https://github.com/Microsoft/TypeScript) - Apache-2.0
