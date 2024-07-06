import axios from "axios";

// let base_api_url: any = process.env.BASE_URL;
const base_api_url = process.env.EXPO_PUBLIC_API_URL;

let defaultHeaderOptions = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const apiService = (token?: string) => {
  const service = axios.create({
    baseURL: base_api_url,
    headers: {
      ...defaultHeaderOptions,
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });

  service.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      console.log("Api Request Error - ", error);
      return Promise.reject(error);
    }
  );
  return service;
};

export default apiService;
