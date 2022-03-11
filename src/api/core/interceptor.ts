import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface HttpResponse<T = unknown> {
    status: number;
    msg: string;
    code: number;
    data: T;
}

axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        return config;
    },
    (error) => {
        // do something
        return Promise.reject(error);
    }
);
// add response interceptors
axios.interceptors.response.use(
    (response: AxiosResponse<HttpResponse>) => {
        const res = response;
        console.log(res.data);
        if (res.data?.statusCode === '100001') {
            return res;
        } else {
            return Promise.reject(res);
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);
