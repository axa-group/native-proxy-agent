import * as http from 'http';
import * as https from 'https';
import { TcpSocketConnectOpts } from 'net';
import { ConnectionOptions } from 'tls';

export interface ICallback {
  (error?: Error | null, result?: any): void;
}

export interface HttpsProxy extends ConnectionOptions {
  headers?: any;
  auth?: any;
  protocol?: string;
}

export interface HttpProxy extends TcpSocketConnectOpts {
  headers?: any;
  auth?: any;
  protocol?: string;
}

export interface NativeHttpAgentOptions extends http.AgentOptions {
  proxy?: HttpsProxy | HttpProxy;
  headers?: any;
}

export interface NativeHttpsAgentOptions extends https.AgentOptions {
  proxy?: HttpsProxy | HttpProxy;
  headers?: any;
  hostname?: string;
}

export type NativeAgentOptions = NativeHttpAgentOptions | NativeHttpsAgentOptions;

export interface AgentWithOptions extends http.Agent {
  options: {
    proxy?: HttpProxy;
  };
}

export interface NativeRequestOptions extends http.RequestOptions {
  agent: AgentWithOptions;
}
