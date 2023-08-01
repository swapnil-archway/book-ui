import axios, { AxiosResponse } from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "",
});

axiosInstance.interceptors.request.use((req) => {  
    return req;
  });
  
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log(error.response.data.statusCode === 401);
      if (error.response.data.statusCode === 401) {
      }
      return Promise.reject(
        (error.response && error.response.data) || "Something went wrong"
      );
    }
  );

  export default axiosInstance;