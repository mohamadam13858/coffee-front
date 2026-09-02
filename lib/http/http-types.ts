import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE";

export type HttpData =
  | Record<string, unknown>
  | FormData
  | URLSearchParams
  | null;

export type HttpConfig = AxiosRequestConfig;

export type HttpRequestConfig = InternalAxiosRequestConfig;

export type HttpResponse<T = unknown> = AxiosResponse<T>;

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success?: boolean;
}

export interface ApiErrorResponse {
  message: string | string[];
  statusCode?: number;
  error?: string;
}

export interface HttpErrorInfo {
  status?: number;
  message: string;
  code?: string;
}