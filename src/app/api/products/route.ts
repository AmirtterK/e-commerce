import { NextResponse } from "next/server";
import { getAllProducts } from "@/lib/products";

export async function GET() {
  try {
    const products = await getAllProducts();

    if (!products || products.length === 0) {
      return NextResponse.json(
        { error: "No products found" },
        { status: 404 }
      );
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}