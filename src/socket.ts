/* eslint-disable @typescript-eslint/no-explicit-any */

import Cookies from 'js-cookie';
import io from 'socket.io-client';
import { store } from './state/store';

const devBaseURL = 'http://localhost:25000/';
const prodBaseURL = 'http://localhost:25000/';

const baseURL =
  process.env.NODE_ENV === 'production' ? prodBaseURL : devBaseURL;

class Socket {
  private socket: any;

  constructor() {
   
    this.socket = io(baseURL, {
      autoConnect: false,
      extraHeaders: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
  }

  public connect() {
    this.socket.connect();
  }

  public disconnect() {
    this.socket.disconnect();
  }

  public on(event: string, callback: (...args: any[]) => void) {
    this.socket.on(event, callback);
  }

  public off(event: string, callback?: (...args: any[]) => void) {
    this.socket.off(event, callback);
  }

  public emit(event: string, ...args: any[]) {
    this.socket.emit(event, ...args);
  }
}

export const socket = new Socket();