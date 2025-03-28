import { ApiError } from '../errors/api';
import { AuthError } from '../errors/auth';
import { HttpError } from '../errors/http';
import type { ApiResponse } from '../types/api';
import type { InitOptions, RequestInit, RequestMethod } from '../types/lib';

export class RestClient {
  private _token?: ApiResponse.OAuth;
  private _token_expire?: number;
  private account: string;
  private password: string;
  private grant_type: string;
  private url_base: string;
  private on_error?: (
    error: Error | ApiError | AuthError | HttpError
  ) => void | Promise<void>;

  constructor(options: InitOptions) {
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

  private logRequest(method: RequestMethod, url: string, payload?: any) {
    console.log(`[Request] ${method} ${url}`);
    if (payload) {
      console.log('[Request Payload]', JSON.stringify(payload, null, 2));
    }
  }

  private logResponse(method: RequestMethod, url: string, response: any) {
    console.log(`[Response] ${method} ${url}`);
    console.log('[Response Data]', JSON.stringify(response, null, 2));
  }

  private logError(method: RequestMethod, url: string, error: Error) {
    console.error(`[Error] ${method} ${url}`);
    console.error('[Error Details]', error);
  }

  async auth(): Promise<void> {
    const details: { [key: string]: any } = {
      grant_type: this.grant_type,
      client_id: this.account,
      client_secret: this.password,
    };

    const formBody = Object.keys(details)
      .map(
        (key) =>
          encodeURIComponent(key) + '=' + encodeURIComponent(details[key])
      )
      .join('&');

    const url = this.url_base + '/oauth/token?parameters';
    //this.logRequest('POST', url, details);

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody,
    });

    if (res.ok === false) {
      const error = new AuthError(await res.text(), {
        cause: `${res.status} ${res.statusText}`,
      });
      this.logError('POST', url, error);
      throw error;
    }

    this._token = await res.json();
    this._token_expire = Date.now() + (this.token?.expires_in ?? 3600) * 1000;
   // this.logResponse('POST', url, this._token);
  }

  private async request<T>(
    init: RequestInit & { method: RequestMethod }
  ): Promise<T> {
    try {
      if (!this.token || Date.now() > this.token_expire!) {
        await this.auth();
      }

      const target = `${this.url_base}${init.url}${
        init.query ? '?' + this.params(init.query) : ''
      }`;

      //this.logRequest(init.method, target, init.payload);

      const res = await fetch(target, {
        method: init.method,
        headers: {
          'Authorization': `Bearer ${this.token?.access_token}`,
          'Content-Type': 'application/json',
        },
        body: init.payload ? JSON.stringify(init.payload) : undefined,
      });

      if (res.ok === false) {
        if (res.headers.get('Content-Type') === 'application/json') {
          const error = new ApiError(
            await res.json(),
            `${res.status} ${res.statusText}, ${res.url}`
          );
          this.logError(init.method, target, error);
          throw error;
        } else {
          const error = new HttpError('HttpError\n' + (await res.text()));
          this.logError(init.method, target, error);
          throw error;
        }
      }

      const data = (await res.json()) as T;
     // this.logResponse(init.method, target, data);
      return data;
    } catch (err: any) {
      console.log(JSON.stringify(err));
      console.log(err?.response);
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        const networkError = new Error('Network error: Failed to fetch');
        this.logError(init.method, '', networkError);
        throw networkError;
      }

      if (this.on_error) {
        this.on_error(err);
        return null as T;
      } else {
        throw err;
      }
    }
  }

  get<T>(init: RequestInit): Promise<T> {
    return this.request<T>({ ...init, method: 'GET' });
  }

  post<T>(init: RequestInit): Promise<T> {
    return this.request<T>({ ...init, method: 'POST' });
  }

  put<T>(init: RequestInit): Promise<T> {
    return this.request<T>({ ...init, method: 'PUT' });
  }

  patch<T>(init: RequestInit): Promise<T> {
    return this.request<T>({ ...init, method: 'PATCH' });
  }

  delete<T>(init: RequestInit): Promise<T> {
    return this.request<T>({ ...init, method: 'DELETE' });
  }

  private params(query: Record<string, any>): URLSearchParams {
    return new URLSearchParams(
      Object.entries(query).map<string[]>((item) => [
        item[0],
        item[1].toString(),
      ])
    );
  }
}
