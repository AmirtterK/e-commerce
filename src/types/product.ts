export type Product = { 
  id: string;
  brand: string;
  name: string;
  description?: string;
  color: string;
  price: number;
  discountPrice?: number;
  image: string;
  category: string;
  tags?: string[];
  stock: number;
  inStock: boolean;
  rating: number;
  reviewsCount?: number;
}
