import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: 'http://localhost:3333'
});

const requestHandler = (request: AxiosRequestConfig) => {
  request.headers['Content-Type'] = 'application/json';
  request.headers['Accept'] = 'application/json';

  return request;
};

const responseHandler = (response: AxiosResponse) => {
  return response;
};

const errorHandler = (error: AxiosError) => {
  if (error.message === 'Network Error') {
    toast.error('Por favor verifique sua conexão com a internet', {
      bodyStyle: {
        backgroundColor: 'red.500'
      }
    });
  }

  if (!error.response) {
    return Promise.reject(error);
  }

  const { status, data } = error.response;

  if (status === 400) {
    if (data.errors) {
      Object.values(data.errors).forEach((error: string[]) => {
        toast.error(`${error[0]} 😢`, {
          bodyStyle: {
            backgroundColor: 'red.500'
          }
        });
      });
    } else {
      toast.error(`${data.message} 😢`, {
        bodyStyle: {
          backgroundColor: 'red.500'
        }
      });
    }
  }

  if (status === 500) {
    toast.error('Oops! Parece que ocorreu um erro inesperado 😢', {
      bodyStyle: {
        backgroundColor: 'red.500'
      }
    });
  }

  return Promise.reject(error);
};

api.interceptors.request.use(
  (request: AxiosRequestConfig) => requestHandler(request),
  (error: AxiosError) => errorHandler(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => responseHandler(response),
  (error: AxiosError) => errorHandler(error)
);

export default api;