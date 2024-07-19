/*
 * Copyright 2023 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { loadPackageDefinition, sendUnaryData, Server, ServerCredentials, ServerOptions, ServerUnaryCall, UntypedServiceImplementation } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import { ProtoGrpcType } from "./generated/echo";
import { EchoRequest__Output } from "./generated/grpc/testing/EchoRequest";
import { EchoResponse } from "./generated/grpc/testing/EchoResponse";

import * as net from 'net';
import { XdsServer } from "../src";
import { ControlPlaneServer } from "./xds-server";
import { findFreePorts } from 'find-free-ports';

const loadedProtos = loadPackageDefinition(loadSync(
  [
    'grpc/testing/echo.proto'
  ],
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
    json: true,
    includeDirs: [
      // Paths are relative to build/test
      __dirname + '/../../proto/'
    ],
  })) as unknown as ProtoGrpcType;

const BOOTSTRAP_CONFIG_KEY = 'grpc.TEST_ONLY_DO_NOT_USE_IN_PROD.xds_bootstrap_config';

export class Backend {
  private server: Server | null = null;
  private receivedCallCount = 0;
  private callListeners: (() => void)[] = [];
  constructor(private port: number, private useXdsServer: boolean, private serverOptions?: ServerOptions) {
  }
  Echo(call: ServerUnaryCall<EchoRequest__Output, EchoResponse>, callback: sendUnaryData<EchoResponse>) {
    // call.request.params is currently ignored
    this.addCall();
    for (const behaviorEntry of call.metadata.get('rpc-behavior')) {
      if (typeof behaviorEntry !== 'string') {
        continue;
      }
      for (const behavior of behaviorEntry.split(',')) {
        if (behavior.startsWith('error-code-')) {
          const errorCode = Number(behavior.substring('error-code-'.length));
          callback({code: errorCode, details: 'rpc-behavior error code'});
          return;
        }
      }
    }
    callback(null, {message: call.request.message});
  }

  addCall() {
    this.receivedCallCount++;
    this.callListeners.forEach(listener => listener());
  }

  onCall(listener: () => void) {
    this.callListeners.push(listener);
  }

  start(controlPlaneServer: ControlPlaneServer, callback: (error: Error | null, port: number) => void) {
    if (this.server) {
      throw new Error("Backend already running");
    }
    if (this.useXdsServer) {
      this.server = new XdsServer({...this.serverOptions, [BOOTSTRAP_CONFIG_KEY]: controlPlaneServer.getBootstrapInfoString()});
    } else {
      this.server = new Server();
    }
    const server = this.server;
    server.addService(loadedProtos.grpc.testing.EchoTestService.service, this as unknown as UntypedServiceImplementation);
    server.bindAsync(`[::1]:${this.port}`, ServerCredentials.createInsecure(), (error, port) => {
      if (!error) {
        this.port = port;
      }
      callback(error, port);
    });
  }

  startAsync(controlPlaneServer: ControlPlaneServer): Promise<number> {
    return new Promise((resolve, reject) => {
      this.start(controlPlaneServer, (error, port) => {
        if (error) {
          reject(error);
        } else {
          resolve(port);
        }
      });
    });
  }

  getPort(): number {
    return this.port;
  }

  getCallCount() {
    return this.receivedCallCount;
  }

  resetCallCount() {
    this.receivedCallCount = 0;
  }

  shutdown(callback: (error?: Error) => void) {
    if (this.server) {
      this.server.tryShutdown(error => {
        this.server = null;
        callback(error);
      });
    } else {
      process.nextTick(callback);
    }
  }

  shutdownAsync(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.shutdown(error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}

export async function createBackends(count: number, useXdsServer?: boolean, serverOptions?: ServerOptions): Promise<Backend[]> {
  const ports = await findFreePorts(count);
  return ports.map(port => new Backend(port, useXdsServer ?? true, serverOptions));
}
