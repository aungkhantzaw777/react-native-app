interface User {
  name: string;
  email: string;
  password: string;
}

interface RootApI {
  totalPages: number;
  currentPage: string;
}

interface ProductAPI extends RootApI {
  products: Product[];
}

interface SingleProduct {
  product: Product;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  detail: string;
  imageUrl: string;
  __v: number;
}

interface UserOrder {
  _id: string;
  name: string;
  email: string;
  password: string;
  __v: number;
  myOrder: MyOrder[];
}

interface MyOrder {
  _id: string;
  name: string;
  price: number;
  detail: string;
  imageUrl: string;
  __v: number;
}
