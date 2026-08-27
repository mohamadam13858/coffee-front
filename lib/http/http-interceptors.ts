import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
} from "axios";

import type { ApiErrorResponse } from "./http-types";

export function setupHttpInterceptors(
  client: AxiosInstance
) {
  client.interceptors.request.use(
    (config) => {
      return config;
    },

    (error) => {
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },

    async (
      error: AxiosError<ApiErrorResponse>
    ) => {
      const status = error.response?.status;

      if (status === 401) {
            
      }

      return Promise.reject(error);
    }
  );
}