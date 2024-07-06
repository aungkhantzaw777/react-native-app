import axios from "axios";
import apiService from "./service";

const url = process.env.EXPO_PUBLIC_API_URL;

type ResponseSingup = {
  status: string;
  token: string;
};

export const login = (props: { email: string; password: string }) => {
  return apiService().post(`/login`, { ...props });
};

export const register = (props: {
  email: string;
  password: string;
  name: string;
}) => {
  return apiService().post<ResponseSingup>(`/register`, { ...props });
};
