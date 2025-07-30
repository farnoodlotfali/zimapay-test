import type { AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import { toast } from "react-toastify";

type ApiConfigsType = {
  token?: string | null | undefined;
  showToast?: boolean;
} & AxiosRequestConfig<any>;

export const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 20000,
  maxBodyLength: Infinity,
  headers: {
    "Content-Type": "application/json",
    Version: "3.0.0",
    Client: "Android",
    Accept: "application/json",
  },
});

const responseBody = <T>(response: AxiosResponse<T>, showToast?: boolean) => {
  if (showToast) {
    const msg: any = response.data;

    toast.success(msg?.data?.title ?? msg.message);
  }

  return response.data;
};

const onError = (
  error: Error & {
    response: {
      data: { errors: any; message: string; err?: string };
      status: number;
    };
  }
) => {
  const e = error;
  const msg = e.response.data.message;

  toast.error(msg ? msg : "Error!");
  if (e.response.status === 401) {
    // window.location.href = PAGE_URL.auth.login;
    // Cookies.remove(USER_TOKEN);
  }

  throw error;
};

const AuthorizationConfig = () => {
  const token = process.env.NEXT_PUBLIC_USER_TOKEN;
  AxiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
};
// with token
const fetcher = {
  get: <T>(url: string, configs?: ApiConfigsType | undefined) => {
    AuthorizationConfig();
    return AxiosInstance.get<T>(url, configs)
      .then((res) => responseBody(res, configs?.showToast))
      .catch((e) => onError(e));
  },
  post: <T>(url: string, body: object, configs?: ApiConfigsType | undefined) => {
    AuthorizationConfig();
    return AxiosInstance.post<T>(url, body, configs)
      .then((res) => responseBody(res, configs?.showToast))
      .catch((e) => onError(e));
  },
  put: <T>(url: string, body: object, configs?: ApiConfigsType | undefined) => {
    AuthorizationConfig();
    return AxiosInstance.put<T>(url, body, configs)
      .then((res) => responseBody(res, configs?.showToast))
      .catch((e) => onError(e));
  },
  patch: <T>(url: string, body: object, configs?: ApiConfigsType | undefined) => {
    AuthorizationConfig();

    return AxiosInstance.patch<T>(url, body, configs)
      .then((res) => responseBody(res, configs?.showToast))
      .catch((e) => onError(e));
  },
  delete: <T>(url: string, configs?: ApiConfigsType | undefined) => {
    AuthorizationConfig();
    return AxiosInstance.delete<T>(url, configs)
      .then((res) => responseBody(res, configs?.showToast))
      .catch((e) => onError(e));
  },
};

export { fetcher };
