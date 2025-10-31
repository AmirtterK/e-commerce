"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/types/product";
import Image from "next/image";
import { ember, emberWmd } from "../lib/fonts";
import { Button } from "./ui/button";
import Link from "next/link";
import { IoStar, IoStarOutline } from "react-icons/io5";


export function ProductCard({ product }: { product: Product }) {
  const {
    id,
    brand,
    name,
    price,
    discountPrice,
    image,

    rating,
  } = product;

  return (
    <Link href={`product/${id}`} className=" cursor-pointer ">
      <Card className="w-full max-w-sm gap-4 bg-background p-4 h-full rounded-md transition hover:scale-105">
        <CardHeader className="flex items-center justify-center">
          <div className="relative w-full h-60 md:h-40">
            <Image
              src={image}
              alt={name}
              fill
              className="object-contain transition hover:scale-110"
            />
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <CardTitle className="font-normal ">
            <span className={`${emberWmd.className}  tracking-wide`}>
              {brand} {name}
            </span>
          </CardTitle>
        </CardContent>
        <div className="flex-grow"></div>
        <CardFooter className="p-0 flex flex-col gap-3 items-start">
           <div className="flex flex-row gap-1">
            {Array.from({ length: 5 }).map((_, index) => {
              if (index < (rating )) {
                return <IoStar key={index} className="w-4 h-4" />;
              } else {
                return <IoStarOutline key={index} className="w-4 h-4" />;
              }
            })}
          </div>
          <span className={` ${ember.className} gap-2 flex flex-row items-center`}>
            <div className={`${ember.className}  `}>
              {Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: "EUR",
              }).format(discountPrice || price)}
            </div>

            {discountPrice && discountPrice < price && (
              <div className="text-sm text-muted-foreground line-through ">
                {Intl.NumberFormat("en-GB", {
                  style: "currency",
                  currency: "EUR",
                }).format(price)}
              </div>
            )}
          </span>
          <Button className="w-full cursor-pointer">Buy now</Button>
        </CardFooter>
        {/* <CardFooter className="p-0 flex flex-col gap-3 items-start">
          <div className="flex flex-row gap-1">
            {Array.from({ length: 5 }).map((_, index) => {
              if (index < (rating )) {
                return <IoStar key={index} className="w-4 h-4" />;
              } else {
                return <IoStarOutline key={index} className="w-4 h-4" />;
              }
            })}
          </div>
          <div className="w-full p-0 flex items-center justify-between">
            <span className={` ${ember.className} `}>
              {Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: "EUR",
              }).format(price)}
            </span>
            <Button className={`cursor-pointer ${ember.className} font-normal`}>
              Buy now
            </Button>
          </div>
        </CardFooter> */}
      </Card>
    </Link>
  );
}
