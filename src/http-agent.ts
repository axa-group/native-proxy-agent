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
import * as http from 'http';
import hyperid from 'hyperid';
import { requestShouldUseProxy } from './utils';
import { NativeRequestOptions } from './types';

export class HttpAgent extends http.Agent {
  public name: string;

  constructor(options: http.AgentOptions & { name?: string }) {
    super(options);
    this.name = options.name || hyperid(true)();
  }

  addRequest(req: any, options: any, port: any, localAddress: any) {
    if (options.agent.options.proxy && requestShouldUseProxy(options as NativeRequestOptions)) {
      const path = `${options.protocol}//${options.host}${options.path}`;

      Object.assign(options, {
        port: options.agent.options.proxy.port,
        headers: options.agent.options.proxy.headers || {},
        host: options.agent.options.proxy.host,
        path
      });
      Object.assign(req, { path });

      if (options.agent.options.proxy.auth) {
        const auth: string = Buffer.from(options.agent.options.proxy.auth).toString('base64');
        Object.assign(options.headers, {
          'Proxy-Authorization': `Basic ${auth}`
        });
      }
    }

    // @ts-ignore, because of a bug on Agent @types https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16735@types
    super.addRequest(req, options, port, localAddress);
  }
}

export default HttpAgent;
