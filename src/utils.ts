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
