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
import nodeHash from 'node-object-hash';
import { URL } from 'url';
import { HttpAgent } from './http-agent';
import { HttpsAgent } from './https-agent';
import { NativeAgentOptions, NativeHttpAgentOptions, NativeHttpsAgentOptions } from './types';
import { getProxy } from './utils';

const hashIt = nodeHash().hash;
const agentStorage = new Map();

/**
 * Create a keepAlive agent that will be create onces per options+target.protocol
 * Also try to gets the proxy from the http/s_proxy env variables
 * @param {string} target - The target to proxy
 * @param {NativeAgentOptions} [options]
 * @returns {HttpsAgent|HttpAgent} The agent depending on the target.
 * @example
 * const { createForeverAgent } = require('native-proxy-agent');
 * const got = require('got');
 *
 * got('http://myhost.com', { agent : createForeverAgent('http://myhost.com', {cert: 'mycert'}) });
 *
 * // This request will use same agent as they share options and protocol
 * got('http://otherhost.com', { agent : createForeverAgent('http://otherhost.com', {cert: 'mycert'}) });
 */
export function createForeverAgent(
  target: string,
  options: Omit<NativeAgentOptions, 'keepAlive'> = {}
) {
  if (typeof target !== 'string') {
    throw new Error('Target must be defined.');
  }

  const url = new URL(target);

  if (options.proxy === undefined) {
    const proxy = getProxy();
    if (proxy) {
      Object.assign(options, {
        proxy
      });
    }
  }

  const key = hashIt({ protocol: url.protocol, ...options });
  if (agentStorage.has(key)) {
    return agentStorage.get(key);
  }

  let agent;
  if (url.protocol === 'https:') {
    agent = new HttpsAgent({ ...options, keepAlive: true, name: key });
  } else if (url.protocol === 'http:') {
    agent = new HttpAgent({ ...options, keepAlive: true, name: key });
  } else {
    throw new Error('Target protocol not supported, should be https or http.');
  }

  agentStorage.set(key, agent);

  return agent;
}

/**
 * Create a keepAlive agent that will be create onces per options+http protocol
 * Also try to gets the proxy from the http/s_proxy env variables
 * @param {NativeAgentOptions} [options]
 * @returns {HttpAgent} The agent depending on the target.
 * @example
 * const { createHttpForeverAgent } = require('native-proxy-agent');
 * const got = require('got');
 *
 * got('http://myhost.com', { agent : createHttpForeverAgent({cert: 'mycert'}) });
 *
 * // This request will use same agent as they share options and protocol
 * got('http://otherhost.com', { agent : createHttpForeverAgent({cert: 'mycert'}) });
 */
export function createHttpForeverAgent(options: Omit<NativeHttpAgentOptions, 'keepAlive'> = {}) {
  if (options.proxy === undefined) {
    const proxy = getProxy();
    if (proxy) {
      Object.assign(options, {
        proxy
      });
    }
  }

  const key = hashIt({ protocol: 'http', ...options });
  if (agentStorage.has(key)) {
    return agentStorage.get(key);
  }
  const agent = new HttpAgent({ ...options, keepAlive: true, name: key });
  agentStorage.set(key, agent);

  return agent;
}

/**
 * Create a keepAlive agent that will be create onces per options+https protocol
 * Also try to gets the proxy from the http/s_proxy env variables
 * @param {NativeAgentOptions} [options]
 * @returns {HttpAgent} The agent depending on the target.
 * @example
 * const { createHttpForeverAgent } = require('native-proxy-agent');
 * const got = require('got');
 *
 * got('https://myhost.com', { agent : createHttpsForeverAgent({cert: 'mycert'}) });
 *
 * // This request will use same agent as they share options and protocol
 * got('https://otherhost.com', { agent : createHttpsForeverAgent({cert: 'mycert'}) });
 */
export function createHttpsForeverAgent(options: Omit<NativeHttpsAgentOptions, 'keepAlive'> = {}) {
  if (options.proxy === undefined) {
    const proxy = getProxy();
    if (proxy) {
      Object.assign(options, {
        proxy
      });
    }
  }

  const key = hashIt({ protocol: 'https', ...options });
  if (agentStorage.has(key)) {
    return agentStorage.get(key);
  }
  const agent = new HttpsAgent({ ...options, keepAlive: true, name: key });
  agentStorage.set(key, agent);

  return agent;
}
