import { CartItem } from "./CartItem";

export type User = {
  _id: string;
  clerkId: string;
  role : boolean;
  name: string;
  email: string;
  cart: CartItem[];
};
