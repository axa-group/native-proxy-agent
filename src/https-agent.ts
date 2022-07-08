import * as https from 'https';
import hyperid from 'hyperid';
import * as net from 'net';
import * as tls from 'tls';
import {
  HttpProxy,
  HttpsProxy,
  ICallback,
  NativeHttpsAgentOptions,
  NativeRequestOptions
} from './types';
import { requestShouldUseProxy } from './utils';

export class HttpsAgent extends https.Agent {
  public name: string;

  constructor(options: https.AgentOptions & { name?: string }) {
    super(options);
    this.name = options.name || hyperid(true)();
  }

  private createConnectionHttpsAfterHttp(options: NativeHttpsAgentOptions, cb: ICallback) {
    let socket: tls.TLSSocket | net.Socket;
    if ((options.proxy as HttpProxy | HttpsProxy).protocol === 'https') {
      socket = tls.connect(options.proxy as HttpsProxy);
    } else {
      socket = net.connect(options.proxy as HttpProxy);
      if (options.keepAlive === true) {
        socket.setKeepAlive(true);
      }
    }

    const onError = (error: Error) => {
      socket.destroy();
      cb(error);
    };
    const onData = (data: Buffer) => {
      socket.removeListener('error', onError);
      const m: RegExpMatchArray | null = data.toString().match(/^HTTP\/1.1 (\d*)/);
      if (m && m[1] !== '200') {
        socket.destroy();
        return cb(new Error(m[0]));
      }
      Object.assign(options, { socket });

      // @ts-ignore, because of a bug on Agent @types https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16735@types
      return cb(null, super.createConnection(options));
    };

    socket.once('error', onError);
    socket.once('data', onData);

    let msg = `CONNECT ${options.hostname}:${options.port} HTTP/1.1\r\n`;

    if ((options.proxy as HttpProxy | HttpsProxy).auth) {
      const auth = Buffer.from((options.proxy as HttpProxy | HttpsProxy).auth).toString('base64');
      msg += `Proxy-Authorization: Basic ${auth}\r\n`;
    }

    if ((options.proxy as HttpProxy | HttpsProxy).headers) {
      Object.keys((options.proxy as HttpProxy | HttpsProxy).headers).forEach(header => {
        msg += `${header}: ${(options.proxy as HttpProxy | HttpsProxy).headers[header]}\r\n`;
      });
    }

    msg += `Host: ${options.hostname}:${options.port} \r\n`;
    msg += '\r\n';

    socket.write(msg);
  }

  createConnection(options: NativeHttpsAgentOptions, cb: ICallback) {
    if (options.proxy && requestShouldUseProxy(options as NativeRequestOptions)) {
      this.createConnectionHttpsAfterHttp(options, cb);
    } else {
      // @ts-ignore, because of a bug on Agent @types https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16735@types
      cb(null, super.createConnection(options));
    }
  }
}

export default HttpsAgent;
