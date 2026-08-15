import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = (await clientPromise).db("Handla");
    const slides = await db.collection("slides").find({}).toArray();
    return NextResponse.json(slides);
  } catch (error) {
    console.error("Error fetching slides:", error);
    return NextResponse.json(
      { error: "Failed to fetch slides" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const db = (await clientPromise).db("Handla");
  const body = await request.json();
  const result = await db.collection("users").insertOne(body);
  return NextResponse.json(result);
}
