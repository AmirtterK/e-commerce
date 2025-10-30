import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const db = (await clientPromise).db("Handla");
  const users = await db.collection("slides").find({}).toArray();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const db = (await clientPromise).db("Handla");
  const body = await request.json();
  const result = await db.collection("users").insertOne(body);
  return NextResponse.json(result);
}
