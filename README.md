## Native Proxy Agent

A native proxy agent that uses the native nodejs http.Agent and https.Agent to proxy the requests.

**_All agents allow http or https proxy but you have to select over the agent depending on your target url._**

## How to install

```console
  npm install native-proxy-agent
```

## Usage

```js
const { createAgent } = require('native-proxy-agent');
const got = require('got');

got('http://requestUrl.com/service/1', {
  agent: createAgent('http://requestUrl.com/service/1')
});
```

- You can also directly create an httpsAgent or an httpAgent

```js
const { createHttpAgent } = require('native-proxy-agent');
const got = require('got');

got('http://requestUrl.com/service/1', {
  agent: {
    http: createHttpAgent()
  }
});
```

```js
const { createHttpsAgent } = require('native-proxy-agent');
const got = require('got');

got('http://requestUrl.com/service/1', {
  agent: {
    https: createHttpsAgent()
  }
});
```

- `createForeverAgent` will add to a singleton, agents with the same configuration to allow an easy reuse of the agents. Also this method will set the option `keepAlive` to true by default.

```js
const { createForeverAgent } = require('native-proxy-agent');
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

- If the protocol of the requests is the same always, you can create a target Agent https or http.
  - `createHttpForeverAgent`
  - `createHttpsForeverAgent`

### Environment variables

If not supplied via the options object at agent creation time, `native-proxy-agent` will pick the proxy configuration from the environment. It will also pick environment variables for making unproxied requests to domains.

The variables used for this purpose are:

- Setting the proxy: http_proxy, https_proxy, HTTP_PROXY, and HTTPS_PROXY.
- Proxy exemptions: no_proxy and NO_PROXY.

The preference of variable is the order in which they are written in this readme, being the first the one with higher priority and the last the one with least priority.

## Contributing

You can read the guide of how to contribute at [Contributing](./CONTRIBUTING.md).

## Code of Conduct

You can read the Code of Conduct at [Code of Conduct](./CODE_OF_CONDUCT.md).

## Who is behind it?

This project is developed by AXA Group Operations Spain S.A.
