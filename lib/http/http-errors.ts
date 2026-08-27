import axios from "axios";
import type {
  ApiErrorResponse,
  HttpErrorInfo,
} from "./http-types";

export function getHttpError(error: unknown): HttpErrorInfo {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const responseMessage = error.response?.data?.message;

    let message = "خطایی در ارتباط با سرور رخ داد.";

    if (Array.isArray(responseMessage)) {
      message = responseMessage.join("، ");
    } else if (typeof responseMessage === "string") {
      message = responseMessage;
    } else if (error.message) {
      message = error.message;
    }

    return {
      status: error.response?.status,
      message,
      code: error.code,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: "خطای ناشناخته‌ای رخ داد.",
  };
}