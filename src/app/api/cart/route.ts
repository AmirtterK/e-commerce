import { auth } from "@clerk/nextjs/server";
import clientPromise from "@/lib/mongodb";
import { CartItem } from "@/types/CartItem";
import { User } from "@/types/User";
import { NextRequest, NextResponse } from "next/server";

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
    .collection<User>("users")
    .findOne({ clerkId: userId }, { projection: { cart: 1, _id: 0 } });

  return new Response(JSON.stringify(user?.cart ?? []), { status: 200 });
}


export async function DELETE(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const { productId } = (await req.json()) as { productId: string };

  if (!productId) return NextResponse.json({ error: "productId required" }, { status: 400 });

  const db = (await clientPromise).db("Handla");

  const result = await db.collection<User>("users").updateOne(
    { clerkId: userId },
    { $pull: { cart: { id: productId } } }
  );

  if (result.modifiedCount === 0) {
    return NextResponse.json({ error: "Item not found in cart" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}