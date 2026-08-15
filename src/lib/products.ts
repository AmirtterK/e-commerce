import clientPromise from './mongodb';
import { Product } from '@/types/product';
import { WithId, Document } from 'mongodb';

const DATABASE_NAME = 'Handla'; 
const COLLECTION_NAME = 'products'; 

interface ProductDocument extends Document {
  id: string;
  brand: string;
  name: string;
  description: string;
  color: string;
  price: number;
  discountPrice: number;
  image: string;
  category: string;
  tags?: string[];
  stock: number;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
}

function mapToProduct(doc: WithId<ProductDocument>): Product {
  return {
    id: doc.id,
    brand: doc.brand,
    name: doc.name,
    description: doc.description,
    color: doc.color,
    price: doc.price,
    discountPrice: doc.discountPrice,
    image: doc.image,
    category: doc.category,
    tags: doc.tags || [],
    stock: doc.stock,
    inStock: doc.inStock,
    rating: doc.rating,
    reviewsCount: doc.reviewsCount,
  };
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    const collection = db.collection<ProductDocument>(COLLECTION_NAME);

    const product = await collection.findOne({ id: id });
    
    return product ? mapToProduct(product) : null;
  } catch (error) {
    console.error('Error fetching product by id:', error);
    return null;
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    const collection = db.collection<ProductDocument>(COLLECTION_NAME);

    const searchRegex = new RegExp(query, 'i'); 

    const products = await collection.find({
      $or: [
        { name: { $regex: searchRegex } },
        { brand: { $regex: searchRegex } },
        { category: { $regex: searchRegex } },
        { tags: { $in: [searchRegex] } }
      ]
    }).toArray();

    return products.map(mapToProduct);
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    const collection = db.collection<ProductDocument>(COLLECTION_NAME);

    const products = await collection.find({ 
      category: { $regex: new RegExp(category, 'i') } 
    }).toArray();

    return products.map(mapToProduct);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}

export async function getAllProducts(): Promise<Product[]> {
  const client = await clientPromise;
  const db = client.db(DATABASE_NAME);
  const collection = db.collection<ProductDocument>(COLLECTION_NAME);
  const products = await collection.find({}).toArray();
  return products.map(mapToProduct);
}