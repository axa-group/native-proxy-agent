/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Licensed under the AXA Group Operations Spain S.A. License (the "License");
 * you may not use this file except in compliance with the License.
 * A copy of the License can be found in the LICENSE.TXT file distributed
 * together with this file.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as http from 'http';
import { URL } from 'url';
import { requestShouldUseProxy } from '../utils';
import { createAgent } from '../agent';
import { NativeRequestOptions } from '../types';

describe('Utils tests', () => {
  describe('requestShouldUseProxy', () => {
    let noProxy = '';

    beforeEach(() => {
      noProxy = process.env.no_proxy || process.env.NO_PROXY || '';
    });

    afterEach(() => {
      process.env.no_proxy = noProxy;
      process.env.NO_PROXY = noProxy;
    });

    test('Should return false when the agent has no proxy', () => {
      const options = {
        agent: new http.Agent()
      };

      const actual = `is ${requestShouldUseProxy(
        options as NativeRequestOptions
      )} when agent with no proxy`;

      expect('is false when agent with no proxy').toEqual(actual);
    });

    test('Should return true when the agent has proxy but no exceptions are found', () => {
      const options = {
        agent: createAgent('http://example.com')
      };

      process.env.no_proxy = '';
      process.env.NO_PROXY = '';

      const actual = `is ${requestShouldUseProxy(
        options as NativeRequestOptions
      )} when agent with proxy but no exceptions`;

      expect('is true when agent with proxy but no exceptions').toEqual(actual);
    });

    test('Should return the corrent result depending on the parameters', () => {
      const exceptions = 'discover*, *.local, test.example.com, *-whatever-*';

      const toTest = [
        { path: 'http://example.com/query?with=params', expected: true },
        { path: 'https://test.example.com/example', expected: false },
        { path: 'http://test.discoverpath/to/page?name=ferret&color=purple', expected: true },
        { path: 'http://test.discover?much=query&such=params', expected: true },
        { path: 'https://discover.test', expected: false },
        { path: 'https://local.test', expected: true },
        { path: 'http://test.local', expected: false },
        { path: 'http://int-whatever-env.test', expected: false },
        { path: 'http://test-whatevery-env.test', expected: true }
      ];

      process.env.no_proxy = exceptions;
      process.env.NO_PROXY = exceptions;

      toTest.forEach(testElement => {
        const { expected, path } = testElement;

        const expectedString = `for domain ${path} should proxy be used? ${expected}`;

        const url = new URL(path);

        const options = {
          agent: createAgent(path),
          host: url.host
        };

        const actualString = `for domain ${path} should proxy be used? ${requestShouldUseProxy(
          options as NativeRequestOptions
        )}`;

        expect(expectedString).toEqual(actualString);
      });
    });
  });
});
