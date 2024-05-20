import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
const linkURL = import.meta.env.VITE_API_BASE_URL || 'http://broadcast.demothesoftwarepls.site/api/v1'
const httpRequest = axios.create({
  baseURL: linkURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
}

export const get = async <T = any>(path: string, data?: any, options?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  const requestOptions: AxiosRequestConfig = {
    params: data,
    ...options,
  };

  const response: AxiosResponse<T> = await httpRequest.get(path, requestOptions);

  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    config: response.config,
  };
};
export const post = async <T = any>(path: string, data: any, options: AxiosRequestConfig = {}): Promise<ApiResponse<T>> => {
  const response: AxiosResponse<T> = await httpRequest.post(path, data, options);
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    config: response.config,
  };
};

export const remove = async <T = any>(path: string, options: AxiosRequestConfig = {}): Promise<ApiResponse<T>> => {
  const response: AxiosResponse<T> = await httpRequest.delete(path, options);
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    config: response.config,
  };
};

export const put = async <T = any>(path: string, data: any, options: AxiosRequestConfig = {}): Promise<ApiResponse<T>> => {
  const response: AxiosResponse<T> = await httpRequest.put(path, data, options);
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    config: response.config,
  };
};

export default httpRequest;


