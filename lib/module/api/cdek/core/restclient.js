"use strict";

import { ApiError } from "../errors/api.js";
import { AuthError } from "../errors/auth.js";
import { HttpError } from "../errors/http.js";
export class RestClient {
  constructor(options) {
    this.account = options.account;
    this.password = options.password;
    this.grant_type = options.grant_type ?? 'client_credentials';
    this.url_base = options.url_base ?? 'https://api.cdek.ru/v2';
    this.on_error = options.on_error;
  }
  get token() {
    return this._token;
  }
  get token_expire() {
    return this._token_expire;
  }
  logError(method, url, error) {
    console.error(`[Error] ${method} ${url}`);
    console.error('[Error Details]', error);
  }
  async auth() {
    const details = {
      grant_type: this.grant_type,
      client_id: this.account,
      client_secret: this.password
    };
    const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');
    const url = this.url_base + '/oauth/token?parameters';
    //this.logRequest('POST', url, details);

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formBody
    });
    if (res.ok === false) {
      const error = new AuthError(await res.text(), {
        cause: `${res.status} ${res.statusText}`
      });
      this.logError('POST', url, error);
      throw error;
    }
    this._token = await res.json();
    this._token_expire = Date.now() + (this.token?.expires_in ?? 3600) * 1000;
    // this.logResponse('POST', url, this._token);
  }
  async request(init) {
    try {
      if (!this.token || Date.now() > this.token_expire) {
        await this.auth();
      }
      const target = `${this.url_base}${init.url}${init.query ? '?' + this.params(init.query) : ''}`;

      //this.logRequest(init.method, target, init.payload);

      const res = await fetch(target, {
        method: init.method,
        headers: {
          'Authorization': `Bearer ${this.token?.access_token}`,
          'Content-Type': 'application/json'
        },
        body: init.payload ? JSON.stringify(init.payload) : undefined
      });
      if (res.ok === false) {
        if (res.headers.get('Content-Type') === 'application/json') {
          const error = new ApiError(await res.json(), `${res.status} ${res.statusText}, ${res.url}`);
          this.logError(init.method, target, error);
          throw error;
        } else {
          const error = new HttpError('HttpError\n' + (await res.text()));
          this.logError(init.method, target, error);
          throw error;
        }
      }
      const data = await res.json();
      // this.logResponse(init.method, target, data);
      return data;
    } catch (err) {
      console.log(JSON.stringify(err));
      console.log(err?.response);
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        const networkError = new Error('Network error: Failed to fetch');
        this.logError(init.method, '', networkError);
        throw networkError;
      }
      if (this.on_error) {
        this.on_error(err);
        return null;
      } else {
        throw err;
      }
    }
  }
  get(init) {
    return this.request({
      ...init,
      method: 'GET'
    });
  }
  post(init) {
    return this.request({
      ...init,
      method: 'POST'
    });
  }
  put(init) {
    return this.request({
      ...init,
      method: 'PUT'
    });
  }
  patch(init) {
    return this.request({
      ...init,
      method: 'PATCH'
    });
  }
  delete(init) {
    return this.request({
      ...init,
      method: 'DELETE'
    });
  }
  params(query) {
    return new URLSearchParams(Object.entries(query).map(item => [item[0], item[1].toString()]));
  }
}
//# sourceMappingURL=restclient.js.map