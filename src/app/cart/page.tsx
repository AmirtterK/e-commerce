"use client";

import CartCard from "@/components/CartCard";
import OrderCard from "@/components/OrderCard";
import { QuantityButton } from "@/components/QuantityButton";
import { Button } from "@/components/ui/button";
import { deleteFromCart } from "@/lib/deleteFromCart";
import { ember } from "@/lib/fonts";
import { getProductById } from "@/lib/getProductById";
import { CartItem } from "@/types/CartItem";
import { ExtendedCart } from "@/types/Extendedcart";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductCardSkeleton } from "@/components/ProductCardSkeleton";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cart, setCart] = useState<ExtendedCart[] | null>(null);

  const [selecetdItems, setSelectedItems] = useState<{
    [key: string]: {
      isSelected: boolean;
      price: number;
      quantity: number;
      discountPrice?: number;
    };
  }>({});

  const handleSelectionChange = (
    id: string,
    isSelected: boolean,
    price: number,
    quantity: number,
    discountPrice?: number
  ) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: { isSelected, price, quantity, discountPrice },
    }));
  };

  const totalPrice = Object.values(selecetdItems)
    .filter((item) => item.isSelected)
    .reduce(
      (sum, item) => sum + (item.discountPrice || item.price) * item.quantity,
      0
    );
  const totalQuantity = Object.values(selecetdItems)
    .filter((item) => item.isSelected)
    .reduce((sum, item) => sum + item.quantity, 0);

  const getCart = async (): Promise<CartItem[] | null> => {
    try {
      const response = await fetch("/api/cart");
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  async function handleQuantityChange(id: string, quantity: number) {
    setCart(
      (prev) =>
        prev?.map((item) => (item.id === id ? { ...item, quantity } : item)) ||
        null
    );
    setSelectedItems((prev) => {
      if (prev[id]) {
        return {
          ...prev,
          [id]: { ...prev[id], quantity },
        };
      }
      return prev;
    });
    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item: { id, quantity } }),
      });
    } catch (error) {
      console.error("Failed to update:", error);
    }
  }

  async function handleDelete(id: string) {
    try {
      setCart((prev) => prev?.filter((item) => item.id !== id) || null);
      setSelectedItems((prev) => {
        const newSelected = { ...prev };
        delete newSelected[id];
        return newSelected;
      });
      await deleteFromCart(id);
    } catch (error) {
      console.error("Failed to delete item:", error);
      const cartList = await getCart();
      if (cartList) {
        const extendedCart: ExtendedCart[] = await Promise.all(
          cartList.map(async (item) => {
            const product = await getProductById(item.id);
            return {
              id: item.id,
              product: product || {
                id: item.id,
                name: "Unknown",
                brand: "",
                description: "",
                color: "",
                price: 0,
                discountPrice: 0,
                image: "",
                category: "",
                stock: 0,
                inStock: false,
                rating: 0,
                reviewsCount: 0,
              },
              quantity: item.quantity,
            };
          })
        );
        setCart(extendedCart);
      }
    }
  }

  useEffect(() => {
    const fetchCartWithProducts = async () => {
      setLoading(true);
      try {
        const cartList = await getCart();

        if (!cartList) {
          setError("Product not found");
          return;
        }

        const extendedCart: ExtendedCart[] = await Promise.all(
          cartList.map(async (item) => {
            const product = await getProductById(item.id);
            return {
              id: item.id,
              product: product || {
                id: item.id,
                name: "Unknown",
                brand: "",
                description: "",
                color: "",
                price: 0,
                discountPrice: 0,
                image: "",
                category: "",
                stock: 0,
                inStock: false,
                rating: 0,
                reviewsCount: 0,
              },
              quantity: item.quantity,
            };
          })
        );

        setCart(extendedCart);
      } catch (err) {
        console.error(err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchCartWithProducts();
  }, []);

  if (loading) {
    return (
      <ProductCardSkeleton/>
    );
  }

  // 🧱 Error or empty cart
  if (error || !cart) {
    return (
      <div className="mx-auto py-50 flex flex-col justify-center items-center gap-8">
        <p>{error || "Your cart is empty."}</p>
        <Button variant={"outline"}>
          <Link href="/">Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <section className="py-32 px-5 max-w-6xl mx-auto">
      <h1
        className={`${ember.className} col-span-1 md:col-span-3 font-medium text-4xl pb-8`}
      >
        Cart
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 md:gap-x-6">
        <OrderCard total={totalPrice} />
        <div className="col-span-2 order-2 md:order-1">
          {cart.map((item, id) => (
            <CartCard
              key={id}
              item={item}
              product={item.product}
              onSelectionChange={handleSelectionChange}
              onDelete={() => handleDelete(item.id)}
              quantityControl={
                <QuantityButton
                  initialQuantity={item.quantity}
                  max={item.product.stock}
                  min={1}
                  onQuantityChange={(quantity) =>
                    handleQuantityChange(item.id, quantity)
                  }
                />
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
