import type { ApiResponse } from '../types/api';
import type { InitOptions, RequestInit } from '../types/lib';
export declare class RestClient {
    private _token?;
    private _token_expire?;
    private account;
    private password;
    private grant_type;
    private url_base;
    private on_error?;
    constructor(options: InitOptions);
    get token(): ApiResponse.OAuth | undefined;
    get token_expire(): number | undefined;
    private logRequest;
    private logResponse;
    private logError;
    auth(): Promise<void>;
    private request;
    get<T>(init: RequestInit): Promise<T>;
    post<T>(init: RequestInit): Promise<T>;
    put<T>(init: RequestInit): Promise<T>;
    patch<T>(init: RequestInit): Promise<T>;
    delete<T>(init: RequestInit): Promise<T>;
    private params;
}
//# sourceMappingURL=restclient.d.ts.map