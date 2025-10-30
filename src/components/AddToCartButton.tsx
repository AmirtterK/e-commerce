import { useState } from "react";
import { CartItem } from "@/types/CartItem";
import { Button } from "./ui/button";
import { toast } from "sonner";

export default function AddToCartButton({ product }: { product: CartItem }) {
  const [loading, setLoading] = useState(false);
  async function AddToCart() {
    setLoading(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item: product }),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("Failed to add to cart:", error);
      } else {
        console.log("Added to cart!");
        toast("Product added to cart successfully! ", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
        });
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      className="w-full cursor-pointer py-4 text-md  "
      variant={"outline"}
      onClick={AddToCart}
    >
      Add to Cart
    </Button>
  );
}
