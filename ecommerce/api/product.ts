import apiService from "./service";

const url = process.env.EXPO_PUBLIC_API_URL;

export const getProduct = (token: string, page: string = "1") => {
  console.log("reach.....", token);
  return apiService(token)
    .get<ProductAPI>(`api/product?page=${page}`)
    .then((r) => {
      console.log("respone");
      console.log(r);
      return r;
    })
    .catch((e) => {
      console.log(e);
    });
};
// interface ApiResonsePr
export const singleProduct = (params: { id: string; token: string }) => {
  return apiService(params.token).get<SingleProduct>(
    `api/product/${params.id}`
  );
};
