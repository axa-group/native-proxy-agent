/*
 * Copyright (c) AXA Shared Services Spain S.A.
 *
 * Licensed under the AXA Shared Services Spain S.A. License (the "License"); you
 * may not use this file except in compliance with the License.
 * A copy of the License can be found in the LICENSE.TXT file distributed
 * together with this file.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Agent } from 'http';
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

describe('Agent test', () => {
  describe('Proxy env variables', () => {
    beforeEach(() => {
      process.env.http_proxy = '';
      process.env.https_proxy = '';
      process.env.HTTP_PROXY = '';
      process.env.HTTPS_PROXY = '';
    });
    afterEach(() => {
      nock.cleanAll();
    });

    test('should support the http_proxy variable', async () => {
      const host = '192.168.1.5';
      const port = '3128';
      process.env.http_proxy = `http://${host}:${port}`;

      const url = 'http://axa.com/v1/cats';
      const agent = createAgent(url);
      nock('http://axa.com/v1')
        .post('/cats')
        .reply(200, { message: 'test' });

      const result = await got(url, {
        agent,
        method: 'post',
        responseType: 'json'
      });
      expect(result.body).toEqual({ message: 'test' });
      // @ts-ignore, because of a bug on Agent @types https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16735
      expect((result.request.options.agent as Agent).options.proxy.host).toEqual(host);
    });

    test('should support the HTTP_PROXY variable', async () => {
      const host = '192.168.1.6';
      const port = '3128';
      process.env.HTTP_PROXY = `http://${host}:${port}`;

      const url = 'http://axa.com/v1/cats';
      const agent = createAgent(url);

      nock('http://axa.com/v1')
        .post('/cats')
        .reply(200, { message: 'test' });

      const result = await got(url, {
        agent,
        method: 'post',
        responseType: 'json'
      });
      expect(result.body).toEqual({ message: 'test' });
      // @ts-ignore, because of a bug on Agent @types https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16735@types
      expect((result.request.options.agent as Agent).options.proxy.host).toEqual(host);
    });

    test('should support not using proxy', async () => {
      const host = 'axa.com';

      const url = `http://${host}/v1/cats`;
      const agent = createAgent(url);
      nock('http://axa.com/v1')
        .post('/cats')
        .reply(200, { message: 'test' });
      const result = await got(url, {
        agent,
        method: 'post',
        responseType: 'json'
      });
      expect(result.body).toEqual({ message: 'test' });
      // @ts-ignore, because of a bug on Agent @types https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16735@types
      expect((result.request.options.agent as Agent).options.proxy).toBeUndefined();
    });

    test('should support the http_proxy with authentication', async () => {
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
      nock('http://axa.com/v1')
        .post('/cats')
        .reply(200, { message: 'test' });
      const result = await got(url, {
        agent,
        method: 'post',
        responseType: 'json'
      });

      expect(result.body).toEqual({ message: 'test' });
      // @ts-ignore, because of a bug on Agent @types https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16735@types
      expect((result.request.options.agent as Agent).options.proxy.host).toEqual(host);
      // @ts-ignore, because of a bug on Agent @types https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16735@types
      expect((result.request.options.agent as Agent).options.proxy.auth).toEqual(auth);
    });

    test('should support https request throught a http proxy', async () => {
      const host = '192.168.1.6';
      const port = '3128';
      process.env.HTTP_PROXY = `http://${host}:${port}`;

      const url = 'https://axa.com/v1/cats';
      const agent = createAgent(url);
      nock('https://axa.com/v1')
        .post('/cats')
        .reply(200, { message: 'test' });
      const result = await got(url, {
        agent,
        method: 'post',
        responseType: 'json'
      });

      expect(result.body).toEqual({ message: 'test' });
      // @ts-ignore, because of a bug on Agent @types https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16735@types
      expect((result.request.options.agent as Agent).options.proxy.host).toEqual(host);
    });

    test('should support the HTTPS_PROXY variable and tunneling https proxy to http request', async () => {
      const host = '192.168.1.7';
      const port = '3128';
      process.env.HTTPS_PROXY = `https://${host}:${port}`;

      const url = 'http://axa.com/v1/cats';
      const agent = createAgent(url);
      nock('http://axa.com/v1')
        .post('/cats')
        .reply(200, { message: 'test' });
      const result = await got(url, {
        agent,
        method: 'post',
        responseType: 'json'
      });

      expect(result.body).toEqual({ message: 'test' });
      // @ts-ignore, because of a bug on Agent @types https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16735@types
      expect((result.request.options.agent as Agent).options.proxy.host).toEqual(host);
    });

    test('should support the HTTP_PROXY variable and tunneling https proxy to http request', async () => {
      const host = '192.168.1.8';
      const port = '3128';
      process.env.HTTP_PROXY = `https://${host}:${port}`;

      const url = 'http://axa.com/v1/cats';
      const agent = createAgent(url);
      nock('http://axa.com/v1')
        .post('/cats')
        .reply(200, { message: 'test' });
      const result = await got(url, {
        agent,
        method: 'post',
        responseType: 'json'
      });

      expect(result.body).toEqual({ message: 'test' });
      // @ts-ignore, because of a bug on Agent @types https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16735@types
      expect((result.request.options.agent as Agent).options.proxy.host).toEqual(host);
    });
  });

  describe('createAgent', () => {
    beforeEach(() => {
      process.env.http_proxy = '';
      process.env.https_proxy = '';
      process.env.HTTP_PROXY = '';
      process.env.HTTPS_PROXY = '';
    });

    test('should throw error for not supported protocol', async () => {
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

    test('should support create an httpAgent without target', async () => {
      const host = '192.168.1.5';
      const port = '3128';
      process.env.http_proxy = `http://${host}:${port}`;

      const url = 'http://axa.com/v1/cats';
      const agent = createHttpAgent();
      nock('http://axa.com/v1')
        .post('/cats')
        .reply(200, { message: 'test' });

      const result = await got(url, {
        agent,
        method: 'post',
        responseType: 'json'
      });
      expect(result.body).toEqual({ message: 'test' });
      // @ts-ignore, because of a bug on Agent @types https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16735@types
      expect((result.request.options.agent as Agent).options.proxy.host).toEqual(host);
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

    test('should support create an httpsAgent without target', async () => {
      const host = '192.168.1.5';
      const port = '3128';
      process.env.http_proxy = `http://${host}:${port}`;

      const url = 'https://axa.com/v1/cats';
      const agent = createHttpsAgent();
      nock('https://axa.com/v1')
        .post('/cats')
        .reply(200, { message: 'test' });

      const result = await got(url, {
        agent,
        method: 'post',
        responseType: 'json'
      });
      expect(result.body).toEqual({ message: 'test' });
      // @ts-ignore, because of a bug on Agent @types https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16735@types
      expect((result.request.options.agent as Agent).options.proxy.host).toEqual(host);
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

    test('should throw error for not supported protocol', async () => {
      const host = '192.168.1.5';
      const port = '3128';
      process.env.http_proxy = `http://${host}:${port}`;

      const url = 'ftp://axa.com/v1/cats';

      expect(() => createForeverAgent(url)).toThrow(
        new Error('Target protocol not supported, should be https or http.')
      );
    });

    test('should reuse same agent', async () => {
      const host = '192.168.1.5';
      const port = '3128';
      process.env.http_proxy = `http://${host}:${port}`;

      const url = 'https://axa.com/v1/cats';
      const agent1 = createForeverAgent(url);
      const agent2 = createForeverAgent(url);

      expect(agent1.name).toEqual(agent2.name);
    });

    test('should not reuse same agent with diferent options', async () => {
      const host = '192.168.1.5';
      const port = '3128';
      process.env.http_proxy = `http://${host}:${port}`;

      const url = 'https://axa.com/v1/cats';
      const agent1 = createForeverAgent(url, { cert: 'myCert' } as NativeHttpsAgentOptions);
      const agent2 = createForeverAgent(url);

      expect(agent1.name).not.toEqual(agent2.name);
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

    test('should reuse same agent', async () => {
      const host = '192.168.1.5';
      const port = '3128';
      process.env.http_proxy = `http://${host}:${port}`;

      const agent1 = createHttpForeverAgent();
      const agent2 = createHttpForeverAgent();

      expect(agent1.name).toEqual(agent2.name);
    });

    test('should not reuse same agent with diferent options', async () => {
      const host = '192.168.1.5';
      const port = '3128';
      process.env.http_proxy = `http://${host}:${port}`;
      const agent1 = createHttpForeverAgent({ cert: 'myCert' } as NativeHttpsAgentOptions);
      const agent2 = createHttpForeverAgent();

      expect(agent1.name).not.toEqual(agent2.name);
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

    test('should reuse same agent', async () => {
      const host = '192.168.1.5';
      const port = '3128';
      process.env.http_proxy = `http://${host}:${port}`;

      const agent1 = createHttpsForeverAgent();
      const agent2 = createHttpsForeverAgent();

      expect(agent1.name).toEqual(agent2.name);
    });

    test('should not reuse same agent with diferent options', async () => {
      const host = '192.168.1.5';
      const port = '3128';
      process.env.http_proxy = `http://${host}:${port}`;

      const agent1 = createHttpsForeverAgent({ cert: 'myCert' });
      const agent2 = createHttpsForeverAgent();

      expect(agent1.name).not.toEqual(agent2.name);
    });
  });
});
