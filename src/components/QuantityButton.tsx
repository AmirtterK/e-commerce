import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { Input } from "./ui/input";

interface QuantityButtonProps {
  initialQuantity?: number;
  min?: number;
  max?: number;
  onQuantityChange?: (quantity: number) => void;
}

export const QuantityButton: React.FC<QuantityButtonProps> = ({
  initialQuantity = 1,
  min = 1,
  max = 99,
  onQuantityChange,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const handleIncrement = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };
  const handleDecrement = () => {
    if (quantity > min) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || min;
    const clampedValue = Math.min(Math.max(value, min), max);
    setQuantity(clampedValue);
    onQuantityChange?.(clampedValue);
  };

  return (
    <div className="flex items-center border rounded-md ">
      <Button
        variant={"ghost"}
        size="sm"
        className="h-8 w-8 rounded-none border-none hover:bg-muted"
        onClick={handleDecrement}
        disabled={quantity <= min}
      >
        <Minus className="h-4 w-4"></Minus>
      </Button>
      <Input
        type="number"
        value={quantity}
        onChange={handleInput}
        className="w-10 h-8 text-center border-0 !bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <Button
        variant={"ghost"}
        size="sm"
        className="h-8 w-8 rounded-0 border-none "
        onClick={handleIncrement}
        disabled={quantity >=max}
      >
        <Plus className="h-4 w-4"></Plus>
      </Button>
    </div>
  );
};
