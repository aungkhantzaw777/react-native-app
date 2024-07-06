import axios from "axios";
import apiService from "./service";

export const order = (prop: { token: string; id: string }) => {
  return apiService(prop.token).post(`/api/order`, {
    id: prop.id,
  });
};

export const getOrder = (prop: { token: string }) => {
  return apiService(prop.token).get<UserOrder>("/api/order");
};
