import got from 'got';
import nock from 'nock';
import {
  createAgent,
  createForeverAgent,
  createHttpAgent,
  createHttpForeverAgent,
  createHttpsAgent,
  createHttpsForeverAgent,
  NativeHttpsAgentOptions
} from '../index';
import { HttpsAgent } from '../https-agent';

describe('agent test', () => {
  describe('proxy env variables', () => {
    beforeEach(() => {
      process.env.http_proxy = '';
      process.env.https_proxy = '';
      process.env.HTTP_PROXY = '';
      process.env.HTTPS_PROXY = '';
    });
    afterEach(() => {
      nock.cleanAll();
    });

    it('should support the http_proxy variable', async () => {
      const host = '192.168.1.5';
      const port = '3128';
      process.env.http_proxy = `http://${host}:${port}`;

      const url = 'http://axa.com/v1/cats';
      const agent = createAgent(url);
      nock('http://axa.com/v1').post('/cats').reply(200, { message: 'test' });

      const result = await got(url, {
        agent: {
          http: agent,
          https: agent as HttpsAgent
        },
        method: 'post',
        responseType: 'json'
      });
      expect(result.body).toStrictEqual({ message: 'test' });
      // @ts-ignore, because of a bug on Agent @types https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16735
      expect(result.request.options.agent.http.options.proxy.host).toStrictEqual(host);
    });

    it('should support the HTTP_PROXY variable', async () => {
      const host = '192.168.1.6';
      const port = '3128';
      process.env.HTTP_PROXY = `http://${host}:${port}`;

      const url = 'http://axa.com/v1/cats';
      const agent = createAgent(url);

      nock('http://axa.com/v1').post('/cats').reply(200, { message: 'test' });

      const result = await got(url, {
        agent: {
          http: agent,
          https: agent as HttpsAgent
        },
        method: 'post',
        responseType: 'json'
      });
      expect(result.body).toStrictEqual({ message: 'test' });
      // @ts-ignore, because of a bug on Agent @types https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16735@types
      expect(result.request.options.agent.http.options.proxy.host).toStrictEqual(host);
    });

    it('should support not using proxy', async () => {
      const host = 'axa.com';

      const url = `http://${host}/v1/cats`;
      const agent = createAgent(url);
      nock('http://axa.com/v1').post('/cats').reply(200, { message: 'test' });
      const result = await got(url, {
        agent: {
          http: agent,
          https: agent as HttpsAgent
        },
        method: 'post',
        responseType: 'json'
      });
      expect(result.body).toStrictEqual({ message: 'test' });
      // @ts-ignore, because of a bug on Agent @types https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16735@types
      expect(result.request.options.agent.http.options.proxy).toBeUndefined();
    });

    it('should support the http_proxy with authentication', async () => {
      const host = '192.168.1.6';
      const port = 3128;
      const auth = 'user:passord';

      const url = 'http://axa.com/v1/cats';
      const agent = createAgent(url, {
        proxy: {
          host,
          port,
          auth
        }
      });
      nock('http://axa.com/v1').post('/cats').reply(200, { message: 'test' });
      const result = await got(url, {
        agent: {
          http: agent,
          https: agent as HttpsAgent
        },
        method: 'post',
        responseType: 'json'
      });

      expect(result.body).toStrictEqual({ message: 'test' });
      // @ts-ignore, because of a bug on Agent @types https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16735@types
      expect(result.request.options.agent.http.options.proxy.host).toStrictEqual(host);
      // @ts-ignore, because of a bug on Agent @types https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16735@types
      expect(result.request.options.agent.http.options.proxy.auth).toStrictEqual(auth);
    });

    it('should support https request throught a http proxy', async () => {
      const host = '192.168.1.6';
      const port = '3128';
      process.env.HTTP_PROXY = `http://${host}:${port}`;

      const url = 'https://axa.com/v1/cats';
      const agent = createAgent(url);
      nock('https://axa.com/v1').post('/cats').reply(200, { message: 'test' });
      const result = await got(url, {
        agent: {
          http: agent,
          https: agent as HttpsAgent
        },
        method: 'post',
        responseType: 'json'
      });

      expect(result.body).toStrictEqual({ message: 'test' });
      // @ts-ignore, because of a bug on Agent @types https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16735@types
      expect(result.request.options.agent.http.options.proxy.host).toStrictEqual(host);
    });

    it('should support the HTTPS_PROXY variable and tunneling https proxy to http request', async () => {
      const host = '192.168.1.7';
      const port = '3128';
      process.env.HTTPS_PROXY = `https://${host}:${port}`;

      const url = 'http://axa.com/v1/cats';
      const agent = createAgent(url);
      nock('http://axa.com/v1').post('/cats').reply(200, { message: 'test' });
      const result = await got(url, {
        agent: {
          http: agent,
          https: agent as HttpsAgent
        },
        method: 'post',
        responseType: 'json'
      });

      expect(result.body).toStrictEqual({ message: 'test' });
      // @ts-ignore, because of a bug on Agent @types https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16735@types
      expect(result.request.options.agent.http.options.proxy.host).toStrictEqual(host);
    });

    it('should support the HTTP_PROXY variable and tunneling https proxy to http request', async () => {
      const host = '192.168.1.8';
      const port = '3128';
      process.env.HTTP_PROXY = `https://${host}:${port}`;

      const url = 'http://axa.com/v1/cats';
      const agent = createAgent(url);
      nock('http://axa.com/v1').post('/cats').reply(200, { message: 'test' });
      const result = await got(url, {
        agent: {
          http: agent,
          https: agent as HttpsAgent
        },
        method: 'post',
        responseType: 'json'
      });

      expect(result.body).toStrictEqual({ message: 'test' });
      // @ts-ignore, because of a bug on Agent @types https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16735@types
      expect(result.request.options.agent.http.options.proxy.host).toStrictEqual(host);
    });
  });

  describe('createAgent', () => {
    beforeEach(() => {
      process.env.http_proxy = '';
      process.env.https_proxy = '';
      process.env.HTTP_PROXY = '';
      process.env.HTTPS_PROXY = '';
    });

    it('should throw error for not supported protocol', async () => {
      const host = '192.168.1.5';
      const port = '3128';
      process.env.http_proxy = `http://${host}:${port}`;

      const url = 'ftp://axa.com/v1/cats';

      expect(() => createAgent(url)).toThrow(
        new Error('Target protocol not supported, should be https or http.')
      );
    });
  });

  describe('createHttpAgent', () => {
    beforeEach(() => {
      process.env.http_proxy = '';
      process.env.https_proxy = '';
      process.env.HTTP_PROXY = '';
      process.env.HTTPS_PROXY = '';
    });
    afterEach(() => {
      nock.cleanAll();
    });

    it('should support create an httpAgent without target', async () => {
      const host = '192.168.1.5';
      const port = '3128';
      process.env.http_proxy = `http://${host}:${port}`;

      const url = 'http://axa.com/v1/cats';
      const agent = createHttpAgent();
      nock('http://axa.com/v1').post('/cats').reply(200, { message: 'test' });

      const result = await got(url, {
        agent: {
          http: agent
        },
        method: 'post',
        responseType: 'json'
      });
      expect(result.body).toStrictEqual({ message: 'test' });
      // @ts-ignore, because of a bug on Agent @types https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16735@types
      expect(result.request.options.agent.http.options.proxy.host).toStrictEqual(host);
    });
  });

  describe('createHttpsAgent', () => {
    beforeEach(() => {
      process.env.http_proxy = '';
      process.env.https_proxy = '';
      process.env.HTTP_PROXY = '';
      process.env.HTTPS_PROXY = '';
    });
    afterEach(() => {
      nock.cleanAll();
    });

    it('should support create an httpsAgent without target', async () => {
      const host = '192.168.1.5';
      const port = '3128';
      process.env.http_proxy = `http://${host}:${port}`;

      const url = 'https://axa.com/v1/cats';
      const agent = createHttpsAgent();
      nock('https://axa.com/v1').post('/cats').reply(200, { message: 'test' });

      const result = await got(url, {
        agent: {
          https: agent
        },
        method: 'post',
        responseType: 'json'
      });
      expect(result.body).toStrictEqual({ message: 'test' });
      // @ts-ignore, because of a bug on Agent @types https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16735@types
      expect(result.request.options.agent.https.options.proxy.host).toStrictEqual(host);
    });
  });

  describe('createForeverAgent', () => {
    beforeEach(() => {
      process.env.http_proxy = '';
      process.env.https_proxy = '';
      process.env.HTTP_PROXY = '';
      process.env.HTTPS_PROXY = '';
    });
    afterEach(() => {
      nock.cleanAll();
    });

    it('should throw error for not supported protocol', async () => {
      const host = '192.168.1.5';
      const port = '3128';
      process.env.http_proxy = `http://${host}:${port}`;

      const url = 'ftp://axa.com/v1/cats';

      expect(() => createForeverAgent(url)).toThrow(
        new Error('Target protocol not supported, should be https or http.')
      );
    });

    it('should reuse same agent', async () => {
      const host = '192.168.1.5';
      const port = '3128';
      process.env.http_proxy = `http://${host}:${port}`;

      const url = 'https://axa.com/v1/cats';
      const agent1 = createForeverAgent(url);
      const agent2 = createForeverAgent(url);

      expect(agent1.name).toStrictEqual(agent2.name);
    });

    it('should not reuse same agent with diferent options', async () => {
      const host = '192.168.1.5';
      const port = '3128';
      process.env.http_proxy = `http://${host}:${port}`;

      const url = 'https://axa.com/v1/cats';
      const agent1 = createForeverAgent(url, { cert: 'myCert' } as NativeHttpsAgentOptions);
      const agent2 = createForeverAgent(url);

      expect(agent1.name).not.toStrictEqual(agent2.name);
    });
  });

  describe('createHttpForeverAgent', () => {
    beforeEach(() => {
      process.env.http_proxy = '';
      process.env.https_proxy = '';
      process.env.HTTP_PROXY = '';
      process.env.HTTPS_PROXY = '';
    });
    afterEach(() => {
      nock.cleanAll();
    });

    it('should reuse same agent', async () => {
      const host = '192.168.1.5';
      const port = '3128';
      process.env.http_proxy = `http://${host}:${port}`;

      const agent1 = createHttpForeverAgent();
      const agent2 = createHttpForeverAgent();

      expect(agent1.name).toStrictEqual(agent2.name);
    });

    it('should not reuse same agent with diferent options', async () => {
      const host = '192.168.1.5';
      const port = '3128';
      process.env.http_proxy = `http://${host}:${port}`;
      const agent1 = createHttpForeverAgent({ cert: 'myCert' } as NativeHttpsAgentOptions);
      const agent2 = createHttpForeverAgent();

      expect(agent1.name).not.toStrictEqual(agent2.name);
    });
  });

  describe('createHttpsForeverAgent', () => {
    beforeEach(() => {
      process.env.http_proxy = '';
      process.env.https_proxy = '';
      process.env.HTTP_PROXY = '';
      process.env.HTTPS_PROXY = '';
    });
    afterEach(() => {
      nock.cleanAll();
    });

    it('should reuse same agent', async () => {
      const host = '192.168.1.5';
      const port = '3128';
      process.env.http_proxy = `http://${host}:${port}`;

      const agent1 = createHttpsForeverAgent();
      const agent2 = createHttpsForeverAgent();

      expect(agent1.name).toStrictEqual(agent2.name);
    });

    it('should not reuse same agent with diferent options', async () => {
      const host = '192.168.1.5';
      const port = '3128';
      process.env.http_proxy = `http://${host}:${port}`;

      const agent1 = createHttpsForeverAgent({ cert: 'myCert' });
      const agent2 = createHttpsForeverAgent();

      expect(agent1.name).not.toStrictEqual(agent2.name);
    });
  });
});
