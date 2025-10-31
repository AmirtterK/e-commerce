import { CartItem } from "@/types/CartItem";
import { User } from "@/types/User";
import { auth } from "@clerk/nextjs/server";
import { MongoClient, ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

const uri = process.env.MONGODB_URI as string;

const client = new MongoClient(uri);
const db = client.db("Handla");
const users = db.collection<User>("users");

const { userId } = await auth();

export async function addToCart(product: CartItem, quantity: number) {
  if (!userId) return;
  await client.connect();

  const user = await users.findOne({
    _id: userId,
    "cart.productId": product.id,
  });

  if (user) {
    await users.updateOne(
      { _id: userId, "cart.productId": product.id },
      { $inc: { "cart.$.quantity": quantity } }
    );
  } else {
    await users.updateOne(
      { _id: userId },
      { $push: { cart: { ...product, quantity: quantity } as CartItem } }
    );
  }
}
