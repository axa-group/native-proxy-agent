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
import { URL } from 'url';
import { NativeRequestOptions } from './types';

function getProxy(): { host: string; port: string; protocol: string } | undefined {
  const { http_proxy: httpProxy, https_proxy: httpsProxy, HTTP_PROXY, HTTPS_PROXY } = process.env;
  const proxy: string | undefined = httpsProxy || HTTPS_PROXY || httpProxy || HTTP_PROXY;
  const u: URL | undefined = proxy ? new URL(proxy) : undefined;
  if (u) {
    return {
      host: u.hostname,
      port: u.port,
      protocol: u.protocol
    };
  }

  return undefined;
}

function requestShouldUseProxy(options: NativeRequestOptions): boolean {
  const hasProxy = !!options.agent.options.proxy;
  const exceptions = process.env.no_proxy || process.env.NO_PROXY || '';
  const hasExceptions = !!exceptions;

  if (!hasProxy) {
    return false;
  }

  if (!hasExceptions) {
    return true;
  }

  return !exceptions
    .split(',')
    .map(exception => exception.trim())
    .filter(exception => exception)
    .some(exception => {
      const host = options.host || '';

      let regexp;

      if (exception === '*') {
        return true;
      }

      const endsWithAsterisk = exception.endsWith('*');
      const startsWithAsterisk = exception.startsWith('*');

      if (endsWithAsterisk && !startsWithAsterisk) {
        regexp = new RegExp(`^${exception.substring(0, exception.length - 1)}`);
      } else if (!endsWithAsterisk && startsWithAsterisk) {
        regexp = new RegExp(`${exception.substring(1)}$`);
      } else if (endsWithAsterisk && startsWithAsterisk) {
        const withoutEndAsterisk = exception.substring(0, exception.length - 1);
        const withoutAsterisks = withoutEndAsterisk.substring(1);

        regexp = new RegExp(`/*${withoutAsterisks}/*`);
      } else {
        regexp = new RegExp(exception);
      }

      return regexp.test(host);
    });
}

export default getProxy;

export { getProxy, requestShouldUseProxy };
