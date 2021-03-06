import { HttpAgent } from './http-agent';
import { HttpsAgent } from './https-agent';
import { NativeAgentOptions, NativeHttpAgentOptions, NativeHttpsAgentOptions } from './types';
import { getProxy } from './utils';

/**
 * Get the needed proxy agent depending of the given proxy options and target.
 * Also try to gets the proxy from the http/s_proxy env variables
 * @param {string} target - The target to proxy
 * @param {NativeAgentOptions} [options]
 * @returns {HttpsAgent|HttpAgent} The agent depending on the target.
 * @example
 * const { createAgent } = require('@axa/native-proxy-agent');
 * const got = require('got');
 *
 * got('http://myhost.com', { agent : createAgent('http://myhost.com') });
 *
 */
export function createAgent(
  target: string,
  options: NativeAgentOptions = {}
): HttpsAgent | HttpAgent {
  if (typeof target !== 'string') {
    throw new Error('Target must be defined.');
  }

  if (options.proxy === undefined) {
    const proxy = getProxy();
    if (proxy) {
      Object.assign(options, {
        proxy
      });
    }
  }

  Object.assign(options, { target });

  const url = new URL(target);

  if (url.protocol === 'https:') {
    return new HttpsAgent(options);
  }

  if (url.protocol === 'http:') {
    return new HttpAgent(options);
  }

  throw new Error('Target protocol not supported, should be https or http.');
}

/**
 * Get the needed proxy agent depending of the given proxy options for an http request
 * Also try to gets the proxy from the http/s_proxy env variables
 * @param {NativeAgentOptions} [options]
 * @returns {HttpsAgent|HttpAgent} The agent depending on the target.
 * @example
 * const { createHttpAgent } = require('@axa/native-proxy-agent');
 * const got = require('got');
 *
 * got('http://myhost.com', { agent : createHttpAgent() });
 *
 */
export function createHttpAgent(options: NativeHttpAgentOptions = {}): HttpAgent {
  if (options.proxy === undefined) {
    const proxy = getProxy();
    if (proxy) {
      Object.assign(options, {
        proxy
      });
    }
  }

  return new HttpAgent(options);
}

/**
 * Get the needed proxy agent depending of the given proxy options for an https request
 * Also try to gets the proxy from the http/s_proxy env variables
 * @param {NativeAgentOptions} [options]
 * @returns {HttpsAgent|HttpAgent} The agent depending on the target.
 * @example
 * const { createHttpAgent } = require('@axa/native-proxy-agent');
 * const got = require('got');
 *
 * got('http://myhost.com', { agent : createHttpAgent() });
 *
 */
export function createHttpsAgent(options: NativeHttpsAgentOptions = {}): HttpsAgent {
  if (options.proxy === undefined) {
    const proxy = getProxy();
    if (proxy) {
      Object.assign(options, {
        proxy
      });
    }
  }

  return new HttpsAgent(options);
}
