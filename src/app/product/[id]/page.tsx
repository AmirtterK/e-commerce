"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IoStar, IoStarOutline } from "react-icons/io5";
import Link from "next/link";
import { Product } from "@/types/product";
import { ember } from "@/lib/fonts";
import { formatNumber } from "@/lib/utils";
import { QuantityButton } from "@/components/QuantityButton";
import AddToCartButton from "@/components/AddToCartButton";
import { getProductById } from "@/lib/getProductById";


export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cartQuantity, setCartQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!params.id) return;

      setLoading(true);
      try {
        const productData = await getProductById(params.id as string);
        if (!productData) {
          setError("Product not found");
        } else {
          setProduct(productData);
        }
      } catch (err) {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className=" py-24 md:pt-36 px-10">
        <div className="animate-pulse">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex justify-center items-start">
              <div className="h-80 w-80 bg-muted-foreground rounded "></div>
            </div>
            <div className="space-y-8">
              <div className="h-6 bg-muted-foreground rounded w-3/4"></div>
              <div className="h-4 bg-muted-foreground rounded w-1/2"></div>
              <div className="h-20 bg-muted-foreground rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto py-50  flex flex-col justify-center items-center gap-8">
        <p className="">
          {error || "The product you're looking for doesn't exist."}
        </p>
        <Button variant={"outline"}>
          <Link href="/">Home</Link>
        </Button>
      </div>
    );
  }

  const {
    id,
    brand,
    name,
    description,
    color,
    price,
    discountPrice,
    image,
    category,
    tags,
    stock,
    inStock,
    rating,
    reviewsCount,
  } = product;

  return (
    <div className=" py-24 md:pt-30 px-10">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex justify-center items-start">
          <Image
            src={image}
            alt={`${brand} ${name}`}
            width={400}
            height={400}
            className="object-contain rounded-lg"
          />
        </div>

        <div className="space-y-5">
          <div>
            <h1 className={`${ember.className} text-4xl  tracking-wide`}>
              {brand} {name}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, index) =>
                index < rating ? (
                  <IoStar key={index} className="w-5 h-5" />
                ) : (
                  <IoStarOutline
                    key={index}
                    className="w-5 h-5 text-gray-300"
                  />
                )
              )}
            </div>
            <span className="text-sm text-muted-foreground">
              {formatNumber(reviewsCount)}
            </span>
          </div>
          <div>
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
          <div className={`flex flex-col gap-2 ${ember.className}`}>
            <div className="flex flex-row ">
              <div className=" w-30 ">Brand</div>
              <div className={`text-muted-foreground`}>{brand}</div>
            </div>
            <div className="flex flex-row ">
              <div className=" w-30 ">Color</div>
              <div className={`text-muted-foreground`}>{color}</div>
            </div>
            <div className="flex flex-row ">
              <div className=" w-30 ">Category</div>
              <div className={`text-muted-foreground`}>{category}</div>
            </div>
          </div>
          <div className="flex gap-6  items-end">
            <div className={`${ember.className} text-3xl `}>
              {Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: "EUR",
              }).format(discountPrice || price)}
            </div>

            {discountPrice && discountPrice < price && (
              <div className="text-xl text-muted-foreground line-through">
                {Intl.NumberFormat("en-GB", {
                  style: "currency",
                  currency: "EUR",
                }).format(price)}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className={`${ember.className} flex items-center  gap-2 `}>
              <span className="">Stock:</span>
              <div className="text-muted-foreground flex flex-row gap-1 ">
                {inStock ? stock : "Out of Stock"}
                {stock > 1 && <p> items available</p>}
                {stock <= 1 && <p> item available</p>}
              </div>
            </div>
          </div>
          <div
            className={`${ember.className} text-md flex flex-row items-center  gap-2 `}
          >
            Quantity
            <QuantityButton
              initialQuantity={1}
              min={1}
              max={stock}
              onQuantityChange={(quantity) => setCartQuantity(quantity)}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <AddToCartButton
              product={{
                id: id,
                quantity: cartQuantity,
              }}
            />
            <Button className="w-full cursor-pointer py-4 text-md">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
