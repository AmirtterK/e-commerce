"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CartItem } from "@/types/CartItem";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { QuantityButton } from "./QuantityButton";
import { ember } from "@/lib/fonts";
import { Product } from "@/types/product";

export default function CartCard({
  item,
  product,
  quantityControl,
  onSelectionChange,
}: {
  item: CartItem;
  product: Product;
  quantityControl?: React.ReactNode;
  onSelectionChange?: (
    id: string,
    isSelected: boolean,
    price: number,
    quantity: number,
    discountPrice?: number,
  ) => void;
}) {
  const { id, quantity } = item;
  const {
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

  const handleCheckChange = (checked: boolean) => {
    if (onSelectionChange) {
      onSelectionChange(id, checked, price, quantity, discountPrice);
    }
  };
  return (
    <Card key={id} className="w-full bg-background mb-6 rounded-md relative pt-4 pb-0 md:pb-4">
       <Checkbox
          className="absolute left-4 cursor-pointer z-1 md:top-1/2 top-6 "
          onCheckedChange={handleCheckChange}
        /> 
        <div className="w-fit flex flex-col space-y-4 items-end absolute bottom-6 right-4">
            {quantityControl}

            <div className={`${ember.className} text-lg mr-2 `}>
              {Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: "EUR",
              }).format(discountPrice || price)}
            </div>
          </div><div className="grid md:grid-cols-3 grid-cols-2">
       
        <CardHeader className="flex items-center justify-center col-span-1 relative md:order-1 order-2">
          <div className="relative h-40 aspect-[1/1]">
            <Image src={image} alt={name} fill className="object-contain" />
          </div>
        </CardHeader>
        <CardContent className="col-span-2  flex flex-col gap-y-4 mt-0 md:mt-4 pl-0 md:order-2 order-1 ml-14 md:ml-0">
          <CardTitle className="">
            {brand} {name}
          </CardTitle>
        </CardContent>
      </div>
    </Card>
  );
}
