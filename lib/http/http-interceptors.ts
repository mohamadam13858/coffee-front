import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import type { ApiErrorResponse } from "./http-types";

let refreshPromise: Promise<void> | null = null;

async function refreshAccessToken(client: AxiosInstance): Promise<void> {
  if (!refreshPromise) {
    refreshPromise = client
      .post("/auth/refresh")
      .then(() => undefined)
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

export function setupHttpInterceptors(client: AxiosInstance) {
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },

    async (
      error: AxiosError<ApiErrorResponse>,
    ) => {
      const originalRequest =
        error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

      const status = error.response?.status;

      if (
        status !== 401 ||
        !originalRequest ||
        originalRequest._retry
      ) {
        return Promise.reject(error);
      }

      if (originalRequest.url?.includes("/auth/refresh")) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        await refreshAccessToken(client);

        return client(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    },
  );
}