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
