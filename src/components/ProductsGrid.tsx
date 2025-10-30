"use client";

import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { useEffect, useState } from "react";

interface ProductsGridProps {
  limit?: number;
}

export function ProductsGrid({ limit }: ProductsGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch("/api/products");
        
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        {Array.from({ length: limit || 10 }).map((_, i) => (
          <div key={i} className="h-80 bg-gray-800 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  const displayedProducts = limit ? products.slice(0, limit) : products;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
      {displayedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}