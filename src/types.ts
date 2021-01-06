export type AuthHeader = string;

export enum AuthType {
    Digest = "digest",
    None = "none",
    Password = "password",
    Token = "token"
}

export interface DAVResultResponse {
    href: string;
    propstat: {
        prop: DAVResultResponseProps;
    }
}

export interface DAVResultResponseProps {
    displayname: string;
    resourcetype: {
        collection?: boolean;
    };
    getlastmodified?: string;
    getetag?: string;
    getcontentlength?: string;
    getcontenttype?: string;
}

export interface DAVResult {
    multistatus: {
        response: Array<DAVResultResponse>;
    }
}

export interface DAVResultRawMultistatus {
    response: DAVResultResponse | [DAVResultResponse];
}

export interface DAVResultRaw {
    multistatus: "" | DAVResultRawMultistatus | [DAVResultRawMultistatus];
}

export interface DigestContext {
    username: string;
    password: string;
    nc: number;
    algorithm: string;
    hasDigestAuth: boolean;
    cnonce?: string;
}

export type DiskQuota = "unknown" | "unlimited" | number;

export interface FileStat {
    filename: string;
    basename: string;
    lastmod: string;
    size: number;
    type: "file" | "directory";
    etag: string | null;
    mime?: string;
    props?: DAVResultResponseProps;
}

export interface GetDirectoryContentsOptions {
    deep?: boolean;
    details?: boolean;
    glob?: string;
}

export interface Headers {
    [key: string]: string;
}

export interface OAuthToken {
    access_token: string;
    token_type: string;
    refresh_token?: string
}

export type RequestDataPayload = string | Buffer | ArrayBuffer | { [key: string]: any; };

export interface RequestOptions extends RequestOptionsInternal {
    _digest?: DigestContext;
}

export interface RequestOptionsInternal {
    data?: RequestDataPayload;
    headers?: Headers;
    httpAgent?: any;
    httpsAgent?: any;
    maxBodyLength?: number;
    maxContentLength?: number;
    method: string;
    onUploadProgress?: UploadProgressCallback;
    responseType?: string;
    url: string;
    validateStatus?: (status: number) => boolean;
    withCredentials?: boolean;
}

export interface Response {
    data: ResponseData;
    status: number;
    headers: Headers;
    statusText: string;
}

export type ResponseData = string | Buffer | ArrayBuffer | Object | Array<any>;

export interface ResponseDataDetailed<T> {
    data: T;
    headers: Headers;
}

export interface ResponseStatusValidator {
    (status: number): boolean;
}

export interface UploadProgress {
    loaded: number;
    total: number;
}

export interface UploadProgressCallback {
    (progress: UploadProgress): void;
}

export interface WebDAVClient {
    getDirectoryContents: (path: string, options?: GetDirectoryContentsOptions) => Promise<Array<FileStat> | ResponseDataDetailed<Array<FileStat>>>
}

export interface WebDAVClientContext {
    authType: AuthType;
    digest?: DigestContext;
    headers: Headers;
    httpAgent?: any;
    httpsAgent?: any;
    maxBodyLength?: number;
    maxContentLength?: number;
    password?: string;
    remotePath: string;
    remoteURL: string;
    token?: OAuthToken;
    username?: string;
    withCredentials?: boolean;
}

export interface WebDAVClientError extends Error {
    status?: number;
}

export interface WebDAVClientOptions {
    authType?: AuthType;
    headers?: Headers;
    httpAgent?: any;
    httpsAgent?: any;
    maxBodyLength?: number;
    maxContentLength?: number;
    password?: string;
    token?: OAuthToken;
    username?: string;
    withCredentials?: boolean;
}