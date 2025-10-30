import { Product } from "./product";

export type ExtendedCart = {
  id: string;
  product:Product;
  quantity:number;
};
