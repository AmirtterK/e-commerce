import { auth } from "@clerk/nextjs/server";
import clientPromise from "@/lib/mongodb";
import { CartItem } from "@/types/CartItem";
import { User } from "@/types/User";
export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("Not signed in", { status: 401 });

  const { item }: { item: CartItem } = await req.json();
  const db = (await clientPromise).db("Handla");

  const result = await db
    .collection<User>("users")
    .updateOne(
      { clerkId: userId, "cart.id": item.id },
      { $set: { "cart.$.quantity": item.quantity } }
    );
 
  if (result.matchedCount === 0) {
    await db
      .collection<User>("users")
      .updateOne({ clerkId: userId }, { $push: { cart: item } });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new Response("Not signed in", { status: 401 });

  const db = (await clientPromise).db("Handla");

  const user = await db
    .collection("users")
    .findOne({ clerkId: userId }, { projection: { cart: 1, _id: 0 } });
 
  return new Response(JSON.stringify(user?.cart ?? []), { status: 200 });
}
